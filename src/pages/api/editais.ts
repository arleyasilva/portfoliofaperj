import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export type EditalApiItem = {
  id: string;
  numero: string;
  titulo: string;
  linkEdital: string;
  linkResultado?: string;
  publicacao?: string;
  submissao?: string;
  resultadoPrevisao?: string;
  status?: "aberto" | "encerrado" | "resultado";
};

const FAPERJ_URL = "https://www.faperj.br/?id=28.5.7";

/**
 * Heurística de parsing:
 * - Captura <a> cujo texto contenha "Edital FAPERJ Nº <n>/<ano>" (ano 2025 por padrão)
 * - O título é o texto após o travessão " – "
 * - Procura, no bloco de texto subsequente, possíveis links com a palavra "Resultado"
 * - Tenta inferir status a partir da existência de link de resultado ("resultado")
 */
function parseLastDateInText(text?: string): Date | undefined {
  if (!text) return undefined;
  const m = text.match(/(\d{2}\/\d{2}\/\d{4})(?![\s\S]*\d{2}\/\d{2}\/\d{4})/); // última data dd/mm/aaaa
  if (!m) return undefined;
  const [dd, mm, yyyy] = m[1].split("/");
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 23, 59, 59, 999);
  return isNaN(d.getTime()) ? undefined : d;
}

function extractEditais(html: string, ano: number = 2025): EditalApiItem[] {
  const $ = cheerio.load(html);
  const items: EditalApiItem[] = [];

  const editalRegex = new RegExp(`Edital\\s*FAPERJ\\s*N[ºo]\\s*([0-9]{1,2})\\/${ano}\\s*[\u2013\-]?\\s*(.*)`, "i");

  $("a").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    const href = $(el).attr("href") || "";

    if (!href.toLowerCase().includes("/rp/downloads/") && !text.match(editalRegex)) return;

    const match = text.match(editalRegex);
    if (!match) return;

    const numeroSeq = match[1];
    const titulo = match[2] ? match[2].trim() : "";
    const numero = `Nº ${numeroSeq}/${ano}`;

    // Monta link absoluto se necessário
    const linkEdital = href.startsWith("http") ? href : new URL(href, FAPERJ_URL).toString();

    // Busca um bloco de texto próximo (siblings) até encontrar outro "Edital FAPERJ Nº"
    const block = $(el).parent();
    let cursor = block.next();
    let linkResultado: string | undefined;
    let publicacao: string | undefined;
    let submissao: string | undefined;
    let resultadoPrevisao: string | undefined;

    // Varre alguns irmãos próximos (limite de segurança de 8)
    for (let i = 0; i < 8 && cursor.length; i++) {
      const t = cursor.text().replace(/\s+/g, " ").trim();
      // coleta info textual simples
      if (!publicacao) {
        const m = t.match(/Publicado\s+em\s+D\.O\.|Lançamento do programa:\s*([^]+?)(?=Submissão|Divulgação|Interposição|$)/i);
        if (m && m[1]) publicacao = m[1].trim();
      }
      if (!submissao) {
        const m = t.match(/Submiss[aã]o[^:]*:\s*([^]+?)(?=Divulgação|Interposição|$)/i);
        if (m && m[1]) submissao = m[1].trim();
      }
      if (!resultadoPrevisao) {
        const m = t.match(/Resultado (?:Preliminar|Final)[^:]*:\s*([^]+?)(?=$)/i);
        if (m && m[1]) resultadoPrevisao = m[1].trim();
      }

      // procura link de resultado
      const aRes = cursor.find('a:contains("Resultado")').first();
      if (!linkResultado && aRes.length) {
        const hr = aRes.attr("href");
        if (hr) linkResultado = hr.startsWith("http") ? hr : new URL(hr, FAPERJ_URL).toString();
      }

      // se achar um novo edital no texto, para
      if (t.match(editalRegex)) break;
      cursor = cursor.next();
    }

    // status por heurística
    let status: EditalApiItem["status"] | undefined;
    const now = new Date();
    const deadline = parseLastDateInText(submissao);
    if (deadline && deadline.getTime() >= now.getTime()) {
      status = "aberto";
    } else if (linkResultado) {
      status = "resultado";
    } else if (submissao) {
      status = "encerrado";
    }

    items.push({
      id: `edital-${numeroSeq}-${ano}`,
      numero,
      titulo,
      linkEdital,
      linkResultado,
      publicacao,
      submissao,
      resultadoPrevisao,
      status,
    });
  });

  // Remove duplicados por número, mantendo o primeiro (ou o que tiver link válido)
  const seen = new Map<string, EditalApiItem>();
  for (const it of items) {
    const key = it.numero;
    if (!seen.has(key)) {
      seen.set(key, it);
    } else {
      const prev = seen.get(key)!;
      if (!prev.linkEdital && it.linkEdital) seen.set(key, it);
    }
  }

  // Ordena por número desc (mais recente em cima)
  const ordered = Array.from(seen.values()).sort((a, b) => {
    const na = parseInt(a.numero.match(/(\d+)/)?.[1] || "0", 10);
    const nb = parseInt(b.numero.match(/(\d+)/)?.[1] || "0", 10);
    return nb - na;
  });

  return ordered;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const resp = await fetch(FAPERJ_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });
    if (!resp.ok) {
      res.status(502).json({ error: `Falha ao obter página (${resp.status})` });
      return;
    }
    const html = await resp.text();
    const data = extractEditais(html, 2025);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ year: 2025, total: data.length, items: data });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Erro inesperado" });
  }
}

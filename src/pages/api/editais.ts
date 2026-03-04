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
    status?: "aberto" | "encerrado" | "em-avaliacao";
    // rótulo amigável para UI (ex.: "ABERTO", "EM AVALIAÇÃO", "FECHADO")
    statusLabel?: string;
  };

  const FAPERJ_URL = "https://www.faperj.br/?id=28.5.7";

  function two(n: number) {
    return n < 10 ? `0${n}` : String(n);
  }

  function padDate(ddmmyyyy: string) {
    const parts = ddmmyyyy.split('/').map((p) => p.trim());
    if (parts.length === 3) {
      const d = Number(parts[0]);
      const m = Number(parts[1]);
      const y = parts[2];
      return `${two(d)}/${two(m)}/${y}`;
    }
    return ddmmyyyy;
  }

  function monthIndex(name: string) {
    const map: Record<string, number> = {
      janeiro: 0,
      fevereiro: 1,
      marco: 2,
      março: 2,
      abril: 3,
      maio: 4,
      junho: 5,
      julho: 6,
      agosto: 7,
      setembro: 8,
      outubro: 9,
      novembro: 10,
      dezembro: 11,
    };
    const key = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    return map[key] ?? -1;
  }

  function parseLastDateInText(text?: string): Date | undefined {
    if (!text) return undefined;
    const m = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})(?![\s\S]*\d{1,2}\/\d{1,2}\/\d{4})/);
    if (!m) return undefined;
    const [dd, mm, yyyy] = m[1].split('/').map((s) => Number(s));
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd), 23, 59, 59, 999);
    return isNaN(d.getTime()) ? undefined : d;
  }

  function extractDateRange(text?: string): string | undefined {
    if (!text) return undefined;
    const t = text.replace(/\s+/g, ' ').trim();

    const intervalFull = t.match(/(\d{1,2}\/\d{1,2}\/\d{4})\s*(?:a|até|-)\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
    if (intervalFull) return `${padDate(intervalFull[1])} a ${padDate(intervalFull[2])}`;

    const singleFull = t.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (singleFull) return padDate(singleFull[1]);

    const monthNames = 'janeiro|fevereiro|marco|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro';
    const intervalMonth = new RegExp(`(\\d{1,2})\\s*(?:de)?\\s*(?:a|até|-)\\s*(\\d{1,2})\\s*(?:de)?\\s*(${monthNames})(?:\\s*de\\s*(\\d{4}))?`, 'i');
    const mIntervalMonth = t.match(intervalMonth);
    if (mIntervalMonth) {
      const day1 = Number(mIntervalMonth[1]);
      const day2 = Number(mIntervalMonth[2]);
      const mon = monthIndex(mIntervalMonth[3]);
      const year = mIntervalMonth[4] ? Number(mIntervalMonth[4]) : new Date().getFullYear();
      if (mon >= 0) return `${two(day1)}/${two(mon + 1)}/${year} a ${two(day2)}/${two(mon + 1)}/${year}`;
    }

    const singleMonth = new RegExp(`(\\d{1,2})\\s*(?:de)?\\s*(${monthNames})(?:\\s*de\\s*(\\d{4}))?`, 'i');
    const mSingleMonth = t.match(singleMonth);
    if (mSingleMonth) {
      const day = Number(mSingleMonth[1]);
      const mon = monthIndex(mSingleMonth[2]);
      const year = mSingleMonth[3] ? Number(mSingleMonth[3]) : new Date().getFullYear();
      if (mon >= 0) return `${two(day)}/${two(mon + 1)}/${year}`;
    }

    const shortNum = t.match(/(\d{1,2}\/\d{1,2})(?:\/)?/);
    if (shortNum) {
      const y = t.match(/(\d{4})/);
      const year = y ? Number(y[1]) : new Date().getFullYear();
      const parts = shortNum[1].split('/');
      const d = Number(parts[0]);
      const m = Number(parts[1]);
      if (!isNaN(d) && !isNaN(m)) return `${two(d)}/${two(m)}/${year}`;
    }

    const isolated = t.match(/(?:submiss[aã]o|resultado)[^\d]*(?:de)?\s*(\d{1,2})(?![\d\/])/i);
    if (isolated) {
      const day = Number(isolated[1]);
      const monthYear = t.match(new RegExp(`(${monthNames})(?:[^\\d]*(\\d{4}))?`, 'i'));
      if (monthYear) {
        const mon = monthIndex(monthYear[1]);
        const yy = monthYear[2] ? Number(monthYear[2]) : new Date().getFullYear();
        if (mon >= 0) return `${two(day)}/${two(mon + 1)}/${yy}`;
      }
    }

    return undefined;
  }

  function formatLabel(label: string, date?: string) {
    return date ? `${label}: ${date}` : undefined;
  }

  export function extractEditais(html: string): EditalApiItem[] {
    const $ = cheerio.load(html);
    const items: EditalApiItem[] = [];

    const editalRegex = /Edital\s*FAPERJ\s*N[ºo]\s*(\d{1,4})\/(\d{4})\s*[\u2013\-–—]?\s*(.*)/i;

    $('a').each((_, el) => {
      const $el = $(el);
      const text = $el.text().trim().replace(/\s+/g, ' ');
      const href = ($el.attr('href') || '').trim();

      const match = text.match(editalRegex);
      if (!match) return;

      const numeroSeq = match[1];
      const anoEncontrado = match[2];
      const titulo = (match[3] || '').trim();
      const numero = `Nº ${numeroSeq}/${anoEncontrado}`;
      const linkEdital = href ? (href.startsWith('http') ? href : new URL(href, FAPERJ_URL).toString()) : '';

      let combinedText = $el.parent().text() || $el.text() || '';
      let combinedHtml = $el.parent().html() || '';
      let cursor = $el.parent().next();
      let linkResultado: string | undefined;
      for (let i = 0; i < 20 && cursor.length; i++) {
        combinedText += ' ' + cursor.text();
        combinedHtml += ' ' + (cursor.html() || '');

        const aRes = cursor.find('a').filter((_, a) => $(a).text().toLowerCase().includes('resultado')).first();
        if (aRes.length) {
          const hr = aRes.attr('href');
          if (hr) linkResultado = hr.startsWith('http') ? hr : new URL(hr, FAPERJ_URL).toString();
        }

        if (cursor.text().match(/Edital\s*FAPERJ\s*N[ºo]/i)) break;
        cursor = cursor.next();
      }

      combinedText = combinedText.replace(/\s+/g, ' ').trim();

      let publicacao = extractDateRange(combinedText) || extractDateRange(combinedHtml);

      // submissaoRaw holds the raw date string (dd/mm/yyyy or interval). submissao is the formatted label used in the API.
      let submissaoRaw = undefined as string | undefined;
      const submissaoMatch = combinedText.match(/Submiss[aã]o[^:\n]*:\s*([^\n<]+)/i);
      if (submissaoMatch && submissaoMatch[1]) {
        submissaoRaw = extractDateRange(submissaoMatch[1]) || extractDateRange(combinedText) || extractDateRange(combinedHtml);
      } else {
        const fallbackSub = combinedText.match(/Submiss[aã]o[^\d\n]*:?\s*de\s*(\d{1,2})/i);
        if (fallbackSub) {
          const day = Number(fallbackSub[1]);
          const monthYear = combinedText.match(new RegExp(`(${['janeiro','fevereiro','marco','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'].join('|')})(?:[^\\d]*(\\d{4}))?`, 'i'));
          if (monthYear) {
            const mm = monthIndex(monthYear[1]);
            const yyyy = monthYear[2] ? Number(monthYear[2]) : new Date().getFullYear();
            if (mm >= 0) submissaoRaw = `${two(day)}/${two(mm + 1)}/${yyyy}`;
          }
        }
      }

      // Heurística adicional: caso o texto contenha apenas algo como "de 19" ou um dia isolado próximo de "Submissão",
      // tentamos localizar o dia próximo e buscar o mês/ano em qualquer lugar do bloco combinado.
      if (!submissaoRaw) {
        const dayNear = combinedText.match(/Submiss[aã]o[\s\S]{0,80}?(\d{1,2})/i);
        if (dayNear) {
          const day = Number(dayNear[1]);
          const monthYearAnywhere = combinedText.match(new RegExp(`(${['janeiro','fevereiro','marco','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'].join('|')})(?:[^\\d]*(\\d{4}))?`, 'i'));
          if (monthYearAnywhere) {
            const mm = monthIndex(monthYearAnywhere[1]);
            const yyyy = monthYearAnywhere[2] ? Number(monthYearAnywhere[2]) : new Date().getFullYear();
            if (mm >= 0) submissaoRaw = `${two(day)}/${two(mm + 1)}/${yyyy}`;
          }
        }
      }

      // Fallback adicional: se não conseguimos extrair submissao explicitamente,
      // 1) tentamos usar qualquer data encontrada no bloco combinado que não seja a publicação;
      if (!submissaoRaw) {
        const anyDate = extractDateRange(combinedText) || extractDateRange(combinedHtml);
        if (anyDate && anyDate !== publicacao) {
          submissaoRaw = anyDate;
        }
      }

      // 2) se ainda não encontramos, tentamos localizar a URL do edital no HTML bruto e
      //    olhar uma janela ao redor dela (algumas páginas colocam prazos em nós separados).
      if (!submissaoRaw && linkEdital) {
        try {
          const idx = html.indexOf(linkEdital);
          if (idx >= 0) {
            const start = Math.max(0, idx - 800);
            const end = Math.min(html.length, idx + 800);
            const windowStr = html.slice(start, end);

            // 1) tentar encontrar trechos rotulados como 'Submiss' próximos ao link
            const subSearch = /Submiss/i;
            const subIdx = windowStr.search(subSearch);
            if (subIdx >= 0) {
              const subWindow = windowStr.slice(subIdx, Math.min(windowStr.length, subIdx + 600));
              const subDate = extractDateRange(subWindow);
              if (subDate && subDate !== publicacao) submissaoRaw = subDate;
            }

            // 2) se não encontrou por rótulo, tentar extrair datas no próprio trecho e escolher a melhor
            if (!submissaoRaw) {
              const intervalMatch = windowStr.match(/(\d{1,2}\/\d{1,2}\/\d{4})\s*(?:a|até|-)\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
              if (intervalMatch) {
                submissaoRaw = `${padDate(intervalMatch[1])} a ${padDate(intervalMatch[2])}`;
              } else {
                const allDates = windowStr.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
                if (allDates && allDates.length) {
                  // escolher a última data encontrada como fallback
                  submissaoRaw = padDate(allDates[allDates.length - 1]);
                  if (submissaoRaw === publicacao) {
                    // se a última data for a publicação, tentar escolher a anterior
                    if (allDates.length >= 2) submissaoRaw = padDate(allDates[allDates.length - 2]);
                  }
                }
              }
            }
          }
        } catch (e) {
          // ignore
        }
      }

      const submissao = formatLabel('Submissão', submissaoRaw);

      let resultadoPrevisaoRaw = undefined as string | undefined;
      const resultadoMatch = combinedText.match(/Resultado(?: Preliminar| Final)?[^:\n]*:\s*([^\n<]+)/i);
      if (resultadoMatch && resultadoMatch[1]) {
        resultadoPrevisaoRaw = extractDateRange(resultadoMatch[1]) || extractDateRange(combinedText) || extractDateRange(combinedHtml);
      }

      // Heurística para resultado: procurar por dia próximo de 'Resultado' e completar com mês/ano se possível.
      if (!resultadoPrevisaoRaw) {
        const dayNearRes = combinedText.match(/Resultado[\s\S]{0,80}?(\d{1,2})/i);
        if (dayNearRes) {
          const day = Number(dayNearRes[1]);
          const monthYearAnywhere = combinedText.match(new RegExp(`(${['janeiro','fevereiro','marco','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'].join('|')})(?:[^\\d]*(\\d{4}))?`, 'i'));
          if (monthYearAnywhere) {
            const mm = monthIndex(monthYearAnywhere[1]);
            const yyyy = monthYearAnywhere[2] ? Number(monthYearAnywhere[2]) : new Date().getFullYear();
            if (mm >= 0) resultadoPrevisaoRaw = `${two(day)}/${two(mm + 1)}/${yyyy}`;
          }
        }
      }

      const resultadoPrevisao = formatLabel('Resultado', resultadoPrevisaoRaw);

      let status: EditalApiItem['status'] | undefined;
      const now = new Date();
      const deadline = parseLastDateInText(submissaoRaw);

      // Academic ordering: ABERTO -> EM AVALIACAO -> FECHADO
      // - aberto: submissao deadline is in the future
      // - em-avaliacao: submissao deadline passed but no result link (under evaluation)
      // - encerrado: closed (includes those with a result link or unknown state)
      if (deadline && deadline.getTime() >= now.getTime()) {
        status = 'aberto';
      } else if (deadline && deadline.getTime() < now.getTime() && !linkResultado) {
        status = 'em-avaliacao';
      } else {
        // either there's a result link, or we can't determine an in-progress state -> consider closed
        status = 'encerrado';
      }

      const statusLabel = status === 'aberto' ? 'ABERTO' : status === 'em-avaliacao' ? 'EM AVALIAÇÃO' : 'FECHADO';

      items.push({
        id: `edital-${numeroSeq}-${anoEncontrado}`,
        numero,
        titulo,
        linkEdital,
        linkResultado,
        publicacao,
        submissao,
        resultadoPrevisao,
        status,
        statusLabel,
      });
    });

    const seen = new Map<string, EditalApiItem>();
    for (const it of items) {
      if (!seen.has(it.numero)) seen.set(it.numero, it);
      else {
        const prev = seen.get(it.numero)!;
        if (!prev.linkEdital && it.linkEdital) seen.set(it.numero, it);
      }
    }

    const priority: Record<string, number> = {
      aberto: 0,
      'em-avaliacao': 1,
      encerrado: 2,
    } as Record<string, number>;

    const ordered = Array.from(seen.values()).sort((a, b) => {
      const pa = priority[a.status ?? 'encerrado'] ?? 99;
      const pb = priority[b.status ?? 'encerrado'] ?? 99;
      if (pa !== pb) return pa - pb;
      const na = parseInt(a.numero.match(/(\d+)/)?.[1] || '0', 10);
      const nb = parseInt(b.numero.match(/(\d+)/)?.[1] || '0', 10);
      return nb - na;
    });

    return ordered;
  }

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const resp = await fetch(FAPERJ_URL, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
        },
        cache: 'no-store',
      });
      if (!resp.ok) {
        res.status(502).json({ error: `Falha ao obter página (${resp.status})` });
        return;
      }
      const html = await resp.text();
      const data = extractEditais(html);

      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
      res.status(200).json({ total: data.length, items: data });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Erro inesperado' });
    }
  }

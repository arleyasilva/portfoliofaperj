#!/usr/bin/env node
const cheerio = require('cheerio');

const FAPERJ_URL = 'https://www.faperj.br/?id=28.5.7';

function two(n) { return n < 10 ? `0${n}` : String(n); }
function pad(s) {
  const parts = s.split('/').map(p => p.trim());
  if (parts.length !== 3) return s;
  return `${two(Number(parts[0]))}/${two(Number(parts[1]))}/${parts[2]}`;
}
function monthIndex(name) {
  const map = {
    janeiro:0, fevereiro:1, 'março':2, marco:2, abril:3, maio:4, junho:5, julho:6, agosto:7, setembro:8, outubro:9, novembro:10, dezembro:11
  };
  const key = name.normalize('NFD').replace(/\p{Diacritic}/gu, '');
  return map[key] ?? -1;
}

function extractDateRange(text) {
  if (!text) return undefined;
  const range = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})\s*(?:a|até|-)\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
  if (range) return `${pad(range[1])} a ${pad(range[2])}`;
  const single = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
  if (single) return pad(single[1]);

  const monthNames = 'janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro';
  const monthRange = new RegExp(`(\\d{1,2})\\s*(?:de)?\\s*(?:a|até|-)\\s*(\\d{1,2})\\s*(?:de)?\\s*(${monthNames})\\s*(?:de\\s*(\\d{4}))?`, 'i');
  const mRange = text.match(monthRange);
  if (mRange) {
    const day1 = Number(mRange[1]);
    const day2 = Number(mRange[2]);
    const month = monthIndex(mRange[3].toLowerCase());
    const year = mRange[4] ? Number(mRange[4]) : new Date().getFullYear();
    if (month >= 0) return `${two(day1)}/${two(month + 1)}/${year} a ${two(day2)}/${two(month + 1)}/${year}`;
  }
  const monthSingle = new RegExp(`(\\d{1,2})\\s*(?:de)?\\s*(${monthNames})\\s*(?:de\\s*(\\d{4}))?`, 'i');
  const mSingle = text.match(monthSingle);
  if (mSingle) {
    const day = Number(mSingle[1]);
    const month = monthIndex(mSingle[2].toLowerCase());
    const year = mSingle[3] ? Number(mSingle[3]) : new Date().getFullYear();
    if (month >= 0) return `${two(day)}/${two(month + 1)}/${year}`;
  }

  const isolatedDay = text.match(/(?:submiss[aã]o[^\d]*?:\s*de\s*)(\d{1,2})(?![\d\/])/i);
  if (isolatedDay) {
    const nearby = text.match(/(jan(?:eiro)?|fev(?:ereiro)?|mar(?:ço|co)?|abr(?:il)?|mai(?:o)?|jun(?:ho)?|jul(?:ho)?|ago(?:sto)?|set(?:embro)?|out(?:ubro)?|nov(?:embro)?|dez(?:embro)?)[^\d]*(\d{4})?/i);
    if (nearby) {
      const day = Number(isolatedDay[1]);
      const month = monthIndex(nearby[1].toLowerCase());
      const year = nearby[2] ? Number(nearby[2]) : new Date().getFullYear();
      if (month >= 0) return `${two(day)}/${two(month + 1)}/${year}`;
    }
  }
  return undefined;
}

function parseEditais(html, ano = 2025) {
  const $ = cheerio.load(html);
  const items = [];
  const editalRegex = new RegExp(`Edital\\s*FAPERJ\\s*N[ºo]\\s*([0-9]{1,2})\\/${ano}\\s*[\\u2013\\-]?\\s*(.*)`, 'i');

  $('a').each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    const href = $(el).attr('href') || '';
    if (!href.toLowerCase().includes('/rp/downloads/') && !text.match(editalRegex)) return;
    const match = text.match(editalRegex);
    if (!match) return;
    const numeroSeq = match[1];
    const titulo = match[2] ? match[2].trim() : '';
    const numero = `Nº ${numeroSeq}/${ano}`;
    const linkEdital = href.startsWith('http') ? href : new URL(href, FAPERJ_URL).toString();
    const block = $(el).parent();
    let cursor = block.next();
    let linkResultado;
    let publicacao;
    let submissao;
    let resultadoPrevisao;

    for (let i = 0; i < 12 && cursor.length; i++) {
      const t = cursor.text().replace(/\s+/g, ' ').trim();
      const combinedText = [block.text(), cursor.text(), cursor.next().text(), cursor.prev().text()].join(' ').replace(/\s+/g, ' ').trim();
      const combinedHtml = [block.html() || '', cursor.html() || '', cursor.next().html() || '', cursor.prev().html() || ''].join(' ');

      if (!publicacao) {
        if (/publicad/i.test(combinedText)) {
          const p = extractDateRange(combinedText) || extractDateRange(combinedHtml);
          if (p) publicacao = p;
        } else {
          const p = extractDateRange(combinedText) || extractDateRange(combinedHtml);
          if (p && !submissao && /submiss/i.test(combinedText) === false) publicacao = p;
        }
      }
      if (!submissao && /submiss/i.test(combinedText)) {
        const s = extractDateRange(combinedText) || extractDateRange(combinedHtml);
        if (s) submissao = s;
      }
      if (!resultadoPrevisao && /resultado/i.test(combinedText)) {
        const r = extractDateRange(combinedText) || extractDateRange(combinedHtml);
        if (r) resultadoPrevisao = r;
      }
      if (!linkResultado) {
        const aRes = cursor.find('a').filter(function() { return $(this).text().toLowerCase().includes('resultado'); }).first();
        if (aRes.length) {
          const hr = aRes.attr('href');
          if (hr) linkResultado = hr.startsWith('http') ? hr : new URL(hr, FAPERJ_URL).toString();
        }
      }
      if (combinedText.match(editalRegex)) break;
      cursor = cursor.next();
    }

    // derive status
    let status;
    const now = new Date();
    const deadline = parseDate(submissao);
    if (deadline && deadline.getTime() >= now.getTime()) {
      status = 'aberto';
    } else if (linkResultado) {
      status = 'resultado';
    } else if (deadline && deadline.getTime() < now.getTime()) {
      status = 'encerrado';
    }

    items.push({ id: `edital-${numeroSeq}-${ano}`, numero, titulo, linkEdital, linkResultado, publicacao, submissao, resultadoPrevisao, status });
  });

  // dedupe
  const seen = new Map();
  for (const it of items) {
    const key = it.numero;
    if (!seen.has(key)) seen.set(key, it);
    else {
      const prev = seen.get(key);
      if (!prev.linkEdital && it.linkEdital) seen.set(key, it);
    }
  }
  const ordered = Array.from(seen.values()).sort((a,b) => parseInt(a.numero.match(/(\d+)/)?.[1]||'0',10) - parseInt(b.numero.match(/(\d+)/)?.[1]||'0',10)).reverse();
  return ordered;
}

function parseDate(s) {
  if (!s) return undefined;
  const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return undefined;
  return new Date(Number(m[3]), Number(m[2]) -1, Number(m[1]), 23,59,59,999);
}

(async () => {
  try {
    console.log('Fetching', FAPERJ_URL);
    const res = await fetch(FAPERJ_URL, { headers: { 'user-agent': 'node-fetch' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    const data = parseEditais(html, 2025);
    console.log('Parsed', data.length, 'editais');
    console.log(JSON.stringify(data.slice(0,8), null, 2));
  } catch (e) {
    console.error('Error', e);
    process.exit(1);
  }
})();

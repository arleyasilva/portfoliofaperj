#!/usr/bin/env tsx
/*
  Atualiza o fallback estático de vídeos do YouTube em src/data/tripleColumn/videos.ts
  Busca os últimos vídeos do canal @FAPERJoficial via RSS (sem API key).
*/

import fs from 'node:fs';
import path from 'node:path';

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; FAPERJBot/1.0)'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function resolveChannelIdFromHandle(handle: string): Promise<string | null> {
  try {
    const html = await fetchText(`https://www.youtube.com/@${handle}`);
    const m = html.match(/"channelId":"([^"]+)"/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

async function resolveChannelIdViaOEmbed(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (!res.ok) return null;
    const data = await res.json() as { author_url?: string };
    if (!data.author_url) return null;
    const author = await fetchText(data.author_url);
    const m = author.match(/"channelId":"([^"]+)"/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function parseRss(xml: string, max: number) {
  const items: Array<{ title: string; url: string; publishedAt: string }> = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  const titleRegex = /<title>(.*?)<\/title>/;
  const videoIdRegex = /<yt:videoId>(.*?)<\/yt:videoId>/;
  const publishedRegex = /<published>(.*?)<\/published>/;

  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(xml)) && items.length < max) {
    const entry = m[1];
    const title = entry.match(titleRegex)?.[1] ?? '';
    const id = entry.match(videoIdRegex)?.[1] ?? '';
    const pub = entry.match(publishedRegex)?.[1] ?? '';
    if (!id) continue;
    items.push({
      title: title
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>'),
      url: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: pub,
    });
  }
  return items;
}

async function main() {
  const envId = process.env.YT_CHANNEL_ID?.trim();
  const handle = 'FAPERJoficial';
  let channelId = envId || await resolveChannelIdFromHandle(handle);
  if (!channelId) channelId = await resolveChannelIdViaOEmbed('CbX1BA_Eg7Y');
  let items: Array<{ title: string; url: string; publishedAt: string }> = [];

  if (channelId) {
    try {
      const rss = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
      items = parseRss(rss, 24);
    } catch {}
  }

  if (!items.length) {
    try {
      const rssUser = await fetchText(`https://www.youtube.com/feeds/videos.xml?user=${handle}`);
      items = parseRss(rssUser, 24);
    } catch {}
  }

  if (!items.length) throw new Error('Não foi possível obter vídeos (tente export YT_CHANNEL_ID=<id> antes de rodar)');
  if (!items.length) throw new Error('RSS não retornou itens');

  // Monta conteúdo TS
  const filePath = path.resolve('src/data/tripleColumn/videos.ts');
  const prev = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  const liveMatch = prev.match(/export const LIVE_EVENT:[\s\S]*?=\s*([^;]+);/);
  const liveValue = liveMatch?.[1]?.trim() ?? 'null';

  const arr = items.map(it => `  { title: ${JSON.stringify(it.title)}, url: ${JSON.stringify(it.url)} }`).join(',\n');

  const content = `// ======================================\n//  VÍDEOS — CANAL FAPERJ + EVENTO AO VIVO\n//  (arquivo gerado por scripts/updateVideos.ts)\n// ======================================\n\nexport interface YoutubeVideoItem {\n  title: string;\n  url: string;\n  isLive?: boolean;\n}\n\nexport const LIVE_EVENT: YoutubeVideoItem | null = ${liveValue};\n\nexport const RECENT_VIDEOS: YoutubeVideoItem[] = [\n${arr}\n];\n\n// Dica: para ativar um evento ao vivo, defina LIVE_EVENT com { title, url, isLive: true } e faça commit.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Atualizado ${filePath} com ${items.length} vídeos.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

import type { NextApiRequest, NextApiResponse } from 'next';

// Helper: fetch text with basic error handling
async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; FAPERJBot/1.0; +https://www.faperj.br)'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

// Try to resolve channelId from @handle by scraping the channel page
async function resolveChannelIdFromHandle(handle: string): Promise<string | null> {
  try {
    const channelPage = await fetchText(`https://www.youtube.com/@${handle}`);
    const match = channelPage.match(/"channelId":"([^"]+)"/);
    if (match && match[1]) return match[1];
  } catch {}
  return null;
}

// As a fallback, use a known video oEmbed to get author_url, then scrape that page
async function resolveChannelIdViaOEmbed(knownVideoId: string): Promise<string | null> {
  try {
    const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${knownVideoId}&format=json`);
    if (!oembedRes.ok) return null;
    const data = await oembedRes.json() as { author_url?: string };
    if (!data.author_url) return null;
    const authorHtml = await fetchText(data.author_url);
    const match = authorHtml.match(/"channelId":"([^"]+)"/);
    return match && match[1] ? match[1] : null;
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

  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(xml)) !== null && items.length < max) {
    const entry = match[1];
    const t = entry.match(titleRegex)?.[1] ?? '';
    const id = entry.match(videoIdRegex)?.[1] ?? '';
    const pub = entry.match(publishedRegex)?.[1] ?? '';
    if (id) {
      items.push({
        title: t
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
  }
  return items;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { max = '20' } = req.query;
  const maxResults = Math.max(1, Math.min(50, parseInt(String(max), 10) || 20));

  try {
    const handle = 'FAPERJoficial';
    let channelId = await resolveChannelIdFromHandle(handle);

    let items: Array<{ title: string; url: string; publishedAt: string }> = [];

    if (!channelId) {
      // fallback usando um vídeo conhecido do canal
      channelId = await resolveChannelIdViaOEmbed('CbX1BA_Eg7Y');
    }

    if (channelId) {
      const rss = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
      items = parseRss(rss, maxResults);
    }

    // último recurso: tentar feed por user (alguns canais ainda suportam)
    if (!items.length) {
      try {
        const rssUser = await fetchText(`https://www.youtube.com/feeds/videos.xml?user=${handle}`);
        items = parseRss(rssUser, maxResults);
      } catch {}
    }

    if (!items.length) {
      res.status(502).json({ error: 'Não foi possível obter vídeos do canal @FAPERJoficial' });
      return;
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || 'Erro interno' });
  }
}

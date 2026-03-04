#!/usr/bin/env node
const cheerio = require('cheerio');
const FAPERJ_URL = 'https://www.faperj.br/?id=28.5.7';

(async () => {
  try {
    console.log('Fetching', FAPERJ_URL);
    const res = await fetch(FAPERJ_URL, { headers: { 'user-agent': 'node-fetch' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    const $ = cheerio.load(html);

    const anchors = [];
    $('a').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g,' ');
      if (/Edital\s*FAPERJ\s*N[ºo]/i.test(text)) {
        anchors.push(el);
      }
    });

    console.log('Found', anchors.length, 'matching anchors (Edital FAPERJ)');
    for (let idx = 0; idx < Math.min(4, anchors.length); idx++) {
      const el = anchors[idx];
      const $el = $(el);
      console.log('\n--- Anchor #' + (idx+1) + ' ----');
      console.log('Anchor text:', $el.text().trim());
      console.log('Anchor href:', $el.attr('href'));

      const parent = $el.parent();
      console.log('\nParent tag:', parent[0].tagName);
      console.log('Parent HTML snippet:\n', parent.html().slice(0,1000));

      console.log('\nNext siblings HTML (up to 8):');
      let cursor = parent.next();
      for (let k=0; k<8 && cursor.length; k++) {
        console.log('--- sibling', k+1, 'tag=', cursor[0].tagName);
        const txt = cursor.text().replace(/\s+/g,' ').trim();
        console.log('text:', txt.slice(0,200));
        console.log('html snippet:', (cursor.html()||'').slice(0,400));
        cursor = cursor.next();
      }

      console.log('\nPrev siblings HTML (up to 3):');
      let prev = parent.prev();
      for (let k=0; k<3 && prev.length; k++) {
        console.log('--- prev', k+1, 'tag=', prev[0].tagName);
        console.log('text:', prev.text().replace(/\s+/g,' ').trim().slice(0,200));
        prev = prev.prev();
      }
    }

  } catch (e) {
    console.error('Error', e);
    process.exit(1);
  }
})();

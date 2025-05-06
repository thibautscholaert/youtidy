import { DomUtils, parseDocument } from 'htmlparser2';
import { WatchedVideo } from '@/types/yt-video-page';
import { DateTime } from 'luxon';

const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

self.onmessage = (event) => {
  const html = event.data;
  const videos = parseYouTubeWatchHistoryHtml(html);

  const batches = chunkArray(videos, 100);
  for (const batch of batches) {
    (self as any).postMessage({ type: 'batch', data: batch });
  }
  (self as any).postMessage({ type: 'done' });
};

function parseYouTubeWatchHistoryHtml(html: string): WatchedVideo[] {
  const document = parseDocument(html);
  const entries = DomUtils.getElementsByTagName('div', document.children, true).filter(
    (el) =>
      el.attribs?.class?.includes('content-cell') && el.attribs?.class?.includes('mdl-cell--6-col')
  );
  // .slice(0, 10);

  const history: WatchedVideo[] = [];

  for (const entry of entries) {
    const links = DomUtils.getElementsByTagName('a', [entry]);
    const videoLink = links[0];
    const channelLink = links[1];

    const brs = DomUtils.getElementsByTagName('br', [entry]);
    let timeText = '';
    if (brs.length > 0) {
      const lastBr = brs[brs.length - 1];
      const next = lastBr.next;
      if (next && next.type === 'text') {
        timeText = next.data.trim();
      }
    }

    const parsedDate = parseLocalizedDate(timeText);
    const isoTime = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : '';

    const videoUrl = videoLink?.attribs?.href || '';
    const videoId = videoUrl.includes('watch?v=')
      ? new URL(videoUrl).searchParams.get('v')
      : videoUrl.split('/').pop();

    const channelUrl = channelLink?.attribs?.href || '';
    const channelIdMatch = channelUrl.match(/\/(channel|user|c)\/([^/?]+)/);
    const channelId = channelIdMatch ? channelIdMatch[2] : undefined;

    if (isoTime && videoId && channelId) {
      history.push({
        title: DomUtils.textContent(videoLink),
        url: videoUrl,
        videoId,
        channelName: DomUtils.textContent(channelLink),
        channelUrl,
        channelId,
        time: isoTime,
      });

      if (history.length % 100 === 0) {
        console.log(`Parsed ${history.length} videos`);
        (self as any).postMessage({ type: 'parsed', data: history.length });
      }
    }
  }

  return history;
}

function parseLocalizedDate(input: string, locale = 'fr') {
  // 1. Extract the timezone
  const tzAbbr = input.match(/\b[A-Z]{2,4}\b$/)?.[0] || 'CEST';

  // 2. Clean the string (remove the timezone)
  const cleaned = input.replace(/\b[A-Z]{2,4}\b$/, '').trim();

  // 3. Map abbreviation to IANA time zone
  const zoneMap: Record<string, string> = {
    CEST: 'Europe/Paris',
    CET: 'Europe/Paris',
    PST: 'America/Los_Angeles',
    EST: 'America/New_York',
  };

  const zone = zoneMap[tzAbbr] || 'UTC';

  // 4. Parse
  const dt = DateTime.fromFormat(cleaned, 'd LLLL yyyy, HH:mm:ss', {
    locale: 'fr',
    zone,
  });

  return dt.toJSDate();
}

import { DateTime } from 'luxon';
import { WatchedVideo, YoutubeVideoPage } from '@/types/yt-video-page';
import { createClient } from '../supabase/client';
import { handleGoogleSignIn } from '../auth';
import { parseLocalizedDate } from '../utils';

export async function getLikedVideos(nextToken?: string): Promise<YoutubeVideoPage | null> {
    const supabase = createClient();
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error || !session?.provider_token) {
        console.error('No Google access token available');
        handleGoogleSignIn();
        return null;
    }

    const googleAccessToken = session.provider_token;

    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&maxResults=50';
    if (nextToken) {
        url += `&pageToken=${nextToken}`;
    }
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${googleAccessToken}`,
        },
    });

    if (!res.ok) {
        console.error('Failed to fetch liked videos:', await res.text());
        if (res.status === 403) {
            handleGoogleSignIn();
        }
        return null;
    }

    const data = await res.json();
    return data; // tableau de vidéos likées
}

export function parseYouTubeWatchHistoryHtml(html: string): WatchedVideo[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const entries = doc.querySelectorAll(
        'div.content-cell.mdl-cell.mdl-cell--6-col.mdl-typography--body-1'
    );
    // .values()
    // .take(100);

    const history: WatchedVideo[] = [];

    entries.forEach((entry) => {
        const anchorTags = entry.querySelectorAll('a');

        const videoLink = anchorTags[0];
        const channelLink = anchorTags.length > 1 ? anchorTags[1] : null;
        if (videoLink && channelLink) {
            // 🧠 Find the last <br> and get the next text node (usually the time string)
            const brTags = entry.querySelectorAll('br');
            let timeText = '';
            if (brTags.length > 0) {
                const lastBr = brTags[brTags.length - 1];
                const nextNode = lastBr.nextSibling;
                if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
                    timeText = nextNode.textContent?.trim() || '';
                }
            }

            let isoTime = '';

            const parsedDate = parseLocalizedDate(timeText);
            if (!isNaN(parsedDate.getTime())) {
                isoTime = parsedDate.toISOString();
            }

            const videoUrl = videoLink?.href || '';
            const videoId = videoUrl.includes('watch?v=')
                ? new URL(videoUrl).searchParams.get('v')
                : videoUrl.split('/').pop();

            const channelUrl = channelLink?.href || '';
            const channelIdMatch = channelUrl.match(/\/(channel|user|c)\/([^/?]+)/);
            const channelId = channelIdMatch ? channelIdMatch[2] : undefined;

            if (isoTime) {
                history.push({
                    title: videoLink.textContent || '',
                    url: videoUrl,
                    videoId: videoId || undefined,
                    channelName: channelLink?.textContent || undefined,
                    channelUrl: channelUrl || undefined,
                    channelId,
                    time: isoTime,
                });
            }
        }
    });

    return history;
}

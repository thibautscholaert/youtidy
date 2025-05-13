import { YoutubeVideoPage } from '@/types/yt-video-page';
import { handleGoogleSignIn } from '../auth';

export async function getLikedVideos(
    googleAccessToken: string,
    nextToken?: string
): Promise<YoutubeVideoPage | null> {
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
        if ([401, 403].includes(res.status) && res.status) {
            handleGoogleSignIn();
        }
        return null;
    }

    const data = await res.json();
    return data; // tableau de vidéos likées
}

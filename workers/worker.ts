import { getLikedVideos } from '@/lib/youtube/youtube';
self.onmessage = async (event) => {
  const { accessToken, pageToken } = event.data;

  const data = await getLikedVideos(accessToken, pageToken)

  let nextPageToken = data?.nextPageToken;

  if (data) {
    (self as any).postMessage({ type: 'batch', data });
    if (data.nextPageToken) {
      nextPageToken = await fetchLikedVideos(accessToken, data.nextPageToken);
    } else {
      nextPageToken = undefined;
    }
  }
  console.log('nextPageToken', nextPageToken);

  (self as any).postMessage({ type: 'done', data: nextPageToken });
};

const fetchLikedVideos = async (accessToken: string, nextToken: string, iteration = 1) => {
  console.log('nextToken', nextToken);
  if (nextToken && iteration < 5) {
    const data = await getLikedVideos(accessToken, nextToken);
    if (data) {
      (self as any).postMessage({ type: 'batch', data });
      if (data.nextPageToken) {
        return fetchLikedVideos(accessToken, data.nextPageToken, iteration + 1);
      } else {
        return undefined;
      }
    }
  }
  console.log('nextToken', nextToken);
  return nextToken;
};

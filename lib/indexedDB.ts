import { WatchedVideo } from '@/types/yt-video-page';
import { openDB } from 'idb';

export async function initDB() {
  return await openDB('videosDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('videos')) {
        const store = db.createObjectStore('videos', {
          autoIncrement: true,
        });
        store.createIndex('channelIdIndex', 'channelId'); // Create an index on channelId
        store.createIndex('videoIdIndex', 'videoId'); // Create an index on channelId
      }
    },
  });
}

export async function cleanDB() {
  const db = await initDB();
  const tx = db.transaction('videos', 'readwrite');
  const store = tx.objectStore('videos');

  // Clear the object store
  await store.clear();
  await tx.done;
}

export const getAllVideos = async () => {
  const db = await initDB();
  const tx = db.transaction('videos', 'readonly');
  const store = tx.objectStore('videos');

  // Use the `getAll()` method to fetch all records
  const allVideos: WatchedVideo[] = await store.getAll();
  await tx.done;

  console.log('All videos:', allVideos);
  return allVideos;
};

export const getVideosGroupedByVideoId = (allVideos: WatchedVideo[]) => {
  // Group by videoId
  const grouped = allVideos.reduce(
    (acc: Record<string, { count: number; video: WatchedVideo }>, video) => {
      if (!video.videoId) return acc;

      if (!acc[video.videoId]) {
        acc[video.videoId] = {
          video: video,
          count: 1,
        };
      } else {
        acc[video.videoId].count += 1;
      }

      return acc;
    },
    {}
  );

  // Convert grouped object to an array (optional)
  const groupedArray = Object.values(grouped);

  console.log('Grouped videos:', groupedArray);
  return groupedArray;
};

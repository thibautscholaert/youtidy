'use client';

import { parseYouTubeWatchHistoryHtml } from '@/lib/youtube/youtube';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { openDB } from 'idb';
import { initDB } from '@/lib/indexedDB';
import { WatchedVideo } from '@/types/yt-video-page';

export default function HtmlUploader() {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileContent(reader.result);
      }
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/html': ['.html'] },
    multiple: false,
  });

  const handleParse = async () => {
    const videos: WatchedVideo[] = parseYouTubeWatchHistoryHtml(fileContent);

    const db = await initDB();

    const chunkArray = (arr: any[], size: number) => {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    };

    // Split the videos array into chunks of 100
    const chunkedVideos = chunkArray(videos, 100);

    // Start a transaction for the database
    const tx = db.transaction('videos', 'readwrite');

    const store = tx.objectStore('videos');

    // Clear the store before inserting new videos
    await store.clear();

    // Insert videos in chunks
    for (const chunk of chunkedVideos) {
      const insertPromises = chunk.map((video) => store.put(video));
      await Promise.all(insertPromises); // Wait for all insertions in this chunk to complete
    }

    // Wait for the transaction to finish
    await tx.done;
    console.log('Videos stored in IndexedDB:', videos);
  };

  return (
    <div className="p-4 bg-white/10 rounded-lg shadow-md space-y-4 text-white">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md cursor-pointer transition ${
          isDragActive ? 'border-yellow-400 bg-yellow-100/10' : 'border-white/20'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-center">
          {isDragActive
            ? 'Drop the HTML file here...'
            : 'Click or drag your YouTube Watch History .html file here'}
        </p>
      </div>

      {fileContent && (
        <div>
          <h4 className="font-bold mb-2">Loaded: {fileName}</h4>
          {/* <pre className="max-h-64 overflow-auto p-3 bg-black/30 rounded text-sm whitespace-pre-wrap">
            {fileContent.slice(0, 500000)}
            {fileContent.length > 100000 && '...'}
          </pre> */}
          <button
            className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4 w-fit"
            onClick={handleParse}
          >
            Parse
          </button>
        </div>
      )}
    </div>
  );
}

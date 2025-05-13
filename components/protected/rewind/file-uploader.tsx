'use client';

import { cleanDB, initDB } from '@/lib/indexedDB';
import { createParserWorker } from '@/lib/utils';
import { IDBPDatabase } from 'idb';
import {
  CheckCircle2Icon,
  DownloadCloudIcon,
  ExternalLinkIcon,
  Loader2Icon,
  RocketIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function HtmlUploader({
  onUploaded,
  onUpload,
}: {
  onUploaded: () => void;
  onUpload: () => void;
}) {
  const [parsed, setParsed] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState<string>('');
  const [parsedCount, setParsedCount] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setParsed(false);
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

  const workerRef = useRef<Worker>();

  useEffect(() => {
    const worker = createParserWorker();
    workerRef.current = worker;

    const dbInstancePromise: Promise<IDBPDatabase<any>> = initDB();

    worker.onmessage = async (e) => {
      const dbInstance = await dbInstancePromise;
      if (e.data.type === 'batch') {
        const batch = e.data.data;
        const tx = dbInstance.transaction('videos', 'readwrite');
        const store = tx.objectStore('videos');

        for (const video of batch) {
          // console.log('Storing video:', video);
          try {
            await store.put(video);
          } catch (err) {
            console.error('IndexedDB insert failed:', err, video);
          }
        }

        await tx.done;
        console.log(`Stored batch of ${batch.length} videos`);
      } else if (e.data.type === 'parsed') {
        setParsedCount(e.data.data);
      } else if (e.data.type === 'done') {
        console.log('Parsing terminé');
        setIsWorking(false);
        setParsed(true);
        onUploaded();
      }
    };

    return () => {
      worker.terminate();
    };
  }, [onUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/html': ['.html'] },
    multiple: false,
  });

  const handleParse = async () => {
    if (!fileContent || !workerRef.current) return;
    setParsedCount(0);
    setIsWorking(true);
    onUpload();
    await cleanDB();
    workerRef.current.postMessage(fileContent);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white/10 rounded-lg shadow-md text-white w-80">
      <a
        className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4 w-fit"
        href="https://takeout.google.com/settings/takeout/custom/youtube"
        target="_blank"
      >
        <DownloadCloudIcon className="w-6 h-6 inline" />
        <span className="">Google takeout</span>
        <ExternalLinkIcon className="w-6 h-6 inline" />
      </a>
      <div
        {...getRootProps()}
        className={`flex items-center p-6 border-2 border-dashed rounded-md cursor-pointer transition h-32 w-full ${
          isDragActive ? 'border-yellow-400 bg-yellow-100/10' : 'border-white/20'
        }`}
      >
        <input {...getInputProps()} disabled={isWorking} />
        <p className="text-center">
          {isDragActive
            ? 'Drop the HTML file here...'
            : 'Click or drag your YouTube Watch History .html file here. It should be in history/watch-history.html'}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        {fileContent ? (
          <h4 className="font-semibold mb-2">Loaded: {fileName}</h4>
        ) : (
          <h4 className="font-semibold mb-2">No file loaded</h4>
        )}
        <button
          className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4 w-fit w-60"
          onClick={handleParse}
          disabled={isWorking || parsed || !fileContent}
        >
          {isWorking ? (
            <>
              <span>Processed {parsedCount}</span>
              <Loader2Icon className="animate-spin h-6 w-6 inline" />
            </>
          ) : parsed ? (
            <>
              <span>File parsed</span>
              <CheckCircle2Icon className="h-6 w-6 text-green-600 inline" />
            </>
          ) : (
            <>
              <span>{`Let's go`}</span>
              <RocketIcon className="h-6 w-6 inline" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

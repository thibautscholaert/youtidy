'use client';

import { Item } from '@/types/yt-video-page';
import { motion } from 'framer-motion';

export default function VideoPreview({ video }: { video: Item }) {
  return (
    <motion.a
      className="flex flex-wrap items-center justify-center relative rounded overflow-hidden cursor-pointer shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
    >
      <motion.img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="h-full rounded shadow-md"
        whileHover={{ filter: 'brightness(1.2) drop-shadow(0 0 15px #00f2ff)' }}
        transition={{ duration: 0.3 }}
        // width={320}
        // height={180}
      />

      {/* Info overlay */}
      <motion.div
        className="absolute h-full bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm opacity-0 group-hover:opacity-100 flex flex-col justify-end"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="font-semibold">{video.snippet.title}</div>
        <div className="text-xs text-gray-300">{video.snippet.channelTitle}</div>
      </motion.div>
    </motion.a>
  );
}

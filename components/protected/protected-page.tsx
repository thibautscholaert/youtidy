'use client';
import { getLikedVideos } from '@/lib/youtube/youtube';
import { useEffect, useState } from 'react';

export function ProtectedPage() {


  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    getLikedVideos().then((videos) => {
      if (videos) {
        setVideos(videos);
      } else {
        console.error('Failed to fetch liked videos');
      }
    });
  }, []);


  return (

    <div className="relative bg-white/10 dark:bg-white/10 rounded-3xl overflow-hidden py-16">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 p-4 glass-card">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 pl-8 pr-4 bg-white/30 text-white placeholder-white/80 rounded-md border border-white/20"
                  placeholder="Search..."
                />
                <svg
                  className="absolute left-2 top-2.5 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-2 text-sm font-medium text-white/70">Categories</div>
              <ul className="space-y-3 text-white">
                {['Music', 'Entertainment', 'Gaming', 'Education', 'Vlogs', 'Tech', 'Sports', 'News & Politics', 'DIY & Crafts', 'Documentaries'].map((cat, i) => (
                  <li key={cat} className="flex items-center">
                    <input type="checkbox" defaultChecked={i % 3 === 1} className="h-4 w-4 mr-2 accent-[#FFE066]" />
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gradient mb-4">Playlists</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Recent Favorites', 'Nostalgia soundz', 'League of Legends', 'Funny compilations', 'Epic Fails', 'Piano', 'Workout Music', 'Gaming Highlights', 'Tech Reviews', 'Throwback Classics'].map((title, index) => (
                  <div key={title} className="p-4 glass-card">
                    <div className="font-semibold text-white">{title}</div>
                    <div className="text-sm text-white/70">{(index + 1) + 2 * 10 - (index + 1) * 3 + 97 * (index % 3 + 1) - 7 * index} videos</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gradient mb-4">Installed</h2>
              <div className="space-y-4">
                {['2013', '2015'].map((year, index) => (
                  <div key={year} className="flex items-center gap-4 p-4 glass-card">
                    <div className="w-16 h-12 bg-white/20 rounded-md"></div>
                    <div>
                      <div className="font-semibold text-white">{year}</div>
                      <div className="text-sm text-white/70">{(index + 4) + 2 * 10 - (index + 4) * 3 + 15 * 10 + (index + 4) * 153} videos from {year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

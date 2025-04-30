'use client';
import { categoriesMap } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';
import { getLikedVideos } from '@/lib/youtube/youtube';
import { Item } from '@/types/yt-video-page';
import classNames from 'classnames';
import { CheckCircle, RocketIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export function ProtectedPage() {

  const [allvideos, setAllVideos] = useState<Item[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const [googleAccessToken, setGoogleAccessToken] = useState<string | null | undefined>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setGoogleAccessToken(session.provider_token);
      }
    });
  }, []);

  const filteredVideos = useMemo(() => {
    let filtered = allvideos;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((video) => selectedCategories.includes(video.snippet.categoryId));
    }

    if (selectedTag) {
      filtered = filtered.filter((video) => video.snippet.tags?.includes(selectedTag));
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((video) =>
        video.snippet.title.toLowerCase().includes(lowerQuery) ||
        video.snippet.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;

  }, [allvideos, setSelectedCategories, selectedTag, query]);

  const groupedByYear = useMemo(() => {
    const grouped = filteredVideos.reduce((acc: Record<string, Item[]>, video) => {
      const year = new Date(video.snippet.publishedAt).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(video);
      return acc;
    }, {});

    return Object.entries(grouped).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }
  , [filteredVideos]);

  const selectCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== categoryId));
    } else {
      setSelectedCategories((prev) => [...prev, categoryId]);
    }
  }

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTag(null);
    setQuery(null);
  }

  const tags = useMemo(() => {
    const all = allvideos.flatMap((video) => video.snippet.tags || []).filter((tag) => tag.length > 2);
    const unique = Array.from(new Set(all));
    return unique.map((i) => ({
      name: i,
      count: all.filter((t) => t === i).length,
    }));
  }, [allvideos]);

  const categories = useMemo(() => {
    const all = allvideos.flatMap((video) => video.snippet.categoryId);
    const unique = Array.from(new Set(all));
    return unique.map((i) => ({
      id: i,
      name: categoriesMap[i.toString()] || i,
      count: all.filter((t) => t === i).length,
    }));
  }, [allvideos]);

  const triggerFetchLikedVideos = async () => {
    setFetching(true);
    const data = await getLikedVideos();
    if (data) {
      setAllVideos(data.items);
      if (data.nextPageToken) {
        await fetchLikedVideos(data.nextPageToken);
      }
    }
    setFetching(false);
  }

  const fetchLikedVideos = async (nextToken: string, iteration = 0) => {
    if (nextToken && iteration < 5) {
      const data = await getLikedVideos(nextToken);
      if (data) {
        setAllVideos((prev) => [...prev, ...data.items]);
        if (data.nextPageToken) {
          return fetchLikedVideos(data.nextPageToken, iteration + 1);
        }
      }
    }
  }

  return (
    <div className="relative bg-white/10 dark:bg-white/10 rounded-3xl overflow-hidden py-16">
      <div className="p-6 md:p-8 flex flex-col gap-8">
        {googleAccessToken && (
          <div className='flex flex-col gap-4 items-center'>
            <div className='bg-green-600 p-2 rounded-md flex items-center gap-2 w-fit'>
              <span>Access to Youtube</span> <CheckCircle className='inline-block w-6 h-6 text-green-300' />
            </div>

            <button 
            className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4 w-fit" 
            onClick={() => triggerFetchLikedVideos()}
            disabled={fetching}
            >
              <RocketIcon className='w-5 h-5 inline' />
              <span className="text-lg">Fetch liked videos</span>
            </button>
          </div>
        )}

        {filteredVideos && filteredVideos.length > 0 &&
          (
            <>
             <div className='flex flex-wrap gap-2 sm:gap-4 items-center justify-center'>
              {/* <button onClick={resetFilters} className="flex items-center gap-2 p-2 glass-card w-fit">
                <div className="font-semibold text-white">All videos</div>
                <div className="text-sm bg-[#FFE066] text-black px-2 py-1 rounded-full"><strong>{allvideos.length}</strong> videos</div>
              </button> */}

              <hr className="w-full border-t border-white/20" />

              <div className='grid grid-flow-col grid-rows-2 gap-2 sm:gap-4 items-center overflow-x-auto p-4'>
              <button onClick={resetFilters} className="flex items-center gap-2 p-2 glass-card w-fit">
                <div className="font-semibold text-white">All videos</div>
                <div className="text-sm bg-[#FFE066] text-black px-2 py-1 rounded-full"><strong>{allvideos.length}</strong> videos</div>
              </button>
                {categories.sort((a, b) => b.count - a.count).map((i) => (
                  <button key={i.name} 
                  className={classNames("flex items-center justify-between gap-2 p-2 glass-card",
                    
                  )}
                  onClick={() => selectCategory(i.id)}>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm bg-[#FFE066] text-black px-2 py-1 rounded-full"><strong>{i.count}</strong> videos</div>
                  </button>
                ))}
              </div>

              <hr className="w-full border-t border-white/20" />

              <div className="flex flex-wrap items-center gap-4 overflow-x-auto p-4">
              {groupedByYear.map(([year, videos]) => (
                <div key={year} className="flex flex-col gap-4 shrink-0 w-64 p-4 glass-card">
                  <h2 className="text-2xl font-bold text-gradient mb-4">{year}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <span>{videos.length} Videos</span>
                    {/* {videos.map((video) => (
                      <div key={video.id} className="p-4 glass-card">
                        <div className="font-semibold text-white">{video.snippet.title}</div>
                        <div className="text-sm text-white/70">{video.snippet.description}</div>
                      </div>
                    ))} */}
                  </div>
                </div>
              ))}
              </div>

              {/* <div className='grid grid-flow-col grid-rows-2 gap-2 sm:gap-4 items-center overflow-x-auto'>
                {tags.sort((a, b) => b.count - a.count).map((tag) => (
                  <button key={tag.name} className="flex items-center gap-2 p-2 glass-card justify-bewteen w-48" onClick={() => setSelectedTag(tag.name)}>
                    <div className="font-semibold text-white">{tag.name}</div>
                    <div className="text-sm bg-[#FFE066] text-black px-2 py-1 rounded-full"><strong>{tag.count}</strong> videos</div>
                  </button>
                ))}
              </div> */}
            </div>

            <hr className="w-full border-t border-white/20" />

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
            </>
          )}
      </div>
    </div>
  );
}

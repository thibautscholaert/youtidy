'use client';
import { getAllVideos, getVideosGroupedByVideoId } from '@/lib/indexedDB';
import { WatchedVideo } from '@/types/yt-video-page';
import classNames from 'classnames';
import { Loader2Icon, ScanSearchIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import FilterBar from '../filter-bar';
import HtmlUploader from './file-uploader';

export function RewindPage() {
  const filterBlockClass = 'flex flex-wrap gap-2 items-center justify-center p-1';

  const filterButtonClass =
    'flex items-center justify-between gap-2 px-1 py-0.5 glass-card text-sm';

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [allVideos, setAllVideos] = useState<WatchedVideo[]>([]);
  const [selectedReleaseYears, setSelectedReleaseYears] = useState<string[]>([]);
  const amountOfVideos = 50;
  const [videosCountDisplayed, setVideosCountDisplayed] = useState<number>(amountOfVideos);
  const [query, setQuery] = useState<string>('');
  const [excludeQuery, setExcludeQuery] = useState<string>('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsFetching(true);
    const allVideos = await getAllVideos();
    setAllVideos(allVideos);
    setIsFetching(false);
  };

  const onUploaded = async () => {
    init();
    setIsUploading(false);
  };

  const onUpload = async () => {
    setIsUploading(true);
  };

  const groupedByYear = useMemo(() => {
    const grouped: Record<string, WatchedVideo[]> = allVideos.reduce(
      (acc: Record<string, WatchedVideo[]>, video: WatchedVideo) => {
        const year = new Date(video.time).getFullYear().toString();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(video);
        return acc;
      },
      {}
    );

    return Object.entries(grouped).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }, [allVideos]);

  const filteredVideos = useMemo(() => {
    let filtered = allVideos;

    if (selectedReleaseYears.length > 0) {
      filtered = filtered.filter((video) =>
        selectedReleaseYears.includes(new Date(video.time).getFullYear().toString())
      );
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((video) => video.title.toLowerCase().includes(lowerQuery));
    }

    if (excludeQuery) {
      const lowerQuery = excludeQuery.toLowerCase();
      filtered = filtered.filter((video) => !video.title.toLowerCase().includes(lowerQuery));
    }

    return filtered;
  }, [allVideos, selectedReleaseYears, query, excludeQuery]);

  const analyzeVideos = async () => {
    // TODO
  };

  const groupedById = useMemo(() => {
    return getVideosGroupedByVideoId(filteredVideos);
  }, [filteredVideos]);

  const videoIds = useMemo(() => {
    return groupedById.map((video) => video.video.videoId);
  }, [groupedById]);

  return (
    <div className="relative bg-white/10 dark:bg-white/10 rounded-3xl overflow-hidden py-16">
      <div className="p-2 md:p-4 flex flex-col items-center justify-center gap-4">
        <HtmlUploader onUploaded={onUploaded} onUpload={onUpload}></HtmlUploader>
        <hr className="w-full border-t border-white/20" />
        <button
          className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4 w-fit"
          onClick={() => analyzeVideos()}
          disabled={isFetching || isUploading}
        >
          {isFetching ? (
            <>
              <span>Fetching videos...</span>
              <Loader2Icon className="animate-spin h-6 w-6 inline" />
            </>
          ) : (
            <>
              <span>Analyze {allVideos.length} videos</span>
              <ScanSearchIcon className="w-6 h-6 inline" />
            </>
          )}
        </button>
        <hr className="w-full border-t border-white/20" />
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <FilterBar
            // ref={filterRef}
            onSearch={(val) => {
              setQuery(val);
            }}
          />
          <FilterBar
            // ref={filterRef}
            // classname="text-red-500"
            inputClassname="bg-red-500/80"
            placeholder="Exclude"
            onSearch={(val) => {
              setExcludeQuery(val);
            }}
          />
        </div>
        <hr className="w-full border-t border-white/20" />

        {isFetching ? (
          <Loader2Icon className="animate-spin h-16 w-16 inline my-20" />
        ) : (
          <>
            <div className={filterBlockClass}>
              {groupedByYear.map(([year, videos]) => (
                <button
                  disabled={isFetching || isUploading}
                  key={year}
                  className={classNames(filterButtonClass, {
                    'bg-[#FFE066] text-black': selectedReleaseYears.includes(year),
                    'text-white': !selectedReleaseYears.includes(year),
                  })}
                  onClick={() => {
                    setSelectedReleaseYears((prev) => {
                      if (prev.includes(year)) {
                        return prev.filter((y) => y !== year);
                      } else {
                        return [...prev, year];
                      }
                    });
                  }}
                >
                  <div className="font-semibold">{year}</div>
                  <div className="text-xs bg-[#FFE066] text-black px-2 py-1 rounded-full">
                    <strong>{videos.length}</strong>
                  </div>
                </button>
              ))}
            </div>

            {allVideos.length > 0 && (
              <>
                <hr className="w-full border-t border-white/20" />
                <div className={filterBlockClass}>
                  <h2>Last watched</h2>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {groupedById
                      .sort(
                        (a, b) =>
                          new Date(b.video.time).getTime() - new Date(a.video.time).getTime()
                      )
                      .slice(0, videosCountDisplayed)
                      .map((video) => (
                        <a
                          key={video.video.videoId}
                          href={video.video.url}
                          target="_blank"
                          className="flex items-center gap-2 sm:gap-4 px-1 py-0.5 glass-card text-sm"
                        >
                          <div className="font-semibold text-white">{video.video.title}</div>
                          <div className="text-xs bg-[#FFE066] text-black px-2 py-1 rounded-full">
                            <strong>{video.video.time}</strong>
                          </div>
                        </a>
                      ))}
                  </div>
                  <button
                    className="retro-button-accent flex items-center justify-center gap-2 p-2 w-fit mx-auto px-4 my-8"
                    onClick={() => {
                      setVideosCountDisplayed((prev) => prev + amountOfVideos);
                    }}
                    disabled={isFetching || isUploading || videosCountDisplayed >= allVideos.length}
                  >
                    <div className="font-semibold">More</div>
                  </button>
                </div>

                <hr className="w-full border-t border-white/20" />

                <div className={filterBlockClass}>
                  <h2>Most watched</h2>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {groupedById
                      .sort((a, b) => b.count - a.count)
                      .slice(0, videosCountDisplayed)
                      .map((video) => (
                        <a
                          key={video.video.videoId}
                          href={video.video.url}
                          target="_blank"
                          className="flex items-center gap-2 sm:gap-4 px-1 py-0.5 glass-card text-sm"
                        >
                          <div className="font-semibold text-white">{video.video.title}</div>
                          <div className="text-xs bg-[#FFE066] text-black px-2 py-1 rounded-full">
                            <strong>{video.count}</strong>
                          </div>
                        </a>
                      ))}
                  </div>
                  <button
                    className="retro-button-accent flex items-center justify-center gap-2 p-2 w-fit mx-auto px-4 my-8"
                    onClick={() => {
                      setVideosCountDisplayed((prev) => prev + amountOfVideos);
                    }}
                    disabled={isFetching || isUploading || videosCountDisplayed >= allVideos.length}
                  >
                    <div className="font-semibold">More</div>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

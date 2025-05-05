export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage?: string;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YoutubeVideoPage {
  kind: string;
  etag: string;
  items: Item[];
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface WatchedVideo {
  title: string;
  url: string;
  videoId: string;
  channelName?: string;
  channelUrl?: string;
  channelId: string;
  time: string;
}

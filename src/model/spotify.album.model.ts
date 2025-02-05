export type SpotifyResultAlbumModel = {
  albums: AlbumsModel;
};

export type AlbumsModel = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: number;
  total: number;
  items: ItemResultAlbumModel[];
};

export type ItemResultAlbumModel = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ItemExternalUrlsModel;
  href: string;
  isAdded?: boolean;
  id: string;
  images: ItemImageModel[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: ItemArtistsModel[];
};

export type ItemImageModel = {
  height: number;
  url: string;
  width: number;
};

export type ItemArtistsModel = {
  external_urls: ItemExternalUrlsModel;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ItemExternalUrlsModel = {
  spotify: string;
};

export type MeAlbumsModel = {
  href: string;
  items: MeItemAlbumModel[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
};

export type MeItemAlbumModel = {
  added_at: string;
  album: MeAlbumModel;
};

export type MeAlbumModel = {
  album_type: string;
  total_tracks: number;
  is_playable: boolean;
  external_urls: AlbumExternalUrlsModel;
  href: string;
  id: string;
  images: AlbumImageModel[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: ArtistByAlbumModel[];
  tracks: MeAlbumTracksModel;
  copyrights: MeAlbumCopyrightModel[];
  external_ids: MeAlbumExternalIdsModel;
  genres: string[];
  label: string;
  popularity: number;
};

export type AlbumImageModel = {
  url: string;
  height: number;
  width: number;
};

export type ArtistByAlbumModel = {
  external_urls: AlbumExternalUrlsModel;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type MeAlbumTracksModel = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: MeAlbumTrackItemModel[];
};

export type MeAlbumTrackItemModel = {
  artists: MeAlbumTrackArtistModel[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: AlbumExternalUrlsModel;
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type MeAlbumTrackArtistModel = {
  external_urls: AlbumExternalUrlsModel;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type MeAlbumCopyrightModel = {
  text: string;
  type: string;
};

export interface MeAlbumExternalIdsModel {
  upc: string;
}

export type AlbumExternalUrlsModel = {
  spotify: string;
};

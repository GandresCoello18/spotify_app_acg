export type ArtistsModel = {
  external_urls: ArtistsExternalUrlsModel;
  followers: ArtistFollowersModel;
  genres: string[];
  href: string;
  id: string;
  images: ArtistImageModel[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ArtistsExternalUrlsModel = {
  spotify: string;
};

export type ArtistFollowersModel = {
  href: string | null;
  total: number;
};

export type ArtistImageModel = {
  url: string;
  height: number;
  width: number;
};

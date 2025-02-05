import { BASE_URL_API_SPOTIFY } from './index.api';
import { SpotifyResultAlbumModel } from '@/model/spotify.album.model';

export const getSearchAlbum = async (options: {
  token: string;
  artist: string;
  limit: number;
  offset: number;
}) => {
  const { token, artist, limit, offset } = options;
  const response = await fetch(
    `${BASE_URL_API_SPOTIFY}/v1/search?q=${encodeURIComponent(`remaster artist:${artist}`)}&type=album&limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as SpotifyResultAlbumModel;
};

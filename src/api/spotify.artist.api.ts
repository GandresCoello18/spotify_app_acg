import { ArtistsModel } from '@/model/spotify.artist.model';
import { BASE_URL_API_SPOTIFY } from './index.api';

export const getArtistById = async (options: {
  token: string;
  artistId: string;
}) => {
  const { token, artistId } = options;
  const response = await fetch(
    `${BASE_URL_API_SPOTIFY}/v1/artists/${artistId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as ArtistsModel;
};

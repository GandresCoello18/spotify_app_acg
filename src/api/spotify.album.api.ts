import { MeAlbumsModel } from '@/model/spotify.me.album.model';
import { BASE_URL_API_SPOTIFY } from './index.api';
import { AlbumsModel } from '@/model/spotify.album.model';

export const getAlbumsByArtist = async (options: {
  token: string;
  artistId: string;
  limit: number;
  offset: number;
}) => {
  const { token, artistId, limit, offset } = options;
  const response = await fetch(
    `${BASE_URL_API_SPOTIFY}/v1/artists/${artistId}/albums?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as AlbumsModel;
};

export const getMeAlbums = async (options: {
  token: string;
  limit: number;
  offset: number;
}) => {
  const { token, limit, offset } = options;
  const response = await fetch(
    `${BASE_URL_API_SPOTIFY}/v1/me/albums?limit=${limit}&offset=${offset}&market=ES`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as MeAlbumsModel;
};

export const getMeSavedAlbums = async (options: {
  token: string;
  ids: string[];
}) => {
  const { token, ids } = options;
  const response = await fetch(
    `${BASE_URL_API_SPOTIFY}/v1/me/albums/contains?ids=${ids.join(',')}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as boolean[];
};

export const AddAlbum = async (options: { token: string; ids: string[] }) => {
  const { token, ids } = options;
  await fetch(`${BASE_URL_API_SPOTIFY}/v1/me/albums`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  return true;
};

export const RemoveAlbum = async (options: {
  token: string;
  ids: string[];
}) => {
  const { token, ids } = options;
  await fetch(`${BASE_URL_API_SPOTIFY}/v1/me/albums`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  return true;
};

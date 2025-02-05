import { TokenSpotify } from '@/model/spotify.authorization.model';
import { URL_REDIRECT_CALLBACK_SPOTIFY } from '@/utils/url';
import { BASE_URL_SPOTIFY_ACCOUNT } from './index.api';

export const BASE_URL_SPOTIFY_AUTHORIZE = `${BASE_URL_SPOTIFY_ACCOUNT}/authorize?`;
export const BASE_URL_SPOTIFY = `${BASE_URL_SPOTIFY_ACCOUNT}/api/token`;

export const getAccessTokenSpotify = async (options: { code: string }) => {
  const { code } = options;
  const response = await fetch(BASE_URL_SPOTIFY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: URL_REDIRECT_CALLBACK_SPOTIFY,
    }),
  });

  return (await response.json()) as TokenSpotify;
};

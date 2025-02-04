import { TokenSpotify } from "@/model/spotify.model";
import { URL_REDIRECT_CALLBACK_SPOTIFY } from "@/utils/url";

export const BASE_URL_SPOTIFY_AUTHORIZE = 'https://accounts.spotify.com/authorize?';
export const BASE_URL_SPOTIFY = 'https://accounts.spotify.com/api/token';

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

  return await response.json() as TokenSpotify;
};

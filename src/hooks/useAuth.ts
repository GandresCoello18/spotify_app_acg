import {
  COOKIE_NAME_SPOTIFY_TOKEN,
  COOKIE_NAME_SPOTIFY_TOKEN_EXPIRATION,
} from '@/utils/storage-names';
import { getCookie, removeCookie } from 'react-use-cookie';

const useAuth = () => {
  const userToken = getCookie(COOKIE_NAME_SPOTIFY_TOKEN, '') as string;

  const expiration = getCookie(COOKIE_NAME_SPOTIFY_TOKEN_EXPIRATION);
  if (!expiration || Date.now() > parseInt(expiration, 10)) {
    removeCookie(COOKIE_NAME_SPOTIFY_TOKEN);
    removeCookie(COOKIE_NAME_SPOTIFY_TOKEN_EXPIRATION);
    return { isAuthenticated: false, userToken: '' };
  }

  return { isAuthenticated: !!userToken, userToken };
};

export default useAuth;

/* eslint-disable react-hooks/exhaustive-deps */
import { COOKIE_NAME_SPOTIFY_TOKEN, COOKIE_NAME_SPOTIFY_TOKEN_EXPIRATION } from '@/utils/storage-names';
import { useEffect } from 'react';
import { setCookie } from 'react-use-cookie';
import { useNavigate } from 'react-router-dom';
import { getAccessTokenSpotify } from '@/api/spotify.api';
import useAuth from '@/hooks/useAuth';

const SpotifyCallbackPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const fetchAccessToken = async (code: string) => {
    const data = await getAccessTokenSpotify({ code });
    
    if (!data?.access_token) return navigate('/search');

    const expirationTime = Date.now() + data.expires_in * 1000; // 1 hora de vida
    setCookie(COOKIE_NAME_SPOTIFY_TOKEN_EXPIRATION, expirationTime.toString(), { days: 1 });
    setCookie(COOKIE_NAME_SPOTIFY_TOKEN, data.access_token, { days: 1 });
    navigate('/search');
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/search');
    if (code) fetchAccessToken(code);
  }, [code, isAuthenticated]);

  return (
    <div className='flex justify-center items-center h-screen'>
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Cargando...</span>
    </div>
  );
};

export default SpotifyCallbackPage;

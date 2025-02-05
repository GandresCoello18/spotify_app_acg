import { BASE_URL_SPOTIFY_AUTHORIZE } from '@/api/spotify.authorization.api';
import { ArrowRightSvg } from '@/components/svg/arrow-right.svg';
import { SvgInclinedArrow } from '@/components/svg/inclined-arrow.svg';
import { URL_REDIRECT_CALLBACK_SPOTIFY } from '@/utils/url';

const LoginPage = () => {
  const handleLoginWithSpotify = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = URL_REDIRECT_CALLBACK_SPOTIFY;
    const scopes = [
      'user-read-email',
      'user-library-modify',
      'user-library-read',
      'user-read-private',
    ];

    const authUrl =
      BASE_URL_SPOTIFY_AUTHORIZE +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes.join(' '))}`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-primary px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-8">
          <SvgInclinedArrow />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col items-start md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Disfruta de la <span className="text-secondary">mejor música</span>
          </h1>
          <p className="text-gray-400 mb-6 text-md md:text-base">
            Accede a tu cuenta para guardar tus álbumes favoritos
          </p>

          <button
            onClick={handleLoginWithSpotify}
            type="button"
            className="text-white hover:text-gray-300 cursor-pointer flex items-center gap-2"
          >
            Log in con Spotify
            <span className="inline-block">
              <ArrowRightSvg />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

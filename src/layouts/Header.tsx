import { BrightnessSvg } from '@/components/svg/brightness .svg';
import { ExitSvg } from '@/components/svg/exit.svg';
import useAuth from '@/hooks/useAuth';
import { removeCookie } from 'react-use-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COOKIE_NAME_SPOTIFY_TOKEN } from '@/utils/storage-names';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleRemoveToken = () => {
    removeCookie(COOKIE_NAME_SPOTIFY_TOKEN);
    navigate('/');
  };

  return (
    <header className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold flex gap-2">
        <span>🎵</span>
        <span className="hidden md:block">Spotify App</span>
      </Link>

      {isAuthenticated ? (
        <nav className="flex items-center">
          <Link
            to="/search"
            className={`mx-2 ${location.pathname === '/search' ? 'text-secondary' : ''}`}
          >
            Buscar
          </Link>
          <Link
            to="/my-albums"
            className={`mx-2 ${location.pathname === '/my-albums' ? 'text-secondary' : ''}`}
          >
            Mis álbumes
          </Link>
          <span className="mx-4">|</span>
          <span className="mx-2 p-1 cursor-pointer">
            <span className="block md:hidden" onClick={handleRemoveToken}>
              <ExitSvg />
            </span>
            <span className="hidden md:block" onClick={handleRemoveToken}>
              Cerrar sesión
            </span>
          </span>
          <div className="block md:hidden flex items-center">
            <span className="mx-4">|</span>
            <span className="mx-2 p-1 cursor-pointer">
              <BrightnessSvg />
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;

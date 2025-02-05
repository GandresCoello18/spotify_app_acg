import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/login/login';
import SearchPage from '@/pages/search/search';
import SpotifyCallbackPage from '@/pages/callback/callback.spotify';
import ArtistDetailsPage from '@/pages/artist/artist-details';
import NotFound from '@/pages/not-found/NotFound';
import ProtectedRoute from './ProtectedRoute';
import MyAlbumsPage from '@/pages/album/my-albums';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
            <Route path="/my-albums" element={<MyAlbumsPage />} />
          </Route>
          <Route path="/callback" element={<SpotifyCallbackPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;

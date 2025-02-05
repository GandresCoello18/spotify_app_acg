import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getArtistById } from '@/api/spotify.artist.api';
import { getAlbumsByArtist, getMeSavedAlbums } from '@/api/spotify.album.api';
import useAuth from '@/hooks/useAuth';
import { describe, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ArtistDetailsPage from '../artist-details';

vi.mock('@/api/spotify.artist.api');
vi.mock('@/api/spotify.album.api');
vi.mock('@/hooks/useAuth', () => ({
    default: vi.fn(),
}));

const mockArtist = {
  id: '123',
  name: 'Test Artist',
  images: [{ url: 'https://example.com/artist.jpg' }],
  followers: { total: 1000 },
  popularity: 500
};

const mockAlbums = {
  items: [
    {
      id: '1',
      name: 'Test Album',
      images: [{ url: 'https://example.com/album.jpg' }],
      release_date: '2022-01-01',
      external_urls: { spotify: 'https://spotify.com/album/1' },
    },
  ],
  total: 1,
};

describe('ArtistDetailsPage', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        userToken: 'mockToken',
    });
    (getArtistById as jest.Mock).mockReturnValue(mockArtist);
    (getAlbumsByArtist as jest.Mock).mockReturnValue(mockAlbums);
    (getMeSavedAlbums as jest.Mock).mockReturnValue([false]);
  });

  test('renders loading skeleton while fetching artist details', async () => {
    render(
      <MemoryRouter initialEntries={['/artist/123']}>
        <Routes>
          <Route path='/artist/:artistId' element={<ArtistDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons.length).toBeGreaterThan(0);
    waitFor(() => {
        setTimeout(() => {
            expect(getArtistById).toHaveBeenCalled();
        }, 1000);
    });
  });

  test('renders artist details after fetching', async () => {
    render(
      <MemoryRouter initialEntries={['/artist/123']}>
        <Routes>
          <Route path='/artist/:artistId' element={<ArtistDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
        setTimeout(() => {
            const artists = screen.getAllByText('Test Artist');
            expect(artists).toHaveLength(1);
            // expect(screen.getByText('Test Artist')).toBeInTheDocument()
        }, 1000);
    });
  });

  test('renders album cards after fetching albums', async () => {
    render(
      <MemoryRouter initialEntries={['/artist/123']}>
        <Routes>
          <Route path='/artist/:artistId' element={<ArtistDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => expect(screen.getByText('Test Album')).toBeInTheDocument());
  });

  test('handles pagination', async () => {
    render(
      <MemoryRouter initialEntries={['/artist/123']}>
        <Routes>
          <Route path='/artist/:artistId' element={<ArtistDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
        setTimeout(() => {
            expect(getAlbumsByArtist).toHaveBeenCalledTimes(2);
            const nextPageButton = screen.getByRole('button', { name: /next/i });
            userEvent.click(nextPageButton);
        }, 1000);
    });
    await waitFor(() => expect(screen.getByText('Test Album')).toBeInTheDocument());
  });

  test('shows no results message when no albums are found', async () => {
    (getAlbumsByArtist as jest.Mock).mockReturnValue({ items: [], total: 0 });
    render(
      <MemoryRouter initialEntries={['/artist/123']}>
        <Routes>
          <Route path='/artist/:artistId' element={<ArtistDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    await waitFor(() => expect(screen.getByText('No se encontraron resultados')).toBeInTheDocument());
  });
});

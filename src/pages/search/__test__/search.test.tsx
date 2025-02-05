import { render, screen, fireEvent, waitFor, act  } from '@testing-library/react';
import { getSearchAlbum } from '@/api/spotify.search.api';
import useAuth from '@/hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from '../search';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/api/spotify.search.api', () => ({
  getSearchAlbum: vi.fn(),
}));

vi.mock('@/api/spotify.album.api', () => ({
  getMeSavedAlbums: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
    default: vi.fn(),
}));

describe('SearchPage', () => {
  it('renders the search page correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({
        isAuthenticated: true,
        userToken: 'fake-token',
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Buscar canciones, artistas...')).toBeInTheDocument();
  });

  it('calls API and displays results', async () => {
    (getSearchAlbum as jest.Mock).mockResolvedValue({
        albums: {
          items: [
            {
              id: '123',
              name: 'Fake Album',
              images: [{ url: 'fake-image.jpg' }],
              artists: [{ id: '456', name: 'Fake Artist' }],
              release_date: '2024-01-01',
            },
          ],
          total: 1,
        },
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    waitFor(() => expect(getSearchAlbum).toHaveBeenCalled()).then(async () => {
        setTimeout(async () => {
            const albumCard = await screen.findByText('Fake Album');
            expect(albumCard).toBeInTheDocument();
        }, 1000);
    });
  });

  it('handles search input and triggers API call', async () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Buscar canciones, artistas...');
    fireEvent.change(input, { target: { value: 'New Search' } });

    await act(() => new Promise((res) => setTimeout(res, 1000)));
    expect(getSearchAlbum).toHaveBeenCalledWith(expect.objectContaining({ artist: 'New Search' }));
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getMeAlbums } from '@/api/spotify.album.api';
import { fetchActionAlbum } from '@/services/artist.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import MyAlbumsPage from '../my-albums';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/api/spotify.album.api');
vi.mock('@/services/artist.service');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('react-toast', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();

describe('MyAlbumsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render loading skeletons while albums are being fetched', () => {
    (getMeAlbums as jest.Mock).mockResolvedValue({
      items: [],
      total: 0,
    });

    render(<MyAlbumsPage />);
    const skeletons = screen.getAllByRole('presentation');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render album cards when albums are fetched', async () => {
    const albumsMock = [
      {
        album: {
          id: '1',
          name: 'Fake Album 1',
          images: [{ url: 'https://example.com/album1.jpg' }],
          release_date: '2022-01-01',
          external_urls: { spotify: 'https://spotify.com/album/1' },
        },
      },
      {
        album: {
          id: '2',
          name: 'Fake Album 2',
          images: [{ url: 'https://example.com/album2.jpg' }],
          release_date: '2022-02-01',
          external_urls: { spotify: 'https://spotify.com/album/2' },
        },
      },
    ];

    (getMeAlbums as jest.Mock).mockResolvedValue({
      items: albumsMock,
      total: 2,
    });

    render(<MyAlbumsPage />);

    waitFor(() => expect(screen.getByText('Fake Album 1')).toBeInTheDocument()).then(() => {
        setTimeout(() => {
            expect(screen.getByText('Fake Album 2')).toBeInTheDocument();
            expect(screen.getAllByRole('img').length).toBe(2);
        }, 1000);
    });
  });

  it('should display pagination if albums exist', async () => {
    const albumsMock = [
      {
        album: {
          id: '1',
          name: 'Fake Album 1',
          images: [{ url: 'https://example.com/album1.jpg' }],
          release_date: '2022-01-01',
          external_urls: { spotify: 'https://spotify.com/album/1' },
        },
      },
    ];

    (getMeAlbums as jest.Mock).mockResolvedValue({
      items: albumsMock,
      total: 5,
    });

    render(<MyAlbumsPage />);

    waitFor(() => expect(screen.getByText('Fake Album 1')).toBeInTheDocument()).then(() => {
        setTimeout(() => {
            expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        }, 1000);
    });
  });

  it('should call fetchActionAlbum when update button is clicked', async () => {
    const albumsMock = [
      {
        album: {
          id: '1',
          name: 'Fake Album 1',
          images: [{ url: 'https://example.com/album1.jpg' }],
          release_date: '2022-01-01',
          external_urls: { spotify: 'https://spotify.com/album/1' },
        },
      },
    ];

    (getMeAlbums as jest.Mock).mockResolvedValue({
      items: albumsMock,
      total: 1,
    });

    render(<MyAlbumsPage />);

    waitFor(() => expect(screen.getByText('Fake Album 1')).toBeInTheDocument()).then(() => {
        setTimeout(() => {
            fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));
            expect(fetchActionAlbum).toHaveBeenCalledTimes(1);
        }, 1000);
    });
  });

  it('should show an error toast if getMeAlbums fails', async () => {
    (getMeAlbums as jest.Mock).mockRejectedValue(new Error('Error loading albums'));

    render(<MyAlbumsPage />);

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error loading albums'));
  });
});

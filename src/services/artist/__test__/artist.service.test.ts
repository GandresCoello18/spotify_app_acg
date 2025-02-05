import { RemoveAlbum, AddAlbum } from '@/api/spotify.album.api';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchActionAlbum } from '../artist.service';

vi.mock('@/api/spotify.album.api', () => ({
  RemoveAlbum: vi.fn(),
  AddAlbum: vi.fn(),
}));

describe('fetchActionAlbum', () => {
  const mockOptions = {
    userToken: 'mockToken',
    albumId: 'mockAlbumId',
    isAdded: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe agregar el álbum cuando isAdded es false', async () => {
    (AddAlbum as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await fetchActionAlbum(mockOptions);

    expect(AddAlbum).toHaveBeenCalledWith({
      token: 'mockToken',
      ids: ['mockAlbumId'],
    });
    expect(result).toBe(true);
  });

  it('debe remover el álbum cuando isAdded es true', async () => {
    (RemoveAlbum as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await fetchActionAlbum({ ...mockOptions, isAdded: true });

    expect(RemoveAlbum).toHaveBeenCalledWith({
      token: 'mockToken',
      ids: ['mockAlbumId'],
    });
    expect(result).toBe(true);
  });

  it('debe manejar errores al agregar un álbum', async () => {
    const mockError = new Error('Error al agregar álbum');
    (AddAlbum as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await fetchActionAlbum(mockOptions);
    expect(result).toBe(false);
  });

  it('debe manejar errores al remover un álbum', async () => {
    const mockError = new Error('Error al remover álbum');
    (RemoveAlbum as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await fetchActionAlbum({ ...mockOptions, isAdded: true });
    expect(result).toBe(false);
  });
});

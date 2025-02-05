import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMeAlbums, getMeSavedAlbums } from '../spotify.album.api';
import { BASE_URL_API_SPOTIFY } from '../index.api';

describe('getMeSavedAlbums', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar un array de booleanos cuando la API responde correctamente', async () => {
    const mockResponse = [true, false, true];
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await getMeSavedAlbums({
      token: 'mockToken',
      ids: ['album1', 'album2', 'album3'],
    });

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL_API_SPOTIFY}/v1/me/albums/contains?ids=album1,album2,album3`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer mockToken',
        },
      },
    );

    expect(result).toEqual(mockResponse);
  });

  it('debe lanzar un error si fetch falla', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(
      getMeSavedAlbums({ token: 'mockToken', ids: ['album1'] }),
    ).rejects.toThrow('Network Error');

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('getMeAlbums', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar los álbumes guardados cuando la API responde correctamente', async () => {
    const mockResponse = {
      items: [
        { album: { id: '1', name: 'Album 1' } },
        { album: { id: '2', name: 'Album 2' } },
      ],
      total: 2,
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await getMeAlbums({
      token: 'mockToken',
      limit: 10,
      offset: 0,
    });

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL_API_SPOTIFY}/v1/me/albums?limit=10&offset=0&market=ES`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer mockToken',
        },
      },
    );

    expect(result).toEqual(mockResponse);
  });

  it('debe lanzar un error si fetch falla', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(
      getMeAlbums({ token: 'mockToken', limit: 10, offset: 0 }),
    ).rejects.toThrow('Network Error');

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

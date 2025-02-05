import { getArtistById } from '@/api/spotify.artist.api';
import { AlbumCard, AlbumUpdateAction } from '@/components/album/AlbumCard';
import { Pagination } from '@/components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toast';
import useAuth from '@/hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { ArtistsModel } from '@/model/spotify.artist.model';
import { ArtistDetail } from '@/components/artists/detail/ArtistDetail';
import { ArtistSkeleton } from '@/components/artists/detail/ArtistDetailSkeleton';
import { getAlbumsByArtist, getMeSavedAlbums } from '@/api/spotify.album.api';
import { ItemResultAlbumModel } from '@/model/spotify.album.model';
import { AlbumCardSkeleton } from '@/components/album/AlbumCardSkeleton';
import { NoResults } from '@/components/NoResults';
import { fetchActionAlbum } from '@/services/artist/artist.service';

const ArtistDetailsPage = () => {
  const navigate = useNavigate();
  const { userToken } = useAuth();
  const { artistId } = useParams<{ artistId: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [artist, setArtist] = useState<ArtistsModel | null>(null);
  const [albums, setAlbums] = useState<ItemResultAlbumModel[]>([]);

  const fetchDetailsArtist = useCallback(async () => {
    setLoading(true);

    try {
      const artist = await getArtistById({
        token: userToken,
        artistId: artistId as string,
      });
      setArtist(artist || null);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        navigate('/404');
      }
    } finally {
      setLoading(false);
    }
  }, [userToken, artistId, navigate]);

  const fetchAlbumsByArtist = useCallback(async () => {
    setLoading(true);
    const limit = 8;
    const offset = currentPage > 1 ? (currentPage - 1) * limit : 0;

    try {
      const { items, total } = await getAlbumsByArtist({
        token: userToken,
        artistId: artistId as string,
        limit,
        offset,
      });

      const ids = items.map((item) => item.id) || [];
      const isSaved = await getMeSavedAlbums({ token: userToken, ids });
      const updateAlbum = items.map((item) => ({
        ...item,
        isAdded: isSaved[items.indexOf(item)],
      }));

      setAlbums(updateAlbum || []);
      setPages(total ? Math.round(total / limit) : 1);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        navigate('/404');
      }
    } finally {
      setLoading(false);
    }
  }, [userToken, artistId, currentPage, navigate]);

  useEffect(() => {
    fetchDetailsArtist();
  }, [fetchDetailsArtist]);

  useEffect(() => {
    fetchAlbumsByArtist();
  }, [fetchAlbumsByArtist]);

  const handleUpdateAlbum = (paramsClick: AlbumUpdateAction) => {
    fetchActionAlbum({ userToken, ...paramsClick });
    fetchAlbumsByArtist();
  };

  return (
    <div className="min-h-screen bg-primary px-4">
      <section className="p-6 flex w-full justify-center">
        {loading ? (
          <ArtistSkeleton />
        ) : (
          artist && <ArtistDetail artist={artist} />
        )}
      </section>

      <section className="mt-5 p-2 w-full flex justify-center">
        <div className="mt-5 text-white max-w-4xl w-full">
          <div className="mb-5">
            <span className="ml-3 text-gray-400">
              Guarda tus álbumes favoritos de{' '}
              <span className="font-bold">{artist?.name}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? ['0', '1', '2', '3'].map((item) => (
                  <AlbumCardSkeleton key={item} />
                ))
              : albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    id={album.id}
                    image={album.images[0].url}
                    name={album.name}
                    isAdded={album.isAdded}
                    published={album.release_date}
                    openUrlSpotify={album.external_urls.spotify}
                    handleClick={(paramsClick) =>
                      handleUpdateAlbum(paramsClick)
                    }
                  />
                ))}
          </div>

          {!loading && !albums.length ? <NoResults /> : null}

          {albums.length ? (
            <div className="my-5 p-2 flex justify-start">
              <Pagination
                currentPage={currentPage}
                totalPages={pages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetailsPage;

import { getMeAlbums } from '@/api/spotify.album.api';
import { AlbumCard, AlbumUpdateAction } from '@/components/album/AlbumCard';
import { AlbumCardSkeleton } from '@/components/album/AlbumCardSkeleton';
import { Pagination } from '@/components/Pagination';
import useAuth from '@/hooks/useAuth';
import { MeItemAlbumModel } from '@/model/spotify.me.album.model';
import { fetchActionAlbum } from '@/services/artist.service';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';

const MyAlbumsPage = () => {
  const { userToken } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [albums, setAlbums] = useState<MeItemAlbumModel[]>([]);

  const fetchMeAlbums = useCallback(async () => {
    setLoading(true);
    const limit = 8;
    const offset = currentPage > 1 ? (currentPage - 1) * limit : 0;

    try {
      const { items, total } = await getMeAlbums({
        token: userToken as string,
        limit,
        offset,
      });
      setAlbums(items || []);
      setPages(total ? Math.round(total / limit) : 1);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        navigate('/search');
      }
    } finally {
      setLoading(false);
    }
  }, [userToken, currentPage, navigate]);

  useEffect(() => {
    fetchMeAlbums();
  }, [fetchMeAlbums]);

  const handleUpdateAlbum = (paramsClick: AlbumUpdateAction) => {
    fetchActionAlbum({ userToken, ...paramsClick });
    fetchMeAlbums();
  };

  return (
    <div className="min-h-screen bg-primary px-4">
      <section className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2 p-2 text-start md:text-center md:mt-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-10">
            Mis álbumes
            <span className="text-secondary block">guardados</span>
          </h1>

          <span className="text-gray-400 max-w-lg">
            Disfruta de tu música a un solo click y descubre que discos has
            guardado dentro de "mis álbumes"
          </span>
        </div>
      </section>

      <section className="mt-5 p-2 w-full flex justify-center">
        <div className="mt-5 text-white max-w-4xl w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? ['0', '1', '2', '3'].map((item) => (
                  <AlbumCardSkeleton key={item} />
                ))
              : albums.map((album) => (
                  <AlbumCard
                    key={album.album.id}
                    id={album.album.id}
                    image={album.album.images[0].url}
                    name={album.album.name}
                    isAdded
                    published={album.album.release_date}
                    openUrlSpotify={album.album.external_urls.spotify}
                    handleClick={(paramsClick) =>
                      handleUpdateAlbum(paramsClick)
                    }
                  />
                ))}
          </div>

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

export default MyAlbumsPage;

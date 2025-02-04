import { AlbumCard } from '@/components/album/AlbumCard';
import { Pagination } from '@/components/Pagination';

const MyAlbumsPage = () => {
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
          <div className="mb-5">
            <span className="ml-3 text-gray-400">
              Guarda tus álbumes favoritos de{' '}
              <span className="font-bold">Bad Bunny</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                id: '1',
                name: 'Bad Bunny',
                imagen:
                  'https://images.pexels.com/photos/30496890/pexels-photo-30496890.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
                follow: 10,
              },
              {
                id: '2',
                name: 'Bad Bunny',
                imagen:
                  'https://images.pexels.com/photos/30468566/pexels-photo-30468566/free-photo-of-alfombras-de-colores-vivos-secandose-en-un-tejado-marroqui.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
                follow: 10,
              },
              {
                id: '3',
                name: 'Bad Bunny',
                imagen:
                  'https://images.pexels.com/photos/30337353/pexels-photo-30337353/free-photo-of-calles-de-niza.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
                follow: 10,
              },
              {
                id: '4',
                name: 'Bad Bunny',
                imagen:
                  'https://images.pexels.com/photos/1601505/pexels-photo-1601505.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
                follow: 10,
              },
            ].map((artist) => (
              <AlbumCard
                isAdded={!false}
                key={artist.id}
                image={artist.imagen}
                name={artist.name}
                published="2023/02/14"
              />
            ))}
          </div>

          <div className="my-5 p-2 flex justify-start">
            <Pagination
              currentPage={1}
              totalPages={50}
              onPageChange={(page) => console.log('page ', page)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAlbumsPage;

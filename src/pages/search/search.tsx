import { ArtistCard } from '@/components/artists/ArtistCard';
import { Pagination } from '@/components/Pagination';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-primary px-4">
      <section className="flex flex-col justify-center items-center">
        <div className="w-full md:w-1/2 p-2 text-start md:text-center md:mt-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-10">
            Busca tus
            <span className="text-secondary block">artistas</span>
          </h1>

          <span className="text-gray-400 max-w-lg">
            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda
            tus álbumes favoritos
          </span>
        </div>

        <div className="relative w-full max-w-lg mt-6">
          <input
            type="text"
            placeholder="Buscar canciones, artistas..."
            className="w-full py-3 pl-4 pr-12 rounded-full bg-white text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button className="absolute right-3 top-1/2 font-bold px-5 transform -translate-y-1/2 bg-secondary text-black p-2 rounded-full hover:bg-secondary/80">
            Search
          </button>
        </div>
      </section>

      <section className="mt-5 p-2 w-full flex justify-center">
        <div className="mt-5 text-white">
          <div className="mb-5">
            <span>
              Mostrando <span className="font-bold">4</span> resultados de{' '}
              <span className="font-bold">100</span>
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
              <Link to={`/artist/${artist.id}`} key={artist.id}>
                <ArtistCard
                  key={artist.id}
                  image={artist.imagen}
                  name={artist.name}
                  followers={artist.follow}
                />
              </Link>
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

export default SearchPage;

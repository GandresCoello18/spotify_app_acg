import { AlbumCard } from '@/components/album/AlbumCard';
import { Pagination } from '@/components/Pagination';
import { CheckCircleSvg } from '@/components/svg/check.circle.svg';

const ArtistDetailsPage = () => {
  const followers = 45000000;
  const listeners = 23000000;

  return (
    <div className="min-h-screen bg-primary px-4">
      <section className="p-6 flex w-full justify-center">
        <div className="flex flex-col sm:flex-row items-start gap-6 max-w-4xl w-full">
          <img
            src="https://images.pexels.com/photos/1601505/pexels-photo-1601505.jpeg"
            alt="Bad Bunny"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
          />

          <div className="text-white">
            <div className="flex items-center gap-2 text-secondary text-lg">
              <CheckCircleSvg />
              <span className="text-white">Artista certificado</span>
            </div>

            <h1 className="text-3xl font-bold mt-2">Bad Bunny</h1>

            <div className="mt-4">
              <p className="text-gray-400 text-md mt-2">
                <span className="font-bold">
                  Followers: {followers.toLocaleString()}
                </span>
              </p>

              <p className="text-gray-400 text-md">
                <span className="font-bold">
                  Oyentes mensuales: {listeners.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
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

export default ArtistDetailsPage;

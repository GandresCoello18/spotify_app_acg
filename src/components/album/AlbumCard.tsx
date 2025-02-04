import { DashSvg } from '../svg/dash.svg';
import { PlusSvg } from '../svg/plus.svg';

type AlbumCardProps = {
  image: string;
  name: string;
  published: string;
  isAdded?: boolean;
};

export const AlbumCard = ({
  image,
  name,
  published,
  isAdded,
}: AlbumCardProps) => {
  return (
    <div className="p-4 transition-colors duration-300 bg-primary rounded-lg hover:bg-secondary cursor-pointer text-white hover:text-black">
      <img
        src={image}
        alt={name}
        className="object-fill w-full sm:w-48 h-48 rounded-lg mb-4"
      />
      <div className="px-2">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <span className="text-sm">Publicado: {published.toLocaleString()}</span>

        <button
          className={`block mt-6 cursor-pointer border-1 font-bold px-3 transform -translate-y-1/2 ${isAdded ? 'bg-[#E3513D] hover:bg-[#E3513D]/80' : 'bg-secondary hover:bg-secondary/80'} text-black py-1 rounded-full`}
        >
          {isAdded ? (
            <span className="flex items-center">
              <DashSvg /> Remove album
            </span>
          ) : (
            <span className="flex items-center">
              <PlusSvg /> Add album
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

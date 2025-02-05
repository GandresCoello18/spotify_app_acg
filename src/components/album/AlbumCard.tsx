import { DashSvg } from '../svg/dash.svg';
import { PlusSvg } from '../svg/plus.svg';

export type AlbumUpdateAction = { albumId: string; isAdded: boolean };
type AlbumCardProps = {
  id: string;
  image: string;
  name: string;
  published: string;
  isAdded?: boolean;
  hrefUrl?: string;
  openUrlSpotify?: string;
  handleClick: (options: AlbumUpdateAction) => void;
};

export const AlbumCard = ({
  id,
  image,
  name,
  published,
  isAdded,
  hrefUrl,
  openUrlSpotify,
  handleClick,
}: AlbumCardProps) => {
  return (
    <div className="p-4 transition-colors duration-300 bg-primary rounded-lg hover:bg-secondary cursor-pointer text-white hover:text-black max-w-xs">
      <a
        href={hrefUrl || openUrlSpotify || '#'}
        target={openUrlSpotify ? '_blank' : ''}
      >
        <img
          src={image}
          alt={name}
          className="object-fill w-full rounded-lg mb-4"
        />
      </a>
      <div className="px-2">
        <h3 className="text-md font-bold mb-4" title={name}>
          {name}
        </h3>
        <span className="text-sm">Publicado: {published.toLocaleString()}</span>

        <button
          className={`block mt-6 cursor-pointer border-1 font-bold px-3 transform -translate-y-1/2 ${isAdded ? 'bg-[#E3513D] hover:bg-[#E3513D]/80' : 'bg-secondary hover:bg-secondary/80'} text-black py-1 rounded-full`}
          onClick={() => handleClick({ albumId: id, isAdded: !!isAdded })}
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

type ArtistCardProps = {
  image: string;
  name: string;
  followers: number;
};

export const ArtistCard = ({ image, name, followers }: ArtistCardProps) => {
  return (
    <div className="p-4 transition-colors duration-300 bg-primary rounded-lg hover:bg-secondary cursor-pointer text-white hover:text-black">
      <img
        src={image}
        alt={name}
        className="object-fill w-full sm:w-48 h-48 rounded-lg mb-4"
      />
      <div className="px-2">
        <h3 className="text-2xl font-bold mb-4">{name}</h3>
        <span className="text-sm">Followers: {followers.toLocaleString()}</span>
      </div>
    </div>
  );
};

export const AlbumCardSkeleton = () => {
  return (
    <div
      className="p-4 bg-primary rounded-lg animate-pulse"
      role="presentation"
    >
      <div
        className="w-full sm:w-48 h-48 bg-gray-700 rounded-lg mb-4"
        data-testid="album-image-placeholder"
      ></div>
      <div className="px-2">
        <div
          className="h-5 bg-gray-600 rounded w-3/4 mb-4"
          data-testid="album-title-placeholder"
        ></div>
        <div
          className="h-4 bg-gray-600 rounded w-1/2 mb-6"
          data-testid="album-artist-placeholder"
        ></div>
        <div
          className="h-8 bg-gray-700 rounded-full w-32"
          data-testid="album-button-placeholder"
        ></div>
      </div>
    </div>
  );
};

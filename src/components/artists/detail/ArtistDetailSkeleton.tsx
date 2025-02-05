export const ArtistSkeleton = () => {
  return (
    <section className="p-6 flex w-full justify-center" role="section">
      <div className="flex flex-col sm:flex-row items-start gap-6 max-w-4xl w-full">
        <div
          data-testid="artist-image"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-700 animate-pulse"
          role="presentation"
        ></div>

        <div className="w-full">
          <div className="flex items-center gap-2 text-lg">
            <div
              data-testid="artist-icon"
              className="w-5 h-5 bg-gray-700 animate-pulse rounded-full"
              role="presentation"
            ></div>
            <div
              data-testid="artist-name"
              className="w-40 h-5 bg-gray-700 animate-pulse rounded"
              role="presentation"
            ></div>
          </div>

          <div
            data-testid="artist-info-1"
            className="w-60 h-8 bg-gray-700 animate-pulse rounded mt-2"
            role="presentation"
          ></div>

          <div className="mt-4">
            <div
              data-testid="artist-info-2"
              className="w-48 h-5 bg-gray-700 animate-pulse rounded mt-2"
              role="presentation"
            ></div>
            <div
              data-testid="artist-info-3"
              className="w-48 h-5 bg-gray-700 animate-pulse rounded mt-2"
              role="presentation"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

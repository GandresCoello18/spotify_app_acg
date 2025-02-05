export const ArtistSkeleton = () => {
  return (
    <section className="p-6 flex w-full justify-center">
      <div className="flex flex-col sm:flex-row items-start gap-6 max-w-4xl w-full">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-700 animate-pulse"></div>

        <div className="w-full">
          <div className="flex items-center gap-2 text-lg">
            <div className="w-5 h-5 bg-gray-700 animate-pulse rounded-full"></div>
            <div className="w-40 h-5 bg-gray-700 animate-pulse rounded"></div>
          </div>

          <div className="w-60 h-8 bg-gray-700 animate-pulse rounded mt-2"></div>

          <div className="mt-4">
            <div className="w-48 h-5 bg-gray-700 animate-pulse rounded mt-2"></div>
            <div className="w-48 h-5 bg-gray-700 animate-pulse rounded mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

import GlassSvg from './svg/glass.svg';

export const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400">
      <GlassSvg />
      <h3 className="text-lg font-semibold">No se encontraron resultados</h3>
      <p className="text-sm mt-1">
        Intenta buscar con otro término o revisa la ortografía.
      </p>
    </div>
  );
};

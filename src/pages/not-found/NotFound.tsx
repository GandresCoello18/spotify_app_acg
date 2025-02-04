import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white text-center p-6">
      <motion.div
        className="text-6xl mb-4"
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎵
      </motion.div>

      <h1 className="text-4xl font-bold">La música se ha detenido...</h1>
      <p className="text-lg text-gray-400 mt-2">
        Parece que esta página no existe, pero puedes volver a reproducirla.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-green-500 text-black rounded-full text-lg font-medium hover:bg-green-400 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;

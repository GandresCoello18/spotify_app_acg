import { ToastContainer } from 'react-toast';
import { registerSW } from 'virtual:pwa-register';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nueva versión disponible. ¿Actualizar?')) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes />
    <ToastContainer delay={5000} position="top-right" />
  </>,
);

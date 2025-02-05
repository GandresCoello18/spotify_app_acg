import { ToastContainer } from 'react-toast';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './routes';

createRoot(document.getElementById('root')!).render(
  <>
    <AppRoutes />
    <ToastContainer delay={5000} position="top-right" />
  </>,
);

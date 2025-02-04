import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header />
      <div className="flex w-full">
        <main className="flex-1 bg-gray-100">{children || <Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

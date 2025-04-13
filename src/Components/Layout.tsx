import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-black text-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-black p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
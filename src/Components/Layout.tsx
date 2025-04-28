import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  onNavigate?: (page: 'home' | 'cats') => void;
}

const Layout = ({ children, onNavigate }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-black text-white">
      <AppSidebar onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
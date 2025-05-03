import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  currentPage: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership';
  onNavigate?: (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => void;
}

const Layout = ({ children, currentPage, onNavigate }: LayoutProps) => {
  const location = useLocation();
  
  // Update the current page based on the URL
  const getCurrentPageFromPath = (): 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership' => {
    const path = location.pathname.split('/')[1];
    
    switch (path) {
      case 'home':
        return 'home';
      case 'cats':
        return 'cats';
      case 'cameras':
        return 'cameras';
      case 'stats':
        return 'stats';
      case 'reports':
        return 'reports';
      case 'membership':
        return 'membership';
      default:
        // For streaming and other pages, see which section they belong to
        if (path === 'streaming') {
          return 'cameras';
        }
        return 'home';
    }
  };
  
  const activePage = getCurrentPageFromPath();

  return (
    <div className="flex h-screen bg-black text-white">
      <AppSidebar currentPage={activePage} onNavigate={onNavigate} />
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
import { useState } from 'react';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import CatsView from './Pages/CatsView';
import CamerasView from './Pages/CamerasView';
import Stats from './Pages/Stats';
import Reports from './Pages/Reports';
import Membership from './Pages/Membership';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership'>('cameras');

  const navigateTo = (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'cats':
        return <CatsView />;
      case 'cameras':
        return <CamerasView />;
      case 'stats':
        return <Stats />;
      case 'reports':
        return <Reports />;
      case 'membership':
        return <Membership />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout onNavigate={navigateTo} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
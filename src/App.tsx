import { useState } from 'react';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import CatsView from './Pages/CatsView';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'cats'>('cats');

  const navigateTo = (page: 'home' | 'cats') => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'cats':
        return <CatsView />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout onNavigate={navigateTo}>
      {renderPage()}
    </Layout>
  );
}

export default App;
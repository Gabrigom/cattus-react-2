import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import CatsView from './Pages/CatsView';
import CamerasView from './Pages/CamerasView';
import Streaming from './Pages/Streaming';
import Stats from './Pages/Stats';
import Reports from './Pages/Reports';
import Membership from './Pages/Membership';
import CatData from './Pages/CatData';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership'>('cameras');

  const navigateTo = (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route 
          path="/*" 
          element={
            <Layout currentPage={currentPage} onNavigate={navigateTo}>
              <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="cats" element={<CatsView />} />
                <Route path="cats/:id" element={<CatData />} /> {/* Add the new CatData route */}
                <Route path="cameras" element={<CamerasView />} />
                <Route path="stats" element={<Stats />} />
                <Route path="reports" element={<Reports />} />
                <Route path="membership" element={<Membership />} />
                <Route path="streaming/:id" element={<Streaming />} />
              </Routes>
            </Layout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import CatsView from './Pages/CatsView';
import CatData from './Pages/CatData';
import CatAdd from './Pages/CatAdd';
import CatEdit from './Pages/CatEdit';
import CamerasView from './Pages/CamerasView';
import Streaming from './Pages/Streaming';
import Stats from './Pages/Stats';
import Reports from './Pages/Reports';
import Membership from './Pages/Membership';
import LoginPage from './Pages/LoginPage';
import LoadingSplash from './Pages/LoadingSplash';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && location.pathname !== '/login' && location.pathname !== '/loading') {
      navigate('/login');
    }
    setIsChecking(false);
  }, [navigate, location]);

  if (isChecking) {
    return <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>;
  }

  return <>{children}</>;
};

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership'>('home');
  
  const navigateTo = (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingSplash />} />
        
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <Layout currentPage={currentPage} onNavigate={navigateTo}>
                <Routes>
                  <Route path="home" element={<HomePage />} />
                  <Route path="cats" element={<CatsView />} />
                  <Route path="cats/:id" element={<CatData />} />
                  <Route path="cats/add" element={<CatAdd />} />
                  <Route path="cats/edit/:id" element={<CatEdit />} />
                  <Route path="cameras" element={<CamerasView />} />
                  <Route path="stats" element={<Stats />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="membership" element={<Membership />} />
                  <Route path="streaming/:id" element={<Streaming />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
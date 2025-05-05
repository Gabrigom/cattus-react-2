import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {

      setToken(storedToken.length > 30 
        ? `${storedToken.substring(0, 30)}...` 
        : storedToken);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Bem-vindo ao Cattus</h1>
        
        <div className="bg-gray-800 p-4 rounded-md mb-8">
          <h2 className="text-xl text-white mb-2">Token de autenticação:</h2>
          <p className="text-gray-300 break-all font-mono text-sm">{token}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
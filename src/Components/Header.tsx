import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import Notification from './Notification';
import ProfilePopup from './ProfilePopup';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
interface JwtPayload {
  name?: string;
  id?: string;
  companyName?: string;
  company?: string;
  picture?: string;
  [key: string]: any;
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string>('/imgs/profile_sample.png');;
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const name = decoded.name || 'Usuário';
        setUserName(name);

        if (decoded.picture){
          setProfilePicture(decoded.picture);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchEvent = new CustomEvent('cat-search', {
      detail: { query: searchQuery }
    });
    
    document.dispatchEvent(searchEvent);
  };
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };
  
  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };
  
  return (
    <header className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800">
      <form onSubmit={handleSearch}>
        <div className="relative w-1/2 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="w-100 bg-gray-800 border-gray-700 text-white pl-10 rounded-md"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
      
      <div className="flex items-center space-x-4">
        <Notification />
        
        <div className="relative">
          <Button 
            ref={profileBtnRef}
            variant="ghost" 
            className="p-0 h-auto hover:bg-transparent"
            onClick={toggleProfileMenu}
          >
            <img
              src={profilePicture}
              alt="Profile picture"
              className="w-8 h-8 rounded-full"
            />
          </Button>
          
          <ProfilePopup 
            isOpen={showProfileMenu}
            onClose={closeProfileMenu}
            userName={userName}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
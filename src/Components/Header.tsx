import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import Notification from './Notification';
import ProfilePopup from './ProfilePopup';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };
  
  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };
  
  return (
    <header className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800">
      {/* Search bar */}
      <div className="relative w-1/2 max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          className="w-full bg-gray-800 border-gray-700 text-white pl-10 rounded-md"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      {/* Notification and profile */}
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
              src="/imgs/profile_sample.png" 
              alt="Profile picture"
              className="w-8 h-8 rounded-full"
            />
          </Button>
          
          {/* Profile Menu Popup */}
          <ProfilePopup 
            isOpen={showProfileMenu}
            onClose={closeProfileMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
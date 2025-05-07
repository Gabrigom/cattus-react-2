import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarNavItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar
} from './Sidebar';
import { ChevronRight, Home, Cat, Camera, BarChart2, FileText, DollarSign, Star } from 'lucide-react';

interface CatEntry {
  id: string;
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
}

interface AppSidebarProps {
  currentPage: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership';
  onNavigate?: (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => void;
}

const AppSidebar = ({ currentPage, onNavigate }: AppSidebarProps) => {
  const navigate = useNavigate();
  
  const markedCats: CatEntry[] = [
    { id: '0001', name: 'Pompeu', age: 10, gender: 'Macho', imageUrl: '/public/imgs/cat_sample.jpg' },
    { id: '0002', name: 'Amora', age: 5, gender: 'Fêmea', imageUrl: '/public/imgs/cat_sample.jpg' },
    { id: '0003', name: 'Frederico', age: 7, gender: 'Macho', imageUrl: '/public/imgs/cat_sample.jpg' },
    { id: '0004', name: 'Luna', age: 3, gender: 'Fêmea', imageUrl: '/public/imgs/cat_sample.jpg' },
  ];

  const menuItems = [
    { icon: <Home size={22} />, label: 'Inicio', page: 'home', path: '/home' },
    { icon: <Cat size={22} />, label: 'Gatos', page: 'cats', path: '/cats' },
    { icon: <Camera size={22} />, label: 'Câmeras', page: 'cameras', path: '/cameras' },
    { icon: <BarChart2 size={22} />, label: 'Estatísticas', page: 'stats', path: '/stats' },
    { icon: <FileText size={22} />, label: 'Relatórios', page: 'reports', path: '/reports' },
    { icon: <DollarSign size={22} />, label: 'Assinatura', page: 'membership', path: '/membership' },
  ];

  const handleNavigation = (page: string, path: string) => {
    if (onNavigate) {
      onNavigate(page as 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership');
    }
    navigate(path);
  };

  const handleCatClick = (catId: string) => {
    navigate(`/cats/${catId}`);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <LogoSection />
        </SidebarHeader>
        
        <SidebarContent>
          <div className="py-2">
            {menuItems.map((item, index) => (
              <SidebarNavItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={item.page === currentPage}
                onClick={() => handleNavigation(item.page, item.path)}
              />
            ))}
          </div>

          <QuickViewSection 
            markedCats={markedCats} 
            onCatClick={handleCatClick}
          />
        </SidebarContent>
        
        <SidebarFooter>
          <SidebarTrigger>
            <ChevronRight className="transition-transform duration-200" size={22} />
          </SidebarTrigger>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

const LogoSection = () => {
  const { collapsed } = useSidebar();
  
  return collapsed ? (
    <div className="flex justify-center w-full">
      <img
        src="/public/imgs/logo_compact.png"
        alt="Cattus"
        className="h-8 w-auto"
      />
    </div>
  ) : (
    <img
      src="/public/imgs/logo_extended.png"
      alt="Cattus"
      className="h-8 w-auto"
    />
  );
};

interface QuickViewSectionProps {
  markedCats: CatEntry[];
  onCatClick: (catId: string) => void;
}

const QuickViewSection = ({ markedCats, onCatClick }: QuickViewSectionProps) => {
  const { collapsed } = useSidebar();
  
  return (
    <div className="mt-4">
      {!collapsed && (
        <div className="px-4 py-2 text-sm text-gray-400">
          Visualização rápida
        </div>
      )}
      
      <SidebarGroup 
        title="Marcados" 
        icon={collapsed ? <Star size={22} /> : undefined}
        defaultExpanded={true}
      >
        <div className="space-y-1">
          {markedCats.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center px-4 py-2 hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => onCatClick(cat.id)}
            >
              <img
                src="/public/imgs/cat_sample.jpg"
                alt={cat.name}
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {cat.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {cat.gender} de {cat.age} anos
                </p>
                <p className="text-xs text-gray-500 truncate">
                  CID: {cat.id}
                </p>
              </div>
            </div>
          ))}
          
          <div
            className="flex items-center px-4 py-2 hover:bg-gray-800 transition-colors text-gray-400 cursor-pointer"
            onClick={() => onCatClick('marked')}
          >
            <Star size={16} className="mr-2" />
            <span className="text-sm">Ver mais gatos em Marcados</span>
          </div>
        </div>
      </SidebarGroup>
    </div>
  );
};

export default AppSidebar;
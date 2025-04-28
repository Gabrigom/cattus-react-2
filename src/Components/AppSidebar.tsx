import React from 'react';
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
  imageUrl: string;
}

interface AppSidebarProps {
  currentPage: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership';
  onNavigate?: (page: 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership') => void;
}

const AppSidebar = ({ currentPage, onNavigate }: AppSidebarProps) => {
  // Mock data
  const markedCats: CatEntry[] = [
    { id: '0001', name: 'Pompeu1', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0002', name: 'Pompeu2', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0003', name: 'Pompeu3', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0004', name: 'Pompeu4', age: 10, imageUrl: '/api/placeholder/40/40' },
  ];

  const menuItems = [
    { icon: <Home size={22} />, label: 'Inicio', page: 'home' },
    { icon: <Cat size={22} />, label: 'Gatos', page: 'cats' },
    { icon: <Camera size={22} />, label: 'Câmeras', page: 'cameras' },
    { icon: <BarChart2 size={22} />, label: 'Estatísticas', page: 'stats' },
    { icon: <FileText size={22} />, label: 'Relatórios', page: 'reports' },
    { icon: <DollarSign size={22} />, label: 'Assinatura', page: 'membership' },
  ];

  const handleNavigation = (page: string | null) => {
    if (page && onNavigate) {
      onNavigate(page as 'home' | 'cats' | 'cameras' | 'stats' | 'reports' | 'membership');
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <LogoSection />
        </SidebarHeader>
        
        <SidebarContent>
          {/* Main Navigation */}
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li key={index} onClick={() => handleNavigation(item.page)}>
                <SidebarNavItem
                  icon={item.icon}
                  label={item.label}
                  path="#"
                  active={item.page === currentPage} // Highlight the active page
                />
              </li>
            ))}
          </ul>

          {/* Quick View Section */}
          <QuickViewSection markedCats={markedCats} />
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

// Logo Section Component
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

// Quick View Section Component
const QuickViewSection = ({ markedCats }: { markedCats: CatEntry[] }) => {
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
        {markedCats.map((cat) => (
          <a
            key={cat.id}
            href={`/gatos/${cat.id}`}
            className="flex items-center px-4 py-2 hover:bg-gray-800 transition-colors"
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
                Macho de {cat.age} anos
              </p>
              <p className="text-xs text-gray-500 truncate">
                CID: {cat.id}
              </p>
            </div>
          </a>
        ))}
        
        <a
          href="/gatos/marcados"
          className="flex items-center px-4 py-2 hover:bg-gray-800 transition-colors text-gray-400"
        >
          <Star size={16} className="mr-2" />
          <span className="text-sm">Ver mais gatos em Marcados</span>
        </a>
      </SidebarGroup>
    </div>
  );
};

export default AppSidebar;
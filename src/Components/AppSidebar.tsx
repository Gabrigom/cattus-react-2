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
} from './Sidebar';
import { ChevronRight, Home, Cat, Camera, BarChart2, FileText, DollarSign, Star } from 'lucide-react';

interface CatEntry {
  id: string;
  name: string;
  age: number;
  imageUrl: string;
}

const AppSidebar = () => {
  // Mock data for demonstration
  const markedCats: CatEntry[] = [
    { id: '0001', name: 'Pompeu1', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0002', name: 'Pompeu2', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0003', name: 'Pompeu3', age: 10, imageUrl: '/api/placeholder/40/40' },
    { id: '0004', name: 'Pompeu4', age: 10, imageUrl: '/api/placeholder/40/40' },
  ];

  const menuItems = [
    { icon: <Home size={22} />, label: 'Inicio', path: '/' },
    { icon: <Cat size={22} />, label: 'Gatos', path: '/gatos' },
    { icon: <Camera size={22} />, label: 'Câmeras', path: '/cameras' },
    { icon: <BarChart2 size={22} />, label: 'Estatísticas', path: '/estatisticas' },
    { icon: <FileText size={22} />, label: 'Relatórios', path: '/relatorios' },
    { icon: <DollarSign size={22} />, label: 'Assinatura', path: '/assinatura' },
  ];

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
              <SidebarNavItem
                key={index}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={index === 0} // Assuming first item is active for demo
              />
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

// Import at the top to make it available in the component
import { useSidebar } from './Sidebar/SidebarProvider';

export default AppSidebar;
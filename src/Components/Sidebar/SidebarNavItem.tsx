import React, { ReactNode } from 'react';
import { useSidebar } from './SidebarProvider';

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

export function SidebarNavItem({ 
  icon, 
  label, 
  path, 
  active = false 
}: SidebarNavItemProps) {
  const { collapsed } = useSidebar();

  return (
    <li>
      <a
        href={path}
        className={`flex items-center py-3 px-4 hover:bg-gray-800 transition-colors ${
          active ? 'bg-gray-800' : ''
        }`}
      >
        <span className={collapsed ? '' : 'mr-3'}>{icon}</span>
        {!collapsed && <span>{label}</span>}
      </a>
    </li>
  );
}
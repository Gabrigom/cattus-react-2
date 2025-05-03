import { useState } from 'react';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { Button } from '@/Components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  timestamp: {
    date: string;
    time: string;
  };
  metadata?: Record<string, string>;
  onClick?: () => void;
}

interface ActivityListProps {
  title?: string;
  items: ActivityItem[];
  maxHeight?: string;
  onItemClick?: (item: ActivityItem) => void;
  emptyMessage?: string;
}

const ActivityList = ({
  title = "Atividades",
  items,
  maxHeight = "calc(100vh-260px)",
  onItemClick,
  emptyMessage = "Não há atividades para exibir"
}: ActivityListProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="bg-[#1A1B21] rounded-md h-full overflow-hidden flex flex-col">
      {title && (
        <div className="p-3 text-center bg-[#475746] border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      
      <ScrollArea className="flex-1" style={{height: maxHeight}}>
        <div className="divide-y divide-gray-800">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="bg-[#1A1B21]">
                <div className="p-3">
                  <div className="flex items-start">
                    <div className="relative mr-3">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{item.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {item.timestamp.date} - {item.timestamp.time}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-gray-400"
                            onClick={() => toggleExpand(item.id)}
                          >
                            {expandedItems[item.id] ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 truncate max-w-[140px]">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable content */}
                {expandedItems[item.id] && (
                  <div className="px-3 pb-3 text-sm text-gray-300">
                    <div className="ml-13 pl-13">
                      <p className="mb-1">Última aparição: {item.timestamp.date} às {item.timestamp.time}</p>
                      <p className="mb-1">Estado: Saudável</p>
                      <p>Localização: Área de descanso</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              {emptyMessage}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActivityList;
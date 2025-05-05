import { useState } from 'react';
import CatCard from '@/Components/CatCard';
import CatViewFilter from '@/Components/CatViewFilter';
import CatViewTooltip from '@/Components/CatViewTooltip';
import { Button } from '@/Components/ui/button';
import { Filter } from 'lucide-react';

type CatStatus = 'healthy' | 'attention' | 'critical';

interface Cat {
  id: string;
  name: string;
  gender: string;
  age: number;
  imageUrl: string;
  status: CatStatus;
  marked: boolean;
}

const CatsView = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Dados mockados
  const [cats, setCats] = useState<Cat[]>(Array(24).fill(null).map((_, index) => ({
    id: `${(index + 1).toString().padStart(4, '0')}`,
    name: `Nome do gato(a)`,
    gender: index % 2 === 0 ? 'Macho' : 'Fêmea',
    age: Math.floor(Math.random() * 15) + 1,
    imageUrl: '/public/imgs/cat_sample.jpg',
    status: ['healthy', 'attention', 'critical'][index % 3] as CatStatus,
    marked: index % 4 === 0
  })));

  const handleMarkToggle = (id: string, marked: boolean) => {
    setCats(cats.map(cat => 
      cat.id === id ? { ...cat, marked } : cat
    ));
  };

  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    console.log('Applied filters:', selectedFilters);
    // Placeholder para o filtro de gatos
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gatos cadastrados</h1>
          <p className="text-gray-400">{cats.length} gatos ao todo</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-black flex gap-2 items-center"
            onClick={() => setFilterOpen(true)}
          >
            <Filter size={16} />
            Filtros
          </Button>
          
          <CatViewTooltip>
            <Button variant="outline" className="text-black" size="icon">
              ?
            </Button>
          </CatViewTooltip>
        </div>
      </div>

      <CatViewFilter 
        open={filterOpen} 
        onOpenChange={setFilterOpen}
        onApplyFilters={handleApplyFilters}
      />

      {/* Cat cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            gender={cat.gender}
            age={cat.age}
            imageUrl={cat.imageUrl}
            status={cat.status}
            initialMarked={cat.marked}
            onMarkToggle={handleMarkToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default CatsView;
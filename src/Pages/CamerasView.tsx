import { useState } from 'react';
import CameraCard from '@/Components/CameraCard';
import CatViewFilter from '@/Components/CatViewFilter';
import CameraViewTooltip from '@/Components/CameraViewTooltip';
import { Button } from '@/Components/ui/button';
import { Filter, HelpCircle } from 'lucide-react';

interface Camera {
  id: string;
  name: string;
  imageUrl: string;
}

const CamerasView = () => {
  // State for filter dialog
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mocked camera data
  const [cameras] = useState<Camera[]>(Array(12).fill(null).map((_, index) => ({
    id: `${(index + 1).toString().padStart(2, '0')}`,
    name: `${index + 1}`,
    imageUrl: '/public/imgs/camera_sample.jpg' // Using cat sample as placeholder
  })));

  // Handle applying filters
  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    console.log('Applied filters:', selectedFilters);
    // Here you would filter the cameras based on the selected filters
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Câmeras no local</h1>
          <p className="text-gray-400">{cameras.length} câmeras ao todo</p>
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
          
          <CameraViewTooltip>
            <Button variant="outline" className="text-black" size="icon">
              <HelpCircle size={16} />
            </Button>
          </CameraViewTooltip>
        </div>
      </div>

      <CatViewFilter 
        open={filterOpen} 
        onOpenChange={setFilterOpen}
        onApplyFilters={handleApplyFilters}
      />

      {/* Camera cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <CameraCard
            key={camera.id}
            id={camera.id}
            name={camera.name}
            imageUrl={camera.imageUrl}
            onClick={() => console.log(`Opening camera ${camera.name}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CamerasView;
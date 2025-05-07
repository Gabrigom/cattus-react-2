import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import CameraCard from '@/Components/CameraCard';
import CatViewFilter from '@/Components/CatViewFilter';
import CameraViewTooltip from '@/Components/CameraViewTooltip';
import { Button } from '@/Components/ui/button';
import { Filter, HelpCircle } from 'lucide-react';
import { CameraService } from '@/Services';
import { Camera } from '@/Services/types';

interface JwtPayload {
  company?: string;
  [key: string]: any;
}

const CamerasView = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const token = Cookies.get('token');
        
        if (!token) {
          setError('Você precisa estar autenticado');
          setLoading(false);
          return;
        }
        
        const decoded = jwtDecode<JwtPayload>(token);
        const companyId = decoded.company;
        
        if (!companyId) {
          setError('ID da empresa não encontrado');
          setLoading(false);
          return;
        }
        
        const response = await CameraService.getAll(companyId);
        const initializedCameras = response.filter(camera => camera.cameraStatus !== 0);

        setCameras(initializedCameras);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cameras:', error);
        setError('Erro ao carregar as câmeras');
        setLoading(false);
      }
    };
    
    fetchCameras();
  }, []);

  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    console.log('Applied filters:', selectedFilters);
    // Placeholder pro filtro
  };

  if (loading) {
    return <div className="p-6 flex justify-center">
      <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

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
          <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white hover:bg-transparent">
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
            key={camera._id}
            id={camera._id}
            name={camera.cameraLocation}
            imageUrl={camera.cameraPicture || '/imgs/camera_sample.jpg'}
          />
        ))}
      </div>
    </div>
  );
};

export default CamerasView;
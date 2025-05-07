import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/Components/ui/badge';
import VideoPlayer from '@/Components/VideoPlayer';
import ActivityList, { ActivityItem } from '@/Components/ActivityList';
import { CameraService } from '@/Services';
import { Camera } from '@/Services/types';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface JwtPayload {
  accessLevel?: number;
  [key: string]: any;
}

const Streaming = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  const [camera, setCamera] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Atividades mockadas ainda
  const [catActivities, setCatActivities] = useState<ActivityItem[]>([
    {
      id: '0001',
      title: 'Pompeu',
      subtitle: 'Macho · 10 anos',
      imageUrl: '/imgs/cat_sample.jpg',
      timestamp: {
        date: '18/04',
        time: '19h05'
      },
      catId: '0001',
      metadata: {
        status: 'Saudável',
        location: 'Área de descanso'
      }
    },
    {
      id: '0002',
      title: 'Pompeu',
      subtitle: 'Macho · 10 anos',
      imageUrl: '/imgs/cat_sample.jpg',
      timestamp: {
        date: '18/04',
        time: '17h41'
      },
      catId: '0002',
      metadata: {
        status: 'Saudável',
        location: 'Área de descanso'
      }
    },
    {
      id: '0003',
      title: 'Pompeu',
      subtitle: 'Macho · 10 anos',
      imageUrl: '/imgs/cat_sample.jpg',
      timestamp: {
        date: '18/04',
        time: '15h32'
      },
      catId: '0003',
      metadata: {
        status: 'Saudável',
        location: 'Área de descanso'
      }
    },
    {
      id: '0004',
      title: 'Pompeu',
      subtitle: 'Macho · 10 anos',
      imageUrl: '/imgs/cat_sample.jpg',
      timestamp: {
        date: '18/04',
        time: '14h45'
      },
      catId: '0004',
      metadata: {
        status: 'Saudável',
        location: 'Área de descanso'
      }
    },
    {
      id: '0005',
      title: 'Pompeu',
      subtitle: 'Macho · 10 anos',
      imageUrl: '/imgs/cat_sample.jpg',
      timestamp: {
        date: '18/04',
        time: '13h20'
      },
      catId: '0005',
      metadata: {
        status: 'Saudável',
        location: 'Área de descanso'
      }
    }
  ]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setIsUserAdmin(decoded.emplyeeAccessLevel && decoded.employeeAccessLevel >= 1);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    const fetchCamera = async () => {
      if (!id) {
        setError('ID da câmera não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const cameraData = await CameraService.getOne(id);
        setCamera(cameraData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching camera data:', error);
        setError('Erro ao carregar dados da câmera');
        setLoading(false);
      }
    };

    fetchCamera();
  }, [id]);

  const toggleCameraStatus = async () => {
    if (!camera || !isUserAdmin) return;

    try {
      const newStatus = camera.cameraStatus === 1 ? 2 : 1;
      await CameraService.update(camera._id, {
        ...camera,
        cameraStatus: newStatus
      });

      setCamera({
        ...camera,
        cameraStatus: newStatus
      });
    } catch (error) {
      console.error('Error updating camera status:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !camera) {
    return (
      <div className="p-6">
        <p className="text-xl text-gray-400">{error || 'Câmera não encontrada.'}</p>
        <Button 
          onClick={() => navigate('/cameras')}
          className="mt-4 bg-green-600 hover:bg-green-700"
        >
          Voltar para lista de câmeras
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Streaming</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Video Player and Camera Details */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="mb-4">
            <VideoPlayer 
              isActive={camera.cameraStatus === 1} 
              imageUrl={camera.cameraPicture || '/imgs/camera_sample.jpg'} 
              title={camera.cameraLocation} 
            />
          </div>

          {/* Camera Details */}
          <div className="bg-gray-900 rounded-md p-4 mb-4 w-[90%] mx-auto">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-white">Câmera {camera.cameraLocation}</h2>
              <Button
                className={`${
                  camera.cameraStatus === 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                disabled={!isUserAdmin}
                onClick={toggleCameraStatus}
              >
                {!isUserAdmin && <Lock size={16} className="mr-2" />}
                {camera.cameraStatus === 1 ? 'DESATIVAR' : 'ATIVAR'}
              </Button>
            </div>
            <p className="text-gray-300 mb-2">{camera.cameraDescription || 'Sem descrição disponível'}</p>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Estado:</span>
              <Badge 
                className={`${
                  camera.cameraStatus === 1 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                } hover:bg-opacity-20`}
              >
                {camera.cameraStatus === 1 ? 'Ativa' : 'Inativa'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right side - Cat Activities */}
        <div className="w-full lg:w-80">
          <ActivityList 
            title="Atividades"
            items={catActivities}
            maxHeight="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default Streaming;
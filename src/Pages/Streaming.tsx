import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/Components/ui/badge';
import VideoPlayer from '@/Components/VideoPlayer';
import ActivityList, { ActivityItem } from '@/Components/ActivityList';

interface CatActivity {
  id: string;
  name: string;
  imageUrl: string;
  gender: string;
  age: number;
  date: string;
  time: string;
}

interface CameraDetails {
  id: string;
  name: string;
  description: string;
  location: string;
  isActive: boolean;
  imageUrl: string;
}

const Streaming = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUserAdmin] = useState(false); // Set to true to test admin functionality
  
  // Camera details state
  const [camera, setCamera] = useState<CameraDetails>({
    id: '1',
    name: 'Câmera 1',
    description: 'Camera da área de playground para captar gatos socializando',
    location: 'Playground',
    isActive: true,
    imageUrl: '/public/imgs/camera_sample.jpg'
  });
  
  // Mock data for cat activities - added more cats for scrolling example
  const [catActivities, setCatActivities] = useState<CatActivity[]>([
    {
      id: '0001',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '19h05'
    },
    {
      id: '0002',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '17h41'
    },
    {
      id: '0003',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '15h32'
    },
    {
      id: '0004',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '14h45'
    },
    {
      id: '0005',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '13h20'
    },
    {
      id: '0006',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '18/04',
      time: '12h15'
    },
    {
      id: '0007',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '17/04',
      time: '23h10'
    },
    {
      id: '0008',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '17/04',
      time: '21h35'
    },
    {
      id: '0009',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '17/04',
      time: '19h42'
    },
    {
      id: '0010',
      name: 'Pompeu',
      imageUrl: '/public/imgs/cat_sample.jpg',
      gender: 'Macho',
      age: 10,
      date: '17/04',
      time: '16h18'
    }
  ]);

  useEffect(() => {
    // Here you would fetch camera data and cat activities based on the id
    console.log(`Fetching data for camera ${id}`);
  }, [id]);

  const toggleCameraStatus = () => {
    if (isUserAdmin) {
      setCamera({
        ...camera,
        isActive: !camera.isActive
      });
    } else {
      // Show an error or notification that user doesn't have permission
      console.log('User does not have admin privileges');
    }
  };

  // Convert cat activities to the format expected by ActivityList
const formatActivities = (): ActivityItem[] => {
  return catActivities.map(cat => ({
    id: cat.id,
    title: cat.name,
    subtitle: `${cat.gender} · ${cat.age} anos`,
    imageUrl: cat.imageUrl,
    timestamp: {
      date: cat.date,
      time: cat.time
    },
    catId: cat.id, // Make sure to include the catId for navigation
    metadata: {
      status: 'Saudável',
      location: 'Área de descanso'
    }
  }));
};

  const goBack = () => {
    navigate('/cameras');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Streaming</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Video Player and Camera Details */}
        <div className="flex-1">
          {/* Video Player */}
          <div className="mb-4">
            <VideoPlayer 
              isActive={camera.isActive} 
              imageUrl={camera.imageUrl} 
              title={camera.name} 
            />
          </div>

          {/* Camera Details */}
          <div className="bg-gray-900 rounded-md p-4 mb-4 w-[90%] mx-auto">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-white">{camera.name}</h2>
              <Button
                className={`${
                  camera.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                disabled={!isUserAdmin}
                onClick={toggleCameraStatus}
              >
                {!isUserAdmin && <Lock size={16} className="mr-2" />}
                {camera.isActive ? 'DESATIVAR' : 'ATIVAR'}
              </Button>
            </div>
            <p className="text-gray-300 mb-2">{camera.description}</p>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Estado:</span>
              <Badge 
                className={`${
                  camera.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                } hover:bg-opacity-20`}
              >
                {camera.isActive ? 'Ativa' : 'Inativa'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right side - Cat Activities */}
        <div className="w-full lg:w-80">
          <ActivityList 
            title="Atividades"
            items={formatActivities()}
            maxHeight="500px"
          />
        </div>
      </div>
    </div>
  );
};

export default Streaming;
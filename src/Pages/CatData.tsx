import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CatProfile from '@/Components/CatProfile';
import CatStatus from '@/Components/CatStatus';
import CatActivities from '@/Components/CatActivities';
import { Button } from '@/Components/ui/button';

interface Cat {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  description: string;
  profilePicture: string;
  isCastrated: boolean;
  race: string;
  color: string;
  fur: string;
  size: string;
  weight: number;
  personality: string;
  activityLevel: string;
  behaviour: string;
  meowLevel: string;
  comorbidities: string[];
  vaccine: string;
  marked: boolean;
  status: 'healthy' | 'attention' | 'critical';
}

const CatData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cat, setCat] = useState<Cat | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Section expanded states
  const [sectionsState, setSectionsState] = useState({
    profile: true,
    status: false,
    activities: false
  });

  // Toggle section expanded state
  const toggleSection = (section: 'profile' | 'status' | 'activities') => {
    setSectionsState({
      ...sectionsState,
      [section]: !sectionsState[section]
    });
  };

  useEffect(() => {
    // Mock fetch cat data
    const fetchCatData = async () => {
      try {
        // This would be an API call in a real application
        setTimeout(() => {
          const mockCat: Cat = {
            id: id || '0001',
            name: 'Pompeu',
            gender: 'Macho',
            birthDate: '01/02/2022',
            age: 3,
            description: 'Um gato gentil porém muito levado, principalmente no período da noite. Pouco social com outros gatos.',
            profilePicture: '/public/imgs/cat_sample.jpg',
            isCastrated: true,
            race: 'Vira-lata',
            color: 'Preto',
            fur: 'Espesso',
            size: 'Grande',
            weight: 4.5,
            personality: 'Noturno',
            activityLevel: 'Moderado',
            behaviour: 'Manso',
            meowLevel: 'Baixo',
            comorbidities: ['Incontinência urinária', 'Obesidade', 'Doença Inflamatória Intestinal', 'Infecção por FIV'],
            vaccine: '/public/imgs/vaccine_doc.pdf',
            marked: true,
            status: 'healthy'
          };
          
          setCat(mockCat);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching cat data:', error);
        setLoading(false);
      }
    };

    fetchCatData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <p className="text-xl text-gray-400">Carregando dados do gato...</p>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="p-6">
        <p className="text-xl text-gray-400">Gato não encontrado.</p>
        <Button 
          onClick={() => navigate('/cats')}
          className="mt-4 bg-green-600 hover:bg-green-700"
        >
          Voltar para lista de gatos
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Perfil do gato - {cat.name}</h1>
        <Button 
          onClick={() => console.log('Generating report for cat:', cat.id)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          GERAR RELATÓRIO
        </Button>
      </div>

      <div className="space-y-4">
        {/* Profile Section */}
        <CatProfile 
          cat={cat}
          isExpanded={sectionsState.profile}
          onToggleExpand={() => toggleSection('profile')}
        />
        
        {/* Status Section */}
        <CatStatus 
          catId={cat.id}
          isExpanded={sectionsState.status}
          onToggleExpand={() => toggleSection('status')}
        />
        
        {/* Activities Section */}
        <CatActivities 
          catId={cat.id}
          isExpanded={sectionsState.activities}
          onToggleExpand={() => toggleSection('activities')}
        />
      </div>
    </div>
  );
};

export default CatData;
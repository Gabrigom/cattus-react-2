import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Cookies from 'js-cookie';
import CatCard from '@/Components/CatCard';
import CatViewFilter from '@/Components/CatViewFilter';
import CatViewTooltip from '@/Components/CatViewTooltip';
import { Button } from '@/Components/ui/button';
import { Filter, HelpCircle } from 'lucide-react';
import { AnimalService } from '@/Services';
import { Animal } from '@/Services/types';

interface JwtPayload {
  company?: string;
  [key: string]: any;
}

const CatsView = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [cats, setCats] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markedCats, setMarkedCats] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    const fetchCats = async () => {
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
        
        const response = await AnimalService.getAll(companyId);
        setCats(response);
        
        // Initialize mock marked status (random for now)
        const mockMarked: Record<string, boolean> = {};
        response.forEach(cat => {
          mockMarked[cat._id] = Math.random() > 0.7; // 30% chance of being marked
        });
        setMarkedCats(mockMarked);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cats:', error);
        setError('Erro ao carregar os gatos');
        setLoading(false);
      }
    };
    
    fetchCats();
  }, []);

  useEffect(() => {
    // You'll need to implement a global state or event system
    // This is a simplified example
    const searchHandler = (e: CustomEvent) => {
      setSearchQuery(e.detail.query);
      handleSearch(e.detail.query);
    };
    
    document.addEventListener('cat-search', searchHandler as EventListener);
    
    return () => {
      document.removeEventListener('cat-search', searchHandler as EventListener);
    };
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      const token = Cookies.get('token');
      const decoded = jwtDecode<JwtPayload>(token || '');
      const companyId = decoded.company;

      if (!companyId) return;

      const response = await AnimalService.getAll(companyId);
      setCats(response);
      return;
    }

    try {
      setLoading(true);
      // Fields to search in - adjust these based on your API
      const fields = ['petName', 'petGender', 'petBreed', 'petComorbidities'];
      const results = await AnimalService.search(query, fields);
      setCats(results);
      setLoading(false);
    } catch (error) {
      console.error('Error searching cats:', error);
      setError('Erro ao pesquisar gatos');
      setLoading(false);
    }
  }


  const handleMarkToggle = (id: string, marked: boolean) => {
    // Only update the mock state since there's no API endpoint yet
    setMarkedCats(prev => ({
      ...prev,
      [id]: marked
    }));
  };

  const handleApplyFilters = (selectedFilters: Record<string, string[]>) => {
    // This would be implemented with your search API
    console.log('Applied filters:', selectedFilters);
    // For now, just mock filtering based on gender
    // In the future, implement actual API filtering
    if (selectedFilters.gender && selectedFilters.gender.length > 0) {
      const token = Cookies.get('token');
      if (!token) return;
      
      const decoded = jwtDecode<JwtPayload>(token);
      const companyId = decoded.company;
      if (!companyId) return;
      
      // Reset to all cats first
      AnimalService.getAll(companyId).then(allCats => {
        // Client-side filtering as a fallback until API supports it
        const filtered = allCats.filter(cat => {
          // Map API gender values to filter values
          const genderMap: Record<string, string> = {
            "Macho": "male",
            "Fêmea": "female"
          };
          
          const mappedGender = genderMap[cat.petGender] || "unspecified";
          return selectedFilters.gender.includes(mappedGender);
        });
        
        setCats(filtered);
      });
    }
  };

  // Function to map Cat Status based on your API data structure
  const mapCatStatus = (status?: string): 'healthy' | 'attention' | 'critical' => {
    if (!status) return 'healthy';
    
    switch (status) {
      case '0': return 'healthy';
      case '1': return 'attention';
      case '2': return 'critical';
      default: return 'healthy';
    }
  };

  if (loading) {
    return <div className="p-6 flex justify-center"><div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div></div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

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
              <HelpCircle size={16} />
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {cats.map((cat) => (
          <CatCard
            key={cat._id}
            id={cat._id}
            name={cat.petName}
            gender={cat.petGender}
            age={getAge(cat.petBirth)}
            imageUrl={cat.petPicture || '/public/imgs/cat_sample.jpg'}
            status={mapCatStatus(cat.petStatus?.petCurrentStatus)}
            initialMarked={markedCats[cat._id] || false}
            onMarkToggle={handleMarkToggle}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate age from birth date
const getAge = (birthDate?: Date): number => {
  if (!birthDate) return 0;
  
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export default CatsView;
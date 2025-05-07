import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  weight: string;
  personality: string;
  activityLevel: string;
  behaviour: string;
  meowLevel: string;
  comorbidities: string[];
  vaccine: string;
  marked: boolean;
  status: 'healthy' | 'attention' | 'critical';
}

interface CatProfileProps {
  cat: Cat;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const CatProfile = ({ cat, isExpanded, onToggleExpand }: CatProfileProps) => {
  const navigate = useNavigate();
  
  const handleEditClick = () => {
    navigate(`/cats/edit/${cat.id}`);
  };


  const handleVaccineUpload = () => {
    console.log('Opening file picker for vaccine upload');
  };

  if (!isExpanded) {
    return (
      <div className="bg-gray-900 rounded-md overflow-hidden">
        <div 
          className="p-3 bg-[#475746] flex justify-between items-center cursor-pointer"
          onClick={onToggleExpand}
        >
          <h2 className="text-lg font-semibold text-white">Perfil</h2>
          <ChevronDown className="text-white" size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div 
        className="p-3 bg-[#475746] flex justify-between items-center cursor-pointer"
        onClick={onToggleExpand}
      >
        <h2 className="text-lg font-semibold text-white">Perfil</h2>
        <ChevronUp className="text-white" size={20} />
      </div>

      <div className="p-6 bg-[#324250]">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Cat image */}
          <div className="md:w-1/4">
            <div className="bg-[#3c8054] h-100 w-full rounded-md overflow-hidden flex items-center justify-center">
              <img 
                src={cat.profilePicture} 
                alt={cat.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }}
              />
            </div>
          </div>

          <div className="md:w-1/3 space-y-4">
            <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
            
            <div className="space-y-2">
              <h3 className="text-white">Características físicas</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Sexo:</span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-white">
                    <path d="M12 8a2 2 0 0 1 0 4 2 2 0 0 1 0-4z"/>
                    <path d="M12 2v2"/>
                    <path d="M12 14v8"/>
                    <path d="M9 18h6"/>
                  </svg>
                  <span className="text-white">{cat.gender}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-1/3">Data de nascimento:</span>
                <div className="flex items-center">
                  <span className="text-white">{cat.birthDate} • {cat.age} anos</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-1/3">Descrição:</span>
                <p className="text-white text-sm">{cat.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Castrado:</span>
                <span className="text-white">{cat.isCastrated ? 'SIM' : 'NÃO'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Raça:</span>
                <span className="text-white">{cat.race}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Cor:</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-black"></div>
                  <span className="text-white">{cat.color}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Pelagem:</span>
                <span className="text-white">{cat.fur}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Tamanho:</span>
                <span className="text-white">{cat.size} cm</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Peso:</span>
                <span className="text-white">{cat.weight} kg</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 space-y-4">
            <div className="space-y-2">
              <h3 className="text-white">Características sociais</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Personalidade:</span>
                <span className="text-white">{cat.personality}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Nível de atividade:</span>
                <span className="text-white">{cat.activityLevel}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Comportamento:</span>
                <span className="text-white">{cat.behaviour}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-1/3">Nível de miado:</span>
                <span className="text-white">{cat.meowLevel}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-white">Comorbidades</h3>
              <div className="flex flex-wrap gap-2">
                {cat.comorbidities.length > 0 ? (
                  cat.comorbidities.map((comorbidity, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm"
                    >
                      {comorbidity}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">Nenhuma comorbidade registrada</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-white">Vacina</h3>
              <div className="p-2">
                {cat.vaccine ? (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">
                      Documento anexado: {cat.vaccine.split('/').pop() || 'Vacinacao.pdf'}
                    </p>
                    <Button 
                      variant="outline" 
                      className="text-black border-white bg-white hover:bg-transparent hover:text-white"
                      onClick={() => window.open(cat.vaccine, '_blank')}
                    >
                      Visualizar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                      Nenhum documento de vacinação anexado
                    </p>
                    <Button 
                      variant="outline" 
                      className="text-black border-white bg-white hover:bg-transparent hover:text-white"
                      onClick={handleVaccineUpload}
                    >
                      Anexar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with registration info and edit button */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-xs text-gray-400">
            <p>Cadastrado por: Vinicius Gomes</p>
            <p>Última alteração: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          
          <Button 
            onClick={() => handleEditClick()}
            className="px-8 bg-green-600 hover:bg-green-700 text-white"
          >
            EDITAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CatProfile;
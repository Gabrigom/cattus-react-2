import React, { useState, useRef } from 'react';
import { Animal } from '@/Services/types';
import { Button } from '@/Components/ui/button';
import { HelpCircle } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';

interface SegmentFourProps {
  formData: Partial<Animal>;
  onChange: (data: Partial<Animal>) => void;
  onSaveAndFinalize: () => void;
  onSaveAndContinue: () => void;
  isLoading: boolean;
}

const SegmentFour: React.FC<SegmentFourProps> = ({
  formData,
  onChange,
  onSaveAndFinalize,
  onSaveAndContinue,
  isLoading
}) => {
  // Format cat name, gender and age for display
  const catName = formData.petName || 'Nome do gato';
  const catGender = formData.petGender || '';
  const catAge = calculateAge(formData.petBirth);
  
  // State for comorbidities
  const [selectedComorbidities, setSelectedComorbidities] = useState<string[]>(() => {
    return formData.petComorbidities ? formData.petComorbidities.split(',').map(c => c.trim()) : [];
  });
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // List of possible comorbidities
  const comorbidities = [
    'Incontinência Urinária',
    'Obesidade',
    'Doença Inflamatória Intestinal',
    'Artrite',
    'Infecção por FIV',
    'Doença Renal Crônica',
    'Linfoma'
  ];

  // Handle comorbidity selection/deselection
  const toggleComorbidity = (comorbidity: string) => {
    setSelectedComorbidities(prev => {
      const isSelected = prev.includes(comorbidity);
      if (isSelected) {
        const updated = prev.filter(c => c !== comorbidity);
        onChange({ 
          ...formData, 
          petComorbidities: updated.join(', ') 
        });
        return updated;
      } else {
        const updated = [...prev, comorbidity];
        onChange({ 
          ...formData, 
          petComorbidities: updated.join(', ') 
        });
        return updated;
      }
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to the server here
      // and get back the URL to store in the pet's vaccination data
      console.log('File selected:', file.name);
      
      // For now, just add a placeholder URL as a pet vaccine
      const fileUrl = URL.createObjectURL(file);
      onChange({
        ...formData,
        petVaccines: [fileUrl]
      });
    }
  };

  // Handle clicking on the upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div className="p-3 bg-[#475746] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Carteira de vacinação e comorbidades</h2>
      </div>

      <div className="p-6 bg-[#324250]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Cat image with info */}
          <div>
            <div className="bg-[#3c8054] rounded-md overflow-hidden p-4">
              <h2 className="text-2xl font-bold text-white mb-1">{catName}</h2>
              <p className="text-white text-sm mb-2">{catGender} • {catAge} anos</p>
              
              <div className="h-72 w-full">
                <img 
                  src={formData.petPicture || '/imgs/cat_sample.jpg'} 
                  alt={`Foto de ${catName}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Right column - Form fields */}
          <div className="col-span-2 space-y-6">
            {/* Comorbidities section */}
            <div>
              <p className="text-white mb-4">Comorbidades:</p>
              <div className="flex flex-wrap gap-2">
                {comorbidities.map((comorbidity) => {
                  const isSelected = selectedComorbidities.includes(comorbidity);
                  return (
                    <Badge
                      key={comorbidity}
                      variant="outline"
                      className={`cursor-pointer py-2 px-4 rounded-full ${
                        isSelected 
                          ? 'bg-purple-800 text-white border-purple-700' 
                          : 'bg-white text-gray-800 border-gray-300'
                      }`}
                      onClick={() => toggleComorbidity(comorbidity)}
                    >
                      {comorbidity}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Vaccination card upload */}
            <div>
              <p className="text-white mb-4">Carteirinha de vacinação:</p>
              <div 
                className="w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-[#6C1482] rounded-md bg-[#6C1482]/20 text-white"
                onClick={handleUploadClick}
              >
                {formData.petVaccines?.length ? (
                  <div className="text-center p-4">
                    <p className="text-sm mb-2">Arquivo enviado: {formData.petVaccines[0].split('/').pop()}</p>
                    <Button 
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-purple-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(formData.petVaccines?.[0], '_blank');
                      }}
                    >
                      Visualizar
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mx-auto mb-4"
                    >
                      <path d="m3 15 5-5c.8-.8 2.2-.8 3 0l5 5"></path>
                      <path d="m19 17-2-2c-.8-.8-2.2-.8-3 0l-4 4"></path>
                      <path d="M9 21H3v-6"></path>
                      <path d="M21 3v6h-6"></path>
                      <path d="M21 9 3 9"></path>
                    </svg>
                    <p className="text-sm mb-2">Clique aqui para subir</p>
                    <p className="text-sm">um arquivo</p>
                  </div>
                )}
                <input
                  id="pet-vaccine"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-300 text-right">
          <p>Itens com * são OBRIGATÓRIOS</p>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={onSaveAndFinalize}
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            SALVAR E FINALIZAR
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate age from birth date
const calculateAge = (birthDate?: Date): number => {
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

export default SegmentFour;
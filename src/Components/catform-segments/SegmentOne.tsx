import React, { useState, useRef } from 'react';
import { Animal } from '@/Services/types';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { HelpCircle } from 'lucide-react';

interface SegmentOneProps {
  formData: Partial<Animal>;
  onChange: (data: Partial<Animal>) => void;
  onSaveAndFinalize: () => void;
  onSaveAndContinue: () => void;
  isLoading: boolean;
}

const SegmentOne: React.FC<SegmentOneProps> = ({
  formData,
  onChange,
  onSaveAndFinalize,
  onSaveAndContinue,
  isLoading
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(formData.petPicture || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Format date for input field
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Handle form field changes
  const handleChange = (field: keyof typeof formData, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the file to the server here
      // and get back the URL to store in formData
      // For now, we'll just update the formData with the preview URL
      handleChange('petPicture', previewUrl);
    }
  };

  // Handle clicking on the image area
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div className="p-3 bg-[#475746] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Informações básicas e foto de perfil</h2>
        <Button variant="ghost" size="icon" className="text-white">
          <HelpCircle size={20} />
        </Button>
      </div>

      <div className="p-6 bg-[#324250]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Image upload */}
          <div>
            <div 
              className="w-full h-72 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-[#6C1482] rounded-md bg-[#6C1482]/20 text-white"
              onClick={handleImageClick}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Prévia da foto do gato" 
                  className="w-full h-full object-cover rounded-md"
                />
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
                    <path d="M7 10v12"></path>
                    <path d="M15 10v12"></path>
                    <path d="M3 6h18"></path>
                    <path d="M3 12h18"></path>
                    <path d="m5 16 14-4"></path>
                    <path d="M17 22H7"></path>
                    <path d="m15 6-3-4-3 4"></path>
                  </svg>
                  <p className="text-sm mb-2">Arraste ou clique aqui</p>
                  <p className="text-sm">para subir um arquivo</p>
                </div>
              )}
              <input
                id="pet-picture"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-400">Foto de perfil*</p>
          </div>

          {/* Right column - Form fields */}
          <div className="space-y-6">
            <div>
            <p className="text-white mb-2">Nome*</p>
              <Input
                id="pet-name"
                placeholder="Nome do gato"
                className="bg-gray-700 border-gray-600 text-white"
                value={formData.petName || ''}
                onChange={(e) => handleChange('petName', e.target.value)}
                required
              />           
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
              <p className="mt-1 text-sm text-gray-400">Data de Nascimento*</p>
                <Input
                  id="pet-birth"
                  type="date"
                  className="bg-gray-700 border-gray-600 text-white"
                  value={formatDateForInput(formData.petBirth)}
                  onChange={(e) => handleChange('petBirth', new Date(e.target.value))}
                  required
                />       
              </div>

              <div>
              <p className="mt-1 text-sm text-gray-400">Sexo*</p>
                <Select
                  value={formData.petGender || ''}
                  onValueChange={(value) => handleChange('petGender', value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-600">
                    <SelectItem value="Macho">Macho</SelectItem>
                    <SelectItem value="Fêmea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>           
              </div>
            </div>

            <div>
            <p className="mt-1 text-sm text-gray-400">Observações</p>
              <Textarea
                id="pet-obs"
                placeholder="Digite aqui as observações sobre o gato..."
                className="bg-gray-700 border-gray-600 text-white h-32 resize-none"
                value={formData.petObs || ''}
                onChange={(e) => handleChange('petObs', e.target.value)}
              />
              
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <p>Itens com * são OBRIGATÓRIOS</p>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            onClick={onSaveAndFinalize}
            className="px-8 py-2 bg-gray-700 hover:bg-gray-600 text-white"
            disabled={isLoading}
          >
            SALVAR E FINALIZAR
          </Button>
          <Button
            onClick={onSaveAndContinue}
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            SALVAR E PROSSEGUIR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SegmentOne;
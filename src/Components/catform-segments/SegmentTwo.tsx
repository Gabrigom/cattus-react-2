import React from 'react';
import { Animal } from '@/Services/types';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { HelpCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';

interface SegmentTwoProps {
  formData: Partial<Animal>;
  onChange: (data: Partial<Animal>) => void;
  onSaveAndFinalize: () => void;
  onSaveAndContinue: () => void;
  isLoading: boolean;
}

const SegmentTwo: React.FC<SegmentTwoProps> = ({
  formData,
  onChange,
  onSaveAndFinalize,
  onSaveAndContinue,
  isLoading
}) => {
  // Initialize physical characteristics if they don't exist
  const physicalCharacteristics = formData.physicalCharacteristics || {
    furColor: '',
    furLength: '',
    eyeColor: '',
    size: 0,
    weight: 0,
  };

  // Initialize pet characteristics if they don't exist
  const petCharacteristics = formData.petCharacteristics || {
    petCastrated: '',
    petBreed: '',
    petSize: '',
  };

  // Handle pet characteristics changes
  const handlePetCharacteristicsChange = (field: keyof typeof petCharacteristics, value: string) => {
    const updatedCharacteristics = {
      ...petCharacteristics,
      [field]: value,
    };
    
    onChange({
      ...formData,
      petCharacteristics: updatedCharacteristics,
    });
  };

  // Handle physical characteristics changes
  const handlePhysicalCharacteristicsChange = (field: keyof typeof physicalCharacteristics, value: any) => {
    const updatedCharacteristics = {
      ...physicalCharacteristics,
      [field]: value,
    };
    
    onChange({
      ...formData,
      physicalCharacteristics: updatedCharacteristics,
    });
  };

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div className="p-3 bg-[#475746] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Características físicas</h2>
        <Button variant="ghost" size="icon" className="text-white">
          <HelpCircle size={20} />
        </Button>
      </div>

      <div className="p-6 bg-[#324250]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <p className="text-white mb-2">Castrado:</p>
              <RadioGroup 
                value={petCharacteristics.petCastrated}
                onValueChange={(value) => handlePetCharacteristicsChange('petCastrated', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sim" id="castrated-yes" className="border-white" />
                  <Label htmlFor="castrated-yes" className="text-white">SIM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Não" id="castrated-no" className="border-white" />
                  <Label htmlFor="castrated-no" className="text-white">NÃO</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <p className="text-white mb-2">Raça:</p>
              <Select
                value={petCharacteristics.petBreed}
                onValueChange={(value) => handlePetCharacteristicsChange('petBreed', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  <SelectItem value="Siamês">Siamês</SelectItem>
                  <SelectItem value="Persa">Persa</SelectItem>
                  <SelectItem value="Maine Coon">Maine Coon</SelectItem>
                  <SelectItem value="Bengal">Bengal</SelectItem>
                  <SelectItem value="Ragdoll">Ragdoll</SelectItem>
                  <SelectItem value="Sphynx">Sphynx</SelectItem>
                  <SelectItem value="British Shorthair">British Shorthair</SelectItem>
                  <SelectItem value="Abissínio">Abissínio</SelectItem>
                  <SelectItem value="SRD">SRD (Sem Raça Definida)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-white mb-2">Pelagem:</p>
              <Select
                value={physicalCharacteristics.furLength}
                onValueChange={(value) => handlePhysicalCharacteristicsChange('furLength', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  <SelectItem value="curto">Curto</SelectItem>
                  <SelectItem value="médio">Médio</SelectItem>
                  <SelectItem value="longo">Longo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-white mb-2">Cor:</p>
              <Select
                value={physicalCharacteristics.furColor}
                onValueChange={(value) => handlePhysicalCharacteristicsChange('furColor', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  <SelectItem value="preta">Preta</SelectItem>
                  <SelectItem value="branca">Branca</SelectItem>
                  <SelectItem value="cinza">Cinza</SelectItem>
                  <SelectItem value="laranja">Laranja</SelectItem>
                  <SelectItem value="marrom">Marrom</SelectItem>
                  <SelectItem value="mesclada">Mesclada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div>
              <p className="text-white mb-2">Tamanho:</p>
              <Select
                value={petCharacteristics.petSize}
                onValueChange={(value) => handlePetCharacteristicsChange('petSize', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  <SelectItem value="Pequeno">Pequeno</SelectItem>
                  <SelectItem value="Médio">Médio</SelectItem>
                  <SelectItem value="Grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-white mb-2">Peso (kg):</p>
              <Input
                type="number"
                className="bg-gray-700 border-gray-600 text-white"
                value={physicalCharacteristics.weight || ''}
                onChange={(e) => handlePhysicalCharacteristicsChange('weight', Number(e.target.value))}
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <p className="text-white mb-2">Cor dos olhos:</p>
              <Select
                value={physicalCharacteristics.eyeColor}
                onValueChange={(value) => handlePhysicalCharacteristicsChange('eyeColor', value)}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="castanho">Castanho</SelectItem>
                  <SelectItem value="âmbar">Âmbar</SelectItem>
                  <SelectItem value="heterocromia">Heterocromia (olhos de cores diferentes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
  )};

  export default SegmentTwo;
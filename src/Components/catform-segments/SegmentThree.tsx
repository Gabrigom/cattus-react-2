import React from 'react';
import { Animal } from '@/Services/types';
import { Button } from '@/Components/ui/button';
import { HelpCircle } from 'lucide-react';

interface SegmentThreeProps {
  formData: Partial<Animal>;
  onChange: (data: Partial<Animal>) => void;
  onSaveAndFinalize: () => void;
  onSaveAndContinue: () => void;
  isLoading: boolean;
}

const SegmentThree: React.FC<SegmentThreeProps> = ({
  formData,
  onChange,
  onSaveAndFinalize,
  onSaveAndContinue,
  isLoading
}) => {
  // This is a placeholder component
  // Implement the behavioral characteristics form fields here

  return (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      <div className="p-3 bg-[#475746] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Comportamento social</h2>
        <Button variant="ghost" size="icon" className="text-white">
          <HelpCircle size={20} />
        </Button>
      </div>

      <div className="p-6 bg-[#324250]">
        <div className="text-white">
          {/* Form content will go here */}
          <p>Conteúdo do formulário para comportamento social será implementado aqui.</p>
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

export default SegmentThree;
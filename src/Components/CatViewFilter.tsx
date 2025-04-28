import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  title: string;
  options: FilterOption[];
}

interface CatViewFilterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (selectedFilters: Record<string, string[]>) => void;
}

const CatViewFilter = ({ 
  open, 
  onOpenChange,
  onApplyFilters 
}: CatViewFilterProps) => {

  const filterCategories: FilterCategory[] = [
    {
      title: 'Idade',
      options: [
        { id: '0-1', label: '0-1 ano' },
        { id: '1-2', label: '1-2 anos' },
        { id: '2-4', label: '2-4 anos' },
        { id: '4-7', label: '4-7 anos' },
        { id: '8-12', label: '8-12 anos' },
        { id: '12-15', label: '12-15 anos' },
      ],
    },
    {
      title: 'Marcação',
      options: [
        { id: 'marked', label: 'Marcado' },
        { id: 'unmarked', label: 'Não marcado' },
      ],
    },
    {
      title: 'Sexo',
      options: [
        { id: 'male', label: 'Macho' },
        { id: 'female', label: 'Fêmea' },
        { id: 'unspecified', label: 'Não especificado' },
      ],
    },
    {
      title: 'Status',
      options: [
        { id: 'healthy', label: 'Saudável' },
        { id: 'attention', label: 'Em atenção' },
        { id: 'critical', label: 'Crítico' },
      ],
    },
    {
      title: 'Comorbidade',
      options: [
        { id: 'urinary', label: 'Incontinência Urinária' },
        { id: 'obesity', label: 'Obesidade' },
        { id: 'arthritis', label: 'Artrite' },
        { id: 'renal', label: 'Doença Renal Crônica' },
        { id: 'lymphoma', label: 'Linfoma' },
        { id: 'intestinal', label: 'Doença Inflamatória Intestinal' },
        { id: 'fiv', label: 'Infecção por FIV' },
      ],
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    'Idade': [],
    'Marcação': [],
    'Sexo': [],
    'Status': [],
    'Comorbidade': [],
  });

  const handleFilterOptionClick = (categoryTitle: string, optionId: string) => {
    setSelectedFilters(prev => {
      const updatedCategory = [...(prev[categoryTitle] || [])];
      
      // Toggle selection
      const index = updatedCategory.indexOf(optionId);
      if (index === -1) {
        updatedCategory.push(optionId);
      } else {
        updatedCategory.splice(index, 1);
      }
      
      return {
        ...prev,
        [categoryTitle]: updatedCategory,
      };
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-700 text-white border-gray-600 max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Filtros</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {filterCategories.map((category) => (
            <div key={category.title} className="space-y-2">
              <h3 className="font-medium text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => {
                  const isSelected = selectedFilters[category.title]?.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        isSelected 
                          ? 'bg-purple-700 text-white' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: isSelected ? '#6C1482' : '#f1f1f1'
                      }}
                      onClick={() => handleFilterOptionClick(category.title, option.id)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pt-2">
          <Button 
            onClick={handleApplyFilters}
            className="px-10 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            USAR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CatViewFilter;
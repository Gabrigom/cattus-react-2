import React, { useState, useRef } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { toast } from 'react-toastify';
import { CompanyService } from '@/Services';

interface CompanyDataProps {
  _id: string;
  cnpj: string;
  name: string;
  logo: string;
  phone: string;
  color: string;
}

const CompanyData: React.FC<CompanyDataProps> = ({ _id, cnpj, name, logo, phone, color }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: phone,
    color: color || '#3c8054',
  });
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, color: value }));
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewLogo(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewLogo(previewUrl);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updateData: any = {};
      
      if (formData.phone !== phone) {
        updateData['companyDetails.companyPhone'] = formData.phone;
      }
      
      if (formData.color !== color) {
        updateData['companyDetails.companyColor'] = formData.color;
      }

      if (newLogo) {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('companyLogo', newLogo);
        
        Object.keys(updateData).forEach(key => {
          formDataToSubmit.append(key, updateData[key]);
        });


        await CompanyService.update(_id, formDataToSubmit);
      } else if (Object.keys(updateData).length > 0) {
        await CompanyService.update(_id, updateData);
      }

      toast.success('Dados da empresa atualizados com sucesso');
      setIsEditing(false);
      setIsLoading(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Erro ao atualizar dados da empresa');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      phone: phone,
      color: color,
    });
    setNewLogo(null);
    setPreviewLogo(null);
  };

  const colorOptions = [
    { name: 'Verde', value: '#3c8054' },
    { name: 'Roxo', value: '#6C1482' },
    { name: 'Azul', value: '#1465BB' },
    { name: 'Vermelho', value: '#BB1414' },
    { name: 'Laranja', value: '#BB7114' },
  ];

  return (
    <div className="bg-[#324250] rounded-md overflow-hidden">
      <div 
        className="p-3 flex justify-between items-center"
        style={{ backgroundColor: formData.color }}
      >
        <h2 className="text-lg font-semibold text-white">{name}</h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-40 h-40 relative rounded-md overflow-hidden cursor-pointer bg-white"
            onClick={isEditing ? handleLogoClick : undefined}
          >
            <img 
              src={previewLogo || logo} 
              alt={name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/imgs/logo_compact.png';
              }}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">Alterar logo</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">CNPJ</label>
            <Input
              value={cnpj}
              disabled
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Cor</label>
              <Select
                value={formData.color}
                onValueChange={handleSelectChange}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione uma cor" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-600">
                  {colorOptions.map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2" 
                          style={{ backgroundColor: option.value }}
                        ></div>
                        {option.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-white mb-2">Telefone</label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <div className="flex gap-3">
              <Button 
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              EDITAR
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyData;
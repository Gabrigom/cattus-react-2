import { toast } from 'react-toastify';
import { api } from '@/Services';

interface ImageUploadResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
    key?: string;
    filename?: string;
  };
}

export const uploadImageFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.uploadImage<ImageUploadResponse>(formData);
    
    if (response.success && response.data?.url) {
      console.log('Image uploaded successfully, URL:', response.data.url);
      return response.data.url;
    } else {
      toast.error(response.message || 'Erro ao fazer upload da imagem');
      console.error('Erro ao fazer upload de imagem:', response);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer upload da imagem: ', error);
    toast.error('Erro ao fazer upload da imagem. Tente novamente.');
    return null;
  }
};
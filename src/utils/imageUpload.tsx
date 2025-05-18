import { toast } from 'react-toastify';
import { api } from '@/Services';

interface ImageUploadResponse {
  ok: boolean;
  message: string;
  img_url: string;
}

export const uploadImageFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('imagem', file);
    
    const response = await api.uploadImage<ImageUploadResponse>(formData);
    
    if (response.ok && response.img_url) {
      console.log('Image subida com sucesso, URL:', response.img_url);
      return response.img_url;
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
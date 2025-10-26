import { API_URL } from './api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface ReportOptions {
  profile?: boolean;
  status?: boolean;
  activities?: boolean;
}

const getAnimalReport = async (animalId: string, offset: number = 0, limit: number = 50): Promise<void> => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      toast.error('Sessão expirada. Faça login novamente.');
      return;
    }
    
    const response = await fetch(`${API_URL}/cats/report/${animalId}?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error generating report');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio.pdf`;
    document.body.appendChild(a);
    a.click();
    
    return;
  } catch (error) {
    console.error('Error generating report:', error);
    toast.error(error instanceof Error ? error.message : 'Erro ao gerar relatório');
    throw error;
  }
};

export default {
  getAnimalReport
};
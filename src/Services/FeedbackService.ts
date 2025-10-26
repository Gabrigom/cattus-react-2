import { postDataJSON } from './api';
import { toast } from 'react-toastify';
import { ApiResponse, Feedback } from './types';

interface FeedbackData {
  text: string;
  author?: string;
  company?: string; 
}

const submitFeedback = async (data: FeedbackData): Promise<ApiResponse> => {
  try {
    // Placeholder - feedback endpoint not implemented in NestJS yet
    // return await postDataJSON<ApiResponse>('/feedback', data, "Feedback enviado com sucesso!");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Feedback enviado com sucesso!",
      data: { id: "placeholder-id" }
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    toast.error('Erro ao enviar feedback. Tente novamente mais tarde.');
    throw error;
  }
};

export default {
  submitFeedback
};
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/Components/ui/dialog';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { toast } from 'react-toastify';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onOpenChange
}) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Por favor, escreva seu feedback antes de enviar.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Feedback enviado com sucesso!');
      setFeedback('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Erro ao enviar feedback. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-xl font-semibold">Enviar Feedback</DialogTitle>
        </DialogHeader>

        <div className="mt-4 mb-4">
          <label className="block text-white mb-2">
            Nos dê seu feedback sobre o sistema:
          </label>
          <Textarea
            className="bg-gray-700 border-gray-600 text-white h-32 resize-none"
            placeholder="Escreva suas sugestões, problemas ou dúvidas aqui..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="text-black border-gray-600 hover:bg-purple-700 hover:text-white"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
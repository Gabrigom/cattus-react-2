import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/Components/ui/hover-card';

interface CameraViewTooltipProps {
  children: React.ReactNode;
}

const CameraViewTooltip = ({ children }: CameraViewTooltipProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-gray-700 text-white border-gray-600 p-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações</h3>
          
          <div className="space-y-3">
            <h4 className="font-medium">Câmeras</h4>
            <p className="text-sm">
              Clique na miniatura para expandir o vídeo da câmera. As câmeras mostram transmissão em tempo real com atraso de aproximadamente 5 segundos.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Filtros</h4>
            <p className="text-sm">
              Use o botão de filtros para selecionar câmeras por local ou visualizar apenas câmeras com detecção de presença.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CameraViewTooltip;
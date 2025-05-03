import { Button } from '@/Components/ui/button';
import { Pause, Play, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  isActive: boolean;
  imageUrl: string;
  title: string;
  className?: string;
}

const VideoPlayer = ({ isActive, imageUrl, title, className = "" }: VideoPlayerProps) => {
  return (
    <div className={`relative bg-gray-800 rounded-md overflow-hidden aspect-video w-[90%] mx-auto ${className}`}>
      {isActive ? (
        <>
          {/* This would be replaced with actual video player */}
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex space-x-3">
            <Button variant="ghost" size="icon" className="bg-black bg-opacity-40 text-white hover:bg-black hover:bg-opacity-60">
              <Pause size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-black bg-opacity-40 text-white hover:bg-black hover:bg-opacity-60">
              <Maximize size={20} />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400 p-6">
            <p className="text-xl font-semibold mb-2">Câmera desativada</p>
            <p>Esta câmera está atualmente desativada.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
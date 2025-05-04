import { useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type CatStatus = 'healthy' | 'attention' | 'critical';

interface CatCardProps {
  id: string;
  name: string;
  gender: string;
  age: number;
  imageUrl: string;
  status: CatStatus;
  initialMarked?: boolean;
  onMarkToggle?: (id: string, marked: boolean) => void;
}

const getStatusColor = (status: CatStatus): string => {
  switch (status) {
    case 'healthy':
      return '#42AA49'; // Green
    case 'attention':
      return '#FED400'; // Yellow
    case 'critical':
      return '#FF0200'; // Red
    default:
      return '#42AA49';
  }
};

const CatCard = ({
  id,
  name,
  gender,
  age,
  imageUrl,
  status,
  initialMarked = false,
  onMarkToggle
}: CatCardProps) => {
  const [isMarked, setIsMarked] = useState(initialMarked);
  const navigate = useNavigate();
  
  const statusColor = getStatusColor(status);
  
  const handleMarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from triggering
    const newMarkedState = !isMarked;
    setIsMarked(newMarkedState);
    if (onMarkToggle) {
      onMarkToggle(id, newMarkedState);
    }
  };

  const handleCardClick = () => {
    navigate(`/cats/${id}`);
  };

  return (
    <div 
      className="relative rounded-md overflow-hidden cursor-pointer" 
      style={{ 
        width: '190px', 
        height: '250px',
        border: `2px solid ${statusColor}`
      }}
      onClick={handleCardClick}
    >
      {/* Status indicator circle */}
      <div 
        className="absolute top-2 left-2 rounded-full z-10"
        style={{ 
          width: '14px', 
          height: '14px', 
          backgroundColor: statusColor 
        }}
      />
      
      {/* Star button */}
      <button
        onClick={handleMarkToggle}
        className="absolute top-2 right-2 z-10 bg-transparent border-none cursor-pointer"
        aria-label={isMarked ? "Desmarcar gato" : "Marcar gato"}
      >
        <Star 
          size={20} 
          fill={isMarked ? "white" : "transparent"} 
          color="white"
        />
      </button>
      
      {/* Cat image */}
      <div className="h-3/4 w-full bg-gray-300 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`Foto de ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Cat info */}
      <div className="p-2 bg-black text-white">
        <h3 className="font-bold text-sm truncate">{name || "Nome do gato(a)"}</h3>
        <div className="flex justify-between items-center mt-1 text-xs">
          <span>{gender} • {age} anos</span>
          <span className="text-gray-400">CID: {id}</span>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
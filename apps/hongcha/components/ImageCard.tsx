import { useRef, useState } from 'react';
import ImageLoader from './ImageLoader';
import DescriptionCard from './DescriptionCard';

interface ImageCardProps {
  title: string;
  posterPath: string;
  id: number;
}

const ImageCard = ({ title, posterPath, id }: ImageCardProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsMouseEnter(true);
    }, 500);
    mouseEnterTimer.current = timer;
  };

  const handleMouseLeave = () => {
    clearTimeout(mouseEnterTimer.current as NodeJS.Timeout);
    setIsMouseEnter(false);
  };
  return (
    <li
      className="basis-1/4 grow-0 shrink-0 px-4 relative hover:opacity-80 transition-transform h-80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isMouseEnter ? { transform: 'scale(1.1)', margin: '0 20px' } : {}}
    >
      <ImageLoader src={`http://image.tmdb.org/t/p/w500${posterPath}`} />
      {isMouseEnter && <DescriptionCard title={title} id={id} />}
    </li>
  );
};

export default ImageCard;

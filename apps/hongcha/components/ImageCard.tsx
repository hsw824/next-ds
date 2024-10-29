import { useRef, useState } from 'react';
import ImageLoader from './ImageLoader';
import DescriptionCard from './DescriptionCard';

interface ImageCardProps {
  title: string;
  posterPath: string;
}

const ImageCard = ({ title, posterPath }: ImageCardProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const mouseEnterTimer = useRef<NodeJS.Timeout | null>(null);
  const imgContainerRef = useRef<HTMLLIElement | null>(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsMouseEnter(true);
      if (!imgContainerRef.current) return;
      imgContainerRef.current.style.transform = 'scale(1.1)';
      imgContainerRef.current.style.margin = '0 20px';
    }, 500);
    mouseEnterTimer.current = timer;
  };

  const handleMouseLeave = () => {
    clearTimeout(mouseEnterTimer.current as NodeJS.Timeout);
    if (!imgContainerRef.current) return;
    imgContainerRef.current.style.transform = 'scale(1)';
    imgContainerRef.current.style.margin = '0';

    setIsMouseEnter(false);
  };
  return (
    <li
      className="basis-1/4 grow-0 shrink-0 px-4 relative hover:opacity-80 transition-transform h-80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={imgContainerRef}
    >
      <ImageLoader src={`http://image.tmdb.org/t/p/w500${posterPath}`} />
      {isMouseEnter && <DescriptionCard title={title} />}
    </li>
  );
};

export default ImageCard;

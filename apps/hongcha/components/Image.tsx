import { useRef, useState } from 'react';

interface ImageProps {
  title: string;
  posterPath: string;
}

const Image = ({ title, posterPath }: ImageProps) => {
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
      className="min-w-[300px] px-4 relative hover:opacity-80 transition-transform h-80"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={imgContainerRef}
    >
      <img className="w-full" src={`http://image.tmdb.org/t/p/w500${posterPath}`} />
      {isMouseEnter && <div className="w-full h-full text-white absolute top-1/2">{title}</div>}
    </li>
  );
};

export default Image;

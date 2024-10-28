import { useState } from 'react';

interface ImageProps {
  title: string;
  posterPath: string;
}

export default function Image({ title, posterPath }: ImageProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <li className="min-w-[300px] pr-4 relative">
      <img
        className="w-full h-full"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        src={`http://image.tmdb.org/t/p/w500${posterPath}`}
      />
      {isHover && <div className="text-white absolute bottom-6">{title}</div>}
    </li>
  );
}

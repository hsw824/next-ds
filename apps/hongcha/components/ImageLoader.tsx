import useIntersectionObserver from 'hook/useIntersectionObserver';
import { useEffect, useRef } from 'react';

interface ImageLoaderType {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

const ioOptions = {
  threshold: 0,
  rootMargin: '100% 0% 100% 0%',
};

const ImageLoader = ({ src, width, height, alt = '' }: ImageLoaderType) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { entries } = useIntersectionObserver(imgRef, ioOptions);

  useEffect(() => {
    const isVisible = entries[0]?.isIntersecting;
    if (isVisible) {
      imgRef.current!.src = src;
    }
  }, [src, entries]);

  return <img ref={imgRef} width={width} height={height} alt={alt} />;
};

export default ImageLoader;

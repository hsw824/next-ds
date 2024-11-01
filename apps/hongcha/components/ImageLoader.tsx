import { useEffect, useState } from 'react';

interface ImageLoaderType {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
}

const ImageLoader = ({ src, width, height, alt = '' }: ImageLoaderType) => {
  const [status, setStatus] = useState<'error' | 'load' | 'success'>('load');
  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setStatus('success');
    };

    img.onerror = () => {
      setStatus('error');
    };
  }, [src]);

  if (status === 'load') return <div>로딩</div>;
  if (status === 'error') return <div>오류</div>;
  return <img src={src} width={width} height={height} alt={alt} />;
};

export default ImageLoader;

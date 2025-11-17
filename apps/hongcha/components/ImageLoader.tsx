import useIntersectionObserver from 'hook/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
// TODO:오류 시 재시도 버튼 추가해보기
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
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  useEffect(() => {
    const isVisible = entries[0]?.isIntersecting;
    if (isVisible) {
      setStatus('loading');
      imgRef.current!.onload = () => {
        setStatus('success');
      };
      imgRef.current!.onerror = () => {
        setStatus('error');
      };

      imgRef.current!.src = src;
    }
  }, [src, entries]);

  return (
    <div className="w-full h-full">
      {status === 'loading' && <div className="bg-slate-200 animate-pulse h-full" />}
      {status === 'error' && <div className=" bg-white h-full">오류 관리자에게 문의하세요</div>}
      <img ref={imgRef} width={width} height={height} alt={alt} />
    </div>
  );
};

export default ImageLoader;

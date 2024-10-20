import { RefObject, useEffect } from 'react';

const useOnclickOutside = (ref: RefObject<HTMLElement>, onClose: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) return;
    onClose();
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useOnclickOutside;

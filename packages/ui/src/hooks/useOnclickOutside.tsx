import { RefObject, useEffect } from 'react';

const useOnclickOutside = (ref: RefObject<HTMLElement>, onClose: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) return;
    onClose();
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOnclickOutside;

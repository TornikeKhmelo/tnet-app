import { useEffect } from 'react';

interface UseClickOutsideParams {
  refs: React.RefObject<HTMLDivElement | null>[];
  isOpenStates: boolean[];
  onClose: (index: number) => void;
}

export const useClickOutside = ({ refs, isOpenStates, onClose }: UseClickOutsideParams) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      refs.forEach((ref, index) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          onClose(index);
        }
      });
    };

    if (isOpenStates.some((isOpen) => isOpen)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, isOpenStates, onClose]);
};


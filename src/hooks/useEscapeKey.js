import { useEffect, useCallback } from 'react';

const useEscapeKey = ({ setIsOpen, isOpen }) => {
  const escFunction = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  // Ejecuta el evento de cierre al presionar la tecla Escape
  useEffect(() => {
    if (!isOpen) {
      document.removeEventListener('keydown', escFunction, false);
      return;
    }
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction, isOpen]);
};

export { useEscapeKey };

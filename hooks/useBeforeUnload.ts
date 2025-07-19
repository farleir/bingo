import { useEffect } from 'react';

export const useBeforeUnload = (
  shouldPrevent: boolean,
  message = 'Tem certeza que deseja sair? O progresso do jogo será perdido.'
) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldPrevent) {
        event.preventDefault();
        event.returnValue = message; // Standard for most browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldPrevent, message]);
};

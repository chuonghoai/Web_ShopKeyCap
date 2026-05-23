import { useState, useEffect, useRef } from 'react';

export type ViewState = 'login' | 'register' | 'forgot';

export const useAuthPageController = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const rightPaneRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rightPaneRef.current) return;
    const rect = rightPaneRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formContainerRef.current && !formContainerRef.current.contains(e.target as Node)) {
        setIsFormActive(false);
      }
    };

    const handleWindowBlur = () => {
      setIsHovering(false);
      setIsFormActive(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return {
    currentView,
    setCurrentView,
    mousePos,
    isHovering,
    setIsHovering,
    isFormActive,
    setIsFormActive,
    rightPaneRef,
    formContainerRef,
    handleMouseMove
  };
};

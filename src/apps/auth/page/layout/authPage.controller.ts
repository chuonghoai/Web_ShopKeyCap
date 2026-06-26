import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type ViewState = 'login' | 'register' | 'forgot-password' | 'reset-password';

export const useAuthPageController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const rightPaneRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Set commponent view base to URL
   */
  useEffect(() => {
    const path = location.pathname;

    if (path.endsWith('/register')) {
      setCurrentView('register');
    } else if (path.endsWith('/forgot-password')) {
      setCurrentView('forgot-password');
    } else if (path.endsWith('/reset-password')) {
      setCurrentView('reset-password');
    } else {
      setCurrentView('login');
    }
  }, [location.pathname]);

  /**
   * Navigate view and change URL
   */
  const handleNavigateView = (view: ViewState, email?: string) => {
    setCurrentView(view);
    if (email) setResetEmail(email);
    navigate(`/${view}`);
  };

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
    setCurrentView: handleNavigateView,
    resetEmail,
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

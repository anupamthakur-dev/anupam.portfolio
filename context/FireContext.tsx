
import React, { createContext, useContext, useRef, useCallback } from 'react';

// Rect interface preserved for type compatibility if needed, though mostly handled internally now
export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface FireContextType {
  register: (id: string, element: HTMLElement) => void;
  unregister: (id: string) => void;
  setHoverState: (id: string, isHovered: boolean) => void;
  sourcesRef: React.MutableRefObject<Map<string, { element: HTMLElement; isHovered: boolean }>>;
}

const FireContext = createContext<FireContextType | null>(null);

export const FireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store the actual DOM element to measure it live in the animation loop
  const sourcesRef = useRef(new Map<string, { element: HTMLElement; isHovered: boolean }>());

  const register = useCallback((id: string, element: HTMLElement) => {
    sourcesRef.current.set(id, { element, isHovered: false });
  }, []);

  const unregister = useCallback((id: string) => {
    sourcesRef.current.delete(id);
  }, []);

  const setHoverState = useCallback((id: string, isHovered: boolean) => {
    const existing = sourcesRef.current.get(id);
    if (existing) {
      existing.isHovered = isHovered;
    }
  }, []);

  return (
    <FireContext.Provider value={{ register, unregister, setHoverState, sourcesRef }}>
      {children}
    </FireContext.Provider>
  );
};

export const useFire = () => {
  const context = useContext(FireContext);
  if (!context) throw new Error("useFire must be used within a FireProvider");
  return context;
};

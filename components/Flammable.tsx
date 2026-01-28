
import React, { useRef, useEffect, useId } from 'react';
import { useFire } from '../context/FireContext';

interface FlammableProps {
  children: React.ReactElement<any>;
  className?: string;
  as?: React.ElementType;
  forcedHover?: boolean;
}

const Flammable: React.FC<FlammableProps> = ({ children, className = '', as: Component = 'div', forcedHover }) => {
  const id = useId();
  const elementRef = useRef<HTMLElement>(null);
  const { register, unregister, setHoverState } = useFire();

  useEffect(() => {
    if (!elementRef.current) return;

    // Register the element reference directly so the physics engine can track it live
    register(id, elementRef.current);

    return () => {
      unregister(id);
    };
  }, [id, register, unregister]);

  // Handle Forced Hover Prop
  useEffect(() => {
    if (forcedHover !== undefined) {
        setHoverState(id, forcedHover);
    }
  }, [forcedHover, id, setHoverState]);

  // Clone child to attach event listeners
  return React.cloneElement(children, {
    ref: elementRef,
    onMouseEnter: (e: React.MouseEvent) => {
        if (forcedHover === undefined) {
            setHoverState(id, true);
        }
        if (children.props.onMouseEnter) children.props.onMouseEnter(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
        if (forcedHover === undefined) {
            setHoverState(id, false);
        }
        if (children.props.onMouseLeave) children.props.onMouseLeave(e);
    }
  });
};

export default Flammable;

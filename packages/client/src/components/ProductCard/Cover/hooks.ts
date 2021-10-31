import React from 'react';
import { Size } from '../../../types/common'

export const useRect = () => {
  const container = React.useRef<HTMLDivElement>(null);
  const [ size, setSize ] = React.useState<Size>({width: 230, height: 230});

  const updateRect = () => {
    const el = container.current;
    if(!el){
      return;
    }
    const rect = el.getBoundingClientRect();
    setSize({
      width: rect.width,
      height: rect.height
    });
  }

  React.useEffect(() => {
    const el = container.current;
    if(!el){
      return;
    }
    updateRect();
    el.addEventListener('resize', updateRect);

    return () => {
      el.removeEventListener('resize', updateRect)
    }
  }, [])

  return {
    size,
    container
  }
}
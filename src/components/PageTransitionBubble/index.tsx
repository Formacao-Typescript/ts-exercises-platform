import React, { useEffect, useRef } from 'react';

import { Container } from './styles';
import { usePageTransitionBubble } from '@/store/navigation';

const ANIMATION_DURATION = 2000;

const PageTransitionBubble: React.FC = () => {
  const [bubbleState, setBubbleState] = usePageTransitionBubble();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (bubbleState.open) {
      ref.current.classList.add('animate-bubble');
      setTimeout(() => {
        ref.current!.classList.remove('animate-bubble');
        setBubbleState({ open: false });
      }, ANIMATION_DURATION);
    }
  }, [bubbleState]);

  return (
    <Container
      ref={ref}
      className="absolute bg-branding-green w-0 h-0 rounded-disform z-10"
    ></Container>
  );
};

export default PageTransitionBubble;

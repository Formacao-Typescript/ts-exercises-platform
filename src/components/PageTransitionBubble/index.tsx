import React, { useEffect, useRef } from 'react';

import { Container } from './styles';
import { usePageTransitionBubble } from '@/store/navigation';
import cn from 'classnames';

const ANIMATION_DURATION = 2000;

const PageTransitionBubble: React.FC = () => {
  const [bubbleState, setBubbleState] = usePageTransitionBubble();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (bubbleState.open) {
      ref.current.style.left = `${bubbleState.position[0]}px`;
      ref.current.style.top = `${bubbleState.position[1]}px`;
      ref.current.classList.add('animate-bubble');
      setTimeout(() => {
        ref.current!.classList.remove('animate-bubble');
        setBubbleState({ open: false, position: [0, 0] });
      }, ANIMATION_DURATION);
    }
  }, [bubbleState]);

  return (
    <Container
      ref={ref}
      className={cn(
        'absolute w-0 h-0 rounded-disform z-20',
        `bg-branding-${bubbleState.color ?? 'blue'}`
      )}
    >
      {/* FIXME: this is only needed for tailwind to not purge these colors since they're not being used anywhere else yet. 
      As we find use for them we can remove them from here */}
      <span className="bg-branding-green bg-branding-red bg-branding-yellow bg-branding-blue"></span>
    </Container>
  );
};

export default PageTransitionBubble;

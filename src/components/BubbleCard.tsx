import React from 'react';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

import { usePageTransitionBubble } from '@/store/navigation';

const BubbleCard: React.FC<Props> = ({ className, children, onClick }) => {
  const [, setBubbleState] = usePageTransitionBubble();

  return (
    <div
      className={cn(
        'items-center bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow sm:flex relative overflow-hidden group transition-transform duration-300 ease-in hover:scale-110',
        className,
        onClick && 'cursor-pointer'
      )}
      onClick={e => {
        setBubbleState({
          open: true,
          position: [e.clientX, e.clientY],
          color: 'green',
        });
        setTimeout(() => {
          onClick?.();
        }, 1000);
      }}
    >
      <span className="background-sphere w-20 h-20 z-0 bg-branding-green absolute top-[-30px] right-[-30px] rounded-disform animate-spin-slow transition-all ease-in-out duration-300 group-hover:w-[600px] group-hover:h-[600px] group-hover:top-[-100px] group-hover:right-[-100px]"></span>
      <div className="p-5 z-10">{children}</div>
    </div>
  );
};

export default BubbleCard;

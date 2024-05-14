import cn from 'classnames';
import React from 'react';

interface Props {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  onBackdropClick?: () => void;
  inactivityLimit?: number;
  onInactive?: () => void;
}

const Overlay: React.FC<Props> = ({
  open,
  children,
  className,
  onBackdropClick,
  inactivityLimit,
  onInactive,
}) => {
  let hoverTimeout: NodeJS.Timeout;
  return (
    <div className={cn(open ? 'block' : 'hidden')}>
      <span
        className="backdrop fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-10"
        onClick={() => onBackdropClick && onBackdropClick()}
      ></span>
      <span
        className={cn('overlay z-20', className)}
        onMouseEnter={() => inactivityLimit && clearTimeout(hoverTimeout)}
        onMouseLeave={() =>
          inactivityLimit &&
          (hoverTimeout = setTimeout(
            () => onInactive && onInactive(),
            inactivityLimit
          ))
        }
      >
        {children}
      </span>
    </div>
  );
};

export default Overlay;

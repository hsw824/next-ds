import createContext from '../../utils/createContext';
import PortalRoot from '../../utils/CreatePortal';
import ViewportContextProvider from '../../utils/viewportContext';
import useStyleInView from '../../hooks/useStyleInView';

import { Primitive } from '../Primitive';
import { MutableRefObject, PropsWithChildren, forwardRef, useRef, useState } from 'react';

interface ContextType {
  isHover: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperRef: MutableRefObject<HTMLElement | null>;
}

type TooltipType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

type TriggerType = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> & {
  disableHoverableContent?: boolean;
};

type PortalType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  container?: Element | null;
};

type ContentType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const [Provider, useContext] = createContext<ContextType>('tooltip');

const menuPosition = {
  top: 5,
  bottom: 5,
  left: 220,
  right: 220,
};

const Tooltip = forwardRef<HTMLDivElement, TooltipType>(({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false);
  const wrapperRef = useRef(null);

  return (
    <ViewportContextProvider>
      <Provider contextValue={{ isHover, setIsHover, wrapperRef }}>
        <Primitive.div ref={wrapperRef} {...props}>
          {children}
        </Primitive.div>
      </Provider>
    </ViewportContextProvider>
  );
});

const Trigger = forwardRef<HTMLButtonElement, TriggerType>(
  ({ children, disableHoverableContent = false, ...props }, ref) => {
    const { setIsHover } = useContext();

    const handleMouseEnter = () => {
      if (disableHoverableContent) return;
      setIsHover(true);
    };

    const handleMouseLeave = () => {
      setIsHover(false);
    };
    return (
      <Primitive.button ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        {children}
      </Primitive.button>
    );
  },
);

const Portal = ({ children, container }: PortalType) => {
  const { isHover } = useContext();
  return isHover && <PortalRoot container={container}>{children}</PortalRoot>;
};

const Content = forwardRef<HTMLDivElement, ContentType>(({ children, style, ...props }) => {
  const { wrapperRef } = useContext();
  const targetRef = useRef(null);

  const rectStyle = useStyleInView(wrapperRef, targetRef, menuPosition, 'absolute');
  const mergedStyle = { ...style, ...rectStyle };

  return (
    <Primitive.div {...props} ref={targetRef} style={mergedStyle}>
      {children}
    </Primitive.div>
  );
});

export default Object.assign(Tooltip, {
  Trigger,
  Portal,
  Content,
});

import PortalRoot from '../../utils/CreatePortal';
import createContext from '../../utils/createContext';

import { forwardRef, MutableRefObject, PropsWithChildren, useRef, useState } from 'react';
import { Primitive } from '../Primitive';
import ViewportContextProvider from '../../utils/viewportContext';
import useStyleInView from '../../hooks/useStyleInView';

type PopoverRootType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
type TriggerType = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;
type PortalType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  container?: Element | null;
};
type ContentType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

interface ContextType {
  toggle: boolean;
  handleToggle: () => void;
  wrapperRef: MutableRefObject<HTMLElement | null>;
}

// TODO: mergeRef, mergeClass, mergeStyle

const menuPosition = {
  top: 5,
  bottom: 5,
  left: 0,
  right: 0,
};

const [Provider, useContext] = createContext<ContextType>('popover');

const Popover = forwardRef<HTMLDivElement, PopoverRootType>(({ children, ...props }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  const wrapperRef = useRef(null);

  return (
    <ViewportContextProvider>
      <Provider contextValue={{ toggle, handleToggle, wrapperRef }}>
        <Primitive.div ref={wrapperRef} {...props} onClick={() => setToggle(false)}>
          {children}
        </Primitive.div>
      </Provider>
    </ViewportContextProvider>
  );
});

const Trigger = forwardRef<HTMLButtonElement, TriggerType>(({ children, ...props }, ref) => {
  const { handleToggle } = useContext();

  const handleClickTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggle();
  };
  return (
    <Primitive.button {...props} ref={ref} onClick={(e) => handleClickTrigger(e)}>
      {children}
    </Primitive.button>
  );
});

const Portal = ({ children, container }: PortalType) => {
  const { toggle } = useContext();
  return toggle && <PortalRoot container={container}>{children}</PortalRoot>;
};

const Content = forwardRef<HTMLDivElement, ContentType>(({ children, ...props }) => {
  const { style, ...contentProps } = props;
  const { wrapperRef } = useContext();

  const targetRef = useRef(null);

  const rectStyle = useStyleInView(wrapperRef, targetRef, menuPosition, 'absolute');
  const mergedStyle = { ...style, ...rectStyle };
  return (
    <Primitive.div {...contentProps} style={mergedStyle} ref={targetRef} onClick={(e) => e.stopPropagation()}>
      {children}
    </Primitive.div>
  );
});

export default Object.assign(Popover, {
  Trigger,
  Portal,
  Content,
});

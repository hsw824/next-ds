import PortalRoot from '@/utils/CreatePortal';
import createContext from '@/utils/createContext';
import ViewportContextProvider from '@/utils/viewportContext';
import useStyleInView from '@/hooks/useStyleInView';
import useOnclickOutside from '@/hooks/useOnclickOutside';

import { forwardRef, MutableRefObject, PropsWithChildren, useRef, useState } from 'react';
import { Primitive } from '@/components/Primitive';

type PopoverRootType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
type TriggerType = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;
type PortalType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  container?: Element | null;
};
type ContentType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

interface ContextType {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
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

  const wrapperRef = useRef(null);

  return (
    <ViewportContextProvider>
      <Provider contextValue={{ toggle, setToggle, wrapperRef }}>
        <Primitive.div ref={wrapperRef} {...props}>
          {children}
        </Primitive.div>
      </Provider>
    </ViewportContextProvider>
  );
});

const Trigger = forwardRef<HTMLButtonElement, TriggerType>(({ children, ...props }, ref) => {
  const { setToggle } = useContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setToggle((prev) => !prev);
  };

  return (
    <Primitive.button {...props} ref={ref} onClick={handleClick}>
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
  const { wrapperRef, setToggle } = useContext();

  const targetRef = useRef(null);
  const rectStyle = useStyleInView(wrapperRef, targetRef, menuPosition, 'absolute');
  const mergedStyle = { ...style, ...rectStyle };
  useOnclickOutside(targetRef, () => setToggle(false));

  return (
    <Primitive.div {...contentProps} style={mergedStyle} ref={targetRef}>
      {children}
    </Primitive.div>
  );
});

export default Object.assign(Popover, {
  Trigger,
  Portal,
  Content,
});

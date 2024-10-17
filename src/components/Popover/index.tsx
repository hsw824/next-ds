import PortalRoot from '../../utils/CreatePortal';
import createContext from '../../utils/createContext';

import { forwardRef, PropsWithChildren, useState } from 'react';
import { Primitive } from '../Primitive';

type PopoverRootType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
type TriggerType = PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>;
type PortalType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  container?: Element | null;
};
type ContentType = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

interface ContextType {
  toggle: boolean;
  handleToggle: () => void;
}
const [Provider, useContext] = createContext<ContextType>('popover');

const Popover = forwardRef<HTMLDivElement, PopoverRootType>(({ children, ...props }, ref) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Provider contextValue={{ toggle, handleToggle }}>
      <Primitive.div ref={ref} {...props} onClick={() => setToggle(false)}>
        {children}
      </Primitive.div>
    </Provider>
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

const Content = forwardRef<HTMLDivElement, ContentType>(({ children, ...props }, ref) => {
  return (
    <Primitive.div {...props} ref={ref} onClick={(e) => e.stopPropagation()}>
      {children}
    </Primitive.div>
  );
});

export default Object.assign(Popover, {
  Trigger,
  Portal,
  Content,
});

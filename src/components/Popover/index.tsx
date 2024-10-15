import PortalRoot from '../../utils/CreatePortal';
import { forwardRef } from 'react';
import { Primitive } from '../Primitive';
interface PopoverRootType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TriggerType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface PortalType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | null;
}

interface ContentType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type PopoverComponentType = React.ForwardRefExoticComponent<PopoverRootType & React.RefAttributes<HTMLDivElement>> & {
  Trigger: React.ForwardRefExoticComponent<TriggerType & React.RefAttributes<HTMLButtonElement>>;
  Portal: React.FC<PortalType>;
  Content: React.ForwardRefExoticComponent<ContentType & React.RefAttributes<HTMLDivElement>>;
};

const PopoverRoot = forwardRef<HTMLDivElement, PopoverRootType>(
  // TODO:context api를 써서 그 클릭했을때 저게 보이게 해야할듯
  ({ children, ...props }, ref) => {
    return (
      <Primitive.div ref={ref} {...props}>
        {children}
      </Primitive.div>
    );
  },
) as PopoverComponentType;

const Trigger = forwardRef<HTMLButtonElement, TriggerType>(({ children, ...props }, ref) => {
  return (
    <Primitive.button {...props} ref={ref}>
      {children}
    </Primitive.button>
  );
});

const Portal = ({ children, container }: PortalType) => {
  return <PortalRoot container={container}>{children}</PortalRoot>;
};

const Content = forwardRef<HTMLDivElement, ContentType>(({ children, ...props }, ref) => {
  return (
    <Primitive.div {...props} ref={ref}>
      {children}
    </Primitive.div>
  );
});

PopoverRoot.Trigger = Trigger;
PopoverRoot.Portal = Portal;
PopoverRoot.Content = Content;

export default PopoverRoot;

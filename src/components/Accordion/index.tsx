import './index.css';
import { ReactNode, forwardRef, useState } from 'react';
import createContext from '../../utils/createContext';
import { Primitive } from '../Primitive';
interface RootComponentType extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  type: 'single' | 'multiple';
}

interface ItemPropsType extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id: string;
}

interface SingleAccordionType {
  currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface MultipleAccordionType {
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}

type AccordionContextType = SingleAccordionType | MultipleAccordionType;

type AccordionComponentType = React.ForwardRefExoticComponent<
  RootComponentType & React.RefAttributes<HTMLDivElement>
> & {
  Item: React.ForwardRefExoticComponent<ItemPropsType & React.RefAttributes<HTMLDivElement>>;
  Trigger: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
  Content: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
};

const [Provider, useContext] = createContext<AccordionContextType>('accordion', null);

const Root = forwardRef<HTMLDivElement, RootComponentType>(({ children, type, ...props }, ref) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<string[]>([]);

  const contextValue: AccordionContextType =
    type === 'single' ? { currentId, setCurrentId } : { selectedList, setSelectedList };
  return (
    <Provider contextValue={contextValue}>
      <Primitive.div className="container" {...props} ref={ref}>
        {children}
      </Primitive.div>
    </Provider>
  );
}) as AccordionComponentType;

const Item = forwardRef<HTMLDivElement, ItemPropsType>(({ children, ...props }, ref) => {
  return (
    <Primitive.div ref={ref} {...props}>
      {children}
    </Primitive.div>
  );
});

const Trigger = forwardRef<HTMLDivElement, AccordionItemProps>(({ children, id, ...props }, ref) => {
  const context = useContext();

  const handleToggle = () => {
    if ('currentId' in context) {
      context.setCurrentId((prev) => (prev === id ? null : id));
    } else {
      context.setSelectedList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    }
  };
  return (
    <Primitive.div className="title" onClick={handleToggle} ref={ref} {...props}>
      {children}
    </Primitive.div>
  );
});

const Content = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const { children, id, style, ...contentProps } = props;

  const context = useContext();
  const isOpen = 'currentId' in context ? context.currentId === id : context.selectedList.includes(id);

  const basicStyle: React.CSSProperties = {
    overflowY: 'hidden',
    maxHeight: isOpen ? '100vh' : '0',
    transition: 'all 0.3s',
  };
  const mergeStyle = style ? { ...style, ...basicStyle } : basicStyle;
  return (
    <Primitive.div role="button" className="content" style={mergeStyle} ref={ref} {...contentProps}>
      {children}
    </Primitive.div>
  );
});

Root.Item = Item;
Root.Trigger = Trigger;
Root.Content = Content;

export default Root;

import './index.css';
import createContext from '@/utils/createContext';

import { ReactNode, forwardRef, useState } from 'react';
import { Primitive } from '@/components/Primitive';
interface DataType {
  id: number;
  title: string;
  description: ReactNode;
}

interface ContextType {
  data: DataType[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface ContainerType {
  data: DataType[];
  children: ReactNode;
}

interface ButtonType {
  id: number;
  title: string;
}

type TabMenuComponent = React.ForwardRefExoticComponent<ContainerType & React.RefAttributes<HTMLDivElement>> & {
  TabButtons: React.ForwardRefExoticComponent<{ children: ReactNode } & React.RefAttributes<HTMLDivElement>>;
  TabButton: React.ForwardRefExoticComponent<ButtonType & React.RefAttributes<HTMLButtonElement>>;
  TabContent: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
};

const [Provider, useContext] = createContext<ContextType>('tab-context', null);

const TabMenuContainer = forwardRef<HTMLDivElement, ContainerType>(({ children, data }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(data[0].id);

  return (
    <Provider contextValue={{ data, currentIndex, setCurrentIndex }}>
      <Primitive.div ref={ref} className="tab-container">
        {children}
      </Primitive.div>
    </Provider>
  );
}) as TabMenuComponent;

const TabButtons = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
  return (
    <Primitive.div ref={ref} className="tab-button-container">
      {children}
    </Primitive.div>
  );
});

const TabButton = forwardRef<HTMLButtonElement, ButtonType>(({ id, title }, ref) => {
  const { currentIndex, setCurrentIndex } = useContext();
  return (
    <Primitive.button
      onClick={() => {
        setCurrentIndex(id);
      }}
      ref={ref}
      className="tab-button"
      style={{ backgroundColor: currentIndex === id ? 'blue' : '' }}
    >
      {title}
    </Primitive.button>
  );
});

const TabContent = forwardRef<HTMLDivElement>(() => {
  const { currentIndex, data } = useContext();
  const currentItem = data.find((item) => item.id === currentIndex);
  return <Primitive.div className="tab-content">{currentItem!.description}</Primitive.div>;
});

TabMenuContainer.TabButtons = TabButtons;
TabMenuContainer.TabButton = TabButton;
TabMenuContainer.TabContent = TabContent;

export default TabMenuContainer;

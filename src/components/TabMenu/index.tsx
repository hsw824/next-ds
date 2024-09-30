import './index.css';

import { ReactNode, createContext, useContext, useState } from 'react';

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

const TabMenuContext = createContext<ContextType | null>(null);

const TabMenuContainer = ({ children, data }: ContainerType) => {
  const [currentIndex, setCurrentIndex] = useState(data[0].id);

  return (
    <TabMenuContext.Provider value={{ data, currentIndex, setCurrentIndex }}>
      <div className="tab-container">{children}</div>
    </TabMenuContext.Provider>
  );
};

const TabButtons = ({ children }: { children: ReactNode }) => {
  return <div className="tab-button-container">{children}</div>;
};

const TabButton = ({ id, title }: ButtonType) => {
  const tabContext = useContext(TabMenuContext);
  const { currentIndex, setCurrentIndex } = tabContext as ContextType;

  return (
    <button
      onClick={() => {
        setCurrentIndex(id);
      }}
      className="tab-button"
      style={{ backgroundColor: currentIndex === id ? 'blue' : '' }}
    >
      {title}
    </button>
  );
};

const TabContent = () => {
  const tabContext = useContext(TabMenuContext);
  const { currentIndex, data } = tabContext as ContextType;
  const currentItem = data.find((item) => item.id === currentIndex);
  return <div className="tab-content">{currentItem!.description}</div>;
};

TabMenuContainer.TabButtons = TabButtons;
TabMenuContainer.TabButton = TabButton;
TabMenuContainer.TabContent = TabContent;

export default TabMenuContainer;

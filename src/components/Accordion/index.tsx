import './index.css';
import { ReactNode, useState } from 'react';
import { MultipleProvider, useMultipleContext } from './MutipleContext';
import { SingleProvider, useSingleContext } from './SingleContext';

const Root = ({ children, type }: { children: ReactNode; type: 'single' | 'multiple' }) => {
  if (type === 'single') {
    return <SingleAccordion>{children}</SingleAccordion>;
  }
  return <MultipleAccordion>{children}</MultipleAccordion>;
};

const SingleAccordion = ({ children }: { children: ReactNode }) => {
  const [currentId, setCurrentId] = useState<string | null>(null);

  return (
    <SingleProvider contextValue={{ currentId, setCurrentId }}>
      <div className="container">{children}</div>
    </SingleProvider>
  );
};

const MultipleAccordion = ({ children }: { children: ReactNode }) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  return (
    <MultipleProvider contextValue={{ selectedList, setSelectedList }}>
      <div className="container">{children}</div>
    </MultipleProvider>
  );
};

const Item = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const Trigger = ({ children, id }: { children: ReactNode; id: string }) => {
  const singleContext = useSingleContext();
  const multipleContext = useMultipleContext();

  const handleSingleToggle = () => {
    if (!singleContext) return;
    const { setCurrentId } = singleContext;
    setCurrentId((prev) => (prev === id ? null : id));
  };

  const handleMultiToggle = () => {
    if (!multipleContext) return;
    const { selectedList, setSelectedList } = multipleContext;
    const open = selectedList.includes(id);
    setSelectedList(open ? selectedList.filter((item) => item !== id) : [...selectedList, id]);
  };

  const handleToggle = () => {
    if (singleContext) return handleSingleToggle();
    handleMultiToggle();
  };
  return (
    <div className="title" onClick={handleToggle}>
      {children}
    </div>
  );
};

const Content = ({ children, id }: { children: ReactNode; id: string }) => {
  const singleContext = useSingleContext();
  const multipleContext = useMultipleContext();

  const isOpen = singleContext ? singleContext.currentId === id : multipleContext.selectedList.includes(id);

  return (
    <div
      role="button"
      className="content"
      style={{
        overflowY: 'hidden',
        maxHeight: isOpen ? '100vh' : '0',
        transition: 'all 0.3s',
      }}
    >
      {children}
    </div>
  );
};

Root.Item = Item;
Root.Trigger = Trigger;
Root.Content = Content;

export default Root;

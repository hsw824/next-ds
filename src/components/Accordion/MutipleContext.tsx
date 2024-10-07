import createContext from '../../utils/createContext';

interface MultipleContextType {
  selectedList: string[];
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
}

const [Provider, useContext] = createContext<MultipleContextType>('multiple-context', null);

export const MultipleProvider = Provider;
export const useMultipleContext = useContext;

import createContext from '../../utils/createContext';

interface SingleContextType {
  currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const [Provider, useContext] = createContext<SingleContextType>('multiple-context', null);

export const SingleProvider = Provider;
export const useSingleContext = useContext;

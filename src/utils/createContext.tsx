import React from 'react';
interface ContextProps<T> {
  children: React.ReactNode;
  contextValue?: T | null;
}

// 제네릭으로 타입 만든거 다시 체크하기
const createContext = <T extends object | null>(name: string, defaultValue?: T | null) => {
  const context = React.createContext<T | undefined | null>(defaultValue);

  const Provider = ({ children, contextValue }: ContextProps<T>) => {
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  const useContext = () => {
    const _context = React.useContext(context);
    if (!_context) throw new Error(`${name} context가 없습니다.`);

    return _context;
  };

  return [Provider, useContext] as const;
};

export default createContext;

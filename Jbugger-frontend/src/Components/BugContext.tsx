import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BugData } from '../Models/BugData';

interface CustomContextProps {
  bugs: BugData | undefined; // Allow bugs to be BugData or undefined
  updateBugs: (newData: BugData) => void;
}

const CustomContext = createContext<CustomContextProps | undefined>(undefined);

interface CustomContextProviderProps {
  children: ReactNode;
}

export const CustomContextProvider: React.FC<CustomContextProviderProps> = ({ children }) => {
  const [bugs, setBugs] = useState<BugData | undefined>();

  const updateBugs = (newData: BugData) => {
    setBugs(newData);
  };

  const contextValue: CustomContextProps = {
    bugs,
    updateBugs,
  };

  return <CustomContext.Provider value={contextValue}>{children}</CustomContext.Provider>;
};

export const useCustomContext = (): CustomContextProps => {
  const context = useContext(CustomContext);

  if (!context) {
    throw new Error('useCustomContext must be used within a CustomContextProvider');
  }

  return context;
};

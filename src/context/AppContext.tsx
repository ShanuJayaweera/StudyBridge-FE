import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  title: any[];
  updateTitle: (newTitle: string[]) => void;
  breadcrumbsFromPath: string[];
  updateBreadcrumbsFromPath: React.Dispatch<React.SetStateAction<string[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('');
  const [title, setTitle] = useState<string[]>([]);
  const [breadcrumbsFromPath, updateBreadcrumbsFromPath] = useState<string[]>([]);

  const updateTitle = (newTitle: string[]) => {
    setTitle(newTitle);
  };

  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        activeTab,
        setActiveTab,
        title,
        updateTitle,
        breadcrumbsFromPath,
        updateBreadcrumbsFromPath,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

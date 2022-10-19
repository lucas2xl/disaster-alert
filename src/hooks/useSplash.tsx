import React, { ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

export type SplashContextProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const SplashContext = createContext<SplashContextProps | null>(null);

export const SplashContextProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <SplashContext.Provider value={{ loading, setLoading }}>
      {children}
    </SplashContext.Provider>
  );
};

export const useSplash = () => {
  const context = useContext(SplashContext);

  if (context) {
    return context;
  }

  throw Error('Use this hook in UserProvider scope');
};

import { ReactNode, createContext, useContext, useState } from "react";

interface LoaderContext {
  loading: boolean;
  handleLoading: (bool: boolean) => void;
}

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderContext = createContext({} as LoaderContext)

export function LoaderContextProvider({ children }: LoaderProviderProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoading = (bool: boolean) => {
    setLoading(bool)
  }

  return (
    <LoaderContext.Provider value={{ loading, handleLoading }}>
      {children}
    </LoaderContext.Provider>
  )
}

export function useLoaderContext() {
  return useContext(LoaderContext)
}
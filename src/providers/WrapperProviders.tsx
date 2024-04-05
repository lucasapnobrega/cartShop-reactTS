import { ReactNode } from "react";
import { CategoriesContextProvider } from "../contexts/CategoriesContext";
import { ItemsContextProvider } from "../contexts/ItemsContext";
import { LoaderContextProvider } from "../contexts/LoaderContext";

interface WrapperProvidersProps {
  children: ReactNode;
}

function WrapperProviders({ children }: WrapperProvidersProps) {
  return (
    <LoaderContextProvider>
      <ItemsContextProvider>
        <CategoriesContextProvider>
          {children}
        </CategoriesContextProvider>
      </ItemsContextProvider>
    </LoaderContextProvider>
  )
}

export default WrapperProviders
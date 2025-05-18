import * as React from "react";
import { VSCodeLayoutContextValue } from "../config/layoutTypes";

export const VSCodeLayoutContext = React.createContext<VSCodeLayoutContextValue | null>(null);

export const useVSCodeLayout = () => {
  const context = React.useContext(VSCodeLayoutContext);
  if (!context) {
    throw new Error("useVSCodeLayout must be used within a VSCodeLayoutProvider");
  }
  return context;
};

interface VSCodeLayoutProviderProps {
  children: React.ReactNode;
  value: VSCodeLayoutContextValue;
}

export const VSCodeLayoutProvider: React.FC<VSCodeLayoutProviderProps> = ({ children, value }) => {
  return (
    <VSCodeLayoutContext.Provider value={value}>
      {children}
    </VSCodeLayoutContext.Provider>
  );
}; 
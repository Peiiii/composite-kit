import * as React from "react";
import { appConfig } from "../config/appConfig";
import { useFileManager } from "../hooks/useFileManager";
import { usePanelManager } from "../hooks/usePanelManager";
import { VSCodeLayoutContextValue, Theme } from "../config/layoutTypes";

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
}

export const VSCodeLayoutProvider: React.FC<VSCodeLayoutProviderProps> = ({ children }) => {
  // 文件管理状态
  const {
    allAvailableFiles,
    openFiles,
    activeFile,
    openFile,
    closeFile,
    setActiveFile,
  } = useFileManager(appConfig.initialFiles);

  // 面板管理状态
  const {
    leftPanel,
    rightPanel,
    bottomPanel,
  } = usePanelManager();

  // 活动项状态
  const [activeActivityItem, setActiveActivityItem] = React.useState<string>(
    appConfig.activityItems[0]?.id || ""
  );

  // 主题状态
  const [currentTheme, setCurrentTheme] = React.useState<Theme>({
    id: "light",
    label: "浅色主题",
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      accent: "#007acc",
    },
  });

  const value: VSCodeLayoutContextValue = {
    activeActivityItem,
    setActiveActivityItem,
    leftPanel,
    rightPanel,
    bottomPanel,
    files: {
      all: allAvailableFiles,
      open: openFiles,
      active: activeFile,
      openFile,
      closeFile,
      setActive: setActiveFile,
    },
    theme: {
      current: currentTheme,
      setTheme: (themeId: string) => {
        // 这里可以根据 themeId 设置不同的主题
        setCurrentTheme({
          id: themeId,
          label: themeId === "light" ? "浅色主题" : "深色主题",
          colors: {
            background: themeId === "light" ? "#ffffff" : "#1e1e1e",
            foreground: themeId === "light" ? "#000000" : "#ffffff",
            accent: "#007acc",
          },
        });
      },
    },
  };

  return (
    <VSCodeLayoutContext.Provider value={value}>
      {children}
    </VSCodeLayoutContext.Provider>
  );
}; 
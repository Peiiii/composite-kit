import * as React from "react";

// --- Configuration Interfaces ---
export interface ActivityItemConfig {
  id: string;
  icon: React.ReactElement;
  title: string;
  sidebarViewId: string;
}

export interface FileConfig {
  id: string;
  name: string;
  content: string;
  type?: string;
  icon?: React.ReactElement;
}

// --- Panel Management Types ---
export interface PanelState {
  isCollapsed: boolean;
  ref: React.RefObject<any>;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
}

// --- View Props Types ---
export interface SidebarViewBaseProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
}

export interface ExplorerViewProps extends SidebarViewBaseProps {
  files: FileConfig[];
  activeFile: string;
  openFile: (fileId: string) => void;
}

export interface SearchViewProps extends SidebarViewBaseProps {
  onSearch: (query: string) => void;
}

export interface GitViewProps extends SidebarViewBaseProps {
  changes: Array<{
    id: string;
    name: string;
    status: 'modified' | 'added' | 'deleted';
  }>;
}

export interface DebugViewProps extends SidebarViewBaseProps {
  breakpoints: Array<{
    id: string;
    file: string;
    line: number;
  }>;
}

export interface ExtensionsViewProps extends SidebarViewBaseProps {
  extensions: Array<{
    id: string;
    name: string;
    description: string;
    enabled: boolean;
  }>;
}

export type SidebarViewProps =
  | ExplorerViewProps
  | SearchViewProps
  | GitViewProps
  | DebugViewProps
  | ExtensionsViewProps;

export interface SidebarViewConfig {
  id: string;
  title: string;
  component: React.FC<SidebarViewProps>;
}

// --- Command Palette Types ---
export interface CommandPaletteItemBase {
  id: string;
  name: string;
  icon?: React.ReactElement;
}

export interface CommandPaletteFileItem extends CommandPaletteItemBase {
  type: "file";
}

export interface CommandPaletteCommandItem extends CommandPaletteItemBase {
  type: "command";
  action: () => void;
}

export interface CommandPaletteInfoItem extends CommandPaletteItemBase {
  type: "info";
}

export type CommandPaletteItem =
  | CommandPaletteFileItem
  | CommandPaletteCommandItem
  | CommandPaletteInfoItem;

// --- Prompt Dialog Types ---
export interface PromptDialogConfig {
  type: "input" | "select";
  title: string;
  placeholder?: string;
  options?: Array<{
    id: string;
    label: string;
  }>;
  onConfirm: (value: string) => void;
}

// --- Theme Types ---
export interface Theme {
  id: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    // ... 其他颜色定义
  };
}

// --- Layout Context Types ---
export interface VSCodeLayoutContextValue {
  activeActivityItem: string;
  setActiveActivityItem: (id: string) => void;
  leftPanel: PanelState;
  rightPanel: PanelState;
  bottomPanel: PanelState;
  files: {
    all: FileConfig[];
    open: FileConfig[];
    active: string;
    openFile: (id: string) => void;
    closeFile: (id: string) => void;
    setActive: (id: string) => void;
  };
  theme: {
    current: Theme;
    setTheme: (themeId: string) => void;
  };
} 
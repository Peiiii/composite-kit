import React from 'react';
import type { FileConfig as BaseFileConfig } from './file';
import type { Theme as BaseTheme } from './theme';
import type { KeyboardShortcut } from './keyboard';
import type { ImperativePanelHandle } from 'react-resizable-panels';

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
  ref: React.RefObject<ImperativePanelHandle>;
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
  files: BaseFileConfig[];
  activeFile: string;
  openFile: (fileId: string) => void;
}

export interface SearchViewProps extends SidebarViewBaseProps {
  onSearch: (query: string) => void;
}

export interface GitViewProps extends SidebarViewBaseProps {
  changes: Array<{
    path: string;
    status: 'modified' | 'added' | 'deleted';
  }>;
}

export interface DebugViewProps extends SidebarViewBaseProps {
  breakpoints: Array<{
    line: number;
    file: string;
  }>;
}

export interface ExtensionsViewProps extends SidebarViewBaseProps {
  extensions: Array<{
    id: string;
    name: string;
    version: string;
    isEnabled: boolean;
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
  };
}

// --- Layout Context Types ---
export interface LayoutState {
  activeActivityItem: string;
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
  isBottomPanelCollapsed: boolean;
  theme: BaseTheme;
  keyboardShortcuts: KeyboardShortcut[];
}

export interface LayoutContextValue extends LayoutState {
  setActiveActivityItem: (id: string) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  toggleBottomPanel: () => void;
  setTheme: (theme: BaseTheme) => void;
  registerShortcut: (shortcut: KeyboardShortcut) => void;
  unregisterShortcut: (shortcut: KeyboardShortcut) => void;
} 
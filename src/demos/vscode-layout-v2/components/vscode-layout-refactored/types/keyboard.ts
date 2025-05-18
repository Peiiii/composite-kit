export type ModifierKey = 'ctrl' | 'alt' | 'shift' | 'meta';

export interface KeyboardShortcut {
  key: string;
  modifiers: ModifierKey[];
}

export interface KeyboardCommand {
  id: string;
  name: string;
  shortcut: KeyboardShortcut;
  action: () => void;
  description?: string;
  category?: string;
}

export interface KeyboardShortcutConfig {
  [key: string]: KeyboardShortcut;
}

export interface KeyboardShortcutState {
  commands: KeyboardCommand[];
  conflicts: {
    shortcut: KeyboardShortcut;
    commands: string[];
  }[];
} 
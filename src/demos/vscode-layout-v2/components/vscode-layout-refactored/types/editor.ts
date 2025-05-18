import { FileConfig } from './layout';

export type EditorTheme = 'light' | 'dark' | 'high-contrast';

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

export interface EditorState {
  content: string;
  selection: {
    start: number;
    end: number;
  };
  scrollPosition: number;
  cursorPosition: {
    line: number;
    column: number;
  };
}

export interface EditorProps {
  file: FileConfig;
  theme?: EditorTheme;
  settings?: Partial<EditorSettings>;
  onChange?: (content: string) => void;
  onSave?: () => void;
}

export interface EditorTabProps {
  file: FileConfig;
  isActive: boolean;
  onSelect: (fileId: string) => void;
  onClose: (fileId: string) => void;
}

export interface EditorTabsProps {
  files: FileConfig[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileClose: (fileId: string) => void;
}
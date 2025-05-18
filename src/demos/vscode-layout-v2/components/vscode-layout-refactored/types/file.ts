export interface FileConfig {
  id: string;
  name: string;
  content: string;
  language?: string;
  isModified?: boolean;
  isReadOnly?: boolean;
  lastModified?: number;
  path?: string;
}

export interface FileState {
  files: FileConfig[];
  activeFile: string | null;
  openFiles: string[];
}

export interface FileAction {
  type: 'OPEN_FILE' | 'CLOSE_FILE' | 'UPDATE_FILE' | 'CREATE_FILE' | 'DELETE_FILE';
  payload: {
    fileId?: string;
    file?: FileConfig;
    content?: string;
    updates?: Partial<FileConfig>;
  };
}

export interface FileContextValue extends FileState {
  openFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  updateFile: (fileId: string, content: string) => void;
  createFile: (name: string, content?: string) => void;
  deleteFile: (fileId: string) => void;
} 
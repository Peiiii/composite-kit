import { useState, useCallback } from 'react';
import { FileConfig } from '../config/layoutTypes';

export interface FileManagerState {
  allAvailableFiles: FileConfig[];
  openFiles: FileConfig[];
  activeFile: string;
}

export interface FileManagerActions {
  openFile: (fileId: string) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  addFile: (file: FileConfig) => void;
  removeFile: (fileId: string) => void;
  updateFile: (fileId: string, content: string) => void;
  getActiveFile: () => FileConfig | undefined;
}

export type UseFileManagerReturn = FileManagerState & FileManagerActions;

export function useFileManager(initialFiles: FileConfig[]): UseFileManagerReturn {
  const [allAvailableFiles, setAllAvailableFiles] = useState<FileConfig[]>(initialFiles);
  const [openFiles, setOpenFiles] = useState<FileConfig[]>(() => {
    if (initialFiles.length > 0) {
      return [initialFiles[0]];
    }
    return [];
  });
  const [activeFile, setActiveFile] = useState<string>(
    initialFiles[0]?.id || ""
  );

  const openFile = useCallback((fileId: string) => {
    const fileToOpen = allAvailableFiles.find(f => f.id === fileId);
    if (!fileToOpen) return;
    
    setOpenFiles(prev => {
      if (!prev.some(f => f.id === fileId)) {
        return [...prev, fileToOpen];
      }
      return prev;
    });
    setActiveFile(fileId);
  }, [allAvailableFiles]);

  const closeFile = useCallback((fileId: string) => {
    setOpenFiles(prev => {
      const newOpenFiles = prev.filter(f => f.id !== fileId);
      if (fileId === activeFile && newOpenFiles.length > 0) {
        setActiveFile(newOpenFiles[newOpenFiles.length - 1].id);
      } else if (newOpenFiles.length === 0) {
        setActiveFile("");
      }
      return newOpenFiles;
    });
  }, [activeFile]);

  const getActiveFile = useCallback(() => {
    return openFiles.find(f => f.id === activeFile);
  }, [openFiles, activeFile]);

  const addFile = useCallback((file: FileConfig) => {
    setAllAvailableFiles(prev => {
      if (prev.some(f => f.id === file.id)) {
        return prev;
      }
      return [...prev, file];
    });
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setAllAvailableFiles(prev => prev.filter(f => f.id !== fileId));
    closeFile(fileId);
  }, [closeFile]);

  const updateFile = useCallback((fileId: string, content: string) => {
    setAllAvailableFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, content } 
          : file
      )
    );
    setOpenFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, content } 
          : file
      )
    );
  }, []);

  return {
    allAvailableFiles,
    openFiles,
    activeFile,
    getActiveFile,
    openFile,
    closeFile,
    setActiveFile,
    addFile,
    removeFile,
    updateFile,
  };
} 
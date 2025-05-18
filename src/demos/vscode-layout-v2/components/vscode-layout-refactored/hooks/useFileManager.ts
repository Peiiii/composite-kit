import { useState, useCallback } from 'react';
import { FileConfig } from '../config/layoutTypes';

export function useFileManager(initialFiles: FileConfig[]) {
  const [allAvailableFiles] = useState<FileConfig[]>(initialFiles);
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

  return {
    allAvailableFiles,
    openFiles,
    activeFile,
    getActiveFile,
    openFile,
    closeFile,
    setActiveFile,
  };
} 
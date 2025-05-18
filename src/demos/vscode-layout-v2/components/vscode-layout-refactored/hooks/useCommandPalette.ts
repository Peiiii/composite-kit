import { useState, useCallback, useEffect } from 'react';
import { CommandPaletteItem, CommandPaletteInfoItem, CommandPaletteFileItem } from '../config/layoutTypes';
import { Search, FileText } from 'lucide-react';
import * as React from 'react';

export function useCommandPalette(
  allAvailableFiles: { id: string; name: string }[],
  commands: CommandPaletteItem[],
  onCommandExecute: (command: CommandPaletteItem) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const openCommandPalette = useCallback(() => {
    setIsOpen(true);
    setInput("");
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsOpen(false);
    setInput("");
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const handleItemClick = useCallback((item: CommandPaletteItem) => {
    onCommandExecute(item);
    closeCommandPalette();
  }, [onCommandExecute, closeCommandPalette]);

  const getFilteredItems = useCallback(() => {
    const inputLower = input.toLowerCase().trim();
    
    if (inputLower.startsWith(">")) {
      const commandQuery = inputLower.slice(1).trim();
      if (!commandQuery) return commands;
      return commands.filter(cmd => cmd.name.toLowerCase().includes(commandQuery));
    }
    
    if (!inputLower) {
      const defaultInfo: CommandPaletteInfoItem = {
        id: "default-info",
        type: "info",
        name: "输入 > 可执行命令, # 搜索符号, @ 查找定义",
        icon: React.createElement(Search, { className: "h-4 w-4" })
      };
      return [defaultInfo];
    }
    
    return allAvailableFiles
      .filter(file => file.name.toLowerCase().includes(inputLower))
      .map(file => ({ 
        id: file.id, 
        type: "file" as const, 
        name: file.name,
        icon: React.createElement(FileText, { className: "h-4 w-4" })
      })) as CommandPaletteFileItem[];
  }, [input, commands, allAvailableFiles]);

  // 监听键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        openCommandPalette();
      }
      if (e.key === "Escape" && isOpen) {
        closeCommandPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openCommandPalette, closeCommandPalette]);

  return {
    isOpen,
    input,
    openCommandPalette,
    closeCommandPalette,
    handleInputChange,
    handleItemClick,
    getFilteredItems,
  };
} 
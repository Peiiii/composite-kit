import * as React from "react";
import { Command, X } from "lucide-react";
import { CommandPaletteItem } from "../../config/layoutTypes";

export interface CommandPaletteProps {
  isOpen: boolean;
  input: string;
  items: CommandPaletteItem[];
  onInputChange: (value: string) => void;
  onItemClick: (item: CommandPaletteItem) => void;
  onClose: () => void;
  className?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  input,
  items,
  onInputChange,
  onItemClick,
  onClose,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/20 flex items-start justify-center pt-[10%] z-50 ${className}`} onClick={onClose}>
      <div className="w-[600px] max-w-[80%] bg-white rounded shadow-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-gray-100 p-2 flex items-center border-b">
          <Command className="h-5 w-5 mr-2 text-gray-500" />
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-sm"
            placeholder="输入命令或搜索文件..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            autoFocus
          />
          <button className="ml-2 p-1 rounded hover:bg-gray-200" onClick={onClose}>
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="px-4 py-2 flex items-center text-sm hover:bg-blue-50 cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <span className="mr-2 text-gray-500">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 
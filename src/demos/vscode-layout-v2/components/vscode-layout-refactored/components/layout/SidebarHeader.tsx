import * as React from "react";
import { ChevronLeft } from "lucide-react";

export interface SidebarHeaderProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title,
  isCollapsed,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`h-10 flex items-center justify-between px-4 border-b bg-gray-50 ${className}`}>
      <span className="font-medium truncate">{title}</span>
      <button 
        className="p-1 rounded hover:bg-gray-200"
        onClick={onToggle}
        title={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
}; 
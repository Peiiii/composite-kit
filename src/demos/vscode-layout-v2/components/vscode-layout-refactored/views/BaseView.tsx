import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { SidebarViewBaseProps } from "../config/layoutTypes";

export interface BaseViewProps extends SidebarViewBaseProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const BaseView: React.FC<BaseViewProps> = ({
  title,
  children,
  className = "",
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
}) => {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">{title}</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {children}
      </div>
    </div>
  );
}; 
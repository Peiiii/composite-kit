import * as React from "react";
import { ChevronLeft } from "lucide-react";

interface DebugViewProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
}

export const DebugView: React.FC<DebugViewProps> = ({
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">运行和调试</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2 text-sm">
        运行和调试内容区
      </div>
    </div>
  );
}; 
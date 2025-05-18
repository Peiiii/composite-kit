import * as React from "react";
import { ChevronLeft } from "lucide-react";

interface GitViewProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
}

export const GitView: React.FC<GitViewProps> = ({
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium">源代码管理</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="text-sm">暂无更改</div>
      </div>
    </div>
  );
}; 
import * as React from "react";
import { ChevronLeft } from "lucide-react";

interface SearchViewProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium">搜索</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <input 
          type="text" 
          placeholder="搜索..." 
          className="w-full p-2 text-sm border rounded mb-2"
        />
        <div className="text-sm text-gray-500">输入搜索词开始搜索</div>
      </div>
    </div>
  );
}; 
import * as React from "react";
import { ChevronDown, ChevronLeft, FileText } from "lucide-react";
import { FileConfig } from "../config/layoutTypes";

interface ExplorerViewProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
  files: FileConfig[];
  activeFile: string;
  openFile: (fileId: string) => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
  files,
  activeFile,
  openFile,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 flex items-center justify-between px-4 border-b bg-gray-50">
        <span className="font-medium truncate">资源管理器</span>
        <button 
          className="p-1 rounded hover:bg-gray-200"
          onClick={isLeftSidebarCollapsed ? expandLeftPanel : collapseLeftPanel}
          title={isLeftSidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div className="mb-2">
          <div className="flex items-center mb-1">
            <ChevronDown className="h-3 w-3 mr-1" />
            <span className="text-sm font-medium truncate">项目文件</span>
          </div>
          <div className="ml-4">
            {files.map(file => (
              <button
                key={file.id}
                className={`flex items-center w-full text-sm px-2 py-1 text-left ${
                  activeFile === file.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  requestAnimationFrame(() => {
                    openFile(file.id);
                  });
                }}
              >
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
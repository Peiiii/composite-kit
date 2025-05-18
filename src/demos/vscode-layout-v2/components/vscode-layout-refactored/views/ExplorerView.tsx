import * as React from "react";
import { FileConfig } from "../config/layoutTypes";
import { SidebarHeader } from "../components/layout/SidebarHeader";
import { FileList } from "../components/features/FileList";

interface ExplorerViewProps {
  isLeftSidebarCollapsed: boolean;
  expandLeftPanel: () => void;
  collapseLeftPanel: () => void;
  files: FileConfig[];
  activeFile: string;
  openFile: (fileId: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  isLeftSidebarCollapsed,
  expandLeftPanel,
  collapseLeftPanel,
  files,
  activeFile,
  openFile,
  isCollapsed,
  onToggle,
}) => {
  return (
    <div className="h-full flex flex-col">
      <SidebarHeader
        title="资源管理器"
        isCollapsed={isCollapsed}
        onToggle={onToggle}
      />
      <div className="flex-1 overflow-auto p-2">
        <FileList
          files={files}
          activeFile={activeFile}
          onFileClick={openFile}
        />
      </div>
    </div>
  );
}; 
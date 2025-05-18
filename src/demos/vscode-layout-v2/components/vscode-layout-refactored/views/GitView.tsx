import * as React from "react";
import { SidebarHeader } from "../components/layout/SidebarHeader";
import { GitStatus } from "../components/features/GitStatus";

export interface GitViewProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const GitView: React.FC<GitViewProps> = ({
  isCollapsed,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SidebarHeader
        title="源代码管理"
        isCollapsed={isCollapsed}
        onToggle={onToggle}
      />
      <div className="flex-1 p-4">
        <GitStatus />
      </div>
    </div>
  );
}; 
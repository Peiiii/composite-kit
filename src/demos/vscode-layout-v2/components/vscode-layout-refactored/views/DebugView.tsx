import * as React from "react";
import { SidebarHeader } from "../components/layout/SidebarHeader";
import { DebugPanel } from "../components/features/DebugPanel";

export interface DebugViewProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const DebugView: React.FC<DebugViewProps> = ({
  isCollapsed,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SidebarHeader
        title="运行和调试"
        isCollapsed={isCollapsed}
        onToggle={onToggle}
      />
      <div className="flex-1 p-4">
        <DebugPanel />
      </div>
    </div>
  );
}; 
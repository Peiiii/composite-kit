import * as React from "react";
import { SidebarHeader } from "../components/layout/SidebarHeader";
import { ExtensionsList } from "../components/features/ExtensionsList";

export interface ExtensionsViewProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const ExtensionsView: React.FC<ExtensionsViewProps> = ({
  isCollapsed,
  onToggle,
  className = "",
}) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SidebarHeader
        title="扩展"
        isCollapsed={isCollapsed}
        onToggle={onToggle}
      />
      <div className="flex-1 p-4">
        <ExtensionsList />
      </div>
    </div>
  );
}; 
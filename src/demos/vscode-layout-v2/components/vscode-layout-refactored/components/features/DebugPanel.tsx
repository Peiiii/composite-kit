import * as React from "react";
import { Play, Square, RefreshCw, Bug } from "lucide-react";

export interface DebugPanelProps {
  className?: string;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Bug className="h-4 w-4" />
        <span className="text-sm font-medium">调试</span>
      </div>

      <div className="space-y-2">
        <button className="w-full flex items-center justify-center space-x-2 p-2 text-sm border rounded hover:bg-gray-50">
          <Play className="h-4 w-4" />
          <span>开始调试</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 p-2 text-sm border rounded hover:bg-gray-50">
          <Square className="h-4 w-4" />
          <span>停止</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 p-2 text-sm border rounded hover:bg-gray-50">
          <RefreshCw className="h-4 w-4" />
          <span>重启</span>
        </button>
      </div>

      <div className="text-sm text-gray-500">
        选择调试配置或按 F5 开始调试
      </div>
    </div>
  );
}; 
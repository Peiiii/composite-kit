import * as React from "react";
import { GitBranch, AlertCircle, CheckCircle, Wifi, Bell } from "lucide-react";

export interface StatusBarProps {
  branchName: string;
  hasErrors: boolean;
  hasWarnings: boolean;
  warningsCount: number;
  isConnected: boolean;
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  branchName,
  hasErrors,
  hasWarnings,
  warningsCount,
  isConnected,
  className = "",
}) => {
  return (
    <div className={`h-6 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs flex items-center px-2 justify-between border-t border-gray-200 dark:border-gray-700 shrink-0 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
          <GitBranch className="h-3.5 w-3.5 mr-1" />
          <span>{branchName}</span>
        </div>
        <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
          {hasErrors ? (
            <AlertCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
          ) : hasWarnings ? (
            <AlertCircle className="h-3.5 w-3.5 mr-1 text-yellow-500" />
          ) : (
            <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
          )}
          <span>{hasErrors ? "错误" : hasWarnings ? `${warningsCount} 警告` : "就绪"}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">UTF-8</div>
        <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">TSX</div>
        <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
          <Wifi className={`h-3.5 w-3.5 ${isConnected ? "text-green-500" : "text-red-500"}`} />
        </div>
        <div className="px-2 py-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
          <Bell className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}; 
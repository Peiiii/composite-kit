import * as React from "react";
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react";

export interface GitStatusProps {
  className?: string;
}

export const GitStatus: React.FC<GitStatusProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <GitBranch className="h-4 w-4" />
        <span className="text-sm">main</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">更改</span>
          <span className="text-sm text-gray-500">0</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">暂存</span>
          <span className="text-sm text-gray-500">0</span>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full flex items-center justify-center space-x-2 p-2 text-sm border rounded hover:bg-gray-50">
          <GitCommit className="h-4 w-4" />
          <span>提交</span>
        </button>
        
        <button className="w-full flex items-center justify-center space-x-2 p-2 text-sm border rounded hover:bg-gray-50">
          <GitPullRequest className="h-4 w-4" />
          <span>同步更改</span>
        </button>
      </div>
    </div>
  );
}; 
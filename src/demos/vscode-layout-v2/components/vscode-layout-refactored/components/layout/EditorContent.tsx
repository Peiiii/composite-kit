import * as React from "react";
import { FileConfig } from "../../config/layoutTypes";

export interface EditorContentProps {
  activeFile: FileConfig | undefined;
  className?: string;
}

export const EditorContent: React.FC<EditorContentProps> = ({ 
  activeFile,
  className = "",
}) => {
  return (
    <div className={`flex-1 p-4 overflow-auto ${className}`}>
      {activeFile ? (
        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
          {activeFile.content}
        </pre>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>没有打开的文件</p>
        </div>
      )}
    </div>
  );
}; 
import * as React from "react";
import { FileConfig } from "../../config/layoutTypes";

interface EditorContentProps {
  activeFile: FileConfig | undefined;
}

export const EditorContent: React.FC<EditorContentProps> = ({ activeFile }) => {
  return (
    <div className="flex-1 p-4 overflow-auto">
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
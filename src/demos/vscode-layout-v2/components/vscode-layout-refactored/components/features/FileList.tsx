import * as React from "react";
import { ChevronDown, FileText } from "lucide-react";
import { FileConfig } from "../../config/layoutTypes";

export interface FileListProps {
  files: FileConfig[];
  activeFile: string;
  onFileClick: (fileId: string) => void;
  title?: string;
  className?: string;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  activeFile,
  onFileClick,
  title = "项目文件",
  className = "",
}) => {
  return (
    <div className={`mb-2 ${className}`}>
      <div className="flex items-center mb-1">
        <ChevronDown className="h-3 w-3 mr-1" />
        <span className="text-sm font-medium truncate">{title}</span>
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
                onFileClick(file.id);
              });
            }}
          >
            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 
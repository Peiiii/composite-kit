import * as React from "react";
import { FileText, X } from "lucide-react";
import { FileConfig } from "../../config/layoutTypes";

interface EditorTabsProps {
  files: FileConfig[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileClose: (fileId: string, e?: React.MouseEvent) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onFileClose,
}) => {
  return (
    <div className="border-b bg-gray-50 flex">
      {files.map(file => (
        <button
          key={file.id}
          className={`px-3 py-2 flex items-center gap-1 text-sm relative group ${
            activeFileId === file.id
              ? 'bg-white' // Active tab
              : 'hover:bg-gray-100' // Inactive tab hover
          }`}
          onClick={() => onFileSelect(file.id)}
        >
          <FileText className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{file.name}</span>
          <button
            className="ml-2 p-0.5 rounded-sm hover:bg-gray-300 opacity-60 group-hover:opacity-100"
            onClick={(e) => onFileClose(file.id, e)}
            title="关闭"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          {activeFileId === file.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
}; 
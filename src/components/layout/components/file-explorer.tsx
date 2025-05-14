import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react";

interface FileExplorerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface FileExplorerGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

interface FileExplorerItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

const FileExplorer = React.forwardRef<HTMLDivElement, FileExplorerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-2 w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FileExplorer.displayName = "FileExplorer";

const FileExplorerGroup = React.forwardRef<HTMLDivElement, FileExplorerGroupProps>(
  ({ className, title, defaultExpanded = true, children, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);

    return (
      <div
        ref={ref}
        className={cn("mb-2", className)}
        {...props}
      >
        <button
          className="flex items-center mb-1 w-full hover:bg-accent/30 rounded px-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3 mr-1 shrink-0" />
          ) : (
            <ChevronRight className="h-3 w-3 mr-1 shrink-0" />
          )}
          <span className="text-xs font-medium truncate">{title}</span>
        </button>
        {expanded && (
          <div className="ml-4">
            {children}
          </div>
        )}
      </div>
    );
  }
);
FileExplorerGroup.displayName = "FileExplorerGroup";

const FileExplorerItem = React.forwardRef<HTMLButtonElement, FileExplorerItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center py-1 text-xs rounded px-1 w-full",
          active ? "bg-accent" : "hover:bg-accent/30",
          className
        )}
        {...props}
      >
        {icon || <FileText className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />}
        <span className="truncate w-full text-left">{children}</span>
      </button>
    );
  }
);
FileExplorerItem.displayName = "FileExplorerItem";

const FileExplorerFolder = React.forwardRef<HTMLButtonElement, FileExplorerItemProps>(
  ({ className, active, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center py-1 text-xs rounded px-1 w-full",
          active ? "bg-accent" : "hover:bg-accent/30",
          className
        )}
        {...props}
      >
        <Folder className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
        <span className="truncate">{children}</span>
      </button>
    );
  }
);
FileExplorerFolder.displayName = "FileExplorerFolder";

export { FileExplorer, FileExplorerGroup, FileExplorerItem, FileExplorerFolder }; 
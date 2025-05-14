import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface EditorTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EditorTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const EditorTabs = React.forwardRef<HTMLDivElement, EditorTabsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-10 flex items-center border-b", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EditorTabs.displayName = "EditorTabs";

const EditorTab = React.forwardRef<HTMLButtonElement, EditorTabProps>(
  ({ className, active, icon, children, onClose, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "h-full px-4 flex items-center gap-2 border-r hover:bg-accent/30",
          active && "bg-accent/30",
          className
        )}
        {...props}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span className="text-sm">{children}</span>
        {onClose && (
          <button
            className="ml-2 p-1 hover:bg-accent rounded"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </button>
    );
  }
);
EditorTab.displayName = "EditorTab";

export { EditorTabs, EditorTab }; 
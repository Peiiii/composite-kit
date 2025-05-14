import * as React from "react";
import { cn } from "@/lib/utils";

interface BottomPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface BottomPanelTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface BottomPanelTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

const BottomPanel = React.forwardRef<HTMLDivElement, BottomPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-full flex flex-col border-t", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BottomPanel.displayName = "BottomPanel";

const BottomPanelTabs = React.forwardRef<HTMLDivElement, BottomPanelTabsProps>(
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
BottomPanelTabs.displayName = "BottomPanelTabs";

const BottomPanelTab = React.forwardRef<HTMLButtonElement, BottomPanelTabProps>(
  ({ className, active, icon, children, ...props }, ref) => {
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
      </button>
    );
  }
);
BottomPanelTab.displayName = "BottomPanelTab";

const BottomPanelContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto", className)}
        {...props}
      />
    );
  }
);
BottomPanelContent.displayName = "BottomPanelContent";

export { BottomPanel, BottomPanelTabs, BottomPanelTab, BottomPanelContent }; 
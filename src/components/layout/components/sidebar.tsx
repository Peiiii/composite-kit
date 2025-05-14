import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: "left" | "right";
  onToggle?: () => void;
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onToggle?: () => void;
  position?: "left" | "right";
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, position = "left", onToggle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-full flex flex-col", position === "left" ? "border-r" : "border-l", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<SidebarHeaderProps>(child) && child.type === SidebarHeader) {
            return React.cloneElement(child, {
              onToggle,
              position,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, onToggle, position = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("h-10 flex items-center justify-between px-4 border-b", className)}
        {...props}
      >
        <div className="flex-1">{children}</div>
        {onToggle && (
          <button
            className="p-1 hover:bg-accent rounded-md"
            onClick={onToggle}
          >
            {position === "left" ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto w-full min-w-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "SidebarContent";

export { Sidebar, SidebarHeader, SidebarContent };
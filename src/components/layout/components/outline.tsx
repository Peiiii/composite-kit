import * as React from "react";
import { cn } from "@/lib/utils";
import { Code } from "lucide-react";

interface OutlineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface OutlineGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

interface OutlineItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: React.ReactNode;
  active?: boolean;
  itemType?: string;
}

const Outline = React.forwardRef<HTMLDivElement, OutlineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Outline.displayName = "Outline";

const OutlineGroup = React.forwardRef<HTMLDivElement, OutlineGroupProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-2", className)}
        {...props}
      >
        <div className="text-xs font-medium mb-1 truncate">{title}</div>
        <div className="ml-2">
          {children}
        </div>
      </div>
    );
  }
);
OutlineGroup.displayName = "OutlineGroup";

const OutlineItem = React.forwardRef<HTMLButtonElement, OutlineItemProps>(
  ({ className, icon, active, itemType, children, ...props }, ref) => {
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
        {icon || <Code className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />}
        <span className="truncate">{children}</span>
        {itemType && (
          <span className="ml-1 text-xs text-muted-foreground shrink-0">
            ({itemType})
          </span>
        )}
      </button>
    );
  }
);
OutlineItem.displayName = "OutlineItem";

export { Outline, OutlineGroup, OutlineItem }; 
import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconButton } from "../ui/button";

// =============== 类型定义 ===============
type BaseProps = {
  className?: string;
};

export type NavItem = {
  id: string;
  icon: LucideIcon;
  label: string;
};

export type LayoutProps = BaseProps & {
  nav?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
};

export type NavProps = BaseProps & {
  items: readonly NavItem[];
  bottomItems?: readonly NavItem[];
  activeId: string;
  onItemClick: (id: string) => void;
};

export type HeaderProps = BaseProps & {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  actions?: {
    icon: LucideIcon;
    onClick?: () => void;
    title?: string;
  }[];
};

// =============== 主题配置 ===============
const THEME = {
  nav: {
    width: "w-16",
    bg: "bg-[#1E1E1E]",
    spacing: "space-y-4",
  },
  header: {
    base: "h-14 border-b flex items-center px-4 gap-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm flex-shrink-0",
    title: "text-lg font-medium",
    actions: "flex items-center gap-2",
  },
} as const;

// =============== 组件 ===============
export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, nav, header, children }, ref) => (
    <div ref={ref} className={cn("flex h-full bg-background", className)}>
      {nav}
      <div className="flex-1 flex flex-col">
        {header}
        <div className="flex-1 flex">
          {children}
        </div>
      </div>
    </div>
  )
);

export const Nav = React.forwardRef<HTMLDivElement, NavProps>(
  ({ className, items, bottomItems, activeId, onItemClick }, ref) => (
    <div ref={ref} className={cn(THEME.nav.width, "flex flex-col items-center py-4", THEME.nav.bg, "text-white", className)}>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300", "mb-8 bg-[#1890FF]")}>
        <span className="text-lg font-bold">钉</span>
      </div>
      
      <nav className={cn("flex-1", THEME.nav.spacing)}>
        {items.map(({ id, icon: Icon }) => (
          <IconButton
            key={id}
            icon={Icon}
            variant={activeId === id ? "primary" : "ghost"}
            onClick={() => onItemClick(id)}
            shape="square"
            className={cn(
              activeId === id && "scale-110 shadow-lg shadow-[#1890FF]/20"
            )}
          />
        ))}
      </nav>
      
      {bottomItems && (
        <div className={THEME.nav.spacing}>
          {bottomItems.map(({ id, icon: Icon }) => (
            <IconButton
              key={id}
              icon={Icon}
              variant="ghost"
            />
          ))}
        </div>
      )}
    </div>
  )
);

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, left, right, title, actions }, ref) => (
    <div ref={ref} className={cn(THEME.header.base, className)}>
      {left}
      {title && <h1 className={THEME.header.title}>{title}</h1>}
      <div className="flex-1" />
      {actions && (
        <div className={THEME.header.actions}>
          {actions.map(({ icon: Icon, onClick, title }, index) => (
            <IconButton
              key={index}
              icon={Icon}
              variant="ghost"
              onClick={onClick}
              title={title}
            />
          ))}
        </div>
      )}
      {right}
    </div>
  )
); 
import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// =============== 类型定义 ===============
type BaseProps = {
  className?: string;
};

type ButtonProps = BaseProps & {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

type IconButtonProps = BaseProps & {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  title?: string;
};

// =============== 主题配置 ===============
const THEME = {
  base: "flex items-center justify-center transition-all duration-300",
  variants: {
    default: "bg-background hover:bg-muted/50",
    primary: "bg-[#1890FF] text-white hover:bg-[#1890FF]/90",
    ghost: "hover:bg-muted/50",
  },
  sizes: {
    sm: "w-9 h-9",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  },
  shapes: {
    circle: "rounded-full",
    square: "rounded-lg",
  },
} as const;

// =============== 组件 ===============
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick, variant = "default", size = "md", fullWidth }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        THEME.base,
        THEME.variants[variant],
        THEME.sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  )
);

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, onClick, variant = "default", size = "md", shape = "circle", title }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        THEME.base,
        THEME.variants[variant],
        THEME.sizes[size],
        THEME.shapes[shape],
        className
      )}
      title={title}
    >
      <Icon className={cn(
        size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"
      )} />
    </button>
  )
); 
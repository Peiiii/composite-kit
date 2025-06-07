import * as React from "react";
import { cn } from "@/lib/utils";

// =============== 类型定义 ===============
type BaseProps = {
  className?: string;
};

type AvatarProps = BaseProps & {
  text: string;
  size?: "sm" | "md" | "lg";
  online?: boolean;
  variant?: "default" | "primary";
};

// =============== 主题配置 ===============
const THEME = {
  base: "rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:shadow-md",
  variants: {
    default: "bg-[#1890FF]",
    primary: "bg-muted",
  },
  sizes: {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  },
} as const;

// =============== 组件 ===============
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, text, size = "md", online, variant = "default" }, ref) => (
    <div ref={ref} className="relative">
      <div className={cn(
        THEME.base,
        THEME.variants[variant],
        THEME.sizes[size],
        className
      )}>
        {text}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      )}
    </div>
  )
); 
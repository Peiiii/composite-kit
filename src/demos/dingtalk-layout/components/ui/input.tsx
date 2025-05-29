import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// =============== 类型定义 ===============
type BaseProps = {
  className?: string;
};

type InputProps = BaseProps & {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  onIconClick?: () => void;
};

// =============== 主题配置 ===============
const THEME = {
  base: "w-full h-9 px-4 rounded-md bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#1890FF] transition-all duration-300 hover:bg-muted/70",
  withIcon: "pl-9",
} as const;

// =============== 组件 ===============
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, placeholder, icon: Icon, onIconClick }, ref) => (
    <div className="relative">
      {Icon && (
        <div 
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2",
            onIconClick && "cursor-pointer"
          )}
          onClick={onIconClick}
        >
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          THEME.base,
          Icon && THEME.withIcon,
          className
        )}
      />
    </div>
  )
); 
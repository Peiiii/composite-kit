import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  Command,
  File,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  History,
  Laptop,
  Moon,
  Package,
  Palette,
  Search,
  Settings,
  Star,
  Sun,
  Terminal,
} from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

// =============== 类型定义 ===============
interface CommandItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  category: string;
  action: () => void;
  shortcut?: string;
  description?: string;
  isFavorite?: boolean;
  subCommands?: CommandItem[];
}

interface CommandCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  priority: number;
  items: CommandItem[];
}

interface CommandPath {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface CommandState {
  currentPath: CommandPath[];
  selectedIndex: number;
  search: string;
}

// =============== 常量定义 ===============
const MAX_HISTORY = 10;
const SCROLL_PADDING = 8;

// =============== 工具函数 ===============
const scrollToElement = (
  element: HTMLElement,
  container: HTMLElement,
  padding: number
) => {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  if (elementRect.top < containerRect.top + padding) {
    container.scrollTo({
      top: container.scrollTop + elementRect.top - containerRect.top - padding,
      behavior: "smooth",
    });
  } else if (elementRect.bottom > containerRect.bottom - padding) {
    container.scrollTo({
      top:
        container.scrollTop +
        elementRect.bottom -
        containerRect.bottom +
        padding,
      behavior: "smooth",
    });
  }
};

// =============== 子组件 ===============
const CommandInput = React.forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }
>(({ value, onChange, onKeyDown }, ref) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <input
      ref={ref}
      placeholder="搜索命令..."
      className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
    />
  </div>
));

// 更新 NavigationHandler 类型定义
type NavigationHandler = (index: number) => void;

// 更新 CommandBreadcrumb 组件接口
const CommandBreadcrumb = ({
  path,
  onNavigate,
}: {
  path: CommandPath[];
  onNavigate: NavigationHandler;
}) => (
  <div className="flex items-center gap-2 px-2 py-2 text-sm border-b mb-2">
    <button
      onClick={() => onNavigate(-1)}
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Command className="w-4 h-4" />
      <span>命令面板</span>
    </button>
    {path.map((item, index) => (
      <React.Fragment key={item.id}>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <button
          onClick={() => onNavigate(index)}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          {item.icon}
          <span className="font-medium">{item.title}</span>
        </button>
      </React.Fragment>
    ))}
  </div>
);

const CommandCategoryHeader = ({ category }: { category: CommandCategory }) => (
  <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground flex items-center gap-2 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    {category.icon}
    {category.name}
  </div>
);

const CommandItem = React.memo(
  ({
    item,
    category,
    isSelected,
    onSelect,
    ref,
  }: {
    item: CommandItem;
    category: CommandCategory;
    isSelected: boolean;
    onSelect: (item: CommandItem) => void;
    ref: (el: HTMLElement | null) => void;
  }) => (
    <button
      ref={ref}
      onClick={() => onSelect(item)}
      className={cn(
        "flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm outline-none cursor-pointer transition-colors duration-150",
        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
      )}
    >
      <div className="flex-1 flex items-center gap-2">
        <div
          className={cn(
            "w-4 h-4 flex items-center justify-center transition-transform duration-150",
            isSelected && "scale-110"
          )}
        >
          {item.icon}
        </div>
        <div className="flex flex-col items-start">
          <span
            className={cn(
              "transition-colors duration-150",
              isSelected && "font-medium"
            )}
          >
            {item.title}
          </span>
          {item.description && (
            <span className="text-xs text-muted-foreground">
              {item.description}
            </span>
          )}
        </div>
      </div>
      {item.shortcut && (
        <kbd
          className={cn(
            "px-2 py-1 text-xs bg-muted rounded transition-colors duration-150",
            isSelected && "bg-accent/50"
          )}
        >
          {item.shortcut}
        </kbd>
      )}
      {item.subCommands && (
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-150",
            isSelected && "translate-x-0.5"
          )}
        />
      )}
      {isSelected && !item.subCommands && (
        <ArrowRight className="w-4 h-4 text-muted-foreground animate-in slide-in-from-right-1" />
      )}
    </button>
  )
);

// =============== 主组件 ===============
interface CommandPaletteProps {
  getContainer?: () => HTMLElement | null;
  className?: string;
}

const CommandPaletteDemo: React.FC<CommandPaletteProps> = ({
  getContainer,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [commandState, setCommandState] = React.useState<CommandState>({
    currentPath: [],
    selectedIndex: 0,
    search: "",
  });
  const [commandHistory, setCommandHistory] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef(new Map<string, HTMLElement>());
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // 获取容器元素
  const getContainerElement = React.useCallback(() => {
    if (getContainer) {
      return getContainer();
    }
    // 默认返回 body
    return document.body;
  }, [getContainer]);

  // 修改计算位置的逻辑
  const calculatePosition = React.useCallback(() => {
    const container = getContainerElement();
    if (!container || !overlayRef.current) return;

    const containerRect = container.getBoundingClientRect();
    const overlay = overlayRef.current;
    const overlayRect = overlay.getBoundingClientRect();

    // 如果是 body，则使用全屏
    if (container === document.body) {
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.transform = 'none';
      return;
    }

    // 对于自定义容器，使用固定定位并设置覆盖范围
    overlay.style.position = 'fixed';
    overlay.style.top = `${containerRect.top}px`;
    overlay.style.left = `${containerRect.left}px`;
    overlay.style.width = `${containerRect.width}px`;
    overlay.style.height = `${containerRect.height}px`;
    overlay.style.transform = 'none';
  }, [getContainerElement]);

  // 监听窗口大小变化
  React.useEffect(() => {
    if (open) {
      calculatePosition();
      window.addEventListener("resize", calculatePosition);
      return () => window.removeEventListener("resize", calculatePosition);
    }
  }, [open, calculatePosition]);

  // 命令列表
  const commands = React.useMemo(
    () => [
      {
        id: "new-file",
        title: "新建文件",
        icon: <File className="w-4 h-4" />,
        category: "文件",
        action: () => {
          const fileName = prompt("请输入文件名：");
          if (fileName) {
            console.log(`创建文件：${fileName}`);
          }
        },
        shortcut: "⌘N",
        description: "创建一个新的文件",
        isFavorite: false,
      },
      {
        id: "theme",
        title: "选择主题",
        icon: <Palette className="w-4 h-4" />,
        category: "外观",
        action: () => {},
        shortcut: "⌘K ⌘T",
        description: "更改编辑器的颜色主题",
        isFavorite: false,
        subCommands: [
          {
            id: "theme-light",
            title: "浅色主题",
            icon: <Sun className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("切换到浅色主题"),
            shortcut: "⌘K ⌘T L",
            description: "切换到浅色主题",
            isFavorite: false,
          },
          {
            id: "theme-dark",
            title: "深色主题",
            icon: <Moon className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("切换到深色主题"),
            shortcut: "⌘K ⌘T D",
            description: "切换到深色主题",
            isFavorite: false,
          },
          {
            id: "theme-system",
            title: "跟随系统",
            icon: <Laptop className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("跟随系统主题"),
            shortcut: "⌘K ⌘T S",
            description: "跟随系统主题设置",
            isFavorite: false,
          },
        ],
      },
      {
        id: "git",
        title: "Git 操作",
        icon: <GitBranch className="w-4 h-4" />,
        category: "Git",
        action: () => {},
        shortcut: "⌘⇧G",
        description: "Git 相关操作",
        isFavorite: false,
        subCommands: [
          {
            id: "git-commit",
            title: "提交更改",
            icon: <GitCommit className="w-4 h-4" />,
            category: "Git",
            action: () => {
              const message = prompt("请输入提交信息：");
              if (message) {
                console.log(`提交更改：${message}`);
              }
            },
            shortcut: "⌘⇧G C",
            description: "提交当前的更改",
            isFavorite: false,
          },
          {
            id: "git-pull",
            title: "拉取更新",
            icon: <GitPullRequest className="w-4 h-4" />,
            category: "Git",
            action: () => console.log("拉取远程更新"),
            shortcut: "⌘⇧G P",
            description: "从远程仓库拉取更新",
            isFavorite: false,
          },
          {
            id: "git-merge",
            title: "合并分支",
            icon: <GitMerge className="w-4 h-4" />,
            category: "Git",
            action: () => {
              const branch = prompt("请输入要合并的分支：");
              if (branch) {
                console.log(`合并分支：${branch}`);
              }
            },
            shortcut: "⌘⇧G M",
            description: "合并指定的分支到当前分支",
            isFavorite: false,
          },
        ],
      },
      {
        id: "terminal",
        title: "打开终端",
        icon: <Terminal className="w-4 h-4" />,
        category: "工具",
        action: () => console.log("打开集成终端"),
        shortcut: "⌘`",
        description: "打开集成终端",
        isFavorite: false,
      },
      {
        id: "install-package",
        title: "安装依赖",
        icon: <Package className="w-4 h-4" />,
        category: "包管理",
        action: () => {
          const packageName = prompt("请输入要安装的包名：");
          if (packageName) {
            console.log(`安装包：${packageName}`);
          }
        },
        shortcut: "⌘⇧P",
        description: "安装新的 npm 包",
        isFavorite: false,
      },
      {
        id: "settings",
        title: "打开设置",
        icon: <Settings className="w-4 h-4" />,
        category: "设置",
        action: () => console.log("打开设置"),
        shortcut: "⌘,",
        description: "打开编辑器设置",
        isFavorite: false,
      },
      {
        id: "project",
        title: "项目管理",
        icon: <File className="w-4 h-4" />,
        category: "项目",
        action: () => {},
        shortcut: "⌘⇧P",
        description: "项目相关操作",
        isFavorite: false,
        subCommands: [
          {
            id: "project-build",
            title: "构建项目",
            icon: <Package className="w-4 h-4" />,
            category: "项目",
            action: () => {},
            shortcut: "⌘⇧P B",
            description: "构建项目相关操作",
            isFavorite: false,
            subCommands: [
              {
                id: "project-build-dev",
                title: "开发环境构建",
                icon: <Terminal className="w-4 h-4" />,
                category: "项目",
                action: () => console.log("执行开发环境构建"),
                shortcut: "⌘⇧P B D",
                description: "执行开发环境构建",
                isFavorite: false,
              },
              {
                id: "project-build-prod",
                title: "生产环境构建",
                icon: <Terminal className="w-4 h-4" />,
                category: "项目",
                action: () => console.log("执行生产环境构建"),
                shortcut: "⌘⇧P B P",
                description: "执行生产环境构建",
                isFavorite: false,
              },
              {
                id: "project-build-test",
                title: "测试环境构建",
                icon: <Terminal className="w-4 h-4" />,
                category: "项目",
                action: () => console.log("执行测试环境构建"),
                shortcut: "⌘⇧P B T",
                description: "执行测试环境构建",
                isFavorite: false,
              },
            ],
          },
          {
            id: "project-deploy",
            title: "部署项目",
            icon: <GitPullRequest className="w-4 h-4" />,
            category: "项目",
            action: () => {},
            shortcut: "⌘⇧P D",
            description: "部署项目相关操作",
            isFavorite: false,
            subCommands: [
              {
                id: "project-deploy-dev",
                title: "部署到开发环境",
                icon: <Terminal className="w-4 h-4" />,
                category: "项目",
                action: () => console.log("部署到开发环境"),
                shortcut: "⌘⇧P D D",
                description: "部署到开发环境",
                isFavorite: false,
              },
              {
                id: "project-deploy-prod",
                title: "部署到生产环境",
                icon: <Terminal className="w-4 h-4" />,
                category: "项目",
                action: () => console.log("部署到生产环境"),
                shortcut: "⌘⇧P D P",
                description: "部署到生产环境",
                isFavorite: false,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  // 注册快捷键
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      } else if (e.key === "Escape") {
        if (commandState.currentPath.length > 0) {
          setCommandState((prev) => ({
            ...prev,
            currentPath: prev.currentPath.slice(0, -1),
            selectedIndex: 0,
          }));
        } else {
          setOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandState.currentPath]);

  // 聚焦输入框
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // 获取当前层级的命令
  const getCurrentCommands = React.useCallback(() => {
    let currentCommands = commands;
    for (const path of commandState.currentPath) {
      const command = currentCommands.find((cmd) => cmd.id === path.id);
      if (command?.subCommands) {
        currentCommands = command.subCommands;
      }
    }
    return currentCommands;
  }, [commandState.currentPath]);

  // 按类别分组命令
  const groupedCommands = React.useMemo(() => {
    const categories: CommandCategory[] = [
      {
        id: "recent",
        name: "最近使用",
        icon: <History className="w-4 h-4" />,
        priority: 0,
        items: [],
      },
      {
        id: "favorites",
        name: "收藏",
        icon: <Star className="w-4 h-4" />,
        priority: 1,
        items: [],
      },
    ];

    // 获取当前层级的命令
    const currentCommands = getCurrentCommands();

    // 添加历史记录
    commandHistory.forEach((id) => {
      const cmd = currentCommands.find((c) => c.id === id);
      if (cmd) {
        categories[0].items.push(cmd);
      }
    });

    // 添加收藏
    currentCommands
      .filter((cmd) => cmd.isFavorite === true)
      .forEach((cmd) => {
        categories[1].items.push(cmd);
      });

    // 添加其他命令
    const otherCategories = new Map<string, CommandCategory>();
    currentCommands.forEach((cmd) => {
      if (!categories.some((c) => c.id === cmd.category)) {
        if (!otherCategories.has(cmd.category)) {
          otherCategories.set(cmd.category, {
            id: cmd.category,
            name: cmd.category,
            priority: 2,
            items: [],
          });
        }
        otherCategories.get(cmd.category)?.items.push(cmd);
      }
    });

    // 合并所有分类并按优先级排序
    return [...categories, ...otherCategories.values()].sort(
      (a, b) => a.priority - b.priority
    );
  }, [commandHistory, getCurrentCommands]);

  // 过滤命令
  const filteredCommands = React.useMemo(() => {
    if (!commandState.search) return groupedCommands;

    return groupedCommands
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(commandState.search.toLowerCase()) ||
            item.description
              ?.toLowerCase()
              .includes(commandState.search.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [commandState.search, groupedCommands]);

  // 获取所有可见的命令项
  const visibleCommands = React.useMemo(() => {
    const items: Array<CommandItem & { navigationId: string }> = [];

    filteredCommands.forEach((category) => {
      category.items.forEach((item) => {
        items.push({
          ...item,
          navigationId: `${category.id}:${item.id}`,
        } as CommandItem & { navigationId: string });
      });
    });

    return items;
  }, [filteredCommands]);

  // 添加导航处理函数
  const handleNavigate = React.useCallback((index: number) => {
    setCommandState((prev) => ({
      ...prev,
      currentPath: index === -1 ? [] : prev.currentPath.slice(0, index + 1),
      selectedIndex: 0,
      search: "", // 清空搜索
    }));
  }, []);

  // 修改命令选择处理函数
  const handleCommandSelect = React.useCallback((item: CommandItem) => {
    if (item.subCommands) {
      setCommandState((prev) => ({
        ...prev,
        currentPath: [
          ...prev.currentPath,
          {
            id: item.id,
            title: item.title,
            icon: item.icon,
          },
        ],
        selectedIndex: 0,
        search: "",
      }));
    } else {
      setCommandHistory((prev) => {
        const newHistory = [item.id, ...prev.filter((id) => id !== item.id)];
        return newHistory.slice(0, MAX_HISTORY);
      });
      item.action();
      if (!item.subCommands) {
        setOpen(false);
      }
    }
  }, []);

  // 修改键盘导航处理函数
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCommandState((prev) => ({
        ...prev,
        selectedIndex: Math.min(
          prev.selectedIndex + 1,
          visibleCommands.length - 1
        ),
      }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCommandState((prev) => ({
        ...prev,
        selectedIndex: Math.max(prev.selectedIndex - 1, 0),
      }));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedCommand = visibleCommands[commandState.selectedIndex];
      if (selectedCommand) {
        handleCommandSelect(selectedCommand);
      }
    } else if (
      e.key === "Backspace" &&
      !commandState.search &&
      commandState.currentPath.length > 0
    ) {
      e.preventDefault();
      handleNavigate(commandState.currentPath.length - 2);
    }
  };

  // 滚动到选中项
  React.useEffect(() => {
    if (!containerRef.current) return;

    const selectedCommand = visibleCommands[commandState.selectedIndex];
    if (!selectedCommand) return;

    const container = containerRef.current;

    if (commandState.selectedIndex === 0) {
      container.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const selectedElement = itemRefs.current.get(selectedCommand.navigationId);
    if (!selectedElement) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = selectedElement.getBoundingClientRect();

    const isVisible =
      elementRect.top >= containerRect.top + SCROLL_PADDING &&
      elementRect.bottom <= containerRect.bottom - SCROLL_PADDING;

    if (!isVisible) {
      scrollToElement(selectedElement, container, SCROLL_PADDING);
    }
  }, [commandState.selectedIndex, visibleCommands]);

  // 渲染基础内容
  const renderContent = () => (
    <div className={cn("relative h-full", className)}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">命令面板演示</h1>
        <p className="text-muted-foreground">
          按下 <kbd className="px-2 py-1 bg-muted rounded">⌘K</kbd> 或{" "}
          <kbd className="px-2 py-1 bg-muted rounded">Ctrl+K</kbd>{" "}
          打开命令面板
        </p>
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">主要功能：</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>支持快捷键导航（↑↓ 键）</li>
            <li>命令历史记录</li>
            <li>命令收藏功能</li>
            <li>命令分组展示</li>
            <li>快捷键提示</li>
            <li>命令描述</li>
            <li>多层级命令导航</li>
            <li>自定义容器支持</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // 渲染命令面板
  const renderCommandPalette = () => {
    if (!open) return null;

    return createPortal(
      <div
        ref={overlayRef}
        className={cn(
          "bg-background/80 backdrop-blur-sm",
          getContainer ? "fixed" : "fixed inset-0",
          className
        )}
        style={getContainer ? {
          zIndex: 50,
        } : undefined}
      >
        <div className={cn(
          "flex items-center justify-center p-4",
          getContainer ? "h-full" : "fixed inset-0"
        )}>
          <div className="w-full max-w-2xl rounded-lg border bg-background shadow-lg animate-in fade-in-50 zoom-in-95">
            <CommandInput
              ref={inputRef}
              value={commandState.search}
              onChange={(value) =>
                setCommandState((prev) => ({ ...prev, search: value }))
              }
              onKeyDown={handleKeyDown}
            />
            <div
              ref={containerRef}
              className="max-h-[300px] overflow-y-auto scroll-smooth"
            >
              <div className="p-2">
                {commandState.currentPath.length > 0 && (
                  <CommandBreadcrumb
                    path={commandState.currentPath}
                    onNavigate={handleNavigate}
                  />
                )}
                {filteredCommands.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    没有找到相关命令
                  </div>
                ) : (
                  filteredCommands.map((category) => (
                    <div key={category.id}>
                      <CommandCategoryHeader category={category} />
                      {category.items.map((item) => {
                        const isSelected =
                          visibleCommands[commandState.selectedIndex]
                            ?.navigationId === `${category.id}:${item.id}`;
                        return (
                          <CommandItem
                            key={`${category.id}:${item.id}`}
                            item={item}
                            category={category}
                            isSelected={isSelected}
                            onSelect={handleCommandSelect}
                            ref={(el) => {
                              if (el)
                                itemRefs.current.set(
                                  `${category.id}:${item.id}`,
                                  el
                                );
                              else
                                itemRefs.current.delete(
                                  `${category.id}:${item.id}`
                                );
                            }}
                          />
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {renderContent()}
      {renderCommandPalette()}
    </>
  );
};

// 修改演示页面组件
export default function CommandPaletteDemoPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <CommandPaletteDemo getContainer={() => containerRef.current} />
    </div>
  );
}

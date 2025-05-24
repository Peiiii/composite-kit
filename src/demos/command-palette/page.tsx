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

// 命令分类接口
interface CommandCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  priority: number; // 用于排序
  items: CommandItem[];
}

interface CommandState {
  currentPath: string[];
  selectedIndex: number;
  search: string;
}

const MAX_HISTORY = 10;

const CommandPaletteDemo = () => {
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
            // 实际项目中这里应该调用文件系统 API
          }
        },
        shortcut: "⌘N",
        description: "创建一个新的文件",
      },
      {
        id: "theme",
        title: "选择主题",
        icon: <Palette className="w-4 h-4" />,
        category: "外观",
        action: () => {},
        shortcut: "⌘K ⌘T",
        description: "更改编辑器的颜色主题",
        subCommands: [
          {
            id: "theme-light",
            title: "浅色主题",
            icon: <Sun className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("切换到浅色主题"),
            shortcut: "⌘K ⌘T L",
            description: "切换到浅色主题",
          },
          {
            id: "theme-dark",
            title: "深色主题",
            icon: <Moon className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("切换到深色主题"),
            shortcut: "⌘K ⌘T D",
            description: "切换到深色主题",
          },
          {
            id: "theme-system",
            title: "跟随系统",
            icon: <Laptop className="w-4 h-4" />,
            category: "主题",
            action: () => console.log("跟随系统主题"),
            shortcut: "⌘K ⌘T S",
            description: "跟随系统主题设置",
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
                // 实际项目中这里应该调用 Git API
              }
            },
            shortcut: "⌘⇧G C",
            description: "提交当前的更改",
          },
          {
            id: "git-pull",
            title: "拉取更新",
            icon: <GitPullRequest className="w-4 h-4" />,
            category: "Git",
            action: () => console.log("拉取远程更新"),
            shortcut: "⌘⇧G P",
            description: "从远程仓库拉取更新",
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
            // 实际项目中这里应该调用包管理器 API
          }
        },
        shortcut: "⌘⇧P",
        description: "安装新的 npm 包",
      },
      {
        id: "command-palette",
        title: "命令面板",
        icon: <Command className="w-4 h-4" />,
        category: "视图",
        action: () => console.log("打开命令面板"),
        shortcut: "⌘K",
        description: "打开命令面板",
        isFavorite: true,
      },
      {
        id: "settings",
        title: "打开设置",
        icon: <Settings className="w-4 h-4" />,
        category: "设置",
        action: () => console.log("打开设置"),
        shortcut: "⌘,",
        description: "打开编辑器设置",
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
      const command = currentCommands.find((cmd) => cmd.id === path);
      if (command?.subCommands) {
        currentCommands = command.subCommands;
      }
    }
    return currentCommands;
  }, [commands, commandState.currentPath]);

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

    // 添加历史记录
    commandHistory.forEach((id) => {
      const cmd = commands.find((c) => c.id === id);
      if (cmd) {
        categories[0].items.push(cmd);
      }
    });

    // 添加收藏
    commands
      .filter((cmd) => cmd.isFavorite)
      .forEach((cmd) => {
        categories[1].items.push(cmd);
      });

    // 添加其他命令
    const otherCategories = new Map<string, CommandCategory>();
    commands.forEach((cmd) => {
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
  }, [commands, commandHistory]);

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
    
    filteredCommands.forEach(category => {
      category.items.forEach(item => {
        items.push({
          ...item,
          navigationId: `${category.id}:${item.id}`
        } as CommandItem & { navigationId: string });
      });
    });

    return items;
  }, [filteredCommands]);

  // 添加平滑滚动效果
  const scrollToElement = React.useCallback((element: HTMLElement, container: HTMLElement, padding: number) => {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    if (elementRect.top < containerRect.top + padding) {
      container.scrollTo({
        top: container.scrollTop + elementRect.top - containerRect.top - padding,
        behavior: 'smooth'
      });
    } else if (elementRect.bottom > containerRect.bottom - padding) {
      container.scrollTo({
        top: container.scrollTop + elementRect.bottom - containerRect.bottom + padding,
        behavior: 'smooth'
      });
    }
  }, []);

  // 处理键盘导航
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
        if (selectedCommand.subCommands) {
          // 如果有子命令，进入子命令层级
          setCommandState((prev) => ({
            ...prev,
            currentPath: [...prev.currentPath, selectedCommand.id],
            selectedIndex: 0,
          }));
        } else {
          // 执行命令
          setCommandHistory((prev) => {
            const newHistory = [
              selectedCommand.id,
              ...prev.filter((id) => id !== selectedCommand.id),
            ];
            return newHistory.slice(0, MAX_HISTORY);
          });
          selectedCommand.action();
          if (!selectedCommand.subCommands) {
            setOpen(false);
          }
        }
      }
    }
  };

  // 当命令列表变化时，确保 selectedIndex 有效
  React.useEffect(() => {
    if (visibleCommands.length > 0) {
      setCommandState((prev) => ({
        ...prev,
        selectedIndex: Math.min(prev.selectedIndex, visibleCommands.length - 1),
      }));
    }
  }, [visibleCommands]);

  // 当搜索内容变化时，重置选中索引
  React.useEffect(() => {
    setCommandState((prev) => ({
      ...prev,
      selectedIndex: 0,
    }));
  }, [commandState.search]);

  // 滚动到选中项
  React.useEffect(() => {
    if (!containerRef.current) return;

    const selectedCommand = visibleCommands[commandState.selectedIndex];
    if (!selectedCommand) return;

    const container = containerRef.current;

    // 如果是第一项，平滑滚动到顶部
    if (commandState.selectedIndex === 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const selectedElement = itemRefs.current.get(selectedCommand.navigationId);
    if (!selectedElement) return;

    const PADDING = 8;
    const containerRect = container.getBoundingClientRect();
    const elementRect = selectedElement.getBoundingClientRect();

    const isVisible =
      elementRect.top >= containerRect.top + PADDING &&
      elementRect.bottom <= containerRect.bottom - PADDING;

    if (!isVisible) {
      scrollToElement(selectedElement, container, PADDING);
    }
  }, [commandState.selectedIndex, visibleCommands, scrollToElement]);

  if (!open) {
    return (
      <div className="relative h-full">
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
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-lg border bg-background shadow-lg animate-in fade-in-50 zoom-in-95">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              placeholder="搜索命令..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={commandState.search}
              onChange={(e) =>
                setCommandState((prev) => ({ ...prev, search: e.target.value }))
              }
              onKeyDown={handleKeyDown}
            />
          </div>
          <div ref={containerRef} className="max-h-[300px] overflow-y-auto scroll-smooth">
            <div className="p-2">
              {commandState.currentPath.length > 0 && (
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
                  {commandState.currentPath.map((path, index) => {
                    const command = commands.find((cmd) => cmd.id === path);
                    return (
                      <React.Fragment key={path}>
                        {index > 0 && <ChevronRight className="w-4 h-4" />}
                        <span>{command?.title}</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
              {filteredCommands.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  没有找到相关命令
                </div>
              ) : (
                filteredCommands.map((category) => (
                  <div key={category.id}>
                    <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground flex items-center gap-2 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      {category.icon}
                      {category.name}
                    </div>
                    {category.items.map((item) => {
                      const isSelected =
                        visibleCommands[commandState.selectedIndex]?.navigationId === `${category.id}:${item.id}`;
                      return (
                        <button
                          key={`${category.id}:${item.id}`}
                          ref={(el) => {
                            if (el) itemRefs.current.set(`${category.id}:${item.id}`, el);
                            else itemRefs.current.delete(`${category.id}:${item.id}`);
                          }}
                          onClick={() => {
                            if (item.subCommands) {
                              setCommandState((prev) => ({
                                ...prev,
                                currentPath: [...prev.currentPath, item.id],
                                selectedIndex: 0,
                              }));
                            } else {
                              setCommandHistory((prev) => {
                                const newHistory = [
                                  item.id,
                                  ...prev.filter((id) => id !== item.id),
                                ];
                                return newHistory.slice(0, MAX_HISTORY);
                              });
                              item.action();
                              if (!item.subCommands) {
                                setOpen(false);
                              }
                            }
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-sm outline-none cursor-pointer transition-colors duration-150",
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          )}
                        >
                          <div className="flex-1 flex items-center gap-2">
                            <div className={cn(
                              "w-4 h-4 flex items-center justify-center transition-transform duration-150",
                              isSelected && "scale-110"
                            )}>
                              {item.icon}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className={cn(
                                "transition-colors duration-150",
                                isSelected && "font-medium"
                              )}>
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
                            <kbd className={cn(
                              "px-2 py-1 text-xs bg-muted rounded transition-colors duration-150",
                              isSelected && "bg-accent/50"
                            )}>
                              {item.shortcut}
                            </kbd>
                          )}
                          {item.subCommands && (
                            <ChevronRight className={cn(
                              "w-4 h-4 text-muted-foreground transition-transform duration-150",
                              isSelected && "translate-x-0.5"
                            )} />
                          )}
                          {isSelected && !item.subCommands && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground animate-in slide-in-from-right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteDemo;

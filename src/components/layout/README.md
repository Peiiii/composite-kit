# 布局组件库

这个目录包含了一组用于构建 VSCode 风格布局的组件。

## 目录结构

```
layout/
├── components/         # 基础组件
│   ├── activity-bar.tsx    # 活动栏组件
│   ├── bottom-panel.tsx    # 底部面板组件
│   ├── editor-tabs.tsx     # 编辑器标签组件
│   ├── file-explorer.tsx   # 文件浏览器组件
│   ├── outline.tsx         # 大纲组件
│   ├── sidebar.tsx         # 侧边栏组件
│   └── vscode-layout.tsx   # VSCode 布局组件
│
├── compounds/         # 复合组件（命名空间模式）
│   ├── activity-bar-compound.tsx  # 活动栏复合组件
│   ├── bottom-panel-compound.tsx  # 底部面板复合组件
│   ├── editor-tabs-compound.tsx   # 编辑器标签复合组件
│   ├── sidebar-compound.tsx       # 侧边栏复合组件
│   └── vscode-layout-compound.tsx # VSCode 布局复合组件
│
├── hooks/             # 布局相关钩子
│   ├── use-panel-state.ts        # 面板状态管理钩子
│   ├── use-resizable-panel.ts    # 可调整大小面板钩子
│   └── index.ts                  # 钩子导出文件
│
├── primitive.ts       # 原始组件导出
├── compound.ts        # 复合组件导出
└── index.tsx          # 主导出文件
```

## 使用方式

### 导入基础组件

```tsx
import { 
  VSCodeLayout, 
  Sidebar,
  ActivityBar
} from "@/components/layout/primitive";
```

### 导入复合组件

```tsx
import { 
  VSCodeLayout,
  SidebarCompound,
  ActivityBarCompound
} from "@/components/layout/compound";
```

### 导入钩子

```tsx
import { 
  useResizablePanel,
  usePanelState
} from "@/components/layout/hooks";
```

### 或者从主入口导入

```tsx
import { 
  VSCodeLayout,         // 原始组件
  VSCodeLayoutCompound, // 复合组件
  useResizablePanel     // 钩子
} from "@/components/layout";
```

## 组件风格

### 基础组件风格

基础组件使用传统的 React 组件模式，各个子组件通过导入单独使用：

```tsx
<VSCodeLayout
  activityBar={<ActivityBar>...</ActivityBar>}
  leftSidebar={{
    content: <Sidebar>...</Sidebar>,
    defaultSize: 20
  }}
  mainContent={...}
/>
```

### 复合组件风格

复合组件使用命名空间模式，组织在一个命名空间下：

```tsx
<VSCodeLayout.Root>
  <VSCodeLayout.ActivityBar>
    <ActivityBarCompound.Root>...</ActivityBarCompound.Root>
  </VSCodeLayout.ActivityBar>
  <VSCodeLayout.Main>
    <VSCodeLayout.Horizontal>
      <VSCodeLayout.LeftSidebar>
        <SidebarCompound.Root>...</SidebarCompound.Root>
      </VSCodeLayout.LeftSidebar>
      <VSCodeLayout.ResizeHandle />
      <VSCodeLayout.Panel>...</VSCodeLayout.Panel>
    </VSCodeLayout.Horizontal>
  </VSCodeLayout.Main>
</VSCodeLayout.Root>
```

## 示例

请参考 `src/demos/vscode-layout-v2/components/` 目录下的示例：

- `vscode-layout-demo.tsx` - 使用基础组件的示例
- `vscode-layout-compound-demo.tsx` - 使用 VSCodeLayout 复合组件的示例
- `fully-compound-demo.tsx` - 使用所有复合组件的完整示例

## VSCode 布局组件

VSCode 布局组件是一个基于 `react-resizable-panels` 实现的可复用布局系统，用于创建类似 VSCode 编辑器的界面布局。

### 特性

- 可调整大小的面板
- 可折叠的侧边栏和底部面板
- 模块化的复合组件
- 完全可定制的布局配置
- 状态管理钩子

### 复合组件

布局系统由以下复合组件组成：

- **ActivityBar**: 左侧活动栏，用于主要导航
- **Sidebar**: 可折叠的侧边栏，支持左右两侧
- **EditorTabs**: 编辑器标签栏
- **BottomPanel**: 底部面板，包含可切换的标签页
- **FileExplorer**: 文件浏览器
- **Outline**: 大纲视图

### 状态管理钩子

布局系统提供了几个状态管理钩子：

- **useResizablePanel**: 用于管理可调整大小的面板状态
- **usePanelState**: 管理面板的展开/折叠状态
- **useVSCodeLayoutState**: 一个综合的状态管理钩子，提供以下功能：
  - 面板的显示/隐藏状态
  - 面板的折叠/展开状态
  - 布局控制操作
  - 面板引用

### 配置器

`VSCodeConfigurator` 是一个高级组件，用于快速创建和配置完整的 VSCode 风格布局。它支持：

- 活动栏配置
- 左右侧边栏配置
- 编辑器配置
- 底部面板配置
- 布局状态集成

### 使用示例

```tsx
import { useVSCodeLayoutState, VSCodeConfigurator } from "@/components/layout";

function MyEditor() {
  const layoutState = useVSCodeLayoutState();
  
  return (
    <div className="h-screen">
      {/* 布局控制 */}
      <div className="flex gap-2 p-2">
        <button onClick={layoutState.toggleLeftSidebar}>
          {layoutState.leftSidebarVisible ? "隐藏左侧边栏" : "显示左侧边栏"}
        </button>
        <button onClick={layoutState.toggleRightSidebar}>
          {layoutState.rightSidebarVisible ? "隐藏右侧边栏" : "显示右侧边栏"}
        </button>
      </div>
      
      {/* VSCode 布局 */}
      <VSCodeConfigurator
        layoutState={layoutState}
        leftSidebar={layoutState.leftSidebarVisible ? {
          // 左侧边栏配置
        } : undefined}
        rightSidebar={layoutState.rightSidebarVisible ? {
          // 右侧边栏配置
        } : undefined}
        // 其他配置
      />
    </div>
  );
}
```

### 布局预设

可以使用 `useVSCodeLayoutState` 创建布局预设：

```tsx
function setFocusMode() {
  layoutState.collapseLeftSidebar();
  layoutState.collapseRightSidebar();
  layoutState.collapseBottomPanel();
}

function setFullView() {
  layoutState.expandLeftSidebar();
  layoutState.expandRightSidebar();
  layoutState.expandBottomPanel();
}
```

### 自定义示例

查看 `src/demos/vscode-layout-v2/components/` 目录中的示例组件，以了解如何使用这些布局组件。
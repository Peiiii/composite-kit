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
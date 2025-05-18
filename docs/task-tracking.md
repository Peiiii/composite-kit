# VSCode Layout Refactoring Task Tracking

## Tasks

- [x] **Consolidate Components**
  - Move all components from `core/components` to `components/`.
  - Remove duplicates from `components/layout`, `components/features`, and `components/common`.

- [x] **Standardize Directory Structure**
  - Ensure `components/common` contains base components.
  - Ensure `components/layout` contains layout components.
  - Ensure `components/features` contains business features.

- [ ] **Separate Views & Components**
  - Refactor `views/` to only compose components, not duplicate UI logic.
  - Created `SidebarHeader` and `FileList` components.
  - Refactored `ExplorerView` to use new components.

- [x] **Clean Legacy Code**
  - Remove migrated components from `core/components`.
  - Clean up duplicate `index.ts` files.

- [ ] **Unified Exports**
  - Create a central `components/index.ts` for unified exports.

- [ ] **Refactor Large Files**
  - Split `src/demos/vscode-layout-pure-demo-refactoring.tsx` into smaller files by view, hooks, and config.

## Progress

- **Consolidate Components**: Completed.
  - Removed duplicate components from `components/ActivityBar`, `components/Editor`, and `components/StatusBar`.
  - Components are now organized in `components/layout` and `components/features`.
- **Standardize Directory Structure**: Completed.
  - `components/common`: Contains base components (Button, Icon, Panel).
  - `components/layout`: Contains layout components (ActivityBar, EditorContent, EditorTabs, StatusBar).
  - `components/features`: Contains business features (CommandPalette, PromptDialog).
- **Separate Views & Components**: In Progress.
  - Created `SidebarHeader` component for consistent sidebar headers.
  - Created `FileList` component for file list rendering.
  - Refactored `ExplorerView` to use new components.
  - Next: Refactor other views (SearchView, GitView, etc.) to use new components.
- **Clean Legacy Code**: Completed.
  - Removed migrated components from `core/components`.
- **Unified Exports**: Not started.
- **Refactor Large Files**: Not started.

## 已完成任务

### 1. 标准化目录结构
- [x] 创建新的目录结构
- [x] 移动组件到对应目录
  - [x] 移动 `ActivityBar` 到 `components/layout`
  - [x] 移动 `EditorTabs` 到 `components/layout`
  - [x] 移动 `EditorContent` 到 `components/layout`
  - [x] 移动 `StatusBar` 到 `components/layout`
  - [x] 移动 `CommandPalette` 到 `components/features`
  - [x] 移动 `PromptDialog` 到 `components/features`

### 2. 分离视图和组件
- [x] 创建基础组件
  - [x] 创建 `SidebarHeader` 组件
  - [x] 创建 `FileList` 组件
- [x] 重构视图组件
  - [x] 重构 `ExplorerView`
  - [x] 重构 `SearchView`
  - [x] 重构 `GitView`
  - [x] 重构 `DebugView`
  - [x] 重构 `ExtensionsView`

### 3. 清理遗留代码
- [x] 删除 `core/components` 目录
- [x] 更新所有导入路径
- [ ] 运行测试确保功能正常

## 进行中的任务

### 4. 优化组件接口
- [ ] 统一组件 Props 接口
- [ ] 添加必要的类型定义
- [ ] 完善组件文档

### 5. 性能优化
- [ ] 分析组件渲染性能
- [ ] 实现必要的性能优化
- [ ] 添加性能监控

## 待开始任务

### 4. 优化组件接口
- [ ] 统一组件 Props 接口
- [ ] 添加必要的类型定义
- [ ] 完善组件文档

### 5. 性能优化
- [ ] 分析组件渲染性能
- [ ] 实现必要的性能优化
- [ ] 添加性能监控 
# VSCode Layout Refactoring Plan

## Current Issues

1. **Component Duplication & Confusion**
   - Components are duplicated across `components/layout`, `components/features`, `components/common`, and `core/components`.
   - This leads to maintenance difficulties and import confusion.

2. **Unclear Directory Naming & Layering**
   - `components/layout`, `components/features`, and `components/common` have overlapping responsibilities.
   - `core/components` duplicates functionality with `components/`.

3. **Mixing Views & Components**
   - `views/` directory contains business logic that overlaps with `components/`.
   - Views should only compose components, not duplicate UI logic.

4. **Uncleaned Legacy Code**
   - `core/components` still contains migrated components, causing confusion.
   - Duplicate `index.ts` files may exist.

5. **Inconsistent Exports & Imports**
   - No unified `components/index.ts` for centralized exports.
   - Import paths are verbose and inconsistent.

6. **Large File Refactoring**
   - `src/demos/vscode-layout-pure-demo-refactoring.tsx` should be split into smaller files by view, hooks, and config.

## Recommendations

- **Consolidate Components**: Move all components to `components/` and remove duplicates from `core/components`.
- **Standardize Directory Structure**: Use `components/common` for base components, `components/layout` for layout components, and `components/features` for business features.
- **Separate Views & Components**: Ensure views only compose components, not duplicate UI logic.
- **Clean Legacy Code**: Remove migrated components from `core/components`.
- **Unified Exports**: Create a central `components/index.ts` for unified exports.
- **Refactor Large Files**: Split large files into smaller, focused modules.

## Next Steps

- Create a task tracking document to monitor progress.
- Begin refactoring by consolidating components and cleaning up legacy code. 
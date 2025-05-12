export function VSCodeStatusBar() {
  return (
    <div className="h-full flex items-center justify-between px-4 text-xs text-muted-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center space-x-4 min-w-0">
        <span className="truncate">main</span>
        <span className="truncate">TypeScript</span>
        <span className="truncate">UTF-8</span>
        <span className="truncate">Spaces: 2</span>
        <span className="truncate">Indent: 2</span>
        <span className="truncate">Line: 1</span>
        <span className="truncate">Column: 1</span>
        <span className="truncate">Selection: 0</span>
      </div>
      <div className="flex items-center space-x-4 flex-shrink-0">
        <span className="truncate">Ln 1, Col 1</span>
        <span className="truncate">Spaces: 2</span>
        <span className="truncate">UTF-8</span>
        <span className="truncate">TypeScript</span>
        <span className="truncate">Git: main</span>
        <span className="truncate">Problems: 0</span>
        <span className="truncate">Warnings: 0</span>
        <span className="truncate">Errors: 0</span>
      </div>
    </div>
  );
} 
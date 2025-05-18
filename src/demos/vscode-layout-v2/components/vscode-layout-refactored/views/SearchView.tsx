import * as React from "react";
import { SidebarHeader } from "../components/layout/SidebarHeader";
import { SearchInput } from "../components/features/SearchInput";

export interface SearchViewProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const SearchView: React.FC<SearchViewProps> = ({
  isCollapsed,
  onToggle,
  className = "",
}) => {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <SidebarHeader
        title="搜索"
        isCollapsed={isCollapsed}
        onToggle={onToggle}
      />
      <div className="flex-1 p-4">
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  );
}; 
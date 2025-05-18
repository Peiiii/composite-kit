import * as React from "react";
import { Search, Package, Star } from "lucide-react";

export interface Extension {
  id: string;
  name: string;
  description: string;
  publisher: string;
  rating: number;
  installed: boolean;
}

export interface ExtensionsListProps {
  className?: string;
}

export const ExtensionsList: React.FC<ExtensionsListProps> = ({
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="搜索扩展..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-8 pr-4 py-2 text-sm border rounded"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <div>
              <div className="text-sm font-medium">示例扩展</div>
              <div className="text-xs text-gray-500">示例发布者</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">4.5</span>
          </div>
        </div>
      </div>

      {!searchQuery && (
        <div className="text-sm text-gray-500">
          输入关键词搜索扩展
        </div>
      )}
    </div>
  );
}; 
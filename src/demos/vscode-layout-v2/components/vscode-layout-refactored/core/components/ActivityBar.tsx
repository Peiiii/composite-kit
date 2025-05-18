import * as React from "react";
import { ActivityItemConfig } from "../../config/layoutTypes";

interface ActivityBarProps {
  items: ActivityItemConfig[];
  activeItemId: string;
  onItemClick: (itemId: string) => void;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  items,
  activeItemId,
  onItemClick,
}) => {
  return (
    <div className="w-12 bg-gray-100 flex flex-col items-center py-2 border-r shrink-0">
      {items.map(item => (
        <button
          key={item.id}
          className={`w-10 h-10 mb-2 flex items-center justify-center rounded ${
            activeItemId === item.id ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'
          }`}
          title={item.title}
          onClick={() => onItemClick(item.id)}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}; 
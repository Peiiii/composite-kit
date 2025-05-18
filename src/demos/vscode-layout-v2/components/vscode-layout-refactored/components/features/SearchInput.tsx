import * as React from "react";

export interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "搜索...",
  onSearch,
  className = "",
}) => {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  return (
    <div className={className}>
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full p-2 text-sm border rounded mb-2"
      />
      {!value && (
        <div className="text-sm text-gray-500">输入搜索词开始搜索</div>
      )}
    </div>
  );
}; 
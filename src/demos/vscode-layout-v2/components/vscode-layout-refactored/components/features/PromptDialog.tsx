import * as React from "react";
import { Check } from "lucide-react";
import { PromptDialogConfig } from "../../config/layoutTypes";

export interface PromptDialogProps {
  config: PromptDialogConfig;
  value: string;
  selectedOption: string | null;
  onValueChange: (value: string) => void;
  onOptionSelect: (optionId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export const PromptDialog: React.FC<PromptDialogProps> = ({
  config,
  value,
  selectedOption,
  onValueChange,
  onOptionSelect,
  onConfirm,
  onCancel,
  className = "",
}) => {
  return (
    <div className={`fixed inset-0 bg-black/20 flex items-center justify-center z-50 ${className}`}>
      <div className="w-[400px] max-w-[80%] bg-white rounded shadow-lg p-4">
        <h3 className="text-base font-medium mb-4">{config.title}</h3>
        {config.type === "input" && (
          <input
            type="text"
            className="w-full px-3 py-2 border rounded mb-4 text-sm"
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            autoFocus
          />
        )}
        {config.type === "select" && config.options && (
          <div className="mb-4 max-h-[300px] overflow-y-auto">
            {config.options.map(option => (
              <div 
                key={option.id} 
                className={`flex items-center p-2 rounded cursor-pointer ${selectedOption === option.id ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                onClick={() => onOptionSelect(option.id)}
              >
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                  {selectedOption === option.id && <Check className="w-4 h-4 text-blue-500" />}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button 
            className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
            onClick={onCancel}
          >
            取消
          </button>
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            onClick={onConfirm}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}; 
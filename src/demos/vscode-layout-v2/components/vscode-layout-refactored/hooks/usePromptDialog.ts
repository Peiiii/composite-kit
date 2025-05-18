import { useState, useCallback } from 'react';
import { PromptDialogConfig } from '../config/layoutTypes';

export function usePromptDialog() {
  const [dialog, setDialog] = useState<PromptDialogConfig | null>(null);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const showInputDialog = useCallback((
    title: string,
    placeholder: string,
    onConfirm: (value: string) => void
  ) => {
    setDialog({
      type: "input",
      title,
      placeholder,
      onConfirm,
    });
    setValue("");
  }, []);

  const showSelectDialog = useCallback((
    title: string,
    options: { id: string; label: string }[],
    onConfirm: (value: string) => void
  ) => {
    setDialog({
      type: "select",
      title,
      options,
      onConfirm,
    });
    setSelectedOption(options[0]?.id || null);
  }, []);

  const handleValueChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const handleOptionSelect = useCallback((optionId: string) => {
    setSelectedOption(optionId);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!dialog) return;

    if (dialog.type === "select" && selectedOption) {
      dialog.onConfirm(selectedOption);
    } else if (dialog.type === "input") {
      dialog.onConfirm(value);
    }

    setDialog(null);
    setValue("");
    setSelectedOption(null);
  }, [dialog, selectedOption, value]);

  const handleCancel = useCallback(() => {
    setDialog(null);
    setValue("");
    setSelectedOption(null);
  }, []);

  return {
    dialog,
    value,
    selectedOption,
    showInputDialog,
    showSelectDialog,
    handleValueChange,
    handleOptionSelect,
    handleConfirm,
    handleCancel,
  };
} 
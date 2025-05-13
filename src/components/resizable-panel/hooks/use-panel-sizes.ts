import { useCallback, useState } from "react";

interface PanelSizes {
  [key: string]: number;
}

export function usePanelSizes(autoSaveId?: string) {
  const [sizes, setSizes] = useState<PanelSizes>(() => {
    if (autoSaveId && typeof window !== "undefined") {
      const saved = localStorage.getItem(`panel-sizes-${autoSaveId}`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const onLayout = useCallback(
    (newSizes: number[]) => {
      if (autoSaveId && typeof window !== "undefined") {
        const sizesMap = newSizes.reduce((acc, size, index) => {
          acc[`panel-${index}`] = size;
          return acc;
        }, {} as PanelSizes);
        localStorage.setItem(
          `panel-sizes-${autoSaveId}`,
          JSON.stringify(sizesMap)
        );
        setSizes(sizesMap);
      }
    },
    [autoSaveId]
  );

  return {
    sizes,
    onLayout,
  };
} 
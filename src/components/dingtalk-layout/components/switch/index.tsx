import * as React from "react";

export type SwitchItem = {
  id: string;
  content: React.ReactNode;
};

export type SwitchProps = {
  items: SwitchItem[];
  activeId: string;
};

export const Switch = ({ items, activeId }: SwitchProps) => {
  const activeItem = items.find((item) => item.id === activeId);
  return activeItem?.content ?? null;
};

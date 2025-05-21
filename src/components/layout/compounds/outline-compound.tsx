import {
    Outline as OutlinePrimitive,
    OutlineGroup,
    OutlineItem
} from "../components/outline";

interface OutlineCompoundProps {
  Root: typeof OutlinePrimitive;
  Group: typeof OutlineGroup;
  Item: typeof OutlineItem;
}

export const Outline: OutlineCompoundProps = {
  Root: OutlinePrimitive,
  Group: OutlineGroup,
  Item: OutlineItem,
}; 
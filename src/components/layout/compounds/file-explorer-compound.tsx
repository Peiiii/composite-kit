import { 
  FileExplorer as FileExplorerPrimitive,
  FileExplorerGroup,
  FileExplorerItem,
  FileExplorerFolder 
} from "../components/file-explorer";

interface FileExplorerCompoundProps {
  Root: typeof FileExplorerPrimitive;
  Group: typeof FileExplorerGroup;
  Item: typeof FileExplorerItem;
  Folder: typeof FileExplorerFolder;
}

export const FileExplorer: FileExplorerCompoundProps = {
  Root: FileExplorerPrimitive,
  Group: FileExplorerGroup,
  Item: FileExplorerItem,
  Folder: FileExplorerFolder,
}; 
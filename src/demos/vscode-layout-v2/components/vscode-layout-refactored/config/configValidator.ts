import { ActivityItemConfig, FileConfig, SidebarViewConfig, CommandPaletteItem } from "./layoutTypes";

export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigValidationError";
  }
}

export function validateActivityItems(items: ActivityItemConfig[]): void {
  if (!Array.isArray(items)) {
    throw new ConfigValidationError("activityItems must be an array");
  }

  const ids = new Set<string>();
  items.forEach((item, index) => {
    if (!item.id) {
      throw new ConfigValidationError(`Activity item at index ${index} is missing an id`);
    }
    if (ids.has(item.id)) {
      throw new ConfigValidationError(`Duplicate activity item id: ${item.id}`);
    }
    ids.add(item.id);

    if (!item.icon) {
      throw new ConfigValidationError(`Activity item ${item.id} is missing an icon`);
    }
    if (!item.title) {
      throw new ConfigValidationError(`Activity item ${item.id} is missing a title`);
    }
    if (!item.sidebarViewId) {
      throw new ConfigValidationError(`Activity item ${item.id} is missing a sidebarViewId`);
    }
  });
}

export function validateFiles(files: FileConfig[]): void {
  if (!Array.isArray(files)) {
    throw new ConfigValidationError("files must be an array");
  }

  const ids = new Set<string>();
  files.forEach((file, index) => {
    if (!file.id) {
      throw new ConfigValidationError(`File at index ${index} is missing an id`);
    }
    if (ids.has(file.id)) {
      throw new ConfigValidationError(`Duplicate file id: ${file.id}`);
    }
    ids.add(file.id);

    if (!file.name) {
      throw new ConfigValidationError(`File ${file.id} is missing a name`);
    }
    if (typeof file.content !== "string") {
      throw new ConfigValidationError(`File ${file.id} content must be a string`);
    }
  });
}

export function validateSidebarViews(views: SidebarViewConfig[]): void {
  if (!Array.isArray(views)) {
    throw new ConfigValidationError("sidebarViews must be an array");
  }

  const ids = new Set<string>();
  views.forEach((view, index) => {
    if (!view.id) {
      throw new ConfigValidationError(`Sidebar view at index ${index} is missing an id`);
    }
    if (ids.has(view.id)) {
      throw new ConfigValidationError(`Duplicate sidebar view id: ${view.id}`);
    }
    ids.add(view.id);

    if (!view.title) {
      throw new ConfigValidationError(`Sidebar view ${view.id} is missing a title`);
    }
    if (typeof view.component !== "function") {
      throw new ConfigValidationError(`Sidebar view ${view.id} component must be a function`);
    }
  });
}

export function validateCommands(commands: CommandPaletteItem[]): void {
  if (!Array.isArray(commands)) {
    throw new ConfigValidationError("commands must be an array");
  }

  const ids = new Set<string>();
  commands.forEach((command, index) => {
    if (!command.id) {
      throw new ConfigValidationError(`Command at index ${index} is missing an id`);
    }
    if (ids.has(command.id)) {
      throw new ConfigValidationError(`Duplicate command id: ${command.id}`);
    }
    ids.add(command.id);

    if (!command.name) {
      throw new ConfigValidationError(`Command ${command.id} is missing a name`);
    }
    if (command.type === "command" && typeof command.action !== "function") {
      throw new ConfigValidationError(`Command ${command.id} is missing an action`);
    }
  });
}

export function validateConfig(config: {
  activityItems: ActivityItemConfig[];
  initialFiles: FileConfig[];
  sidebarViews: SidebarViewConfig[];
  commands: CommandPaletteItem[];
}): void {
  validateActivityItems(config.activityItems);
  validateFiles(config.initialFiles);
  validateSidebarViews(config.sidebarViews);
  validateCommands(config.commands);

  // 验证 activityItems 中的 sidebarViewId 是否都有对应的 view
  const viewIds = new Set(config.sidebarViews.map(view => view.id));
  config.activityItems.forEach(item => {
    if (!viewIds.has(item.sidebarViewId)) {
      throw new ConfigValidationError(
        `Activity item ${item.id} references non-existent sidebar view: ${item.sidebarViewId}`
      );
    }
  });
} 
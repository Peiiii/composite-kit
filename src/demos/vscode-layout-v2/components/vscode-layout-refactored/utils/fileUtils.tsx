import React from "react";
import {
  FileCode,
  FileJson,
  FileType,
  FileImage,
  File,
  FileText,
  FileAudio,
  FileVideo,
  FileArchive,
} from "lucide-react";
import type { FileConfig } from "../types/file";

const FILE_STORAGE_KEY = "vscode-layout-files";

export const getStoredFiles = (): FileConfig[] => {
  const stored = localStorage.getItem(FILE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredFiles = (files: FileConfig[]): void => {
  localStorage.setItem(FILE_STORAGE_KEY, JSON.stringify(files));
};

export const createFile = (
  name: string,
  content: string = "",
  id: string = crypto.randomUUID()
): FileConfig => ({
  id,
  name,
  content,
});

export const updateFile = (
  files: FileConfig[],
  fileId: string,
  updates: Partial<FileConfig>
): FileConfig[] => {
  return files.map((file) =>
    file.id === fileId ? { ...file, ...updates } : file
  );
};

export const deleteFile = (
  files: FileConfig[],
  fileId: string
): FileConfig[] => {
  return files.filter((file) => file.id !== fileId);
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getFileLanguage = (filename: string): string => {
  const ext = getFileExtension(filename);

  switch (ext) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
    case "json":
      return "json";
    case "md":
      return "markdown";
    case "css":
      return "css";
    case "html":
      return "html";
    default:
      return "plaintext";
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const isBinaryFile = (content: string): boolean => {
  // 简单的二进制文件检测
  // eslint-disable-next-line no-control-regex
  const binaryPattern = /[\0-\b\v-\x1F]/;
  return binaryPattern.test(content);
};

export const validateFileName = (name: string): boolean => {
  // 检查文件名是否为空
  if (!name.trim()) return false;

  // 检查文件名是否包含非法字符
  // eslint-disable-next-line no-control-regex
  const illegalChars = /[<>:"/\\|?*\0-\x1F]/;
  if (illegalChars.test(name)) return false;

  // 检查文件名长度
  if (name.length > 255) return false;

  return true;
};

export const generateUniqueFileName = (
  baseName: string,
  existingFiles: FileConfig[]
): string => {
  let counter = 1;
  let newName = baseName;

  while (existingFiles.some((file) => file.name === newName)) {
    const ext = getFileExtension(baseName);
    const nameWithoutExt = baseName.slice(0, baseName.lastIndexOf("."));
    newName = `${nameWithoutExt} (${counter}).${ext}`;
    counter++;
  }

  return newName;
};

export const FileIcon: React.FC<{ filename: string; className?: string }> = ({
  filename,
  className = "h-4 w-4",
}) => {
  const ext = getFileExtension(filename);

  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
      return <FileCode className={className} />;
    case "json":
      return <FileJson className={className} />;
    case "md":
    case "txt":
      return <FileType className={className} />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <FileImage className={className} />;
    default:
      return <File className={className} />;
  }
};

export const getFileType = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return "unknown";

  const typeMap: Record<string, string> = {
    // 文本文件
    txt: "text",
    md: "markdown",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    xml: "xml",
    html: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    less: "less",
    // 代码文件
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    go: "go",
    rb: "ruby",
    php: "php",
    // 图片文件
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    svg: "image",
    // 音频文件
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    // 视频文件
    mp4: "video",
    webm: "video",
    mov: "video",
    // 压缩文件
    zip: "archive",
    rar: "archive",
    tar: "archive",
    gz: "archive",
  };

  return typeMap[extension] || "unknown";
};

export const getFileIcon = (filename: string): React.ReactElement => {
  const type = getFileType(filename);
  const iconMap: Record<string, React.ReactElement> = {
    text: <FileText size={16} />,
    markdown: <FileText size={16} />,
    json: <FileCode size={16} />,
    yaml: <FileCode size={16} />,
    xml: <FileCode size={16} />,
    html: <FileCode size={16} />,
    css: <FileCode size={16} />,
    scss: <FileCode size={16} />,
    sass: <FileCode size={16} />,
    less: <FileCode size={16} />,
    javascript: <FileCode size={16} />,
    typescript: <FileCode size={16} />,
    python: <FileCode size={16} />,
    java: <FileCode size={16} />,
    c: <FileCode size={16} />,
    cpp: <FileCode size={16} />,
    csharp: <FileCode size={16} />,
    go: <FileCode size={16} />,
    ruby: <FileCode size={16} />,
    php: <FileCode size={16} />,
    image: <FileImage size={16} />,
    audio: <FileAudio size={16} />,
    video: <FileVideo size={16} />,
    archive: <FileArchive size={16} />,
    unknown: <File size={16} />,
  };

  return iconMap[type] || <File size={16} />;
};

export const getFileSize = (content: string): string => {
  const bytes = new Blob([content]).size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const getFileLastModified = (): string => {
  return new Date().toLocaleString();
};

export const getFileNameWithoutExtension = (filename: string): string => {
  return filename.split(".").slice(0, -1).join(".");
};

export const getFilePath = (filename: string): string => {
  return `/${filename}`;
};

export const getFileMimeType = (filename: string): string => {
  const extension = getFileExtension(filename);
  const mimeTypeMap: Record<string, string> = {
    txt: "text/plain",
    md: "text/markdown",
    json: "application/json",
    yml: "application/x-yaml",
    yaml: "application/x-yaml",
    xml: "application/xml",
    html: "text/html",
    css: "text/css",
    scss: "text/x-scss",
    sass: "text/x-sass",
    less: "text/x-less",
    js: "application/javascript",
    jsx: "application/javascript",
    ts: "application/typescript",
    tsx: "application/typescript",
    py: "text/x-python",
    java: "text/x-java-source",
    c: "text/x-csrc",
    cpp: "text/x-c++src",
    cs: "text/x-csharp",
    go: "text/x-go",
    rb: "text/x-ruby",
    php: "application/x-httpd-php",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    tar: "application/x-tar",
    gz: "application/gzip",
  };

  return mimeTypeMap[extension] || "application/octet-stream";
};

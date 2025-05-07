import * as React from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'

interface FileItem {
  name: string
  type: 'file' | 'folder'
  children?: FileItem[]
}

const mockFiles: FileItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Button.tsx', type: 'file' },
          { name: 'Input.tsx', type: 'file' },
          { name: 'Card.tsx', type: 'file' }
        ]
      },
      {
        name: 'pages',
        type: 'folder',
        children: [
          { name: 'Home.tsx', type: 'file' },
          { name: 'About.tsx', type: 'file' }
        ]
      },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.tsx', type: 'file' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file' },
      { name: 'favicon.ico', type: 'file' }
    ]
  },
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'README.md', type: 'file' }
]

const FileTreeItem: React.FC<{ item: FileItem; level?: number }> = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const isFolder = item.type === 'folder'

  return (
    <div>
      <div 
        className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer"
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder ? (
          isOpen ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
        ) : null}
        {isFolder ? (
          <Folder className="w-4 h-4 mr-2 text-blue-500" />
        ) : (
          <File className="w-4 h-4 mr-2 text-gray-500" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {isFolder && isOpen && item.children?.map((child, index) => (
        <FileTreeItem key={index} item={child} level={level + 1} />
      ))}
    </div>
  )
}

export const ExplorerPage: React.FC = () => {
  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">文件浏览器</h2>
      </div>
      <div className="py-2">
        {mockFiles.map((item, index) => (
          <FileTreeItem key={index} item={item} />
        ))}
      </div>
    </div>
  )
} 
import React, { useState, useRef, useEffect } from 'react';
import { 
  NavBar,
  NavBarItem,
  NavBarGroup,
  NavBarSection,
  ListItem,
  PageHeader,
  Input,
  IconButton,
  Section,
  EmptyState,
  MenuList,
  Button
} from '../wechat-layout';
import { 
  FileText, 
  Star, 
  Tag, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash,
  Share2,
  Save,
  Image as ImageIcon
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  tags: string[];
  isStarred: boolean;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: '项目计划',
    content: '1. 完成UI设计\n2. 开发核心功能\n3. 进行测试\n4. 部署上线',
    updatedAt: '10:30',
    tags: ['工作', '计划'],
    isStarred: true
  },
  {
    id: '2',
    title: '会议记录',
    content: '讨论了新功能的开发计划，确定了时间节点和负责人...',
    updatedAt: '昨天',
    tags: ['会议'],
    isStarred: false
  },
  {
    id: '3',
    title: '学习笔记',
    content: 'React Hooks的使用方法和最佳实践...',
    updatedAt: '周一',
    tags: ['学习', '技术'],
    isStarred: true
  }
];

const navItems = [
  { id: "notes", icon: <FileText className="h-5 w-5" />, label: "笔记" },
  { id: "favorites", icon: <Star className="h-5 w-5" />, label: "收藏" },
  { id: "tags", icon: <Tag className="h-5 w-5" />, label: "标签" },
  { id: "settings", icon: <Settings className="h-5 w-5" />, label: "设置" },
];

const menuItems = [
  { id: "edit", icon: <Edit className="h-4 w-4" />, label: "编辑" },
  { id: "share", icon: <Share2 className="h-4 w-4" />, label: "分享" },
  { id: "delete", icon: <Trash className="h-4 w-4" />, label: "删除" },
];

export const BasicDemo: React.FC = () => {
  const [activeNav, setActiveNav] = useState("notes");
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredNotes = mockNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNoteClick = (noteId: string) => {
    setActiveNote(noteId);
    const note = mockNotes.find(n => n.id === noteId);
    if (note) {
      setEditingNote(note);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left, y: rect.bottom });
    setShowMenu(true);
  };

  const renderNoteEditor = () => {
    if (!editingNote) {
      return (
        <div className="flex-1 flex flex-col min-h-0">
          <PageHeader title="笔记详情" />
          <EmptyState message="请选择一个笔记或创建新笔记" />
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col min-h-0">
        <PageHeader
          title="编辑笔记"
          actions={[
            <IconButton
              key="save"
              icon={<Save className="h-5 w-5" />}
              variant="ghost"
              onClick={() => {}}
            />,
            <IconButton
              key="image"
              icon={<ImageIcon className="h-5 w-5" />}
              variant="ghost"
              onClick={() => {}}
            />
          ]}
        />

        <div className="flex-1 min-h-0 overflow-auto">
          <div className="p-4 space-y-4">
            <Input
              placeholder="标题"
              value={editingNote.title}
              onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              className="text-lg font-medium"
            />

            <div className="flex flex-wrap gap-2">
              {editingNote.tags.map(tag => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              <Button variant="ghost" size="sm" className="text-xs">
                <Plus className="h-3 w-3 mr-1" />
                添加标签
              </Button>
            </div>

            <textarea
              className="w-full p-2 bg-transparent border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[200px] max-h-[calc(100vh-300px)]"
              placeholder="开始写作..."
              value={editingNote.content}
              onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRightContent = () => {
    switch (activeNav) {
      case "notes":
        return (
          <div className="flex-1 flex min-h-0">
            <div className="w-80 border-r border-border flex flex-col min-h-0">
              <PageHeader
                title="笔记"
                actions={[
                  <IconButton
                    key="add"
                    icon={<Plus className="h-5 w-5" />}
                    variant="ghost"
                    onClick={() => {}}
                  />,
                  <IconButton
                    key="search"
                    icon={<Search className="h-5 w-5" />}
                    variant="ghost"
                    onClick={() => {}}
                  />
                ]}
              />

              <Section>
                <Input
                  icon={<Search className="h-4 w-4 text-muted-foreground" />}
                  placeholder="搜索笔记..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Section>

              <div className="flex-1 overflow-auto">
                {filteredNotes.map((note) => (
                  <ListItem
                    key={note.id}
                    title={
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium truncate">{note.title}</span>
                        {note.isStarred && (
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                    }
                    subtitle={
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm text-muted-foreground truncate">
                          {note.content}
                        </span>
                        <div className="flex gap-1 flex-shrink-0">
                          {note.tags.map(tag => (
                            <span key={tag} className="text-xs bg-primary/10 text-primary px-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    right={
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground">{note.updatedAt}</span>
                        <IconButton
                          ref={menuTriggerRef}
                          icon={<MoreVertical className="h-4 w-4" />}
                          variant="ghost"
                          onClick={handleMenuClick}
                        />
                      </div>
                    }
                    isActive={activeNote === note.id}
                    onClick={() => handleNoteClick(note.id)}
                  />
                ))}
              </div>
            </div>

            {renderNoteEditor()}
          </div>
        );
      case "favorites":
        return (
          <div className="flex-1 flex flex-col">
            <PageHeader title="收藏" />
            <EmptyState message="暂无收藏笔记" />
          </div>
        );
      case "tags":
        return (
          <div className="flex-1 flex flex-col">
            <PageHeader title="标签" />
            <EmptyState message="暂无标签" />
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 flex flex-col">
            <PageHeader title="设置" />
            <EmptyState message="暂无设置项" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <NavBar>
        <NavBarSection>
          <NavBarGroup>
            {navItems.map((item) => (
              <NavBarItem
                key={item.id}
                icon={item.icon}
                isActive={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              />
            ))}
          </NavBarGroup>
        </NavBarSection>
      </NavBar>

      {renderRightContent()}

      {showMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            left: menuPosition.x,
            top: menuPosition.y,
          }}
        >
          <MenuList
            items={menuItems}
            onClose={() => setShowMenu(false)}
          />
        </div>
      )}
    </div>
  );
};

export default BasicDemo;

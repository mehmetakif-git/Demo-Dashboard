import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Folder,
  FileText,
  FileSpreadsheet,
  Image,
  File,
  Upload,
  FolderPlus,
  Clock,
  HardDrive,
  Files,
  Palette,
} from 'lucide-react';
import { PageHeader, Card, Button } from '@/components/common';
import { projectFiles, formatDate, type Project } from '@/data/fileData';

export const ProjectFiles = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getFileIcon = (type: string, size: number = 20) => {
    const iconMap: Record<string, React.ReactNode> = {
      folder: <Folder size={size} className="text-[#547792]" />,
      document: <FileText size={size} className="text-blue-400" />,
      spreadsheet: <FileSpreadsheet size={size} className="text-green-400" />,
      pdf: <FileText size={size} className="text-red-400" />,
      image: <Image size={size} className="text-pink-400" />,
      design: <Palette size={size} className="text-[#94B4C1]" />,
    };

    return iconMap[type] || <File size={size} className="text-gray-400" />;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Project Files View
  if (selectedProject) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedProject(null)}
            className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-text-secondary" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${selectedProject.projectColor}20` }}
              >
                <Folder size={20} style={{ color: selectedProject.projectColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{selectedProject.projectName}</h1>
                <p className="text-text-secondary">
                  {selectedProject.totalFiles} files - {selectedProject.totalSize}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<FolderPlus size={16} />}>
              New Folder
            </Button>
            <Button leftIcon={<Upload size={16} />}>
              Upload
            </Button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-primary/20 rounded-lg">
                <Files size={20} className="text-accent-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{selectedProject.totalFiles}</p>
                <p className="text-sm text-text-secondary">Total Files</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#94B4C1]/20 rounded-lg">
                <HardDrive size={20} className="text-[#94B4C1]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{selectedProject.totalSize}</p>
                <p className="text-sm text-text-secondary">Total Size</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{formatDate(selectedProject.lastActivity)}</p>
                <p className="text-sm text-text-secondary">Last Activity</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Files List */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.05] border-b border-white/[0.08]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    Modified By
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.files.map((file) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/[0.08] hover:bg-white/[0.05] cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span className="font-medium text-text-primary">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{formatDate(file.modifiedAt)}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {file.type === 'folder' ? `${file.itemCount} items` : file.size}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-accent-primary">
                            {getInitials(file.modifiedBy)}
                          </span>
                        </div>
                        <span className="text-sm text-text-secondary">{file.modifiedBy}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  // Projects Grid View
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Files"
        subtitle="Browse files organized by project"
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectFiles.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedProject(project)}
            >
              {/* Color Indicator */}
              <div
                className="w-full h-1 rounded-full mb-4"
                style={{ backgroundColor: project.projectColor }}
              />

              {/* Project Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${project.projectColor}20` }}
                >
                  <Folder size={24} style={{ color: project.projectColor }} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{project.projectName}</h3>
                  <p className="text-sm text-text-muted">{project.totalFiles} files</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <p className="text-lg font-bold text-text-primary">{project.totalSize}</p>
                  <p className="text-xs text-text-muted">Total Size</p>
                </div>
                <div className="p-3 bg-white/[0.05] rounded-lg">
                  <p className="text-lg font-bold text-text-primary">{project.files.length}</p>
                  <p className="text-xs text-text-muted">Root Items</p>
                </div>
              </div>

              {/* Recent Files Preview */}
              <div className="space-y-2 mb-4">
                {project.files.slice(0, 3).map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 p-2 bg-white/[0.05] rounded-lg"
                  >
                    {getFileIcon(file.type, 16)}
                    <span className="text-sm text-text-secondary truncate flex-1">{file.name}</span>
                    <span className="text-xs text-text-muted">
                      {file.type === 'folder' ? `${file.itemCount} items` : file.size}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock size={12} />
                  <span>Last activity {formatDate(project.lastActivity)}</span>
                </div>
                {/* Team Avatars */}
                <div className="flex -space-x-2">
                  {[...new Set(project.files.map(f => f.modifiedBy))].slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full bg-accent-primary/20 border-2 border-white/[0.08] flex items-center justify-center"
                      title={member}
                    >
                      <span className="text-[8px] font-bold text-accent-primary">
                        {getInitials(member)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {projectFiles.length === 0 && (
        <Card className="p-12 text-center">
          <Folder size={48} className="mx-auto mb-4 text-text-muted" />
          <p className="text-text-secondary mb-4">No project files found</p>
          <Button variant="secondary">Browse All Projects</Button>
        </Card>
      )}
    </div>
  );
};

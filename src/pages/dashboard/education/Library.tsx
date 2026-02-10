import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Library as LibraryIcon,
  Search,
  Plus,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Button, Input, Dropdown } from '@/components/common';
import { libraryBooks, borrowings, EDUCATION_COLOR } from '@/data/education/educationData';
import { useTranslation } from 'react-i18next';

export const Library = () => {
  const { t } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [view, setView] = useState<'books' | 'borrowings'>('books');

  const categories = useMemo(() => {
    const cats = [...new Set(libraryBooks.map(b => b.category))];
    return cats;
  }, []);

  const stats = useMemo(() => {
    const available = libraryBooks.reduce((acc, b) => acc + b.availableCopies, 0);
    const borrowed = libraryBooks.reduce((acc, b) => acc + (b.totalCopies - b.availableCopies), 0);
    const overdue = borrowings.filter(b => b.status === 'overdue').length;

    return {
      totalBooks: libraryBooks.length,
      available,
      borrowed,
      overdue,
    };
  }, []);

  const filteredBooks = useMemo(() => {
    return libraryBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'available': '#10b981',
      'borrowed': '#f59e0b',
      'reserved': '#6366f1',
      'active': '#3b82f6',
      'overdue': '#ef4444',
      'returned': '#10b981',
    };
    return colors[status] || EDUCATION_COLOR;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Roman': '#ec4899',
      'Ders Kitabi': EDUCATION_COLOR,
      'Bilim': '#10b981',
      'Tarih': '#f59e0b',
    };
    return colors[category] || EDUCATION_COLOR;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('education.libraryManagement', 'Library Management')}
        subtitle="Manage books and borrowings"
        icon={LibraryIcon}
        actions={
          <Button>
            <Plus size={18} />
            Add New Book
          </Button>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Books', value: stats.totalBooks, icon: BookOpen, color: EDUCATION_COLOR },
          { label: 'Available', value: stats.available, icon: CheckCircle, color: '#10b981' },
          { label: 'Borrowed', value: stats.borrowed, icon: Clock, color: '#f59e0b' },
          { label: 'Overdue', value: stats.overdue, icon: AlertTriangle, color: '#ef4444' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* View Toggle and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={view === 'books' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('books')}
            >
              Books
            </Button>
            <Button
              variant={view === 'borrowings' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('borrowings')}
            >
              Borrowings
            </Button>
          </div>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {view === 'books' && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={categoryFilter === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter('all')}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Content */}
      {view === 'books' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book, index) => {
            const statusColor = getStatusColor(book.status);
            const categoryColor = getCategoryColor(book.category);

            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-16 rounded flex items-center justify-center"
                        style={{ backgroundColor: `${categoryColor}20` }}
                      >
                        <BookOpen size={24} style={{ color: categoryColor }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-primary line-clamp-1">{book.title}</p>
                        <p className="text-sm text-text-muted">{book.author}</p>
                      </div>
                    </div>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'view', label: 'View Details', onClick: () => {} },
                        { id: 'edit', label: 'Edit Book', onClick: () => {} },
                        { id: 'issue', label: 'Issue Book', onClick: () => {} },
                        { id: 'return', label: 'Return Book', onClick: () => {} },
                      ]}
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">ISBN</span>
                      <span className="text-text-primary font-mono text-xs">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Category</span>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
                      >
                        {book.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Available</span>
                      <span className="text-text-primary">
                        {book.availableCopies} / {book.totalCopies}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Location</span>
                      <span className="text-text-primary">{book.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border-default flex items-center justify-between">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      {book.availableCopies > 0 ? 'Available' : 'All Borrowed'}
                    </span>
                    <span className="text-xs text-text-muted">{book.language}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {borrowings.map((borrowing, index) => {
            const statusColor = getStatusColor(borrowing.status);

            return (
              <motion.div
                key={borrowing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Book Info */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-10 h-14 rounded flex items-center justify-center"
                        style={{ backgroundColor: `${EDUCATION_COLOR}20` }}
                      >
                        <BookOpen size={20} style={{ color: EDUCATION_COLOR }} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{borrowing.bookTitle}</p>
                        <p className="text-xs text-text-muted">ID: {borrowing.bookId}</p>
                      </div>
                    </div>

                    {/* Student */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: EDUCATION_COLOR }}
                      >
                        {borrowing.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-text-primary">{borrowing.studentName}</span>
                    </div>

                    {/* Dates */}
                    <div className="text-center">
                      <p className="text-sm text-text-primary">
                        {new Date(borrowing.borrowDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-muted">Borrow Date</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-text-primary">
                        {new Date(borrowing.dueDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-muted">Due Date</p>
                    </div>

                    {borrowing.returnDate && (
                      <div className="text-center">
                        <p className="text-sm text-text-primary">
                          {new Date(borrowing.returnDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-text-muted">Returned</p>
                      </div>
                    )}

                    {/* Status */}
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                      style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                      {borrowing.status}
                    </span>

                    {/* Actions */}
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      items={[
                        { id: 'return', label: 'Mark as Returned', onClick: () => {} },
                        { id: 'extend', label: 'Extend Due Date', onClick: () => {} },
                        { id: 'fine', label: 'Calculate Fine', onClick: () => {} },
                      ]}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {((view === 'books' && filteredBooks.length === 0) || (view === 'borrowings' && borrowings.length === 0)) && (
        <Card className="p-12 text-center">
          <LibraryIcon size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-secondary">No {view} found</p>
        </Card>
      )}
    </div>
  );
};

export default Library;

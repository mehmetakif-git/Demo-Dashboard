import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Settings,
  UserPlus,
  LogOut,
  X,
  Users,
  Crown,
  Plus,
} from 'lucide-react';
import { Input, Button } from '@/components/common';
import {
  groupChats,
  groupMessages,
  getStatusColor,
  getUserById,
  type GroupChat,
  type Message,
} from '@/data/communicationData';

export const GroupChats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<GroupChat | null>(groupChats[0]);
  const [messageInput, setMessageInput] = useState('');
  const [showGroupInfo, setShowGroupInfo] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupChats;
    const query = searchQuery.toLowerCase();
    return groupChats.filter(group =>
      group.name.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentMessages = useMemo(() => {
    if (!selectedGroup) return [];
    return groupMessages[selectedGroup.id] || [];
  }, [selectedGroup]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    currentMessages.forEach(msg => {
      const msgDate = formatDate(msg.timestamp);
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msgDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  }, [currentMessages]);

  // Get group members info
  const groupMembers = useMemo(() => {
    if (!selectedGroup) return [];
    return selectedGroup.members
      .map(id => {
        if (id === 'current-user') {
          return { id: 'current-user', name: 'You', status: 'online' as const, isAdmin: false };
        }
        const user = getUserById(id);
        return user ? { ...user, isAdmin: id === selectedGroup.members[0] } : null;
      })
      .filter(Boolean);
  }, [selectedGroup]);

  return (
    <div className="h-[calc(100vh-120px)] flex gap-0 overflow-hidden rounded-lg border border-white/[0.08]">
      {/* Left Panel - Groups List */}
      <div className="w-80 bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.08] flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08]">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Group Chats</h2>
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.map(group => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`p-4 cursor-pointer border-b border-white/[0.08] transition-colors ${
                selectedGroup?.id === group.id
                  ? 'bg-accent-primary/10'
                  : 'hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Group Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${group.color}30` }}
                >
                  <span className="text-sm font-bold" style={{ color: group.color }}>
                    {getInitials(group.name)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary truncate">
                      {group.name}
                    </span>
                    <span className="text-xs text-text-muted shrink-0">
                      {formatTime(group.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary truncate">
                    <span className="font-medium">{group.lastMessageSender}: </span>
                    {group.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={12} className="text-text-muted" />
                    <span className="text-xs text-text-muted">{group.memberCount} members</span>
                  </div>
                </div>

                {/* Unread Badge */}
                {group.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{group.unreadCount}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Create Group Button */}
        <div className="p-4 border-t border-white/[0.08]">
          <Button className="w-full" leftIcon={<Plus size={16} />}>
            Create Group
          </Button>
        </div>
      </div>

      {/* Middle Panel - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedGroup ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${selectedGroup.color}30` }}
                >
                  <span className="text-sm font-bold" style={{ color: selectedGroup.color }}>
                    {getInitials(selectedGroup.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedGroup.name}</h3>
                  <span className="text-xs text-text-secondary">{selectedGroup.memberCount} members</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                  <UserPlus size={18} className="text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                  <Settings size={18} className="text-text-secondary" />
                </button>
                <button
                  onClick={() => setShowGroupInfo(!showGroupInfo)}
                  className={`p-2 rounded-lg transition-colors ${
                    showGroupInfo ? 'bg-accent-primary/20 text-accent-primary' : 'hover:bg-white/[0.05] text-text-secondary'
                  }`}
                >
                  <Users size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {groupedMessages.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Date Separator */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="px-3 py-1 bg-white/[0.05] rounded-full">
                      <span className="text-xs text-text-muted">{group.date}</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3">
                    {group.messages.map((message, index) => {
                      const isSent = message.sender === 'current-user';
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isSent && (
                            <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center mr-2 shrink-0">
                              <span className="text-xs font-bold text-accent-primary">
                                {getInitials(message.senderName)}
                              </span>
                            </div>
                          )}
                          <div
                            className={`max-w-[70%] px-4 py-2.5 ${
                              isSent
                                ? 'bg-[#547792]/80 backdrop-blur-sm text-white rounded-lg rounded-br-sm border border-[#94B4C1]/20'
                                : 'bg-white/[0.08] backdrop-blur-sm text-text-primary rounded-lg rounded-bl-sm border border-white/[0.08]'
                            }`}
                          >
                            {!isSent && (
                              <p className="text-xs font-semibold text-accent-primary mb-1">
                                {message.senderName}
                              </p>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <div className={`flex items-center gap-1 mt-1 ${isSent ? 'justify-end' : 'justify-start'}`}>
                              <span className={`text-xs ${isSent ? 'text-white/70' : 'text-text-muted'}`}>
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors mb-1">
                  <Paperclip size={20} className="text-text-secondary" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary resize-none"
                  />
                  <p className="text-xs text-text-muted mt-1">Press Enter to send</p>
                </div>
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors mb-1">
                  <Smile size={20} className="text-text-secondary" />
                </button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="mb-1"
                  leftIcon={<Send size={16} />}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">Select a group to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Group Info */}
      {showGroupInfo && selectedGroup && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="border-l border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden shrink-0"
        >
          <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Group Info</h3>
              <button
                onClick={() => setShowGroupInfo(false)}
                className="p-1 hover:bg-white/[0.05] rounded"
              >
                <X size={16} className="text-text-secondary" />
              </button>
            </div>

            {/* Group Info */}
            <div className="text-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: `${selectedGroup.color}30` }}
              >
                <span className="text-2xl font-bold" style={{ color: selectedGroup.color }}>
                  {getInitials(selectedGroup.name)}
                </span>
              </div>
              <h4 className="font-semibold text-text-primary mt-3">{selectedGroup.name}</h4>
              <p className="text-sm text-text-secondary">{selectedGroup.description}</p>
              <span className="inline-flex items-center gap-1 mt-2 text-xs text-text-muted">
                Created by {selectedGroup.createdBy}
              </span>
            </div>

            {/* Members List */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-medium text-text-secondary">
                  Members ({selectedGroup.memberCount})
                </h5>
                <button className="p-1 hover:bg-white/[0.05] rounded">
                  <UserPlus size={14} className="text-text-secondary" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2">
                {groupMembers.map((member) => member && (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent-primary">
                          {getInitials(member.name)}
                        </span>
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white/[0.08]"
                        style={{ backgroundColor: getStatusColor(member.status) }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-text-primary truncate">
                          {member.name}
                        </span>
                        {member.isAdmin && (
                          <Crown size={12} className="text-yellow-500 shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-text-muted capitalize">{member.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <Button variant="secondary" className="w-full justify-start text-red-400 hover:bg-red-500/10" leftIcon={<LogOut size={16} />}>
                Leave Group
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  X,
  Mail,
  Building2,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { Card, Input, Button } from '@/components/common';
import {
  directMessages,
  conversationMessages,
  chatUsers,
  getStatusColor,
  type DirectMessage,
  type Message,
} from '@/data/communicationData';
import { getProfileImage } from '@/utils/profileImages';

export const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<DirectMessage | null>(directMessages[0]);
  const [messageInput, setMessageInput] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = useMemo(() => {
    if (!searchQuery) return directMessages;
    const query = searchQuery.toLowerCase();
    return directMessages.filter(dm =>
      dm.otherUser.name.toLowerCase().includes(query) ||
      dm.lastMessage.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentMessages = useMemo(() => {
    if (!selectedConversation) return [];
    return conversationMessages[selectedConversation.odConversationId] || [];
  }, [selectedConversation]);

  const selectedUser = useMemo(() => {
    if (!selectedConversation) return null;
    return chatUsers.find(u => u.id === selectedConversation.otherUser.id);
  }, [selectedConversation]);

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
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // In a real app, this would send the message
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

  return (
    <div className="h-[calc(100vh-120px)] flex gap-0 overflow-hidden rounded-lg border border-white/[0.08]">
      {/* Left Panel - Conversations List */}
      <div className="w-80 bg-white/[0.03] backdrop-blur-xl border-r border-white/[0.08] flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08]">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Messages</h2>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.odConversationId}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 cursor-pointer border-b border-white/[0.08] transition-colors ${
                selectedConversation?.odConversationId === conversation.odConversationId
                  ? 'bg-accent-primary/10'
                  : 'hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar with status */}
                <div className="relative">
                  {(() => {
                    const profileImg = getProfileImage(conversation.otherUser.name);
                    if (profileImg) {
                      return (
                        <img
                          src={profileImg}
                          alt={conversation.otherUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      );
                    }
                    return (
                      <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-primary">
                          {getInitials(conversation.otherUser.name)}
                        </span>
                      </div>
                    );
                  })()}
                  <div
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white/[0.08]"
                    style={{ backgroundColor: getStatusColor(conversation.otherUser.status) }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-text-primary truncate">
                      {conversation.otherUser.name}
                    </span>
                    <span className="text-xs text-text-muted shrink-0">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary truncate">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">{conversation.unreadCount}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* New Message Button */}
        <div className="p-4 border-t border-white/[0.08]">
          <Button className="w-full" leftIcon={<Plus size={16} />}>
            New Message
          </Button>
        </div>
      </div>

      {/* Middle Panel - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {(() => {
                    const profileImg = getProfileImage(selectedConversation.otherUser.name);
                    if (profileImg) {
                      return (
                        <img
                          src={profileImg}
                          alt={selectedConversation.otherUser.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      );
                    }
                    return (
                      <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-accent-primary">
                          {getInitials(selectedConversation.otherUser.name)}
                        </span>
                      </div>
                    );
                  })()}
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white/[0.08]"
                    style={{ backgroundColor: getStatusColor(selectedConversation.otherUser.status) }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{selectedConversation.otherUser.name}</h3>
                  <span className="text-xs text-text-secondary capitalize">{selectedConversation.otherUser.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                  <Phone size={18} className="text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors">
                  <Video size={18} className="text-text-secondary" />
                </button>
                <button
                  onClick={() => setShowUserInfo(!showUserInfo)}
                  className={`p-2 rounded-lg transition-colors ${
                    showUserInfo ? 'bg-accent-primary/20 text-accent-primary' : 'hover:bg-white/[0.05] text-text-secondary'
                  }`}
                >
                  <Info size={18} />
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
                          <div
                            className={`max-w-[70%] px-4 py-2.5 ${
                              isSent
                                ? 'bg-[#547792]/80 backdrop-blur-sm text-white rounded-lg rounded-br-sm border border-[#94B4C1]/20'
                                : 'bg-white/[0.08] backdrop-blur-sm text-text-primary rounded-lg rounded-bl-sm border border-white/[0.08]'
                            }`}
                          >
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
              <MessageSquare size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-text-secondary">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - User Info */}
      {showUserInfo && selectedUser && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="border-l border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden shrink-0"
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-text-primary">Profile</h3>
              <button
                onClick={() => setShowUserInfo(false)}
                className="p-1 hover:bg-white/[0.05] rounded"
              >
                <X size={16} className="text-text-secondary" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {(() => {
                  const profileImg = getProfileImage(selectedUser.name);
                  if (profileImg) {
                    return (
                      <img
                        src={profileImg}
                        alt={selectedUser.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto"
                      />
                    );
                  }
                  return (
                    <div className="w-20 h-20 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-accent-primary">
                        {getInitials(selectedUser.name)}
                      </span>
                    </div>
                  );
                })()}
                <div
                  className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white/[0.08]"
                  style={{ backgroundColor: getStatusColor(selectedUser.status) }}
                />
              </div>
              <h4 className="font-semibold text-text-primary mt-3">{selectedUser.name}</h4>
              <p className="text-sm text-text-secondary">{selectedUser.position}</p>
              <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full capitalize">
                {selectedUser.status}
              </span>
            </div>

            {/* Contact Info */}
            <Card className="p-4 mb-4">
              <h5 className="text-sm font-medium text-text-secondary mb-3">Contact</h5>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-text-muted" />
                  <a href={`mailto:${selectedUser.name.toLowerCase().replace(' ', '.')}@company.com`} className="text-sm text-accent-primary hover:underline">
                    {selectedUser.name.toLowerCase().replace(' ', '.')}@company.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{selectedUser.department}</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Mail size={16} />}>
                Send Email
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Video size={16} />}>
                Video Call
              </Button>
              <Button variant="secondary" className="w-full justify-start" leftIcon={<Info size={16} />}>
                View Full Profile
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

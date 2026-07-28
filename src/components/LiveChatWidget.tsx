import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatTeardropDots,
  PaperPlaneRight,
  SpinnerGap,
  XCircle,
  Minus,
  CheckCircle,
  User,
  ArrowRight
} from '@phosphor-icons/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const STORAGE_KEY = 'land_trust_chat_messages';
const BOT_NAME = 'Land & Trust Support';

const AUTO_REPLIES: Record<string, string> = {
  hello: "Hello! Welcome to Land & Trust Nigeria. How can I assist you today?",
  hi: "Hi there! I'm your virtual assistant. Feel free to ask about properties, energy solutions, or our services.",
  property: "We have verified properties across Nigeria. You can browse our listings or tell me what you're looking for!",
  price: "Our properties range from ₦3.5M for land plots to premium luxury estates. Check our listings for detailed pricing.",
  energy: "We offer solar generators, biogas plants, and energy-efficient appliances. Visit our Energy Store to explore!",
  biogas: "Our biogas products convert waste into clean energy. Perfect for homes and businesses. Check the Biogas section!",
  contact: "You can reach us at +234 800 LAND TRUST or email info@landandtrust.ng. We're based in Victoria Island, Lagos.",
  help: "I can help with: property listings, pricing, energy solutions, biogas products, or contact info. What would you like to know?",
  default: "Thanks for your message! One of our team members will get back to you shortly. Meanwhile, feel free to browse our website."
};

const QUICK_REPLIES = [
  "Tell me about properties",
  "What are your prices?",
  "Energy solutions",
  "Biogas products",
  "Contact info"
];

const detectIntent = (text: string): string => {
  const lower = text.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return 'hello';
  if (lower.includes('property') || lower.includes('house') || lower.includes('land') || lower.includes('apartment')) return 'property';
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) return 'price';
  if (lower.includes('energy') || lower.includes('solar') || lower.includes('power')) return 'energy';
  if (lower.includes('biogas') || lower.includes('gas')) return 'biogas';
  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('address')) return 'contact';
  if (lower.includes('help') || lower.includes('what') || lower.includes('can you')) return 'help';
  return 'default';
};

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        setMessages(parsed);
        // Count unread bot messages
        const lastRead = sessionStorage.getItem('land_trust_chat_last_read');
        if (lastRead) {
          const unread = parsed.filter(
            (m) => m.sender === 'bot' && m.timestamp > parseInt(lastRead)
          ).length;
          setUnreadCount(unread);
        }
      }
    } catch {}
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const saveMessages = (msgs: Message[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch {}
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      sender,
      timestamp: Date.now(),
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(updated);
    return newMsg;
  };

  const simulateBotReply = (userText: string) => {
    setIsTyping(true);
    const delay = 1000 + Math.random() * 1500;

    setTimeout(() => {
      const intent = detectIntent(userText);
      const reply = AUTO_REPLIES[intent] || AUTO_REPLIES.default;
      addMessage(reply, 'bot');
      setIsTyping(false);
    }, delay);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    addMessage(text, 'user');
    setInput('');
    simulateBotReply(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    setInput('');
    simulateBotReply(reply);
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (!prev) {
        // Opening: reset unread count
        setUnreadCount(0);
        sessionStorage.setItem('land_trust_chat_last_read', Date.now().toString());
        setIsMinimized(false);
      }
      return !prev;
    });
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    sessionStorage.setItem('land_trust_chat_last_read', Date.now().toString());
    setUnreadCount(0);
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[360px] sm:w-[400px] h-[540px] bg-white rounded-2xl shadow-2xl border border-primary/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ChatTeardropDots className="h-5 w-5 text-white" weight="fill" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Live Support</p>
                  <p className="text-emerald-100 text-xs">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={handleMinimize}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Minimize chat"
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50/30 to-white">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <ChatTeardropDots className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Welcome to Land & Trust!</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ask us anything about properties, energy solutions, or our services.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <ChatTeardropDots className="h-4 w-4" weight="fill" />
                    )}
                  </div>
                  <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-md'
                          : 'bg-emerald-50 text-emerald-900 rounded-tl-md border border-emerald-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                    <ChatTeardropDots className="h-4 w-4 text-white" weight="fill" />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                    <SpinnerGap className="h-4 w-4 text-emerald-500 animate-spin" />
                    <span className="text-xs text-emerald-600 font-medium">Typing...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-emerald-100/50 bg-emerald-50/30">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-white border border-emerald-200 rounded-full px-3 py-1.5 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors font-medium"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t bg-white shrink-0">
              <div className="flex items-center gap-2 bg-emerald-50/50 rounded-xl border border-emerald-100 px-3 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm py-1.5"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <PaperPlaneRight className="h-4 w-4" weight="fill" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XCircle className="h-6 w-6" weight="fill" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <ChatTeardropDots className="h-6 w-6" weight="fill" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LiveChatWidget;
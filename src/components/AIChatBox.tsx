import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { askGeminiCustomerSupport } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isStreaming: boolean;
}

export function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'initial',
    role: 'model',
    content: "Hello! I'm the Sentinel-AI Support Agent. This application was built by Ishan. How can I help clarify any doubts you have?",
    isStreaming: false
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input.trim(), isStreaming: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMsgId, role: 'model', content: '', isStreaming: true }]);

    try {
      // transform local messages to genai SDK history format
      const history = messages.filter(m => m.id !== 'initial').map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const fullResponse = await askGeminiCustomerSupport(
        userMsg.content,
        history,
        (chunk) => {
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId ? { ...msg, content: msg.content + chunk } : msg
          ));
        }
      );

      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId ? { ...msg, content: fullResponse, isStreaming: false } : msg
      ));
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== modelMsgId).concat({
        id: Date.now().toString(),
        role: 'model',
        content: "I'm sorry, I encountered an error. Please try again.",
        isStreaming: false
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] border border-yellow-500/30 rounded-xl overflow-hidden flex flex-col bg-[#050505] shadow-[0_0_30px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/10"
          >
            {/* Header */}
            <div className="bg-yellow-500 text-black px-4 py-3 flex justify-between items-center z-10 shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold font-sans text-sm">Sentinel-AI Support</h3>
                  <p className="text-[10px] uppercase tracking-wider font-mono opacity-80">Built by Ishan</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/10 rounded-sm transition-colors text-black flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0a0a]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-[#111]">
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white/70" /> : <Bot className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <div className={`p-3 rounded-lg text-sm font-sans ${
                      msg.role === 'user' 
                        ? 'bg-yellow-500/20 text-yellow-100 border border-yellow-500/20 rounded-tr-none' 
                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none markdown-override'
                    }`}>
                      {msg.role === 'user' ? (
                         <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                         <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-yellow-500/20 bg-[#050505] shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-full pl-4 pr-12 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 font-sans text-sm transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 p-1.5 rounded-full text-yellow-500 hover:bg-yellow-500/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 hover:bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center text-black shadow-lg shadow-yellow-500/30 transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

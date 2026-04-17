import { 
  Send, 
  X, 
  MessageCircle, 
  Video, 
  Phone, 
  Paperclip, 
  Mic, 
  Languages,
  User,
  Monitor
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: number;
  type: 'text' | 'image' | 'voice' | 'video_call' | 'voice_call';
  translatedText?: string;
}

export const ChatWidget = ({ lang }: { lang: Language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'admin', text: 'Hello! How can I help you today?', timestamp: Date.now(), type: 'text' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeCall, setActiveCall] = useState<'video' | 'voice' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const startCall = (type: 'video' | 'voice') => {
    setActiveCall(type);
    setTimeout(() => {
      setActiveCall(null);
      const callMsg: Message = {
        id: Date.now().toString(),
        sender: 'admin',
        text: `${type === 'video' ? 'Video' : 'Voice'} call ended (02:45)`,
        timestamp: Date.now(),
        type: type === 'video' ? 'video_call' : 'voice_call'
      };
      setMessages(prev => [...prev, callMsg]);
    }, 5000); // Simulate 5s call
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: Date.now(),
      type: 'text'
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');

    // Mock response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'admin',
        text: 'Thank you for your inquiry. An administrator will reply shortly.',
        timestamp: Date.now(),
        type: 'text',
        translatedText: lang !== 'en' ? translations[lang].chatPlaceholder : undefined
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceMsg: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: '(Voice message - 30s)',
          timestamp: Date.now(),
          type: 'voice'
        };
        setMessages(prev => [...prev, voiceMsg]);
      }, 3000); // Simulate 3s recording
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-samsung-blue text-white rounded-full shadow-2xl flex items-center justify-center z-40 border border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-bg-dark animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, x: -50, scale: 0.8 }}
            className="fixed bottom-6 left-6 w-[calc(100%-3rem)] md:w-[400px] h-[50vh] bg-bg-dark/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-linear-to-r from-samsung-blue/20 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <Monitor className="w-5 h-5 text-tiffany-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">{t.chatTitle}</h4>
                  <div className="flex items-center gap-1.5 ">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500 font-bold uppercase">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startCall('video')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"><Video className="w-4 h-4" /></button>
                <button onClick={() => startCall('voice')} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"><Phone className="w-4 h-4" /></button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-500"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Call Overlay */}
            <AnimatePresence>
              {activeCall && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-samsung-blue flex flex-col items-center justify-center text-white"
                >
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 animate-pulse">
                        <User className="w-12 h-12" />
                      </div>
                      {activeCall === 'video' && (
                        <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                          <Video className="w-8 h-8 opacity-50" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tighter">VitaON AI Admin</h4>
                      <p className="text-xs text-white/60 uppercase tracking-widest">{activeCall === 'video' ? 'Video Calling...' : 'Voice Calling...'}</p>
                    </div>
                    <div className="flex gap-6">
                       <button onClick={() => setActiveCall(null)} className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition-colors">
                         <Phone className="w-6 h-6 rotate-[135deg]" />
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex w-full", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-[13px] relative group transition-all",
                    msg.sender === 'user' 
                      ? "bg-samsung-blue text-white rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none"
                  )}>
                    {msg.type === 'voice' && <Mic className="w-4 h-4 inline-block mr-2 text-tiffany-blue" />}
                    {msg.text}
                    
                    {msg.translatedText && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-tiffany-blue italic">
                        <Languages className="w-3 h-3" />
                        {msg.translatedText}
                      </div>
                    )}
                    
                    <div className="text-[9px] opacity-40 mt-1 uppercase font-bold tracking-widest">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40 hover:text-tiffany-blue"><Paperclip className="w-4 h-4" /></button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 outline-none focus:border-samsung-blue/50 transition-all font-medium"
                />
                <button 
                  onClick={toggleRecording}
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isRecording ? "bg-red-500 text-white animate-pulse" : "bg-white/5 text-white/40 hover:text-tiffany-blue"
                  )}
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSend}
                  className="p-2.5 bg-samsung-blue text-white rounded-xl shadow-lg hover:shadow-samsung-blue/20 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {isRecording && (
                <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  {t.voiceRecording}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

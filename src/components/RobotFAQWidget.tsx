import { 
  X, 
  ChevronRight, 
  ChevronDown,
  Bot,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { cn } from '../lib/utils';

export const RobotFAQWidget = ({ lang }: { lang: Language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const t = translations[lang];

  return (
    <>
      {/* Floating Button - Orange Robot */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 border border-white/20 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent group-hover:rotate-12 transition-transform" />
        <Bot className="w-8 h-8 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 50 }}
            className="fixed bottom-6 right-6 w-[calc(100%-3rem)] md:w-[450px] h-[70vh] bg-bg-dark/98 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-[110] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-orange-500 flex items-center justify-between text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex items-center gap-4 relative z-10">
                 <div className="p-3 bg-white/20 rounded-2xl ring-4 ring-white/10">
                   <Bot className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">VitaBot AI</h4>
                   <div className="flex items-center gap-1.5 ">
                     <Sparkles className="w-3 h-3 text-white/60" />
                     <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{t.faqTitle} (30 items)</span>
                   </div>
                 </div>
               </div>
               <button 
                 onClick={() => setIsOpen(false)} 
                 className="p-2 hover:bg-black/20 rounded-full transition-colors relative z-10"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Q&A List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {t.qna?.map((item, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "rounded-2xl border transition-all overflow-hidden",
                    expandedIndex === idx 
                      ? "bg-white/10 border-orange-500/50" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  )}
                >
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-[10px] font-black w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-orange-500 border border-orange-500/20">
                        {idx + 1}
                      </span>
                      <h5 className="text-[13px] font-bold text-white/90 group-hover:text-white leading-tight">
                        {item.q}
                      </h5>
                    </div>
                    {expandedIndex === idx ? (
                      <ChevronDown className="w-4 h-4 text-orange-500 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 overflow-hidden"
                      >
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 text-[12px] text-white/70 leading-relaxed font-medium">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-white/5 bg-white/2 dark:bg-black/20">
               <button className="flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 hover:text-orange-400 transition-colors">
                 <HelpCircle className="w-3 h-3" />
                 More Information
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

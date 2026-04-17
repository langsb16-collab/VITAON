import { Globe, ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from '../lib/translations';
import { cn } from '../lib/utils';

export const LanguageSelector = ({ current, onChange, upward }: { current: Language, onChange: (lang: Language) => void, upward?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2.5 backdrop-blur-xl px-4 py-2.5 rounded-2xl border transition-all duration-300 group z-50",
          isOpen 
            ? "bg-white/10 border-white/30 shadow-lg shadow-white/5" 
            : "bg-white/5 border-white/10 hover:border-white/20"
        )}
      >
        <Globe className="w-4 h-4 text-tiffany-blue group-hover:rotate-[30deg] transition-transform duration-500" />
        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-white leading-none">
          {translations[current].name}
        </span>
        <ChevronDown className={cn(
          "w-3 h-3 text-white/40 transition-transform duration-500",
          isOpen ? "rotate-180 text-white" : ""
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: upward ? -10 : 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: upward ? -10 : 10, filter: 'blur(10px)' }}
            className={cn(
              "absolute right-0 md:left-1/2 md:-translate-x-1/2 w-[280px] md:w-[320px] bg-bg-dark/98 backdrop-blur-3xl border border-white/20 rounded-[32px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7)] z-[9999] p-4 flex flex-col",
              upward ? "bottom-full mb-4" : "top-full mt-4",
              "max-h-[80vh] overflow-hidden"
            )}
          >
            <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 text-center py-1 border-b border-white/5">Select Language</div>
            
            <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 custom-scrollbar max-h-full">
              {Object.entries(translations).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => {
                    onChange(code as Language);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all group/item",
                    current === code 
                      ? "bg-samsung-blue text-white shadow-lg shadow-samsung-blue/20" 
                      : "text-white/40 hover:bg-white/5 hover:text-tiffany-blue"
                  )}
                >
                  <span className="truncate mr-1">{data.name}</span>
                  {current === code && (
                    <Check className="w-3 h-3 text-white animate-in zoom-in duration-300 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

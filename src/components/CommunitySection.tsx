import React from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { Language, translations } from '../lib/translations';

interface Platform {
  name: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

export const CommunitySection = ({ lang }: { lang: Language }) => {
  const t = translations[lang];

  const platforms: Platform[] = [
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle className="w-4 h-4" />, 
      color: '#25D366',
      url: 'https://wa.me/vitaon' 
    },
    { 
      name: 'KakaoTalk', 
      icon: <MessageSquare className="w-4 h-4" />, 
      color: '#FAE100',
      url: 'https://pf.kakao.com/vitaon' 
    },
    { 
      name: 'Telegram', 
      icon: <Send className="w-4 h-4" />, 
      color: '#0088CC',
      url: 'https://t.me/vitaon_health' 
    }
  ];

  const connect = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2">
        <span className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">{t.commTitle}</span>
        <p className="text-[10px] text-text-muted/60 mt-1 uppercase tracking-wider">{t.commDesc}</p>
      </div>
      
      {platforms.map((platform) => (
        <motion.button
          key={platform.name}
          whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => connect(platform.url)}
          className="flex items-center justify-between p-3 glass rounded-2xl text-xs font-bold border border-white/5 group transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
            <div className="flex items-center gap-2">
              {platform.icon}
              <span className="text-white">{platform.name}</span>
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white transition-colors" />
        </motion.button>
      ))}
    </div>
  );
};

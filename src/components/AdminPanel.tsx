import { 
  Shield, 
  Settings, 
  Users, 
  MessageSquare, 
  TrendingUp,
  X,
  Activity,
  UserPlus,
  BarChart3,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { translations, Language } from '../lib/translations';

type AdminFeature = 'chats' | 'users' | 'analytics' | 'settings' | null;

export const AdminPanel = ({ lang, onClose }: { lang: Language, onClose: () => void }) => {
  const t = translations[lang];
  const [activeFeature, setActiveFeature] = useState<AdminFeature>('chats');
  
  const adminT = t.admin || {
    title: "Admin Mode",
    subtitle: "System Management Console",
    stats: { totalUsers: "Total Users", activeCases: "Active Cases" },
    menu: {
      pendingChats: "Pending Chats",
      userDirectory: "User Directory",
      healthAnalytics: "Health Analytics",
      systemSettings: "System Settings"
    },
    recentActivity: "Recent Activity",
    version: "VITAON ADMIN V1.0.4"
  };

  const handleFeatureClick = (feature: AdminFeature) => {
    setActiveFeature(feature);
    if (feature === 'users') {
      alert("연결 중... 전체 사용자 데이터베이스 정보를 불러옵니다.");
    } else if (feature === 'settings') {
      alert("시스템 설정 메뉴입니다. API 키 및 다국어 엔진을 관리할 수 있습니다.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-bg-dark/98 backdrop-blur-2xl shadow-2xl z-[500] border-l border-white/10 flex flex-col"
    >
      {/* Header */}
      <div className="p-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-samsung-blue/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-samsung-blue/20 rounded-2xl flex items-center justify-center text-samsung-blue ring-4 ring-samsung-blue/10">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">{adminT.title}</h3>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">{adminT.subtitle}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 transition-colors"><X className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
           <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group hover:border-samsung-blue/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{adminT.stats.totalUsers}</span>
                <UserPlus className="w-3 h-3 text-samsung-blue" />
              </div>
              <div className="text-3xl font-black text-white leading-none">1,284</div>
           </div>
           <div className="p-5 rounded-3xl bg-white/5 border border-white/10 group hover:border-green-500/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{adminT.stats.activeCases}</span>
                <Activity className="w-3 h-3 text-green-500" />
              </div>
              <div className="text-3xl font-black text-green-500 leading-none">12</div>
           </div>
        </div>

        {/* Menu Navigation */}
        <div className="space-y-3">
           <button 
             onClick={() => handleFeatureClick('chats')}
             className={`w-full p-5 rounded-3xl flex items-center justify-between font-black text-xs uppercase tracking-widest transition-all ${
               activeFeature === 'chats' 
                 ? 'bg-samsung-blue text-white shadow-lg shadow-samsung-blue/20' 
                 : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
             }`}
           >
             <div className="flex items-center gap-4">
               <MessageSquare className="w-4 h-4" />
               {adminT.menu.pendingChats}
             </div>
             <span className={`px-2 py-1 rounded-lg text-[10px] ${
               activeFeature === 'chats' ? 'bg-white text-samsung-blue' : 'bg-white/10 text-white'
             }`}>3</span>
           </button>

           <button 
             onClick={() => handleFeatureClick('users')}
             className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${
               activeFeature === 'users' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'
             }`}
           >
             <Users className="w-4 h-4" />
             {adminT.menu.userDirectory}
           </button>

           <button 
             onClick={() => handleFeatureClick('analytics')}
             className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${
               activeFeature === 'analytics' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'
             }`}
           >
             <BarChart3 className="w-4 h-4" />
             {adminT.menu.healthAnalytics}
           </button>

           <button 
             onClick={() => handleFeatureClick('settings')}
             className={`w-full p-5 rounded-3xl flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all ${
               activeFeature === 'settings' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'
             }`}
           >
             <Database className="w-4 h-4" />
             {adminT.menu.systemSettings}
           </button>
        </div>

        {/* Dynamic Display Area */}
        <div className="pt-6 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30">{adminT.recentActivity}</h5>
            {activeFeature === 'analytics' && (
              <span className="text-[10px] font-black text-samsung-blue flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> LIVE DATA
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {activeFeature === 'chats' ? (
              [1,2,3].map(i => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className="p-5 rounded-3xl bg-white/2 border border-white/5 flex gap-5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-samsung-blue to-tiffany-blue flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                    U{i}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-black text-white">USER #481{i}</span>
                      <span className="text-[9px] font-bold text-text-muted">2M AGO</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed italic">"Can I sync my Garmin watch? I need to analyze my sleep..."</p>
                  </div>
                </motion.div>
              ))
            ) : activeFeature === 'analytics' ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-full bg-samsung-blue/20 flex items-center justify-center text-samsung-blue mb-4">
                    <TrendingUp className="w-8 h-8" />
                 </div>
                 <h6 className="text-sm font-black text-white mb-2 uppercase tracking-tight">Analytics Dashboard Loading</h6>
                 <p className="text-[11px] text-text-muted">Connecting to secure data stream for real-time aggregation.</p>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white/2 border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
                <Database className="w-8 h-8 text-text-muted mb-4" />
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Select an active feature to manage</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-8 border-t border-white/10 text-center bg-black/20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{adminT.version}</p>
      </div>
    </motion.div>
  );
};

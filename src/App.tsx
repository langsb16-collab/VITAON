/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { 
  Activity, 
  Droplets, 
  Flame, 
  Heart, 
  MapPin, 
  Moon, 
  Search, 
  Share2, 
  Smartphone, 
  Sparkles,
  UserCircle 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { FoodAnalyzer } from './components/FoodAnalyzer';
import { CountUp, MagneticButton, SpotlightCard } from './components/Interactions';
import { LanguageSelector } from './components/LanguageSelector';
import { MapComponent } from './components/MapComponent';
import { ChatWidget } from './components/ChatWidget';
import { RobotFAQWidget } from './components/RobotFAQWidget';
import { AdminPanel } from './components/AdminPanel';
import { ProfileModal } from './components/ProfileModal';
import { CommunitySection } from './components/CommunitySection';
import { Language, translations } from './lib/translations';
import { cn } from './lib/utils';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vita_lang');
      return (saved as Language) || 'ko';
    }
    return 'ko';
  });
  const [isGuest, setIsGuest] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'diet' | 'exercise' | 'map'>('diet');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('vita_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const saved = localStorage.getItem('vita_user_profile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  const saveProfile = (profile: any) => {
    localStorage.setItem('vita_user_profile', JSON.stringify(profile));
    setUserProfile(profile);
  };

  if (!isGuest) {
    return (
      <div className="min-h-screen bg-samsung-blue flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-tiffany-blue rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/2 -right-20 w-64 h-64 bg-white rounded-full blur-3xl" 
          />
        </div>

        <div className="z-10 max-w-lg w-full text-center space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm mb-4">
             <Activity className="w-4 h-4" />
             <span className="font-medium">VitaON Health SaaS</span>
           </div>
           
           <h1 className="text-6xl font-black tracking-tighter leading-tight italic">
             VITA<span className="text-tiffany-blue">ON</span>
           </h1>
           
           <p className="text-xl text-white/80 font-medium">
             {t.tagline}
           </p>

           <div className="flex flex-col gap-4 mt-12">
             <MagneticButton 
               onClick={() => setIsGuest(true)}
               className="bg-white text-samsung-blue py-5 rounded-2xl text-lg font-bold shadow-2xl hover:bg-slate-50 transition-colors"
             >
               {t.guestStart}
             </MagneticButton>
             
             <div className="flex justify-center pt-4">
               <LanguageSelector current={lang} onChange={setLang} upward={true} />
             </div>
           </div>

           <div className="pt-12 grid grid-cols-3 gap-4 opacity-70 scale-90">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
               <Share2 className="w-5 h-5" />
               <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Global</span>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
               <Smartphone className="w-5 h-5" />
               <span className="text-[10px] uppercase font-bold tracking-widest leading-none">PWA</span>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
               <Activity className="w-5 h-5" />
               <span className="text-[10px] uppercase font-bold tracking-widest leading-none">AI Tech</span>
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark relative overflow-x-hidden">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-samsung-blue/20 blur-[120px] rounded-full animate-pulse opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tiffany-blue/10 blur-[120px] rounded-full opacity-30" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-samsung-blue/10 blur-[100px] rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass px-6 md:px-10 py-5 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[1px] bg-linear-to-r from-transparent via-samsung-blue to-transparent w-full opacity-50 shadow-[0_0_15px_rgba(10,88,202,0.8)]" />
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-samsung-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-samsung-blue/20">
            <Activity className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-none">VitaON</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest">{isGuest ? 'Guest Session' : 'Active Profile'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-white/40 mr-12 uppercase tracking-[0.2em]">
            <button 
              onClick={() => setActiveTab('diet')} 
              className={cn("transition-all duration-300 relative py-2", activeTab === 'diet' ? "text-white" : "hover:text-white/80")}
            >
              {t.dashboard}
              {activeTab === 'diet' && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-samsung-blue shadow-[0_0_8px_rgba(10,88,202,1)]" />}
            </button>
            <button 
              onClick={() => setActiveTab('exercise')} 
              className={cn("transition-all duration-300 relative py-2", activeTab === 'exercise' ? "text-white" : "hover:text-white/80")}
            >
              {t.exercise}
              {activeTab === 'exercise' && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-samsung-blue shadow-[0_0_8px_rgba(10,88,202,1)]" />}
            </button>
            <button 
              onClick={() => setActiveTab('map')} 
              className={cn("transition-all duration-300 relative py-2", activeTab === 'map' ? "text-white" : "hover:text-white/80")}
            >
              {t.map}
              {activeTab === 'map' && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-samsung-blue shadow-[0_0_8px_rgba(10,88,202,1)]" />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector current={lang} onChange={setLang} />
            <MagneticButton 
              onClick={() => setIsProfileOpen(true)}
              className="p-2 ml-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 flex items-center gap-2 group"
            >
              <UserCircle className="w-5 h-5 text-slate-400 group-hover:text-tiffany-blue transition-colors" />
              {userProfile && <span className="text-[10px] font-bold text-tiffany-blue hidden sm:block uppercase tracking-tighter">{userProfile.name}</span>}
            </MagneticButton>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 pt-8 pb-20 min-h-[80vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'diet' && (
            <motion.div 
              key="diet"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Profile Welcome Header */}
              {userProfile && (
                <div className="lg:col-span-4 mb-2 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                      Welcome, <span className="text-tiffany-blue">{userProfile.name || 'Guest'}</span>
                    </h2>
                    <p className="text-xs text-text-muted uppercase tracking-widest leading-none mt-1">
                      Goal: {t.goals[userProfile.goal as keyof typeof t.goals] || userProfile.goal} | {userProfile.height}cm / {userProfile.weight}kg
                    </p>
                  </div>
                  <button onClick={() => setIsAdminOpen(true)} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-tiffany-blue transition-colors">
                    {t.admin?.title || 'Admin Panel'}
                  </button>
                </div>
              )}

              {/* Left Column - Stats & AI */}
              <SpotlightCard className="lg:col-span-2 lg:row-span-2 bg-linear-to-br from-samsung-blue/20 to-bg-dark border-white/10 flex flex-col justify-between min-h-[400px]">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-extra-bold tracking-tight text-white mb-2 underline decoration-tiffany-blue/30 decoration-4 underline-offset-8">
                        {t.foodAnalysis}
                      </h3>
                      <p className="text-sm text-text-muted">{t.uploadPrompt}</p>
                    </div>
                    <div className="bg-samsung-blue px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Real-Time AI</div>
                  </div>
                  
                  <div className="flex-1">
                    <FoodAnalyzer lang={lang} />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 relative z-10 transition-all">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-samsung-blue/20 flex items-center justify-center text-samsung-blue">
                        <Heart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase text-text-muted">{t.healthScore || 'Health Score'}</div>
                        <div className="text-sm font-bold text-white">94/100</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-tiffany-blue/20 flex items-center justify-center text-tiffany-blue">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black uppercase text-text-muted">{t.metabolism || 'Metabolism'}</div>
                        <div className="text-sm font-bold text-white">{t.steady || 'Steady'}</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Visual Decoration */}
                <Activity className="absolute bottom-[-10%] right-[-5%] w-48 h-48 text-white/5 pointer-events-none" />
              </SpotlightCard>

              {/* Vital Metrics */}
              <SpotlightCard className="flex flex-col justify-center">
                <span className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-4">{t.steps}</span>
                <h4 className="text-4xl font-bold text-white mb-2"><CountUp value={7420} /></h4>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "74%" }}
                     className="h-full bg-samsung-blue" 
                   />
                </div>
              </SpotlightCard>

              {/* Risk Notification */}
              <SpotlightCard className="bg-red-500/10 border-red-500/30">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-red-500">⚠️</span>
                   <strong className="text-sm font-bold text-white">{t.riskNotification}</strong>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {t.healthRiskDesc || (lang === 'ko' ? '최근 섭취한 고나트륨 식단이 혈압 수치에 영향을 줄 수 있습니다.' : 'High sodium intake detected recently. Monitor your blood pressure.')}
                </p>
              </SpotlightCard>

              {/* Sleep Efficiency */}
              <SpotlightCard className="flex flex-col justify-center">
                <span className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-4">{t.sleepEfficiency}</span>
                <h4 className="text-4xl font-bold text-white mb-1">92%</h4>
                <p className="text-[10px] text-green-500 font-black uppercase">{t.excellentPerformance || 'Excellent Performance'}</p>
              </SpotlightCard>

              {/* Social & Community */}
              <SpotlightCard className="flex flex-col gap-3">
                <CommunitySection lang={lang} />
              </SpotlightCard>

              {/* Map Preview (Small) */}
              <div onClick={() => setActiveTab('map')} className="cursor-pointer lg:col-span-1">
                <SpotlightCard className="bg-[#1e293b] flex flex-col relative overflow-hidden p-0 border-white/10 h-full">
                  <div className="w-full h-[150px] grayscale brightness-75 contrast-125 pointer-events-none">
                    <MapComponent center={[37.52, 127.09]} hospitals={[
                      { name: "Samsung Medical Center", position: [37.4883, 127.0854], address: "Suseo-dong, Gangnam-gu" },
                    ]} />
                  </div>
                  <div className="p-4 bg-bg-dark/80 backdrop-blur border-t border-white/10 text-center">
                    <p className="text-xs font-bold text-white uppercase tracking-widest">{t.nearbyHospital}</p>
                  </div>
                </SpotlightCard>
              </div>

              {/* AI Insight */}
              <SpotlightCard className="lg:col-span-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-6 block">{t.aiInsight}</span>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-[85%] rounded" />
                  <div className="skeleton h-4 w-[90%] rounded" />
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'exercise' && (
            <motion.div 
              key="exercise"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <SpotlightCard className="col-span-full">
                <h3 className="text-3xl font-extra-bold tracking-tight text-white mb-4 uppercase italic">
                  {t.exercise} <span className="text-tiffany-blue">{t.exerciseCenter || (lang === 'ko' ? '센터' : 'Center')}</span>
                </h3>
                <p className="text-text-muted mb-8 uppercase tracking-[0.2em] text-xs">{t.exerciseDesc || 'Customized Workout Plans for your Goal'}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[24px] bg-white/5 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4">Daily Routine</h4>
                    <div className="space-y-4">
                      {['Stretching', 'Cardio', 'Strength Training'].map((ex, i) => (
                        <div key={i} className="flex justify-between items-center p-3 glass rounded-xl">
                          <span className="text-xs text-white/80">{ex}</span>
                          <span className="text-[10px] font-black text-samsung-blue uppercase">In Progress</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 rounded-[24px] bg-samsung-blue/20 border border-samsung-blue/30">
                    <h4 className="text-lg font-bold text-white mb-4">Recommended Next Step</h4>
                    <p className="text-sm text-text-muted leading-relaxed">Based on your activity levels and sleep data, a 20-minute light jogging session is recommended today.</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full h-[600px] rounded-[32px] overflow-hidden border border-white/10 glass shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full p-6 z-10 bg-gradient-to-b from-bg-dark to-transparent">
                 <h3 className="text-3xl font-extra-bold tracking-tight text-white mb-1 uppercase tracking-tighter">
                  {t.map} <span className="text-tiffany-blue">Engine</span>
                </h3>
                <p className="text-xs text-text-muted uppercase tracking-[0.2em]">Global Medical Facility Search</p>
              </div>
              <MapComponent center={[37.52, 127.09]} hospitals={[
                { name: "Samsung Medical Center", position: [37.4883, 127.0854], address: "Suseo-dong, Gangnam-gu" },
                { name: "Asan Medical Center", position: [37.5262, 127.1089], address: "Pungnap-dong, Songpa-gu" },
                { name: "Seoul National University Hospital", position: [37.5794, 127.0000], address: "Yeongeon-dong, Jongno-gu" },
              ]} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Q&A Section (Always visible below) */}
        <div className="mt-20 space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/10" />
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/40">Global FAQ & Insights</h3>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {userProfile && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 glass rounded-[32px] border border-tiffany-blue/20 bg-tiffany-blue/5 mb-12 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-8 h-8 text-tiffany-blue/20 group-hover:text-tiffany-blue/40 transition-colors" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-tiffany-blue/20 flex items-center justify-center text-tiffany-blue">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">Personalized AI Health Tip</h4>
                  <p className="text-[10px] text-tiffany-blue font-bold uppercase tracking-widest">Optimized for: {t.goals[userProfile.goal as keyof typeof t.goals] || userProfile.goal}</p>
                </div>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {userProfile.goal === 'weightLoss' && "Focus on high-fiber snacks and consistent 30-minute cardio sessions. Your current BMI suggests a targeted 500kcal deficit for sustainable results."}
                {userProfile.goal === 'muscleGain' && "Prioritize protein intake and progressive overload in your lifting sessions. Aim for at least 1.6g of protein per kg of body weight."}
                {userProfile.goal === 'bloodSugar' && "Stick to complex carbohydrates and pair them with healthy fats/proteins to flatten glucose spikes. Recent data suggests morning walks help significantly."}
                {userProfile.goal === 'sleepImprovement' && "Magnesium-rich foods and a strict 'no-screen' policy 1 hour before bed can improve your documented 92% efficiency to 95%."}
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.qna?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 12) * 0.05 }}
                className="p-5 glass rounded-2xl border border-white/5 hover:border-samsung-blue/30 transition-all group"
              >
                <div className="flex gap-3 items-start mb-2">
                  <span className="text-samsung-blue font-black text-sm">Q.</span>
                  <h5 className="text-[13px] font-bold text-white group-hover:text-tiffany-blue transition-colors leading-tight">{item.q}</h5>
                </div>
                <div className="flex gap-3 items-start opacity-60">
                   <span className="text-text-muted font-black text-sm">A.</span>
                   <p className="text-[12px] leading-relaxed">{item.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-12 p-12 bg-black/40 border-t border-white/10 text-text-muted">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">VITA<span className="text-tiffany-blue">ON</span></h2>
              <p className="text-xs leading-relaxed max-w-xs uppercase tracking-widest opacity-60">{t.footerDesc}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
               <div className="space-y-4">
                  <h5 className="text-white">Service</h5>
                  <ul className="space-y-3 opacity-60">
                    <li>AI Food Analytics</li>
                    <li>Symptom Checker</li>
                    <li>Global Health Data</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h5 className="text-white">Company</h5>
                  <ul className="space-y-3 opacity-60">
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Healthcare Standards</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h5 className="text-white">Support</h5>
                  <ul className="space-y-3 opacity-60">
                    <li>Contact Center</li>
                    <li>Guide Docs</li>
                    <li>API Partner</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="text-center mt-20 text-[9px] text-white/20 font-bold uppercase tracking-[0.5em]">
            © 2026 VITAON HEALTHCARE PLATFORM. ALL RIGHTS RESERVED.
         </div>
      </footer>

      {/* Widgets */}
      <ChatWidget lang={lang} />
      <RobotFAQWidget lang={lang} />
      
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        lang={lang} 
        onSave={saveProfile}
        initialData={userProfile}
      />

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel lang={lang} onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

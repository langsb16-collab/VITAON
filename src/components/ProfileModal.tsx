import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Calendar, Ruler, Weight, Target, Save, X } from 'lucide-react';
import { Language, translations } from '../lib/translations';
import { MagneticButton } from './Interactions';

interface UserProfile {
  birth: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  name?: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSave: (profile: UserProfile) => void;
  initialData: UserProfile | null;
}

export const ProfileModal = ({ isOpen, onClose, lang, onSave, initialData }: ProfileModalProps) => {
  const t = translations[lang];
  const [formData, setFormData] = useState<UserProfile>({
    birth: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'weightLoss',
    name: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] p-6"
          >
            <div className="glass rounded-[32px] border border-white/20 p-8 shadow-2xl relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-samsung-blue/20 rounded-full blur-3xl" />
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2">
                  <User className="w-6 h-6 text-tiffany-blue" />
                  {t.profileTitle}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.nameLabel || 'Name'}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder || 'Enter your name'}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-samsung-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.birthDate}</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        type="date" 
                        value={formData.birth}
                        onChange={e => setFormData({ ...formData, birth: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-samsung-blue transition-colors appearance-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.gender}</label>
                    <select 
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-samsung-blue transition-colors appearance-none"
                    >
                      <option value="male" className="bg-bg-dark">{t.genders.male}</option>
                      <option value="female" className="bg-bg-dark">{t.genders.female}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.height}</label>
                    <div className="relative">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        type="number" 
                        inputMode="decimal"
                        value={formData.height}
                        onChange={e => setFormData({ ...formData, height: e.target.value })}
                        placeholder="180"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-samsung-blue transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.weight}</label>
                    <div className="relative">
                      <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input 
                        type="number" 
                        inputMode="decimal"
                        value={formData.weight}
                        onChange={e => setFormData({ ...formData, weight: e.target.value })}
                        placeholder="75"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-samsung-blue transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest pl-1">{t.healthGoal}</label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <select 
                      value={formData.goal}
                      onChange={e => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-samsung-blue transition-colors appearance-none"
                    >
                      <option value="weightLoss" className="bg-bg-dark">{t.goals.weightLoss}</option>
                      <option value="muscleGain" className="bg-bg-dark">{t.goals.muscleGain}</option>
                      <option value="bloodSugar" className="bg-bg-dark">{t.goals.bloodSugar}</option>
                      <option value="sleepImprovement" className="bg-bg-dark">{t.goals.sleepImprovement}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <MagneticButton 
                    onClick={handleSave}
                    className="w-full bg-samsung-blue text-white py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] shadow-xl shadow-samsung-blue/20 flex items-center justify-center gap-2 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    <Save className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{t.saveProfile}</span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

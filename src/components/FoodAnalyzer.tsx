import { Camera, RefreshCcw, Sparkles, Upload, CheckCircle2, Mic } from 'lucide-react';
import React, { useState, useRef, DragEvent } from 'react';
import { Language, translations } from '../lib/translations';
import { cn } from '../lib/utils';
import { MagneticButton } from './Interactions';
import { motion, AnimatePresence } from 'motion/react';

interface FoodAnalysisResult {
  name: string;
  calories: number;
  riskAlert: string;
  advice: string;
}

export const FoodAnalyzer = ({ lang }: { lang: Language }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const t = translations[lang] || translations['en'];

  const handleVoiceAnalysis = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      startAIAnalysis();
    }, 3000);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
      startAIAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileUpload(files[0]);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const startAIAnalysis = async () => {
    setAnalyzing(true);
    setResult(null);
    
    // Simulate complex AI analysis
    await new Promise(r => setTimeout(r, 2500));
    
    const mockResult: FoodAnalysisResult = {
      name: lang === 'ko' ? "비빔밥" : "Bibimbap",
      calories: 550,
      riskAlert: t.analysisStatus,
      advice: lang === 'ko' ? "고추장 양을 줄이고 채소를 더 추가하세요." : "Eat more protein and greens."
    };
    
    setResult(mockResult);
    setAnalyzing(false);
  };

  const reset = () => {
    setResult(null);
    setPreviewUrl(null);
    setAnalyzing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative aspect-video rounded-3xl cursor-pointer transition-all duration-500 flex flex-col items-center justify-center p-8 gap-4 overflow-hidden border-2 border-dashed",
              isDragOver 
                ? "bg-samsung-blue/20 border-samsung-blue scale-[1.02] shadow-2xl" 
                : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
            )}
          >
            <div className="absolute top-4 left-4 z-10">
              <button 
                onClick={(e) => { e.stopPropagation(); handleVoiceAnalysis(); }}
                className={cn(
                  "p-3 rounded-full transition-all flex items-center gap-2",
                  isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-white/40 hover:text-tiffany-blue"
                )}
              >
                <Mic className="w-5 h-5" />
                {isListening && <span className="text-[10px] font-black uppercase tracking-widest leading-none">AI Listening...</span>}
              </button>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Camera className="w-24 h-24" />
               </div>
            </div>

            <div className="bg-samsung-blue/20 p-5 rounded-full mb-2">
              <Upload className="w-10 h-10 text-samsung-blue" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm font-bold text-white uppercase tracking-wider">{t.uploadPrompt}</p>
              <p className="text-xs text-text-muted opacity-60">PC: Drag & Drop | Mobile: Camera</p>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={onFileChange}
              accept="image/*"
              className="hidden" 
            />
            
            <MagneticButton className="mt-4 bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">
              {t.btn_upload}
            </MagneticButton>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-3xl bg-bg-dark border border-white/10 overflow-hidden shadow-2xl"
          >
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            <AnimatePresence>
              {analyzing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                >
                  <div className="relative">
                    <Sparkles className="w-16 h-16 text-samsung-blue animate-pulse" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-t-tiffany-blue border-transparent rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-black text-white italic tracking-tighter">AI ANALYZING</p>
                    <p className="text-xs text-text-muted mt-2">{t.analyzing}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent p-8 flex flex-col justify-end"
              >
                <div className="flex items-center gap-2 mb-4 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">{t.analysisComplete}</span>
                </div>
                
                <h4 className="text-3xl font-black text-white italic truncate uppercase">{result.name}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-tiffany-blue tracking-tighter">{result.calories}</span>
                  <span className="text-xs font-bold text-text-muted uppercase">Kcal</span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">{t.riskNotification}</p>
                    <p className="text-sm font-medium text-white">{result.riskAlert}</p>
                  </div>
                  <div className="p-4 bg-samsung-blue/10 rounded-2xl border border-samsung-blue/20">
                    <p className="text-xs font-bold text-samsung-blue/50 uppercase tracking-widest mb-1">AI Recommendation</p>
                    <p className="text-sm font-medium text-slate-300 italic">"{result.advice}"</p>
                  </div>
                </div>

                <button 
                  onClick={reset}
                  className="mt-8 text-[10px] uppercase font-black tracking-[0.3em] text-white/20 hover:text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Re-analyze another photo
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

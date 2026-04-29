import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, Fingerprint, Activity, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function Report({ isActive, resultData }: { isActive: boolean; resultData?: any }) {
  const [gauge, setGauge] = useState(0);
  const [showSources, setShowSources] = useState(false);

  const verdict = resultData?.verdict || "Unverified";
  const score = resultData?.score || 0;
  const summary = resultData?.summary || "No summary available.";
  const originalContext = resultData?.originalContext || "Not Applicable";
  const sources = resultData?.sources || "No sources found.";
  const scoreBreakdown = resultData?.scoreBreakdown || "Base Score: 100";

  // Dynamic values based on verdict
  const isAuthentic = verdict === 'Authentic';
  const isFake = verdict === 'Fake' || verdict === 'Unauthorized' || verdict === 'AI-Generated' || verdict === 'Manipulated';
  
  const targetGauge = score;
  const gaugeColor = isAuthentic ? '#2DD4BF' : (isFake ? '#EF4444' : '#EAB308');
  
  const gradient = isAuthentic ? 'from-teal-500 via-emerald-500 to-green-500' :
                   isFake ? 'from-red-500 via-orange-500 to-yellow-500' : 
                   'from-yellow-500 via-orange-500 to-red-500';

  useEffect(() => {
    if (isActive) {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.max(1, Math.floor(targetGauge / 10));
        if (current >= targetGauge) {
          setGauge(targetGauge);
          clearInterval(interval);
        } else {
          setGauge(current);
        }
      }, 16);
    }
  }, [isActive, targetGauge]);

  if (!isActive) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl relative z-10"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
      
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        {/* Integrity Gauge */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="48" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <motion.circle 
              cx="56" cy="56" r="48" fill="transparent" 
              stroke={gaugeColor} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={301.59} 
              strokeDashoffset={301.59 - (301.59 * gauge) / 100}
            />
          </svg>
          <div className="text-center">
            <div className="text-2xl font-black text-white">{gauge}%</div>
            <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Score</div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">Verification Summary</h2>
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
            {summary}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/5 font-mono text-sm shadow-inner">
            Verdict: <strong style={{ color: gaugeColor }}>{verdict}</strong>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {originalContext !== 'Not Applicable' && (
          <div className="relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 rounded-l-sm" />
             <div className="p-4 bg-teal-950/30 border border-teal-500/20 rounded-sm pl-6">
                 <div className="flex items-center gap-2 mb-3">
                   <ShieldCheck className="w-5 h-5 text-teal-400" />
                   <h3 className="text-[13px] font-bold text-teal-400 uppercase tracking-widest font-mono">Authoritative Source Context</h3>
                 </div>
                 <div className="text-sm font-sans text-teal-50 break-words whitespace-pre-wrap leading-relaxed markdown-override">
                   <ReactMarkdown>{originalContext}</ReactMarkdown>
                 </div>
             </div>
          </div>
        )}
        <div>
           <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest font-mono mb-2">Confidence Decay Breakdown</h3>
           <div className="p-3 rounded-sm bg-black/40 border border-white/5 text-sm font-mono text-yellow-500 break-words whitespace-pre-wrap">
             {scoreBreakdown}
           </div>
        </div>
        <div>
           <button 
             onClick={() => setShowSources(!showSources)}
             className="w-full flex items-center justify-between text-xs font-bold text-white/50 uppercase tracking-widest font-mono mb-2 hover:text-white/80 transition-colors"
           >
             <span>Sources & Citations</span>
             {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
           </button>
           <AnimatePresence>
             {showSources && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden"
               >
                 <div className="p-3 rounded-sm bg-black/40 border border-white/5 text-sm font-mono text-blue-300 break-words whitespace-pre-wrap mt-2">
                   {sources}
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

    </motion.div>
  );
}

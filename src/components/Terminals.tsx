import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Shield, Eye } from 'lucide-react';
import Markdown from 'react-markdown';

const ALPHA_LOGS = [
  "[INIT] Initializing multi-modal media analysis protocol...",
  "[SCAN] Deep inspection of underlying input data...",
  "[ANALYSIS] Extracting context vectors and visual artifacts...",
  "[DETECT] Parsing prompt and asset context...",
  "[STATUS] Primary analysis complete. Handing off to Verification Agent..."
];

export function Terminals({ isActive, liveLogs = "" }: { isActive: boolean; liveLogs?: string }) {
  const [alphaLines, setAlphaLines] = useState<string[]>([]);
  const scrollRefA = useRef<HTMLDivElement>(null);
  const scrollRefB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;
    
    // Simulate streaming logs for Alpha while Beta is working
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < ALPHA_LOGS.length) {
        setAlphaLines(prev => [...prev, ALPHA_LOGS[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (scrollRefA.current) scrollRefA.current.scrollTop = scrollRefA.current.scrollHeight;
    if (scrollRefB.current) scrollRefB.current.scrollTop = scrollRefB.current.scrollHeight;
  }, [alphaLines, liveLogs]);

  if (!isActive) return null;

  return (
    <div className="grid grid-rows-2 gap-4 w-full h-[360px] relative">
      {/* Terminal Alpha */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 rounded-sm overflow-hidden flex flex-col h-full shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white-[0.02]">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-teal-400" />
            <span className="text-[10px] font-mono text-teal-400 font-bold tracking-wider uppercase">Agent-Alpha // Input Processing</span>
          </div>
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-teal-500" />
        </div>
        <div ref={scrollRefA} className="p-4 flex-1 overflow-y-auto font-mono text-xs text-teal-300/80 space-y-2 relative">
          {alphaLines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start">
              <span className="text-teal-600 mr-2">{'>'}</span>
              <span>{line}</span>
              {i === alphaLines.length - 1 && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="shrink-0 w-2 h-3 bg-teal-400 ml-1 mt-0.5" />
              )}
            </motion.div>
          ))}
          {alphaLines.length === 0 && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-3 bg-teal-400" />
          )}
        </div>
      </motion.div>

      {/* Terminal Beta - Live Gemini Output */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/5 rounded-sm overflow-hidden flex flex-col h-full shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white-[0.02]">
           <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-mono text-yellow-500 font-bold tracking-wider uppercase">Agent-Beta // Fact-Check & Verification (GenAI)</span>
          </div>
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-yellow-500" />
        </div>
        <div ref={scrollRefB} className="p-4 flex-1 overflow-y-auto font-mono text-xs text-yellow-500/90 whitespace-pre-wrap relative">
          {liveLogs ? (
            <div className="flex flex-col">
              <div className="markdown-body opacity-90 prose prose-invert prose-sm max-w-none">
                <Markdown>{liveLogs}</Markdown>
              </div>
              <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-3 bg-yellow-500 mt-1" />
            </div>
          ) : (
            <div className="flex items-center text-yellow-600/50">
               <span className="mr-2">{'>'}</span> Waiting for reasoning stream...
               <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-3 bg-yellow-500 ml-1" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

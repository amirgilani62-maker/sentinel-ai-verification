import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Fingerprint, ScanEye } from 'lucide-react';
import { useEffect, useState } from 'react';

const HexCode = () => {
    const [code, setCode] = useState('0x0000');
    useEffect(() => {
        const i = setInterval(() => {
            setCode('0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0'));
        }, 150);
        return () => clearInterval(i);
    }, []);
    return <>{code}</>;
}

export function Scanner({ isActive = false, isComplete = false, verdict = "Unverified" }: { isActive?: boolean; isComplete?: boolean; verdict?: string }) {
  const isAuthentic = verdict === 'Authentic';
  const isDanger = verdict === 'Fake' || verdict === 'AI-Generated' || verdict === 'Manipulated' || verdict === 'Unauthorized';
  
  // Refined Color Palette tailored to Sentinel-AI
  const ringColor = isComplete ? (isAuthentic ? 'rgba(45, 212, 191, 0.4)' : isDanger ? 'rgba(239, 68, 68, 0.4)' : 'rgba(234, 179, 8, 0.4)') : isActive ? 'rgba(234, 179, 8, 0.6)' : 'rgba(255, 255, 255, 0.1)';
  const activeColor = isComplete ? (isAuthentic ? '#2dd4bf' : isDanger ? '#ef4444' : '#eab308') : isActive ? '#eab308' : '#ffffff';
  
  const coreBg = isComplete ? (isAuthentic ? 'bg-teal-950/60 shadow-[0_0_40px_rgba(45,212,191,0.2)]' : isDanger ? 'bg-red-950/60 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'bg-yellow-950/60') : isActive ? 'bg-yellow-950/60 shadow-[0_0_40px_rgba(234,179,8,0.2)]' : 'bg-[#050505]';

  return (
    <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center isolate overflow-visible font-mono">
      
      {/* Target Corners Bracket */}
      <motion.div 
        className="absolute inset-[10%] rounded-full opacity-0 lg:opacity-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isActive ? [1, 1.02, 1] : 1, opacity: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 transition-colors duration-1000" style={{ borderColor: activeColor, opacity: isActive ? 0.8 : 0.2 }} />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 transition-colors duration-1000" style={{ borderColor: activeColor, opacity: isActive ? 0.8 : 0.2 }} />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 transition-colors duration-1000" style={{ borderColor: activeColor, opacity: isActive ? 0.8 : 0.2 }} />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 transition-colors duration-1000" style={{ borderColor: activeColor, opacity: isActive ? 0.8 : 0.2 }} />
      </motion.div>

      {/* Hexagonal Background Grid when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="absolute inset-[-10%] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 10v20L20 40 0 30V10z' fill-rule='evenodd' stroke='%23eab308' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
        )}
      </AnimatePresence>

      {/* Intricate SVG HUD Rings */}
      <div className="absolute inset-0 z-10 p-8">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Outer track */}
          <circle cx="100" cy="100" r="90" fill="none" stroke={ringColor} strokeWidth="0.5" className="transition-colors duration-1000 opacity-30" />
          
          {/* Dashed outer ring */}
          <motion.circle 
            cx="100" cy="100" r="90" 
            fill="none" 
            stroke={activeColor} 
            strokeWidth="1.5" 
            strokeDasharray="4 8"
            className="transition-colors duration-1000"
            style={{ opacity: isActive ? 0.6 : 0.2, transformOrigin: '100px 100px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Solid segment ring */}
          <motion.circle 
            cx="100" cy="100" r="72" 
            fill="none" 
            stroke={activeColor} 
            strokeWidth="3" 
            strokeDasharray="60 120"
            strokeLinecap="round"
            className="transition-colors duration-1000"
            style={{ opacity: isActive ? 0.8 : 0.2, transformOrigin: '100px 100px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Small inner dotted ring */}
          <motion.circle 
            cx="100" cy="100" r="50" 
            fill="none" 
            stroke={ringColor} 
            strokeWidth="2" 
            strokeDasharray="1 6"
            strokeLinecap="round"
            className="transition-colors duration-1000"
            style={{ transformOrigin: '100px 100px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Core Node */}
      <motion.div 
        className={`relative z-30 w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center transition-all duration-1000 backdrop-blur-md border border-white/10 ${coreBg}`}
        animate={{ 
          scale: isActive ? [1, 1.05, 1] : 1,
          borderColor: isComplete ? activeColor : isActive ? 'rgba(234,179,8,0.5)' : 'rgba(255,255,255,0.1)'
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: activeColor }}
      >
        <div className="absolute inset-0 rounded-full border border-current opacity-20" />
        
        {isComplete ? (
          isAuthentic ? <ShieldCheck className="w-10 h-10 mb-2 drop-shadow-md" /> : <ShieldAlert className="w-10 h-10 mb-2 drop-shadow-md" />
        ) : isActive ? (
          <ScanEye className="w-10 h-10 mb-2 drop-shadow-md" />
        ) : (
          <Fingerprint className="w-10 h-10 mb-2 opacity-50" />
        )}
        
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold relative z-10 transition-colors duration-1000" style={{ color: activeColor, opacity: isActive || isComplete ? 1 : 0.5 }}>
          {isComplete ? (isAuthentic ? 'Verified' : isDanger ? 'Flagged' : 'Checked') : isActive ? 'Scanning' : 'Standby'}
        </span>
      </motion.div>

      {/* Floating Data Tags */}
      <AnimatePresence>
        {isActive && (
          <>
            <motion.div 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="absolute top-[25%] left-[5%] text-[9px] text-yellow-500/80 font-mono flex flex-col items-start z-20"
            >
              <span className="border-b border-yellow-500/30 pb-0.5 mb-0.5">SYS.ANALYZE</span>
              <HexCode />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="absolute bottom-[28%] right-[5%] text-[9px] text-yellow-500/80 font-mono flex flex-col items-end z-20"
            >
              <span className="border-b border-yellow-500/30 pb-0.5 mb-0.5">CHK_SUM</span>
              <HexCode />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Smooth Vertical Scanning Laser */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ top: '5%', opacity: 0 }}
            animate={{ top: ['5%', '95%'], opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-[15%] h-[2px] bg-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.8),0_0_30px_rgba(234,179,8,0.4)] z-40 pointer-events-none mix-blend-screen"
          >
            {/* Bright edge highlights */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-px bg-white blur-[1px]" />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-px bg-white blur-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] top-1/2 -translate-y-1/2 z-0 opacity-20 transition-colors duration-1000" style={{ background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)` }} />
      <div className="absolute h-full w-[1px] left-1/2 -translate-x-1/2 z-0 opacity-20 transition-colors duration-1000" style={{ background: `linear-gradient(180deg, transparent, ${activeColor}, transparent)` }} />

    </div>
  );
}

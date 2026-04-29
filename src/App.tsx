import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, Route, Switch } from "wouter";
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, MessageCircle, Upload, FileImage, X, CheckCircle2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Background } from './components/Background';
import { Scanner } from './components/Scanner';
import { Terminals } from './components/Terminals';
import { Report } from './components/Report';
import { AIChatBox } from './components/AIChatBox';
import { askGeminiStream } from './lib/gemini';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full relative z-20 flex justify-between items-center px-6 py-8 md:px-12 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Shield className="w-8 h-8 text-yellow-500 stroke-[1.5]" />
          <div className="flex flex-col">
             <span className="font-['Anton'] text-2xl tracking-[0.05em] text-white leading-none">SENTINEL</span>
             <span className="text-[9px] font-mono tracking-[0.3em] text-white/50 uppercase">Security</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-[15px] font-medium text-white shadow-sm">
          <Link href="/security" className="hover:text-yellow-500 transition-colors">Security</Link>
          <Link href="/about" className="hover:text-yellow-500 transition-colors">About us</Link>
          <Link href="/services" className="hover:text-yellow-500 transition-colors">Services</Link>
          <Link href="/database" className="hover:text-yellow-500 transition-colors">Database</Link>
          <Link href="/pricing" className="hover:text-yellow-500 transition-colors">Pricing</Link>
          <Link href="/integrations" className="hover:text-yellow-500 transition-colors">Integrations</Link>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact us</Link>
        </nav>

        <button 
          className="md:hidden text-white hover:text-yellow-500 transition-colors p-2 -mr-2 relative z-50 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
          title="Open Menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[280px] h-full bg-[#050505] border-l border-white/10 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-500 stroke-[1.5]" />
                  <div className="flex flex-col">
                     <span className="font-['Anton'] text-xl tracking-[0.05em] text-white leading-none">SENTINEL</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-lg font-medium text-white/80">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Home</Link>
                <Link href="/security" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Security</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">About us</Link>
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Services</Link>
                <Link href="/database" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Database</Link>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Pricing</Link>
                <Link href="/integrations" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Integrations</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-500 transition-colors block py-2">Contact us</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { AboutPage, SecurityPage, ServicesPage, DatabasePage, PricingPage, IntegrationsPage, ContactPage, PrivacyPage, TermsPage } from './pages/ContentPages';

function PlaceholderPage({ title, description }: { title: string, description: string }) {

  return (
    <div className="flex-1 flex items-center justify-center relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-['Anton'] uppercase text-white mb-4 drop-shadow-md">{title}</h1>
        <div className="h-1.5 w-16 md:w-24 bg-yellow-500 mx-auto mb-8" />
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">{description}</p>
        <Link href="/" className="mt-8 inline-block px-6 py-3 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-sm font-bold text-sm uppercase tracking-wider transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full relative z-20 mt-auto border-t border-white/10 bg-[#050505]/80 backdrop-blur-md pb-16 sm:pb-6">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider text-center md:text-left leading-relaxed">
          <p>&copy; {new Date().getFullYear()} Sentinel-AI Security. All rights reserved.</p>
          <p className="mt-1">
            Built using <span className="text-white/70">Google AI Studio</span>. Scanning infrastructure powered by <span className="text-yellow-500/70">Google Gemini</span>.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-white/50 font-mono uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-yellow-500 transition-colors">Legal Terms</Link>
        </div>
      </div>
    </footer>
  );
}

type AppState = 'idle' | 'scanning' | 'complete';

function Home() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  
  const [geminiOutput, setGeminiOutput] = useState<string>('');
  
  const [parsedData, setParsedData] = useState<{
    logs: string;
    summary: string;
    scoreBreakdown: string;
    score: number;
    verdict: string;
    originalContext: string;
    sources: string;
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (f) {
      setIsReadingFile(true);
      setReadProgress(100);
      
      const reader = new FileReader();
      reader.onload = () => {
        setFile(f);
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        setFileBase64(base64);
        setIsReadingFile(false);
        setReadProgress(0);
      };
      reader.readAsDataURL(f);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.webm', '.ogg', '.mov'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a']
    },
    maxFiles: 1 
  });

  const handleInitiateScan = async (overrideUrl?: string | React.MouseEvent) => {
    const finalUrl = typeof overrideUrl === 'string' ? overrideUrl : urlInput;
    if (!finalUrl && !file) return;
    
    if (typeof overrideUrl === 'string') {
      setUrlInput(overrideUrl);
    }

    setAppState('scanning');
    setGeminiOutput('');
    setParsedData(null);

    const query = finalUrl 
      ? `Analyze this specific media content or source URL: ${finalUrl}. Perform a real-time fact-check, analyze both audio and video, and provide details including originality, dates, and authoritative sources.` 
      : `Analyze the provided media file (image, video, or audio). Detect any deepfakes, AI-generation, tampering, or mismatches.`;
    
    try {
      let currentOutput = "";
      const result = await askGeminiStream(query, fileBase64 || undefined, file?.type, (chunk) => {
        currentOutput += chunk;
        setGeminiOutput(currentOutput);
        
        // Dynamic real-time partial parsing
        const logsMatch = currentOutput.match(/### LOGS\n([\s\S]*?)(?=\n###|$)/i);
        const verdictMatch = currentOutput.match(/### VERDICT\n([\s\S]*?)(?=\n###|$)/i);
        if (logsMatch || verdictMatch) {
            setParsedData(prev => ({
                logs: logsMatch ? logsMatch[1].trim() : prev?.logs || "",
                summary: prev?.summary || "",
                scoreBreakdown: prev?.scoreBreakdown || "",
                score: prev?.score || 50,
                verdict: verdictMatch ? verdictMatch[1].trim() : prev?.verdict || "Analyzing...",
                originalContext: prev?.originalContext || "",
                sources: prev?.sources || ""
            }));
        }
      });
      
      const logsMatch = result.match(/### LOGS\n([\s\S]*?)(?=\n###|$)/i);
      const summaryMatch = result.match(/### SUMMARY\n([\s\S]*?)(?=\n###|$)/i);
      const scoreBreakdownMatch = result.match(/### SCORE_BREAKDOWN\n([\s\S]*?)(?=\n###|$)/i);
      const scoreMatch = result.match(/### SCORE\n([\s\S]*?)(?=\n###|$)/i);
      const verdictMatch = result.match(/### VERDICT\n([\s\S]*?)(?=\n###|$)/i);
      const originalContextMatch = result.match(/### ORIGINAL_CONTEXT\n([\s\S]*?)(?=\n###|$)/i);
      const sourcesMatch = result.match(/### SOURCES\n([\s\S]*?)(?=\n###|$)/i);

      const verdict = verdictMatch ? verdictMatch[1].trim() : 'Unverified';
      const parsedScore = scoreMatch ? parseInt(scoreMatch[1].trim(), 10) : 50;
      const score = isNaN(parsedScore) ? 50 : parsedScore;

      setParsedData({
        logs: logsMatch ? logsMatch[1].trim() : result,
        summary: summaryMatch ? summaryMatch[1].trim() : "Summary unavailable.",
        scoreBreakdown: scoreBreakdownMatch ? scoreBreakdownMatch[1].trim() : "Base Score: 100",
        score,
        verdict,
        originalContext: originalContextMatch ? originalContextMatch[1].trim() : "Not Applicable",
        sources: sourcesMatch ? sourcesMatch[1].trim() : "No sources."
      });

    } catch (e) {
      setGeminiOutput('Error connecting to verification systems.');
      setParsedData({
        logs: 'Error executing search protocol.',
        summary: 'A connection error prevented validation.',
        scoreBreakdown: 'Base Score: 0\n-Error: Connection Failed',
        score: 0,
        verdict: 'Error',
        originalContext: 'Not Applicable',
        sources: ''
      });
    }

    setAppState('complete');
  };

  const handleReset = () => {
    setAppState('idle');
    setUrlInput('');
    setFile(null);
    setFileBase64(null);
    setGeminiOutput('');
    setParsedData(null);
  };

  return (
    <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center py-12 lg:py-0">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Text & Terminals */}
        <div className="flex flex-col z-20 min-h-[400px] lg:min-h-[500px] justify-center relative">
          <AnimatePresence mode="wait">
            {appState === 'idle' && (
              <motion.div 
                key="hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-['Anton'] uppercase tracking-tight text-white leading-[0.85] -ml-2 mb-2 italic drop-shadow-lg">
                  SENTINEL
                </h1>
                
                {/* Yellow underline mimicking the image */}
                <div className="h-1.5 w-24 bg-yellow-500 mb-8" />
                
                <p className="text-xl md:text-2xl font-semibold mb-10 text-white/90 drop-shadow-md">
                  The Ultimate Shield for Digital Sports Media.
                </p>

                <div className="hidden md:block w-full max-w-md space-y-4">
                  <>
                    {/* Dropzone for File Upload */}
                    {isReadingFile ? (
                      <div className="relative overflow-hidden border border-white/20 bg-[#1A1A1A]/60 rounded-sm p-8 text-center flex flex-col items-center justify-center h-[142px]">
                        <div className="w-full max-w-xs">
                           <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Processing Media...</span>
                             <span className="text-xs font-mono text-yellow-500">{readProgress}%</span>
                           </div>
                           <div className="w-full bg-black rounded-full h-1.5 overflow-hidden">
                             <motion.div 
                                className="h-full bg-yellow-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${readProgress}%` }}
                             />
                           </div>
                        </div>
                      </div>
                    ) : !file ? (
                      <div {...getRootProps()} className={`relative overflow-hidden border-2 border-dashed ${isDragActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/20 bg-[#1A1A1A]/60'} rounded-sm p-8 text-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 group`}>
                        <input {...getInputProps()} />
                        <Upload className={`w-8 h-8 mx-auto mb-3 transition-colors duration-300 ${isDragActive ? 'text-yellow-500' : 'text-white/40 group-hover:text-yellow-400'}`} />
                        <p className="text-sm text-white/80 font-semibold mb-1">Drag & drop media</p>
                        <p className="text-[11px] text-white/40 font-mono tracking-wider uppercase">Image, Video, or Audio</p>
                        
                        {/* Animated corner accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-yellow-500 transition-colors" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-yellow-500 transition-colors" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-yellow-500 transition-colors" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-yellow-500 transition-colors" />
                      </div>
                    ) : (
                      <div className="relative flex items-center gap-4 bg-[#1A1A1A]/80 border border-green-500/50 rounded-sm p-4 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <div className="w-10 h-10 bg-green-500/10 rounded flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate text-white">{file.name}</p>
                          <p className="text-xs text-green-400 font-mono tracking-wider uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB &bull; Uploaded</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setFile(null); setFileBase64(null); }} className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="Or enter media URL / query..."
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (urlInput || file)) {
                            handleInitiateScan();
                          }
                        }}
                        className="w-full bg-[#1A1A1A]/80 border border-white/10 rounded-sm px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 font-mono text-sm transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleInitiateScan}
                      disabled={!urlInput && !file}
                      className="w-full px-8 py-4 bg-yellow-500 text-black font-bold uppercase tracking-wider rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors shadow-lg group relative overflow-hidden"
                    >
                      <span className="relative z-10">Initiate Scan</span>
                       <motion.div 
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30" 
                        animate={{ scale: [1, 2], opacity: [0, 0.3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    </button>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="w-full text-[10px] text-white/40 font-mono tracking-widest uppercase mb-1">Quick Testers / Demos</span>
                        <button 
                          onClick={() => handleInitiateScan('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                          className="px-3 py-1.5 bg-white/5 hover:bg-teal-500/20 hover:text-teal-400 border border-white/10 hover:border-teal-500/50 rounded-sm text-xs font-mono text-white/60 transition-all"
                        >
                          Authentic Asset
                        </button>
                        <button 
                          onClick={() => handleInitiateScan('https://www.tiktok.com/@deeptomcruise')}
                          className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/50 rounded-sm text-xs font-mono text-white/60 transition-all"
                        >
                          Deepfake Video
                        </button>
                        <button 
                          onClick={() => handleInitiateScan('https://www.youtube.com/watch?v=b2yM6AOrB1Q')}
                          className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 border border-white/10 hover:border-orange-500/50 rounded-sm text-xs font-mono text-white/60 transition-all text-left"
                        >
                          AI Voice / Audio
                        </button>
                      </div>
                  </>
                </div>
              </motion.div>
            )}

            {(appState === 'scanning' || appState === 'complete') && (
              <motion.div 
                key="analysis-panel"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full h-full flex flex-col justify-center"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-['Anton'] uppercase tracking-wide text-yellow-500 mb-1 italic">
                    {appState === 'scanning' ? 'Live Integrity Scan' : 'Scan Complete'}
                  </h2>
                  <p className="text-xs font-mono text-white/50 bg-black/40 inline-flex px-3 py-1 rounded-sm border border-white/10 truncate max-w-full">
                    {urlInput || file?.name || 'Uploaded Source Media'}
                  </p>
                </div>
                
                {appState === 'scanning' && (
                  <div className="flex flex-col gap-4">
                    {/* Prominent Loading Indicator */}
                    <div className="bg-[#1A1A1A]/80 border border-yellow-500/30 rounded-sm p-4 relative overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                      <div className="flex justify-between items-center mb-3 relative z-10">
                         <div className="flex items-center gap-3">
                            <motion.div 
                              animate={{ rotate: 360 }} 
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 rounded-full border-2 border-yellow-500 border-t-transparent"
                            />
                            <span className="text-[13px] font-mono text-yellow-500 uppercase tracking-widest font-bold drop-shadow-sm">Analyzing Asset...</span>
                         </div>
                         <span className="text-[10px] font-mono text-yellow-500/70 uppercase tracking-widest">Agentic Workflow Active</span>
                      </div>
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden relative z-10">
                        <motion.div 
                          className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(253,224,71,0.8)]"
                          initial={{ width: '0%', x: '-100%' }}
                          animate={{ width: '40%', x: ['-100%', '250%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent mix-blend-screen pointer-events-none"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    <div className="h-[250px] sm:h-[320px]">
                      <Terminals isActive={true} liveLogs={geminiOutput} />
                    </div>
                  </div>
                )}
                
                {appState === 'complete' && parsedData && (
                  <div className="w-full max-w-lg">
                    <Report isActive={true} resultData={parsedData} />
                    <button 
                      onClick={handleReset}
                      className="mt-6 px-6 py-3 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-sm font-bold text-sm uppercase tracking-wider transition-all"
                    >
                      Scan Another Asset
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - 3D Sphere / Character Replacement */}
        <div className="relative min-h-[350px] lg:min-h-[600px] flex items-center justify-center lg:justify-end w-full pt-4 md:pt-0 pb-20 md:pb-0">
           <div className="scale-75 sm:scale-90 md:scale-100 origin-center lg:origin-right w-full flex justify-center lg:justify-end">
             <Scanner isActive={appState === 'scanning'} isComplete={appState === 'complete'} verdict={parsedData?.verdict} />
           </div>
           
           {appState === 'idle' && (
              <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/10 flex flex-col gap-3 rounded-t-2xl">
                  <input 
                    type="text" 
                    placeholder="Enter media URL..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (urlInput || file)) {
                        handleInitiateScan();
                      }
                    }}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 font-mono text-sm"
                  />
                  <button 
                    onClick={handleInitiateScan}
                    disabled={!urlInput}
                    className="w-full py-3 bg-yellow-500 text-black font-bold uppercase rounded-sm disabled:opacity-50"
                  >
                    Initiate Scan
                  </button>
              </div>
           )}
        </div>

      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#141414] text-white flex flex-col font-sans selection:bg-yellow-500/30 overflow-x-hidden">
      <Background />
      <Header />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/security"><SecurityPage /></Route>
        <Route path="/about"><AboutPage /></Route>
        <Route path="/services"><ServicesPage /></Route>
        <Route path="/database"><DatabasePage /></Route>
        <Route path="/pricing"><PricingPage /></Route>
        <Route path="/integrations"><IntegrationsPage /></Route>
        <Route path="/contact"><ContactPage /></Route>
        <Route path="/privacy"><PrivacyPage /></Route>
        <Route path="/terms"><TermsPage /></Route>
        <Route><PlaceholderPage title="404" description="The page you are looking for does not exist." /></Route>
      </Switch>
      <Footer />
      <AIChatBox />
    </div>
  );
}


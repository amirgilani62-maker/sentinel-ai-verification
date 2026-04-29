import { Shield, Zap, Search, Database, Lock, Globe, CheckCircle2, Server, Cpu, Mail, MapPin, Phone } from 'lucide-react';
import { ReactNode } from 'react';

function PageLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex-1 relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 lg:py-24 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-['Anton'] uppercase text-white mb-6 drop-shadow-md text-center md:text-left tracking-wide">{title}</h1>
        <div className="h-1.5 w-16 md:w-24 bg-yellow-500 mb-12 mx-auto md:mx-0" />
        <div className="text-white/80 space-y-8 text-lg leading-relaxed font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <PageLayout title="About Sentinel-AI">
      <p className="text-xl text-white font-medium">
        Sentinel-AI is an advanced, real-time media integrity and fact-checking engine built to combat misinformation and synthetic media.
      </p>
      
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
          <Cpu className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2 selection:bg-yellow-500/30">What Is It?</h3>
          <p className="text-sm text-white/70">
            A state-of-the-art verification platform that empowers journalists, researchers, and everyday users to validate the authenticity of digital media and claims.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
          <Zap className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">How It Works</h3>
          <p className="text-sm text-white/70">
            Users upload images or text. Our engine runs a multi-modal scan evaluating pixel integrity, contextual anomalies, and real-world facts to produce an authenticity score.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">Core Features</h2>
      <ul className="space-y-4">
        {[
          "Real-time Deepfake & Manipulation Detection",
          "Zero-Hallucination Fact Checking",
          "Multi-modal Image and Text Analysis",
          "Confidence Scoring Decay Algorithms",
          "Comprehensive Authenticity PDF Reports"
        ].map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-white/10 pb-4">What We Use</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {['Google Gemini 3.0', 'React 18', 'Tailwind CSS', 'Vite & Framer Motion'].map((tech, i) => (
          <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-md text-sm font-mono text-yellow-500/90 hover:bg-yellow-500/10 transition-colors">
            {tech}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export function SecurityPage() {
  return (
    <PageLayout title="Security & Privacy">
      <p className="text-xl text-white font-medium">
        We rely on zero-trust architecture and ephemeral processing to ensure your data stays yours.
      </p>
      
      <div className="space-y-6 mt-8">
        <div className="flex gap-4">
          <div className="mt-1"><Lock className="w-6 h-6 text-yellow-500" /></div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Ephemeral File Processing</h3>
            <p className="text-white/70 text-sm md:text-base">Uploaded files are processed entirely in-memory for scanning purposes. As soon as the authenticity report is generated, the file buffer is permanently destroyed. We do not store your media.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1"><Shield className="w-6 h-6 text-yellow-500" /></div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">End-to-End Encryption</h3>
            <p className="text-white/70 text-sm md:text-base">All interactions with Sentinel-AI's endpoints and inference engines are secured via TLS 1.3, ensuring intercept-free data transit.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1"><Server className="w-6 h-6 text-yellow-500" /></div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Secure Infrastructure</h3>
            <p className="text-white/70 text-sm md:text-base">Built upon robust Google Cloud and Google AI architecture with strict IAM controls isolating inference operations from outside access.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export function ServicesPage() {
  return (
    <PageLayout title="Our Services">
      <p>Sentinel-AI provides a suite of specialized tools tailored for different levels of security requirements.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 border border-white/10 bg-gradient-to-b from-white/5 to-transparent rounded-xl">
          <Search className="w-10 h-10 text-yellow-500 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Media Verification</h3>
          <p className="text-white/70">Analyze images to detect inconsistent pixel behaviors, manipulated metadata, and AI-generated artifacts using multi-layered ML inference.</p>
        </div>
        <div className="p-8 border border-white/10 bg-gradient-to-b from-white/5 to-transparent rounded-xl">
          <Globe className="w-10 h-10 text-yellow-500 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Real-Time Fact Checking</h3>
          <p className="text-white/70">Verify textual claims instantly against vast, up-to-date knowledge bases. We prioritize high-authority sources to validate or debunk statements.</p>
        </div>
      </div>
    </PageLayout>
  );
}

export function DatabasePage() {
  return (
    <PageLayout title="Verification Database">
      <p>The Sentinel-AI verification engine does not rely on static, outdated lists. Instead, it aggregates intelligence dynamically.</p>
      
      <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-lg mt-8 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
          <Database className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-bold tracking-widest uppercase">Knowledge Sync Protocol</span>
        </div>
        <div className="text-white/60 space-y-2">
          <p><span className="text-green-400">INFO</span> [0.00s] Initializing live search indexing...</p>
          <p><span className="text-green-400">INFO</span> [0.12s] Connecting to Google Gemini Intelligence APIs...</p>
          <p><span className="text-blue-400">SYNC</span> [0.45s] Building cross-reference credibility matrix...</p>
          <p><span className="text-yellow-500">WARN</span> [1.20s] Low authority sources filtered out.</p>
          <p><span className="text-green-400">INFO</span> [1.55s] Database engine primed for zero-hallucination inference.</p>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-lg">
        <h3 className="text-white font-bold mb-2">Transparency Protocol</h3>
        <p className="text-sm">Every scan produces a transparent breakdown of the sources we consulted and the confidence weight assigned to them.</p>
      </div>
    </PageLayout>
  );
}

export function PricingPage() {
  return (
    <PageLayout title="Pricing Plans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {[
          {
            name: "Basic",
            price: "Free",
            desc: "For everyday fact-checking.",
            features: ["10 Scans per day", "Basic Text Verification", "Standard Speed", "Community Support"],
          },
          {
            name: "Pro",
            price: "$29/mo",
            desc: "For journalists & creators.",
            features: ["500 Scans per month", "Deepfake Image Detection", "Detailed PDF Reports", "Priority Inference Speed"],
            highlight: true
          },
          {
            name: "Enterprise",
            price: "Custom",
            desc: "For newsrooms & platforms.",
            features: ["Unlimited API Scans", "Custom Rules Engine", "Dedicated Infrastructure", "24/7 SLA Support"],
          }
        ].map((plan, i) => (
          <div key={i} className={`p-8 rounded-xl border ${plan.highlight ? 'border-yellow-500 bg-yellow-500/5 relative' : 'border-white/10 bg-white/5'} flex flex-col`}>
            {plan.highlight && <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg rounded-tr-xl">Popular</div>}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-3xl font-['Anton'] tracking-wider text-yellow-500 mb-4">{plan.price}</div>
            <p className="text-sm text-white/50 mb-8 h-10">{plan.desc}</p>
            <ul className="space-y-3 mb-8 flex-1 text-sm">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/40" />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 text-sm font-bold tracking-wider uppercase transition-colors ${plan.highlight ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export function IntegrationsPage() {
  return (
    <PageLayout title="Integrations & API">
       <p className="text-xl text-white mb-12">Embed Sentinel-AI's verification engine directly into your workflow.</p>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-6 border border-white/10 rounded-lg">
           <h3 className="text-xl font-bold text-white mb-4">REST API</h3>
           <p className="text-sm text-white/60 mb-6">Integrate automated media validation into your content moderation pipelines with sub-second latency.</p>
           <div className="bg-[#050505] p-4 rounded font-mono text-xs text-yellow-500 border border-white/5 overflow-hidden">
             POST /api/v1/scan<br/>
             Content-Type: application/json<br/><br/>
             {`{ "url": "https://example.com/media.jpg" }`}
           </div>
         </div>
         
         <div className="p-6 border border-white/10 rounded-lg relative overflow-hidden">
           <h3 className="text-xl font-bold text-white mb-4">Browser Extension (Coming Soon)</h3>
           <p className="text-sm text-white/60 mb-6">Right-click any image or highlight any text on the web to instantly verify its authenticity without leaving the page.</p>
           <button className="px-4 py-2 bg-white/10 text-white/50 text-sm font-medium rounded cursor-not-allowed">
             Join Beta Waitlist
           </button>
         </div>
       </div>
    </PageLayout>
  );
}

export function ContactPage() {
  return (
    <PageLayout title="Contact Us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-white/70 mb-8">Have a question about our enterprise plans, need support, or want to report an issue? Our team is ready to help.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/80">
              <div className="p-3 bg-white/5 rounded-full"><Mail className="w-5 h-5 text-yellow-500" /></div>
              <span>support@sentinel-ai.test</span>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="p-3 bg-white/5 rounded-full"><Phone className="w-5 h-5 text-yellow-500" /></div>
              <span>+1 (555) 019-2837</span>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="p-3 bg-white/5 rounded-full"><MapPin className="w-5 h-5 text-yellow-500" /></div>
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
            <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
          </div>
          <input type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" />
          <textarea placeholder="How can we help?" rows={5} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"></textarea>
          <button type="submit" className="px-8 py-3 bg-yellow-500 text-black font-bold uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors rounded-sm">
            Send Message
          </button>
        </form>
      </div>
    </PageLayout>
  );
}

export function PrivacyPage() {
  return (
    <PageLayout title="Privacy Policy">
      <div className="prose prose-invert max-w-none space-y-6 text-sm text-white/70 md:text-base">
        <p>Your privacy is our primary concern. This policy outlines how Sentinel-AI handles your data when you use our verification and scanning tools.</p>
        
        <h3 className="text-white text-xl font-bold mt-8">Google Services Integration</h3>
        <p>We use Google Cloud and Google Gemini services to build and process our scans. The scanning operation relies on these APIs to provide advanced multimodal inference.</p>
        
        <h3 className="text-white text-xl font-bold mt-8">Data Safety and Ephemerality</h3>
        <p>Sentinel-AI explicitly prioritizes your data safety. When you upload media for scanning, the data is buffered in memory solely for the duration of the scan. Once the report is returned, the original media and buffer are permanently wiped. We do not use your proprietary uploaded videos or images to retrain our foundational models without explicit opt-in consent.</p>

        <h3 className="text-white text-xl font-bold mt-8">What We Store</h3>
        <p>We only store application logs for debugging purposes and metadata related to scanner performance (e.g., scan duration, payload size). No personally identifiable information or content from the payload is persisted without authorization.</p>
      </div>
    </PageLayout>
  );
}

export function TermsPage() {
  return (
    <PageLayout title="Legal Terms">
       <div className="prose prose-invert max-w-none space-y-6 text-sm text-white/70 md:text-base">
        <p>By using Sentinel-AI, you agree to our usage guidelines. These terms govern your access to the Sentinel-AI verification applications, APIs, and associated services.</p>
        
        <h3 className="text-white text-xl font-bold mt-8">Acceptable Use</h3>
        <p>You agree to use Sentinel-AI for lawful fact-checking and media verification purposes. You may not use the tool to actively spread misinformation, train adversarial networks to bypass detection, or reverse engineer the inference logic.</p>
        
        <h3 className="text-white text-xl font-bold mt-8">Service Limitations</h3>
        <p>While Sentinel-AI uses state-of-the-art models for detection, artificial intelligence is subject to false positives and false negatives. Our reports represent a "Confidence Score" and an algorithmic assessment, not an absolute legal or forensic warranty. Users must evaluate the provided context and evidence.</p>

        <h3 className="text-white text-xl font-bold mt-8">Account Termination</h3>
        <p>We reserve the right to suspend or terminate API keys or user access if usage patterns indicate abuse, excessively high traffic outside of quota limits, or violation of these terms.</p>
      </div>
    </PageLayout>
  );
}

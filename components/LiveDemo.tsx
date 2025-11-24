import React, { useState, useEffect, useRef } from 'react';
import { generateStudentMonologue } from '../services/geminiService';
import { University, Topic } from '../types';
import { Mic, Play, Loader2, Sparkles, MapPin, Radio, Activity, Volume2, Music, RefreshCw, Zap } from 'lucide-react';

export const LiveDemo: React.FC = () => {
  const [selectedUni, setSelectedUni] = useState<University>(University.UCLA);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(Topic.CAMPUS_LIFE);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; author: string; mood: string; background_sound: string; emoji: string; color_hex: string; timestamp: string } | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  
  // Ref to hold the dynamic style for the glow
  const containerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (result?.text) {
      setDisplayedText('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(prev => prev + result.text.charAt(i));
        i++;
        if (i >= result.text.length) clearInterval(interval);
      }, 30); // Speed of typing
      return () => clearInterval(interval);
    }
  }, [result]);

  const handleGenerate = async () => {
    setLoading(true);
    // Keep old result visible but dimmed? No, let's clear for scan effect.
    // setResult(null); 
    setDisplayedText('');
    
    try {
      const response = await generateStudentMonologue(selectedUni, selectedTopic);
      setResult(response);
    } catch (e) {
      console.error(e);
      setResult({ 
        text: "Signal lost. The neural link could not be established. Please retry the transmission.", 
        author: "System",
        mood: "Error",
        background_sound: "Static noise",
        emoji: "⚠️",
        color_hex: "#ff0000",
        timestamp: "--:--"
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic glow style
  const glowStyle = result 
    ? { 
        boxShadow: `0 0 100px ${result.color_hex}30`, 
        borderColor: `${result.color_hex}50` 
      } 
    : {};

  const textColorStyle = result ? { color: result.color_hex } : {};
  const bgGradientStyle = result ? { background: `linear-gradient(to right, ${result.color_hex}10, transparent)` } : {};

  return (
    <section id="demo" className="py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold text-white/[0.02] pointer-events-none font-display">LISTEN</div>
           
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-4 backdrop-blur-md">
              <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
              <span className="text-neon-cyan font-mono text-xs tracking-widest uppercase">Live Neural Intercept</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-display font-bold mt-2 mb-4 text-white">
             Tune Into <span className="holo-text">Thoughts</span>
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
             Select a campus frequency. Our AI demodulates internal monologues into text.
           </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CONTROL PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-1 rounded-3xl h-full border-t border-l border-white/20">
              <div className="bg-[#0a0a0f]/90 rounded-[20px] p-6 space-y-8 h-full flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">TUNER_CONTROLS v2.0</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-150"></div>
                  </div>
                </div>

                {/* Frequency Select */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-4 uppercase tracking-wider">
                    <Radio size={12} className="text-neon-blue" /> Sector (Campus)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => setSelectedUni(University.UCLA)}
                      className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 group text-left ${
                        selectedUni === University.UCLA 
                        ? 'bg-gradient-to-r from-neon-blue/20 to-transparent border-neon-blue' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between z-10 relative">
                        <div>
                          <span className="text-xs font-mono text-gray-400 block mb-1">FREQ: 98.2 MHz</span>
                          <span className="font-display font-bold text-xl">UCLA</span>
                        </div>
                        <span className="text-2xl group-hover:scale-125 transition-transform">🌴</span>
                      </div>
                    </button>
                    
                    <button 
                       onClick={() => setSelectedUni(University.STANFORD)}
                       className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 group text-left ${
                        selectedUni === University.STANFORD 
                        ? 'bg-gradient-to-r from-red-500/20 to-transparent border-red-500' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between z-10 relative">
                        <div>
                          <span className="text-xs font-mono text-gray-400 block mb-1">FREQ: 104.5 MHz</span>
                          <span className="font-display font-bold text-xl">Stanford</span>
                        </div>
                         <span className="text-2xl group-hover:scale-125 transition-transform">🌲</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Topic Select */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-xs text-gray-400 font-mono mb-4 uppercase tracking-wider">
                    <Activity size={12} className="text-neon-purple" /> Narrative Filter
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(Topic).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3 py-2 rounded border text-xs font-mono transition-all ${
                          selectedTopic === topic
                          ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                          : 'bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-5 rounded-xl bg-white text-black font-display font-bold text-lg tracking-wide hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> SCANNING...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:text-neon-purple transition-colors" /> INITIATE SCAN
                    </>
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* VISUALIZER / RESULT */}
          <div className="lg:col-span-8 relative min-h-[600px] flex flex-col">
            
            {/* Dynamic Backlight */}
            <div className={`absolute inset-0 bg-gradient-to-r rounded-[40px] blur-[100px] opacity-30 transition-colors duration-1000 ${loading ? 'from-neon-cyan via-white to-neon-purple' : ''}`}
                 style={{ background: result ? result.color_hex : '' }}></div>
            
            <div 
              ref={containerRef}
              className="relative h-full glass-panel-heavy rounded-[40px] p-8 md:p-12 border border-white/10 flex flex-col overflow-hidden transition-all duration-1000"
              style={glowStyle}
            >
               
               {/* Decorative Overlay UI */}
               <div className="absolute top-6 right-8 flex gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><div className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div> REC_STATE</span>
                  <span className="hidden md:inline">ENCRYPTION: NONE</span>
               </div>

               {/* HEADER */}
               <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl glass-panel border border-white/20 transition-all duration-500 ${result ? 'scale-100' : 'scale-90 opacity-50'}`}
                           style={result ? { borderColor: result.color_hex, boxShadow: `0 0 20px ${result.color_hex}40` } : {}}>
                        {result ? result.emoji : <RefreshCw className={`opacity-20 ${loading ? 'animate-spin' : ''}`} />}
                      </div>
                      {loading && <div className="absolute -inset-4 border border-white/10 rounded-3xl animate-ping opacity-20"></div>}
                    </div>
                    
                    <div className="space-y-1">
                       {result && (
                         <div className="text-xs font-mono text-gray-400 mb-1 flex items-center gap-2 animate-in fade-in slide-in-from-left-4">
                            <span style={textColorStyle}>● LIVE</span>
                            <span>{result.timestamp}</span>
                         </div>
                       )}
                       <h3 className="font-display font-bold text-3xl text-white tracking-wide">
                         {result ? (
                           <span className="animate-in fade-in">{result.author}</span>
                         ) : (
                           <span className="opacity-30">NO_SIGNAL</span>
                         )}
                       </h3>
                       <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
                          <span className="flex items-center gap-1"><MapPin size={12}/> {selectedUni}</span>
                       </div>
                    </div>
                  </div>
               </div>

               {/* MAIN CONTENT AREA */}
               <div className="flex-1 flex flex-col justify-center relative z-10">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-full max-w-lg space-y-8 text-center">
                          <div className="font-mono text-neon-cyan text-sm animate-pulse tracking-[0.3em]">DECODING NEURAL PATTERNS</div>
                          
                          {/* Fake Waveform Loader */}
                          <div className="flex items-center justify-center gap-1 h-16">
                             {[...Array(20)].map((_, i) => (
                               <div 
                                 key={i} 
                                 className="w-1.5 bg-neon-cyan/50 rounded-full" 
                                 style={{ 
                                   height: '20%',
                                   animation: `pulse-fast 1s ease-in-out infinite ${i * 0.05}s` 
                                 }}
                               ></div>
                             ))}
                          </div>

                          <div className="text-xs text-gray-600 font-mono">
                             SEARCHING SECTOR: {selectedUni.toUpperCase()}<br/>
                             FILTER: {selectedTopic.toUpperCase()}
                          </div>
                       </div>
                    </div>
                  ) : result ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                      
                      {/* Monologue Text */}
                      <p className="text-2xl md:text-4xl font-light leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        "{displayedText}"
                        <span className="inline-block w-3 h-8 ml-1 bg-white align-middle animate-pulse"></span>
                      </p>
                      
                      {/* Meta Data Pill */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div 
                          className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 transition-colors duration-500"
                          style={bgGradientStyle}
                        >
                           <Volume2 size={16} style={textColorStyle}/>
                           <span className="text-sm text-gray-300 italic">{result.background_sound}</span>
                           
                           {/* Mini Visualizer */}
                           <div className="flex gap-0.5 h-4 items-end ml-2">
                              {[...Array(5)].map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="w-0.5 animate-[pulse_1s_ease-in-out_infinite]" 
                                    style={{ 
                                      height: `${Math.random() * 100}%`, 
                                      animationDelay: `${i * 0.1}s`,
                                      backgroundColor: result.color_hex 
                                    }}
                                 ></div>
                              ))}
                           </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 text-sm font-mono text-gray-400">
                           <Activity size={14} style={textColorStyle} />
                           {result.mood}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 font-mono border-2 border-dashed border-gray-800 rounded-3xl p-12 bg-black/20">
                      <Radio className="w-16 h-16 mb-6 opacity-20" />
                      <p className="text-lg tracking-widest">AWAITING INPUT COORDINATES</p>
                      <p className="text-xs mt-2 opacity-50">SELECT A CAMPUS TO BEGIN INTERCEPTION</p>
                    </div>
                  )}
               </div>
               
               {/* Footer Decoration */}
               <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-end text-xs font-mono text-gray-600">
                  <div>SECURE CONNECTION ESTABLISHED</div>
                  <div className="flex gap-2">
                     <span>LAT: 34.0689</span>
                     <span>LONG: -118.4452</span>
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
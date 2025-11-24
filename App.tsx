import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { LiveDemo } from './components/LiveDemo';
import { ArrowRight, BookOpen, Headphones, Zap, Globe, MessageCircle, PlayCircle, Star, Terminal } from 'lucide-react';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Cinematic Splash Timer
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans text-white relative selection:bg-neon-cyan selection:text-black">
      
      {/* SPLASH SCREEN OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#030005] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="relative">
           {/* Glitch Effect Name */}
           <h1 
             className="text-7xl md:text-9xl font-display font-bold tracking-tighter text-white glitch-text mb-8"
             data-text="U-SPEAK"
           >
             U-SPEAK
           </h1>
           
           {/* Decorative Tech Lines */}
           <div className="absolute -top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
           <div className="absolute -bottom-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex flex-col items-center gap-4">
           <div className="flex gap-1">
             <div className="w-2 h-2 bg-neon-cyan animate-pulse"></div>
             <div className="w-2 h-2 bg-neon-cyan animate-pulse delay-75"></div>
             <div className="w-2 h-2 bg-neon-cyan animate-pulse delay-150"></div>
           </div>
           <div className="font-mono text-neon-cyan/70 text-sm tracking-[0.3em] animate-pulse">
             INITIALIZING NEURAL LINK...
           </div>
        </div>
      </div>

      {/* MAIN APP CONTENT */}
      {/* We keep it in DOM but hide it to allow smooth scale-in transition */}
      <div className={`transition-all duration-1000 ease-out transform ${showSplash ? 'scale-95 opacity-0 blur-sm brightness-50' : 'scale-100 opacity-100 blur-0 brightness-100'}`}>

        {/* Dynamic Background Layer */}
        <div className="fixed inset-0 z-[-1] bg-[#030005]">
           {/* Cyber Grid */}
           <div className="absolute inset-0 cyber-grid opacity-20"></div>
           
           {/* Floating Particles (Simulated Stars) */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                 <div 
                   key={i}
                   className="absolute w-1 h-1 bg-white rounded-full animate-float"
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     opacity: Math.random() * 0.5,
                     animationDuration: `${10 + Math.random() * 20}s`,
                     animationDelay: `${Math.random() * 5}s`
                   }}
                 ></div>
              ))}
           </div>

           {/* Gradient Orbs */}
           <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-neon-purple/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
           <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-neon-blue/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <Navbar />

        {/* Hero Section */}
        <header className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
          <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 h-full items-center">
            
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-1 relative">
              {/* Decorator Line */}
              <div className="hidden lg:block absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/10 transition-colors cursor-default">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-sm font-mono text-gray-300 tracking-wider">SYSTEM ONLINE: v2.4</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tight">
                Master English <br />
                <span className="holo-text">
                  Through Telepathy
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Don't just study the language. <span className="text-white font-semibold">Intercept the mindset.</span> <br/>
                U-Speak connects you to the private, authentic monologues of students from UCLA and Stanford using advanced AI simulation.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-6">
                <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.4)] group">
                  Initialize App <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2 group">
                  <PlayCircle className="w-4 h-4 group-hover:text-neon-cyan transition-colors" /> Watch Simulation
                </button>
              </div>
              
              <div className="pt-16 flex items-center justify-center lg:justify-start gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Faux Logos */}
                 <div className="font-serif font-bold text-2xl tracking-widest text-white">STANFORD</div>
                 <div className="h-8 w-[1px] bg-white/30"></div>
                 <div className="font-sans font-black italic text-2xl tracking-tighter text-blue-300">UCLA</div>
                 <div className="h-8 w-[1px] bg-white/30"></div>
                 <div className="font-mono font-bold text-lg text-yellow-500">BERKELEY</div>
              </div>
            </div>

            <div className="h-[700px] w-full flex items-center justify-center order-1 lg:order-2 perspective-1000">
              <Hero3D />
            </div>
          </div>
        </header>

        {/* Features Grid */}
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Immersion Protocol</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">The textbook creates robots. We create native speakers through simulated environmental exposure.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Headphones className="w-8 h-8 text-white" />,
                  color: "group-hover:shadow-[0_0_30px_#4f46e5]",
                  bg: "from-blue-500/20 to-purple-500/20",
                  title: "Passive Audio Stream",
                  desc: "Listen to continuous streams of consciousness. Train your brain to process speed and emotion naturally."
                },
                {
                  icon: <Zap className="w-8 h-8 text-white" />,
                  color: "group-hover:shadow-[0_0_30px_#00f0ff]",
                  bg: "from-cyan-500/20 to-blue-500/20",
                  title: "Real Vernacular",
                  desc: "No 'How are you?'. Learn 'What's the move?', 'I'm cooked', and other authentic campus slang."
                },
                {
                  icon: <MessageCircle className="w-8 h-8 text-white" />,
                  color: "group-hover:shadow-[0_0_30px_#bd00ff]",
                  bg: "from-purple-500/20 to-pink-500/20",
                  title: "Persona Mirroring",
                  desc: "Don't just listen. Respond. Our AI mimics the persona of the student you just heard for practice."
                }
              ].map((feature, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative glass-panel p-8 rounded-[30px] border border-white/10 h-full hover:-translate-y-2 transition-transform duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-8 transition-shadow duration-300 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-display text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r hover:from-white hover:to-gray-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Demo with Gemini */}
        <LiveDemo />

        {/* Social Proof / Footer */}
        <section id="reviews" className="pt-32 pb-12 relative overflow-hidden">
          <div className="container mx-auto px-6 mb-20">
            <div className="glass-panel-heavy rounded-[40px] p-12 md:p-20 relative overflow-hidden border border-white/10 group">
               {/* Decorative */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-neon-purple/20 to-transparent rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-neon-purple/30 transition-colors duration-1000"></div>
               
               <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-8">
                   <h2 className="text-4xl md:text-5xl font-display font-bold">
                     Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Network</span>
                   </h2>
                   <p className="text-xl text-gray-300">
                     "It's like hacking into a different reality. I learned more in 3 weeks of U-Speak eavesdropping than 4 years of textbooks."
                   </p>
                   <div className="flex items-center gap-4 pt-4">
                     <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border-2 border-white/20"></div>
                     <div>
                       <div className="font-bold text-white text-lg">Hiroshi Tanaka</div>
                       <div className="text-sm text-neon-cyan font-mono">USER ID: #88219</div>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md hover:bg-white/5 transition-colors">
                      <div className="text-5xl font-display font-bold text-white mb-2">50k+</div>
                      <div className="text-xs text-gray-400 font-mono tracking-widest uppercase">Active Listeners</div>
                    </div>
                    <div className="text-center p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md hover:bg-white/5 transition-colors">
                      <div className="text-5xl font-display font-bold text-white mb-2">4.9</div>
                      <div className="text-xs text-gray-400 font-mono tracking-widest uppercase">Neural Rating</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          <footer className="border-t border-white/5 pt-12 relative z-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2">
                  <Globe className="text-white w-5 h-5" />
                  <span className="text-lg font-display font-bold tracking-widest">U-SPEAK</span>
               </div>
               <div className="flex gap-8 text-xs font-mono text-gray-400">
                 <a href="#" className="hover:text-neon-cyan transition-colors">PRIVACY_PROTOCOL</a>
                 <a href="#" className="hover:text-neon-cyan transition-colors">TERMS_OF_LINK</a>
                 <a href="#" className="hover:text-neon-cyan transition-colors">CONTACT_ADMIN</a>
               </div>
               <div className="text-gray-600 text-xs font-mono">
                 © 2024 U-Speak Inc. SYSTEM_ACTIVE
               </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default App;
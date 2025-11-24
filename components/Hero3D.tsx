import React, { useRef, useState, useEffect } from 'react';
import { Play, Wifi, Battery, Signal, Zap } from 'lucide-react';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 20; // Increased sensitivity
      const y = (e.clientY - top - height / 2) / 20;
      setRotate({ x: -y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div ref={containerRef} className="relative w-full h-[700px] flex items-center justify-center pointer-events-none md:pointer-events-auto">
      
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse-slow"></div>

      {/* 3D Container */}
      <div style={style} className="relative w-[320px] h-[640px] transform-style-3d group">
        
        {/* ORBITAL RINGS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 opacity-40 animate-spin-slow pointer-events-none" 
             style={{ transform: 'translateZ(-100px) rotateX(60deg)' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-neon-cyan/20 border-dashed opacity-40 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" 
             style={{ transform: 'translateZ(-50px) rotateX(60deg)' }}></div>

        {/* Floating Chat Holograms (Extruded) */}
        <div className="absolute -right-32 top-32 z-50 glass-panel p-4 rounded-xl rounded-bl-none animate-float-delayed backdrop-blur-md border-neon-purple/30 max-w-[220px]"
             style={{ transform: 'translateZ(80px)' }}>
          <div className="flex justify-between items-center mb-2">
             <div className="text-xs text-neon-purple font-mono">@Stanford_Dev</div>
             <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse"></div>
          </div>
          <div className="text-sm text-white font-light">"Latency is down to 2ms. This feels... telepathic." 🚀</div>
        </div>

        <div className="absolute -left-28 bottom-48 z-50 glass-panel p-4 rounded-xl rounded-tr-none animate-float backdrop-blur-md border-neon-cyan/30 max-w-[220px]"
             style={{ transform: 'translateZ(120px)' }}>
           <div className="flex justify-between items-center mb-2">
             <div className="text-xs text-neon-cyan font-mono">@UCLA_Surfer</div>
             <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
           </div>
           <div className="text-sm text-white font-light">"Sunset at Santa Monica. I need this reset." 🌊</div>
        </div>


        {/* THE DEVICE */}
        <div className="absolute inset-0 rounded-[45px] glass-panel-heavy overflow-hidden z-10 border-[4px] border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl transform-style-3d">
          
          {/* Hardware Reflection */}
          <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-50"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-black/90 relative flex flex-col transform-style-3d">
            
            {/* Status Bar */}
            <div className="px-7 py-5 flex justify-between items-center text-[10px] text-gray-400 font-mono tracking-widest z-20">
              <span className="flex items-center gap-2"><Signal size={10} className="text-neon-green"/> NEURAL LINK</span>
              <span className="flex items-center gap-2">100% <Battery size={10}/></span>
            </div>

            {/* App UI */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative transform-style-3d">
              
              {/* Central Visualization */}
              <div className="w-56 h-56 rounded-full relative flex items-center justify-center mb-12 transform-style-3d" style={{ transform: 'translateZ(20px)' }}>
                {/* Ripples */}
                <div className="absolute inset-0 rounded-full border border-neon-blue/20 animate-[ping_3s_linear_infinite]"></div>
                <div className="absolute inset-4 rounded-full border border-neon-purple/20 animate-[ping_3s_linear_infinite_1s]"></div>
                
                {/* Core */}
                <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 blur-xl animate-pulse"></div>
                
                {/* Play Button */}
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] z-20 cursor-pointer hover:scale-110 transition-transform group-hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]">
                  <Play className="fill-white text-white ml-2 w-8 h-8" />
                </div>
              </div>

              {/* Text Stream Skeleton */}
              <div className="w-full space-y-4 px-4" style={{ transform: 'translateZ(10px)' }}>
                <div className="h-2 w-2/3 bg-white/10 rounded-full animate-pulse overflow-hidden">
                   <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full animate-pulse overflow-hidden">
                   <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_0.5s]"></div>
                </div>
                <div className="h-2 w-3/4 bg-white/10 rounded-full animate-pulse overflow-hidden">
                   <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite_1s]"></div>
                </div>
              </div>

              {/* Floating Bottom Card */}
              <div className="mt-auto w-full glass-panel p-4 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer border-l-4 border-l-neon-green" style={{ transform: 'translateZ(30px)' }}>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-blue-500 flex items-center justify-center">
                    <Zap size={18} className="text-white fill-white" />
                 </div>
                 <div>
                    <div className="text-xs text-neon-green font-mono mb-0.5">ACTIVE SESSION</div>
                    <div className="text-sm font-bold text-white">Learning Mode</div>
                 </div>
                 <Wifi className="ml-auto text-neon-green animate-pulse" size={16}/>
              </div>

            </div>

            {/* Bottom Nav Indicator */}
            <div className="h-8 w-full flex justify-center pb-8 z-20">
               <div className="w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
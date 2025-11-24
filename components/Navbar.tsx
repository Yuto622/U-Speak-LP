import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Radio } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <nav 
        className={`w-full max-w-5xl transition-all duration-500 ${
          isScrolled 
            ? 'glass-panel-heavy rounded-full py-3 px-6 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent py-4 px-6'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-neon-purple blur-md opacity-50 animate-pulse"></div>
              <div className="relative w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                <Globe className="text-white w-5 h-5" />
              </div>
            </div>
            <span className="text-xl font-display font-bold tracking-widest text-white">
              U-SPEAK
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Protocol</a>
            <a href="#demo" className="text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Live Feed</a>
            <a href="#reviews" className="text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Network</a>
            
            <button className="relative group overflow-hidden px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan/50 transition-all">
              <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative text-sm font-bold text-white flex items-center gap-2">
                <Radio size={14} className="text-neon-cyan animate-pulse"/>
                CONNECT
              </span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 mx-4 glass-panel-heavy rounded-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 font-display">Protocol</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 font-display">Live Feed</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 font-display">Network</a>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-bold text-white">
              Initialize Connection
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="inline-block px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs font-medium tracking-widest text-neutral-400 animate-pulse uppercase">
          Available for new opportunities
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter mb-12">
          <span className="block gradient-text">ENGINEERING</span>
          <span className="block opacity-80">EXPERIENCES</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="max-w-md text-lg md:text-xl text-neutral-400 leading-relaxed">
            Independent software engineer and digital designer building high-end interfaces and decentralized experiences for the modern web.
          </p>
          
          <div className="flex gap-6">
            <a href="#work" className="group flex items-center gap-2 text-sm font-medium">
              <span>View Projects</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
    </section>
  );
};

export default Hero;

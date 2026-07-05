import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, GALLERY_IMAGES } from './constants';

type AppView = 'home' | 'tech-stack' | 'projects' | 'certifications';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCounter, setShowCounter] = useState(false);

  const toggleDarkMode = (e: React.MouseEvent) => {
    const newMode = !isDarkMode;
    const x = e.clientX;
    const y = e.clientY;

    // Set CSS vars for the clip-path origin
    document.documentElement.style.setProperty('--vt-x', `${x}px`);
    document.documentElement.style.setProperty('--vt-y', `${y}px`);

    const applyTheme = () => {
      setIsDarkMode(newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
    };

    if (!(document as any).startViewTransition) {
      applyTheme();
      return;
    }

    (document as any).startViewTransition(applyTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        setShowCounter(prev => !prev);
      }
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) setIsDarkMode(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleNavigate = (view: AppView, elementId?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  // ─── Nav items (with Lucide outline icons) ──────────────────────────────────
  const iconNavItems = [
    {
      view: 'home' as AppView,
      label: 'Home',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      view: 'tech-stack' as AppView,
      label: 'Tech Stack',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      view: 'certifications' as AppView,
      label: 'Certifications',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
  ];

  // ─── Sub-page header ─────────────────────────────────────────────────────────
  const BackButton = () => (
    <button
      onClick={() => handleNavigate('home')}
      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-ink transition-colors border-none bg-transparent cursor-pointer mb-10 group"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span> back
    </button>
  );

  const ViewFooter = () => (
    <footer className="mt-24 border-t border-gray-200 pt-10 text-center">
      <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">© 2026 Marcelo Cagara</p>
    </footer>
  );

  return (
    <div className="min-h-screen bg-background text-ink font-sans transition-colors duration-500 selection:bg-ink selection:text-background">

      {/* ══════════════════════════════════════════════════
          FIXED LEFT SIDEBAR  (bryllim.com style)
      ══════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-52 border-r border-gray-200 bg-background z-40 py-10 px-6 overflow-y-auto">

        {/* Site name */}
        <div className="mb-10">
          <button
            onClick={() => handleNavigate('home')}
            className="font-pixel text-xl text-ink border-none bg-transparent cursor-pointer p-0 leading-none hover:opacity-75 transition-opacity text-left"
          >
            Marcelo Cagara
          </button>
        </div>

        {/* Primary nav */}
        <nav className="space-y-1 mb-8">
          {iconNavItems.map(({ view, label, icon }) => (
            <button
              key={view}
              onClick={() => handleNavigate(view)}
              className={`w-full flex items-center gap-3 py-2 px-1 text-[13.5px] font-mono text-left transition-colors border-none bg-transparent cursor-pointer ${
                currentView === view
                  ? 'text-ink font-medium'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              <span className={currentView === view ? 'text-ink' : 'text-gray-400'}>{icon}</span>
              {label}
            </button>
          ))}

          {/* Section nav without icons */}
          <div className="pt-4 space-y-1">
            <button
              onClick={() => handleNavigate('projects')}
              className={`w-full text-left py-2 px-1 text-[13.5px] font-mono transition-colors border-none bg-transparent cursor-pointer ${
                currentView === 'projects'
                  ? 'text-ink font-medium'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigate('home', 'experience')}
              className="w-full text-left py-2 px-1 text-[13.5px] font-mono transition-colors border-none bg-transparent cursor-pointer text-gray-400 hover:text-ink"
            >
              Experience
            </button>
          </div>
        </nav>

        {/* Viewers status section */}
        <div className="border-t border-gray-200 pt-6 mb-8 space-y-3">
          {/* Avatar stack + count */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=marcelo" alt="user" />
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=cagara" alt="user" />
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=dev" alt="user" />
            </div>
            <div className="ml-2.5 px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[9px] font-mono text-gray-500">
              +32
            </div>
          </div>

          {/* Viewer count */}
          <div className="text-[11px] font-mono text-gray-400">
            <span className="font-bold text-ink mr-1">35</span>
            people viewing now
          </div>
        </div>

        {/* Bottom: dark mode + copyright */}
        <div className="mt-auto border-t border-gray-200 pt-5 space-y-4">
          <button
            onClick={(e) => toggleDarkMode(e)}
            className="flex items-center gap-2.5 py-1.5 px-0.5 font-mono text-[10.5px] uppercase tracking-widest text-gray-400 hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
          >
            {isDarkMode ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
            For work & collabs, reach me at
          </p>
          <a
            href="mailto:marcelo.devxyz@gmail.com"
            className="font-mono text-[10px] text-ink border-b border-ink/25 hover:border-ink transition-colors pb-0.5 no-underline block"
          >
            marcelo.devxyz@gmail.com
          </a>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════
          MOBILE TOP BAR
      ══════════════════════════════════════════════════ */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between py-3.5 bg-background border-b border-gray-200 px-4">
        <button
          onClick={() => handleNavigate('home')}
          className="font-pixel text-lg text-ink border-none bg-transparent cursor-pointer"
        >
          Marcelo Cagara
        </button>
        <button
          onClick={() => setMobileMenuOpen(o => !o)}
          className="text-gray-400 hover:text-ink border-none bg-transparent cursor-pointer p-1 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-background z-50 p-6 flex flex-col overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto visible menu-active'
            : 'opacity-0 translate-x-6 pointer-events-none invisible'
        }`}
      >
        {/* Header: Name + Close Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => handleNavigate('home')}
            className="font-pixel text-xl text-ink border-none bg-transparent cursor-pointer p-0 leading-none text-left"
          >
            Marcelo Cagara
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-ink border-none bg-transparent cursor-pointer p-1 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Primary Nav with Icons */}
        <nav className="mnav-group mnav-group-1 space-y-1.5 mb-8">
          {iconNavItems.map(({ view, label, icon }) => (
            <button
              key={view}
              onClick={() => handleNavigate(view)}
              className={`w-full flex items-center gap-3.5 py-3 px-1 text-[18px] font-mono text-left transition-colors border-none bg-transparent cursor-pointer [&_svg]:w-[18px] [&_svg]:h-[18px] ${
                currentView === view
                  ? 'text-ink font-medium'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              <span className={currentView === view ? 'text-ink' : 'text-gray-400'}>{icon}</span>
              {label}
            </button>
          ))}

          {/* Sub Nav without Icons */}
          <div className="pt-6 space-y-1.5">
            <button
              onClick={() => handleNavigate('projects')}
              className={`w-full text-left py-3 px-1 text-[18px] font-mono transition-colors border-none bg-transparent cursor-pointer ${
                currentView === 'projects'
                  ? 'text-ink font-medium'
                  : 'text-gray-400 hover:text-ink'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigate('home', 'experience')}
              className="w-full text-left py-3 px-1 text-[18px] font-mono transition-colors border-none bg-transparent cursor-pointer text-gray-400 hover:text-ink"
            >
              Experience
            </button>
          </div>
        </nav>

        {/* Viewers status section */}
        <div className="mnav-group mnav-group-2 border-t border-gray-200 pt-6 mb-6 space-y-3">
          {/* Avatar stack + count */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=marcelo" alt="user" />
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=cagara" alt="user" />
              <img className="w-6 h-6 rounded-full border border-background bg-gray-100 object-cover grayscale" src="https://api.dicebear.com/7.x/open-peeps/svg?seed=dev" alt="user" />
            </div>
            <div className="ml-2.5 px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[9px] font-mono text-gray-500">
              +32
            </div>
          </div>

          {/* Viewer count */}
          <div className="text-[11px] font-mono text-gray-400">
            <span className="font-bold text-ink mr-1">35</span>
            people viewing now
          </div>
        </div>

        {/* Bottom Actions section */}
        <div className="mnav-group mnav-group-3 mt-auto border-t border-gray-200 pt-5 space-y-4">
          <button
            onClick={(e) => toggleDarkMode(e)}
            className="flex items-center gap-2.5 py-1.5 px-0.5 font-mono text-[10.5px] uppercase tracking-widest text-gray-400 hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
          >
            {isDarkMode ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <div>
            <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
              For work & collabs, reach me at
            </p>
            <a
              href="mailto:marcelo.devxyz@gmail.com"
              className="font-mono text-[10px] text-ink border-b border-ink/25 hover:border-ink transition-colors pb-0.5 no-underline block"
            >
              marcelo.devxyz@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT  (offset from sidebar)
      ══════════════════════════════════════════════════ */}
      <main className="lg:pl-52 min-h-screen w-full overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-24">

          {/* ════════════════════════════════════════════
              HOME VIEW
          ════════════════════════════════════════════ */}
          {currentView === 'home' && (
            <div className="animate-fade-up" style={{ animationDelay: '50ms' }}>

              {/* ── Hero ────────────────────────────────── */}
              <section className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-10 sm:mb-14">

                {/* Profile Photo — centered large square on mobile, fixed side-by-side on desktop */}
                <div className="relative flex-shrink-0 w-64 h-64 sm:w-44 sm:h-44 md:w-52 md:h-52 mx-auto sm:mx-0 mb-6 sm:mb-0">
                  <img
                    src="/images/marcelo.png?v=1"
                    alt="Marcelo Cagara"
                    className="w-full h-full object-cover object-top rounded-none"
                    style={{ filter: 'none', mixBlendMode: 'normal' }}
                  />
                </div>

                {/* Name + bio + socials */}
                <div className="flex-1 pt-0.5">
                  <h1 className="font-pixel text-4xl sm:text-4xl md:text-5xl text-ink mb-3 sm:mb-4 leading-none tracking-tight">
                    Marcelo Cagara
                  </h1>
                  <div className="text-[15px] leading-relaxed text-gray-500 space-y-2 mb-4 sm:mb-5">
                    <p>I'm a full-stack developer. I build modern web &amp; mobile apps, and these days I'm focused on generative AI.</p>
                    <p>I enjoy turning rough ideas into things people actually use.</p>
                  </div>
                  {/* Inline social links */}
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-gray-400">
                    <a href="https://github.com/m4rc-dev" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors no-underline">github</a>
                    <span className="text-gray-500">↗</span>
                    <a href="https://www.linkedin.com/in/marcelo-jr-cagara-3a5254383/" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors no-underline">linkedin</a>
                    <span className="text-gray-500">↗</span>
                    <a href="https://www.facebook.com/marcelo.cagara" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors no-underline">facebook</a>
                    <span className="text-gray-500">↗</span>
                    <a href="mailto:marcelo.devxyz@gmail.com" className="hover:text-ink transition-colors no-underline">email</a>
                  </div>
                </div>
              </section>

              {/* ── Stats row — exact bryllim.com style ─────────────────────── */}
              <div className="border-t border-gray-200 mb-12 sm:mb-14 animate-fade-up" style={{ animationDelay: '120ms' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {[
                    { value: '4+',   label: 'Projects',       onClick: () => handleNavigate('projects') },
                    { value: '3+',   label: 'Years coding',   onClick: null },
                    { value: '19',   label: 'Certifications', onClick: () => handleNavigate('certifications') },
                    { value: '2026', label: 'Expected grad.', onClick: null },
                  ].map(({ value, label, onClick }, i) => (
                    <div
                      key={label}
                      className={`py-4 sm:py-5 pr-4 sm:pr-6 ${
                        i % 2 === 1 ? 'pl-4 sm:pl-6 border-l border-gray-200' : ''
                      } ${
                        i >= 2 ? 'border-t border-gray-200 sm:border-t-0' : ''
                      } ${
                        i === 2 ? 'sm:pl-6 sm:border-l sm:border-gray-200' : ''
                      } ${
                        i === 3 ? 'sm:pl-6 sm:border-l sm:border-gray-200' : ''
                      }`}
                    >
                      {onClick ? (
                        <button
                          onClick={onClick}
                          className="group flex items-start gap-0.5 border-none bg-transparent cursor-pointer p-0 mb-1"
                        >
                          <span className="font-pixel text-3xl text-ink leading-none">{value}</span>
                          <span className="font-mono text-[9px] text-gray-400 leading-none mt-1 group-hover:text-ink transition-colors">↗</span>
                        </button>
                      ) : (
                        <div className="flex items-start gap-0.5 mb-1">
                          <span className="font-pixel text-3xl text-ink leading-none">{value}</span>
                        </div>
                      )}
                      <div className="font-mono text-[9px] uppercase tracking-widest text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 01 — About ──────────────────────────────────────────────── */}
              <section className="mb-14 animate-fade-up" style={{ animationDelay: '190ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">01 — about</span>
                </div>
                <div className="text-[15px] leading-relaxed text-gray-500 space-y-3">
                  <p>Full-stack developer and dedicated student, passionate about building impactful solutions with JavaScript, Python, and PHP. I enjoy creating modern web and mobile applications.</p>
                  <p>I've been honing my skills through academic and personal projects, focusing on practical solutions, improving workflows, and understanding how technology supports real users and small teams.</p>
                  <p>Currently exploring AI — integrating modern tools into user-centric applications. Seeking an internship where I can learn from experienced developers and continue growing as a full-stack engineer.</p>
                </div>
              </section>



              {/* ── 02 — Experience ─────────────────────────────────────────── */}
              <section id="experience" className="mb-14 animate-fade-up" style={{ animationDelay: '190ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">02 — experience</span>
                </div>
                <div className="space-y-0">
                  {EXPERIENCE.map((exp, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0 py-4 border-b border-gray-200 group cursor-default hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <div className="text-[15px] font-semibold text-ink leading-tight">{exp.role}</div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{exp.company}</div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 sm:flex-shrink-0 sm:ml-4 sm:mt-0.5">{exp.period}</span>
                    </div>
                  ))}
                </div>
              </section>



              {/* ── 03 — Tech Stack ─────────────────────────────────────────── */}
              <section className="mb-14 animate-fade-up" style={{ animationDelay: '260ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">03 — tech stack</span>
                  <button
                    onClick={() => handleNavigate('tech-stack')}
                    className="font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
                  >
                    all skills →
                  </button>
                </div>
                <div className="space-y-6">
                  {SKILLS.slice(0, 3).map((group, i) => (
                    <div key={i}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">{group.category}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.slice(0, 8).map(skill => (
                          <span
                            key={skill}
                            className="rounded-full border border-gray-300 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-500 hover:border-ink hover:text-ink transition-colors cursor-default bg-background"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>



              {/* ── 04 — Projects ───────────────────────────────────────────── */}
              <section className="mb-14 animate-fade-up" style={{ animationDelay: '260ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">04 — projects</span>
                  <button
                    onClick={() => handleNavigate('projects')}
                    className="font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-ink transition-colors border-none bg-transparent cursor-pointer"
                  >
                    all projects →
                  </button>
                </div>
                <div className="space-y-0">
                  {PROJECTS.map((project, i) => (
                    <a
                      key={project.id}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between py-4 border-b border-gray-200 group hover:bg-gray-50 transition-colors no-underline"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[15px] font-semibold text-ink group-hover:text-ink leading-tight">{project.title}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 text-xs">↗</span>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400 leading-tight">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="rounded-full border border-gray-200 px-2 py-0 font-mono text-[8px] uppercase tracking-wider text-gray-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 flex-shrink-0 mt-0.5">{project.year}</span>
                    </a>
                  ))}
                </div>
              </section>



              {/* ── 05 — Gallery ────────────────────────────────────────────── */}
              <section className="mb-14 animate-fade-up" style={{ animationDelay: '330ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">05 — gallery</span>
                </div>
                <div className="relative group/gallery">
                  <div
                    ref={scrollContainerRef}
                    className="flex gap-3 overflow-x-auto pb-1 snap-x"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {GALLERY_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        className="min-w-[160px] sm:min-w-[200px] md:min-w-[260px] h-[140px] sm:h-[160px] rounded-xl overflow-hidden snap-start flex-shrink-0 border border-gray-200"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scroll('left')}
                    className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-background shadow-soft opacity-0 group-hover/gallery:opacity-100 transition-opacity cursor-pointer hover:bg-gray-50"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-background shadow-soft opacity-0 group-hover/gallery:opacity-100 transition-opacity cursor-pointer hover:bg-gray-50"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-10 text-center flex flex-col items-center gap-3">
                {showCounter && (
                  <div className="px-4 py-1.5 border border-gray-200 rounded-full flex items-center gap-2 bg-gray-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <img src="https://hitwebcounter.com/counter/counter.php?page=marcelo-portfolio&style=0006&nbdigits=5&type=page&initCount=0" alt="Visitors" className="h-4 opacity-70 invert dark:invert-0" />
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Visitors</span>
                  </div>
                )}
                <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">© 2026 Marcelo Cagara. All rights reserved.</p>
              </footer>

            </div>
          )}

          {/* ════════════════════════════════════════════
              TECH STACK VIEW
          ════════════════════════════════════════════ */}
          {currentView === 'tech-stack' && (
            <div className="animate-fade-up">
              <BackButton />
              <h1 className="font-pixel text-4xl lowercase tracking-tight mb-8 sm:mb-12">tech stack</h1>
              <div className="space-y-10">
                {SKILLS.map((group, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${50 + i * 60}ms` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{group.category}</span>
                      <div className="flex-1 border-t border-gray-200" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(skill => (
                        <span
                          key={skill}
                          className="rounded-full border border-gray-300 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gray-500 hover:border-ink hover:text-ink transition-colors cursor-default bg-background"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </div>
          )}

          {/* ════════════════════════════════════════════
              PROJECTS VIEW
          ════════════════════════════════════════════ */}
          {currentView === 'projects' && (
            <div className="animate-fade-up">
              <BackButton />
              <h1 className="font-pixel text-4xl lowercase tracking-tight mb-8 sm:mb-12">projects</h1>
              <div className="space-y-0">
                {PROJECTS.map((project, i) => (
                  <div
                    key={project.id}
                    className="group py-6 border-b border-gray-200 animate-fade-up"
                    style={{ animationDelay: `${50 + i * 70}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-gray-300 px-2 py-0 font-mono text-[9px] uppercase tracking-wider text-gray-400 bg-background">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 flex-shrink-0 ml-3 bg-ink text-background px-2 py-0.5 rounded">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-ink mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed mb-4">{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink border-b border-ink/25 hover:border-ink transition-colors pb-0.5 no-underline"
                    >
                      view project ↗
                    </a>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </div>
          )}

          {/* ════════════════════════════════════════════
              CERTIFICATIONS VIEW
          ════════════════════════════════════════════ */}
          {currentView === 'certifications' && (
            <div className="animate-fade-up">
              <BackButton />
              <h1 className="font-pixel text-4xl lowercase tracking-tight mb-8 sm:mb-12">certifications</h1>
              <div className="space-y-0">
                {CERTIFICATIONS.map((cert, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-default animate-fade-up"
                    style={{ animationDelay: `${50 + i * 40}ms` }}
                  >
                    <span className="text-[15px] font-semibold text-ink">{cert.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 sm:flex-shrink-0 sm:ml-4">{cert.issuer}</span>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;

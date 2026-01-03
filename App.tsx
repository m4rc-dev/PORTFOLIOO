
import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, GALLERY_IMAGES } from './constants';

type AppView = 'home' | 'tech-stack' | 'projects' | 'certifications';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.body.style.backgroundColor = '#fcfcfc';
    }
  }, [isDarkMode]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeClasses = {
    bg: isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#fcfcfc] text-[#1a1a1a]',
    card: isDarkMode ? 'bg-[#121212] dark-lit-edge' : 'bg-white light-card-shadow',
    textMuted: isDarkMode ? 'text-neutral-400' : 'text-neutral-500',
    textHighlight: isDarkMode ? 'text-white' : 'text-neutral-900',
    buttonPrimary: isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800',
    buttonSecondary: isDarkMode ? 'bg-[#1a1a1a] border-neutral-800 text-white hover:bg-neutral-800' : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50',
    tag: isDarkMode ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-600',
    itemBg: isDarkMode ? 'bg-[#1a1a1a] hover:bg-neutral-800' : 'bg-[#f3f4f6] hover:bg-neutral-200',
    hoverText: isDarkMode ? 'hover:text-white' : 'hover:text-black',
    hoverBorder: isDarkMode ? 'hover:border-neutral-500' : 'hover:border-neutral-400'
  };

  // Common Header/Footer for sub-pages
  const BackButton = () => (
    <button
      onClick={() => handleNavigate('home')}
      className={`flex items-center gap-2 text-sm font-medium mb-12 group transition-colors ${themeClasses.textMuted} ${themeClasses.hoverText}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      Back to Home
    </button>
  );

  const ViewFooter = () => (
    <footer className="mt-24 border-t pt-12 text-center border-neutral-100 dark:border-neutral-800">
      <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest">© 2025 Marcelo Cagara. All rights reserved.</p>
    </footer>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses.bg} selection:bg-blue-500/30`}>
      {/* View Content Wrapper - This carries the animation */}
      <div key={currentView} className="animate-page-enter">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-24">

          {currentView === 'home' && (
            <>
              {/* Header Section */}
              <header className="relative flex flex-col gap-4 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-sm">
                      <img src="./images/pfp.jpg" alt="Marcelo Cagara" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-3xl font-extrabold tracking-tight">Marcelo Cagara</h1>
                          <div className="bg-blue-500 text-white rounded-full p-0.5 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                          </div>
                        </div>
                        <p className={`${themeClasses.textMuted} text-[14px] font-medium flex items-center gap-1.5 mb-4`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          Cebu City, Philippines
                        </p>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <span className="text-xl font-medium">Full Stack Developer</span>
                        </div>
                      </div>

                      <button
                        onClick={toggleDarkMode}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`}
                      >
                        <span className="sr-only">Toggle dark mode</span>
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 flex items-center justify-center shadow-sm ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}>
                          {isDarkMode ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                          )}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <a href="mailto:marcelo.devxyz@gmail.com" className={`border px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${themeClasses.buttonPrimary}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Send Email
                      </a>
                      <div className={`px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 border ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        Open to Intern
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
                <div className={`md:col-span-2 bento-card ${themeClasses.card}`}>
                  <div className="flex items-center gap-2.5 mb-3 opacity-80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <h2 className="text-[18px] font-bold">About</h2>
                  </div>
                  <div className={`space-y-3 text-[15px] leading-relaxed font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    <p>I’m an full-stack developer and a dedicated student, passionate about building impactful solutions with JavaScript, Python, and PHP. I enjoy creating modern web and mobile applications.</p>
                    <p>I’ve been honing my skills through academic and personal projects, where I focus on building practical solutions, improving workflows, and understanding how technology can support real users and small teams. I enjoy documenting what I learn and engaging with the developer community as I grow.</p>
                    <p>Currently, I’m exploring artificial intelligence, with a focus on integrating AI tools and modern techniques into user-centric applications. I’m seeking an internship opportunity where I can learn from experienced developers, contribute meaningfully, and continue developing as a full-stack engineer.</p>
                  </div>
                </div>

                <div className={`md:col-span-1 md:row-span-2 bento-card ${themeClasses.card}`}>
                  <div className="flex items-center gap-2.5 mb-8 opacity-80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                    <h2 className="text-[18px] font-bold">Experience</h2>
                  </div>
                  <div className={`space-y-8 relative before:absolute before:left-[4px] before:top-2 before:bottom-2 before:w-[1px] ${isDarkMode ? 'before:bg-neutral-800' : 'before:bg-neutral-100'}`}>
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="group relative pl-8 cursor-default">
                        <div className={`absolute left-[-1px] top-[6px] w-[11px] h-[11px] rounded-full z-10 transition-all duration-300 border-[2px] 
                          ${i === 0
                            ? (isDarkMode ? 'bg-white border-white' : 'bg-black border-black')
                            : (isDarkMode
                              ? 'border-neutral-700 bg-transparent group-hover:bg-white group-hover:border-white'
                              : 'border-neutral-300 bg-transparent group-hover:bg-black group-hover:border-black')
                          }`}>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-bold text-[15px] leading-snug mb-0.5 transition-colors ${themeClasses.textHighlight}`}>{exp.role}</h4>
                            <p className={`${themeClasses.textMuted} text-[13px] font-medium leading-tight truncate`}>{exp.company}</p>
                          </div>
                          <span className={`${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-[#f3f4f6] border-neutral-200'} text-neutral-500 text-[11px] font-bold px-2 py-0.5 rounded-lg whitespace-nowrap border`}>
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`md:col-span-2 bento-card ${themeClasses.card}`}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5 opacity-80">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                      <h2 className="text-[18px] font-bold">Tech Stack</h2>
                    </div>
                    <button onClick={() => handleNavigate('tech-stack')} className={`text-[13px] font-bold flex items-center gap-1 transition-colors ${themeClasses.textMuted} ${themeClasses.hoverText}`}>
                      View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SKILLS.slice(0, 3).map((group, i) => (
                      <div key={i}>
                        <h3 className="text-[12px] font-bold mb-4 text-neutral-400 uppercase tracking-widest">{group.category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.slice(0, 6).map(skill => (
                            <span key={skill} className={`tech-tag shadow-sm transition-colors cursor-default ${themeClasses.tag} ${themeClasses.hoverBorder}`}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`md:col-span-1 bento-card flex flex-col ${themeClasses.card}`}>
                  <div className="flex items-center gap-2.5 mb-6 opacity-80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z" /></svg>
                    <h2 className="text-[18px] font-bold">Beyond Coding</h2>
                  </div>
                  <div className={`text-[17px] leading-relaxed font-medium space-y-4 flex-1 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    <p>When not writing code, I focus on learning about emerging technologies, minimalism, and startup culture.</p>
                    <p>I enjoy exploring topics like IoT Embedded Systems, generative AI, and how startups build products that make a difference.</p>
                  </div>
                </div>

                <div className={`md:col-span-2 bento-card ${themeClasses.card}`}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5 opacity-80">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                      <h2 className="text-[18px] font-bold">Recent Projects</h2>
                    </div>
                    <button onClick={() => handleNavigate('projects')} className={`text-[13px] font-bold flex items-center gap-1 transition-colors ${themeClasses.textMuted} ${themeClasses.hoverText}`}>
                      View All <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECTS.slice(0, 4).map(project => (
                      <div key={project.id} className={`p-5 border rounded-2xl transition-all cursor-pointer group flex flex-col justify-between h-full ${isDarkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                        <div>
                          <h4 className={`font-bold text-[16px] mb-1 transition-colors ${themeClasses.textHighlight}`}>{project.title}</h4>
                          <p className={`text-[13px] mb-4 leading-snug ${themeClasses.textMuted}`}>{project.description}</p>
                        </div>
                        <div className={`${isDarkMode ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-[#f3f4f6] text-neutral-600 border-neutral-200'} px-3 py-1.5 rounded-lg font-mono text-[11px] inline-block self-start border`}>
                          {project.link}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`bento-card flex flex-col h-full ${themeClasses.card}`}>
                    <div className="flex items-center justify-between mb-8 opacity-80">
                      <div className="flex items-center gap-2.5">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <h2 className="text-[18px] font-bold">Recent Certifications</h2>
                      </div>
                      <button onClick={() => handleNavigate('certifications')} className={`text-[13px] font-bold flex items-center gap-1 transition-colors text-right leading-tight ${themeClasses.textMuted} ${themeClasses.hoverText}`}>
                        View<br />All <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="inline-block ml-1"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </div>
                    <div className="space-y-4 flex-1">
                      {CERTIFICATIONS.slice(0, 3).map((cert, i) => (
                        <div key={i} className={`p-5 rounded-xl transition-colors cursor-pointer group h-[calc(33.33%-0.75rem)] flex flex-col justify-center ${themeClasses.itemBg}`}>
                          <h4 className={`font-bold text-[14px] mb-0.5 transition-colors ${themeClasses.textHighlight}`}>{cert.title}</h4>
                          <p className="text-[12px] text-neutral-400 font-medium">{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`bento-card h-full ${themeClasses.card}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2.5 mb-8 font-bold opacity-80">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                          <h2 className="text-[18px]">Social Links</h2>
                        </div>
                        <div className="space-y-4 flex-1">
                          <a href="#" className={`flex items-center gap-4 p-5 border rounded-xl hover:shadow-md transition-all group h-[calc(33.33%-0.75rem)] ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700' : 'bg-white border-neutral-200'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </div>
                            <span className="font-bold text-[14px]">LinkedIn</span>
                          </a>
                          <a href="#" className={`flex items-center gap-4 p-5 border rounded-xl hover:shadow-md transition-all group h-[calc(33.33%-0.75rem)] ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700' : 'bg-white border-neutral-200'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </div>
                            <span className="font-bold text-[14px]">GitHub</span>
                          </a>
                          <a href="#" className={`flex items-center gap-4 p-5 border rounded-xl hover:shadow-md transition-all group h-[calc(33.33%-0.75rem)] ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700' : 'bg-white border-neutral-200'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </div>
                            <span className="font-bold text-[14px]">Instagram</span>
                          </a>
                        </div>
                      </div>

                      <div className="space-y-4 flex flex-col h-full">
                        <div className={`p-5 border rounded-2xl space-y-1 shadow-sm h-[calc(33.33%-0.75rem)] flex flex-col justify-center ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700' : 'bg-white border-neutral-200'}`}>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                          </div>
                          <p className="text-[13px] font-bold truncate">marcelo.devxyz@gmail.com</p>
                        </div>

                        <div className={`p-5 border rounded-2xl space-y-1 shadow-sm h-[calc(33.33%-0.75rem)] flex flex-col justify-center ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700' : 'bg-white border-neutral-200'}`}>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                            <span className="text-[10px] font-black uppercase tracking-widest">Education</span>
                          </div>
                          <p className="text-[13px] font-bold leading-tight">BSIT at University of Cebu</p>
                        </div>

                        <button className={`w-full p-5 border rounded-2xl flex justify-between items-center group transition-all h-[calc(33.33%-0.75rem)] ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-700 hover:shadow-white/5 shadow-md' : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-md'}`}>
                          <div className="flex items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                            <div className="text-left">
                              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Resume</p>
                              <p className="text-[15px] font-bold">Download CV</p>
                            </div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`group-hover:translate-y-1 transition-transform ${isDarkMode ? 'text-neutral-600' : 'text-neutral-300'}`}><path d="M7 10l5 5 5-5M12 15V3" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <section className={`md:col-span-3 bento-card relative ${themeClasses.card}`}>
                  <div className="flex items-center gap-2.5 mb-8 text-neutral-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Gallery</h2>
                  </div>
                  <div className="relative group">
                    <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-4 scroll-hide snap-x no-scrollbar">
                      {GALLERY_IMAGES.map((img, i) => (
                        <div key={i} className={`min-w-[220px] md:min-w-[280px] h-[180px] rounded-2xl overflow-hidden snap-start flex-shrink-0 border shadow-sm ${isDarkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
                          <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => scroll('left')} className={`absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 border rounded-full shadow-lg flex items-center justify-center z-10 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100 ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-800 hover:bg-neutral-800' : 'bg-white border-neutral-100 hover:bg-neutral-50'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={() => scroll('right')} className={`absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 border rounded-full shadow-lg flex items-center justify-center z-10 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100 ${isDarkMode ? 'bg-[#1a1a1a] border-neutral-800 hover:bg-neutral-800' : 'bg-white border-neutral-100 hover:bg-neutral-50'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                  </div>
                </section>
              </div>

              <footer className="mt-16 text-center py-12">
                <p className="text-neutral-400 text-[11px] font-bold uppercase tracking-widest">© 2025 Marcelo Cagara. All rights reserved.</p>
              </footer>
            </>
          )}

          {currentView === 'tech-stack' && (
            <>
              <BackButton />
              <h1 className="text-4xl font-extrabold tracking-tight mb-16">Tech Stack</h1>
              <div className="space-y-16">
                {SKILLS.map((group, i) => (
                  <div key={i}>
                    <h2 className="text-lg font-bold mb-6 text-neutral-500">{group.category}</h2>
                    <div className="flex flex-wrap gap-3">
                      {group.skills.map(skill => (
                        <span key={skill} className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all shadow-sm ${themeClasses.tag} ${themeClasses.hoverBorder} ${isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </>
          )}

          {currentView === 'projects' && (
            <>
              <BackButton />
              <h1 className="text-4xl font-extrabold tracking-tight mb-16">Projects</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map(project => (
                  <div key={project.id} className={`group flex flex-col rounded-3xl overflow-hidden border transition-all ${isDarkMode ? 'border-neutral-800 bg-[#121212]' : 'border-neutral-100 bg-white shadow-sm'}`}>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest border border-white/10">{project.year}</span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${isDarkMode ? 'border-neutral-700 text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                      <p className={`text-[14px] leading-relaxed mb-8 flex-1 ${themeClasses.textMuted}`}>{project.description}</p>
                      <a href={project.url} className={`inline-flex items-center gap-2 font-bold text-sm group/link transition-colors ${themeClasses.textHighlight}`}>View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
                    </div>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </>
          )}

          {currentView === 'certifications' && (
            <>
              <BackButton />
              <h1 className="text-4xl font-extrabold tracking-tight mb-16">All Certifications</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'border-neutral-800 bg-[#121212] hover:bg-neutral-800' : 'border-neutral-100 bg-white hover:bg-neutral-50 shadow-sm'}`}>
                    <h3 className={`font-bold text-lg mb-1 transition-colors ${themeClasses.textHighlight}`}>{cert.title}</h3>
                    <p className="text-sm text-neutral-400 font-medium">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              <ViewFooter />
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default App;

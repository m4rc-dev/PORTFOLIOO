import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, GALLERY_IMAGES } from './constants';

type AppView = 'home' | 'tech-stack' | 'projects' | 'certifications';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  options?: string[];
}

const getAssistantResponse = (userInput: string): ChatMessage => {
  const query = userInput.toLowerCase();
  
  const mainMenuOptions = [
    "📂 Show me your projects",
    "🛠️ What is your tech stack?",
    "💼 View your experience",
    "🏆 Check your certifications",
    "✉️ How can I contact you?"
  ];

  if (query.includes('project') || query.includes('portfolio') || query.includes('app') || query.includes('📂')) {
    return {
      sender: 'assistant',
      text: "Here are some of my key projects:\n\n• **Authentiq**: Digital asset verification with AI (React, TS, Vite, Tailwind CSS).\n• **SkillPath**: Personalized learning and roadmap tracker (React, TS, Capacitor).\n• **HabitWork**: Habit tracker with visual analytics (React, TS, Tailwind, Recharts).\n• **Weather Dashboard**: Real-time interactive weather dashboard (Next.js, React, Tailwind, Recharts).\n\nWould you like to navigate to the projects page, or check out my tech stack?",
      options: [
        "🚀 Go to Projects page",
        "🛠️ What is your tech stack?",
        "↩️ Back to main menu"
      ]
    };
  }
  
  if (query.includes('skill') || query.includes('stack') || query.includes('tech') || query.includes('language') || query.includes('code') || query.includes('tools') || query.includes('🛠️') || query.includes('n8n')) {
    return {
      sender: 'assistant',
      text: "I build full-stack web and mobile applications. Here's a breakdown of my tools:\n\n• **Frontend**: JavaScript, TypeScript, React, Next.js, Vue.js, Tailwind CSS\n• **Backend**: Node.js, Python, Java, PHP, Laravel, Express, NestJS\n• **Databases**: PostgreSQL, MySQL, MongoDB\n• **AI & Automation**: Generative AI, LLMs, OpenAI, Anthropic, LangChain, n8n\n• **DevOps & Tools**: Git, GitHub, Docker, CI/CD",
      options: [
        "📂 Show me your projects",
        "🚀 Go to Tech Stack page",
        "↩️ Back to main menu"
      ]
    };
  }
  
  if (query.includes('experience') || query.includes('job') || query.includes('work') || query.includes('company') || query.includes('leuterio') || query.includes('💼')) {
    return {
      sender: 'assistant',
      text: "My professional journey:\n\n• **Full-Stack Developer** @ Leuterio Realty and Brokerage (2026 - Present)\n• **Full-Stack Developer Intern** @ Leuterio Realty and Brokerage (2025 - 2026)\n• **Freelance Developer** @ Small Projects (2026 - Present)\n\nI was absorbed as a full-time developer after my internship, focusing on building high-impact applications.",
      options: [
        "📂 Show me your projects",
        "✉️ How can I contact you?",
        "↩️ Back to main menu"
      ]
    };
  }

  if (query.includes('cert') || query.includes('credential') || query.includes('fundamentals') || query.includes('🏆') || query.includes('tesda')) {
    return {
      sender: 'assistant',
      text: "I hold 20 certifications across AI, Cloud, Engineering, and Project Management, including:\n\n• **Microsoft Artificial Intelligence Course: Azure AI Fundamentals** (TESDA, 2026)\n• **Generative AI Leader** (Google)\n• **Huawei Developer Expert** (Huawei)\n• **Certified Cloud Practitioner** (AWS)\n• **Generative AI Certified Professional** (Oracle)\n\nMost are verifiable via standard platforms (TestDome, Skillshop, etc.).",
      options: [
        "🏆 Go to Certifications page",
        "↩️ Back to main menu"
      ]
    };
  }

  if (query.includes('contact') || query.includes('email') || query.includes('linkedin') || query.includes('hire') || query.includes('freelance') || query.includes('collab') || query.includes('✉️')) {
    return {
      sender: 'assistant',
      text: "Let's connect! You can reach me via the following channels:\n\n• 📧 Email: [marcelo.devxyz@gmail.com](mailto:marcelo.devxyz@gmail.com)\n• 💼 LinkedIn: [Marcelo Jr. Cagara](https://www.linkedin.com/in/marcelo-jr-cagara-3a5254383/)\n• 🐙 GitHub: [m4rc-dev](https://github.com/m4rc-dev)\n\nI am always open to freelance, collabs, and full-time inquiries.",
      options: [
        "↩️ Back to main menu"
      ]
    };
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('yo')) {
    return {
      sender: 'assistant',
      text: "Hello! 👋 I'm Marcelo's interactive virtual assistant. How can I help you today?",
      options: mainMenuOptions
    };
  }

  return {
    sender: 'assistant',
    text: "I didn't quite catch that. Try asking about my **projects**, **skills**, **experience**, or **how to contact me**. Or simply choose an option below:",
    options: mainMenuOptions
  };
};

const renderMessageText = (text: string) => {
  return text.split('\n').map((line, lineIdx) => {
    const isBullet = line.startsWith('• ');
    const content = isBullet ? line.substring(2) : line;

    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    const parsedLine = parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIdx} className="font-bold text-ink">{part.slice(2, -2)}</strong>;
      }
      
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={partIdx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink border-b border-ink/25 hover:border-ink transition-colors no-underline font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 my-1">
          <span className="text-gray-400 select-none">•</span>
          <span>{parsedLine}</span>
        </div>
      );
    }

    return (
      <p key={lineIdx} className={lineIdx > 0 ? "mt-2" : ""}>
        {parsedLine}
      </p>
    );
  });
};

const generateMockContributions = () => {
  const cols = 53;
  const rows = 7;
  const grid: number[][] = [];
  
  let seed = 42;
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let r = 0; r < rows; r++) {
    const rowList: number[] = [];
    for (let c = 0; c < cols; c++) {
      const baseValue = Math.sin(c * 0.15) * Math.cos(r * 0.4) * 2 + 1;
      const noise = random() * 2;
      const value = baseValue + noise;
      
      let level = 0;
      if (value > 2.2) level = 4;
      else if (value > 1.4) level = 3;
      else if (value > 0.7) level = 2;
      else if (value > 0.1) level = 1;
      else level = 0;
      
      rowList.push(level);
    }
    grid.push(rowList);
  }
  return grid;
};

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

  // ── Real GitHub contribution data ──────────────────────────────────────────
  type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
  const [ghGrid, setGhGrid] = useState<number[][]>([]);
  const [ghTotal, setGhTotal] = useState<number | null>(null);

  useEffect(() => {
    const username = 'm4rc-dev';
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then((data: { contributions: ContribDay[]; total: { lastYear: number } }) => {
        // Sort ascending by date
        const days: ContribDay[] = [...data.contributions].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Pad so the grid starts on Sunday (day 0)
        const firstDow = new Date(days[0].date).getDay(); // 0=Sun
        const padded = [
          ...Array.from({ length: firstDow }, () => ({ date: '', count: 0, level: 0 as const })),
          ...days,
        ];

        // Build 7-row grid (row = day-of-week, col = week)
        const totalCols = Math.ceil(padded.length / 7);
        const rows: number[][] = Array.from({ length: 7 }, () =>
          new Array(totalCols).fill(0)
        );
        padded.forEach((d, i) => {
          const col = Math.floor(i / 7);
          const row = i % 7;
          rows[row][col] = d.level;
        });

        setGhGrid(rows);
        setGhTotal(data.total.lastYear);
      })
      .catch(() => {
        // Silently fall back to mock data on error
      });
  }, []);
  // ────────────────────────────────────────────────────────────────────────────

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: "Hi! I'm Marcelo's AI assistant. Feel free to ask me about his projects, skills, or experience!",
      options: [
        "📂 Show me your projects",
        "🛠️ What is your tech stack?",
        "💼 View your experience",
        "🏆 Check your certifications",
        "✉️ How can I contact you?"
      ]
    }
  ]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Check if it's navigation action
    if (text === "🚀 Go to Projects page") {
      handleNavigate('projects');
      setIsChatOpen(false);
      return;
    }
    if (text === "🚀 Go to Tech Stack page") {
      handleNavigate('tech-stack');
      setIsChatOpen(false);
      return;
    }
    if (text === "🏆 Go to Certifications page") {
      handleNavigate('certifications');
      setIsChatOpen(false);
      return;
    }
    if (text === "↩️ Back to main menu") {
      setChatMessages(prev => [...prev, { sender: 'user', text }]);
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: "Main menu. Select a category below or ask a question:",
            options: [
              "📂 Show me your projects",
              "🛠️ What is your tech stack?",
              "💼 View your experience",
              "🏆 Check your certifications",
              "✉️ How can I contact you?"
            ]
          }
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const response = getAssistantResponse(text);
      setChatMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  useEffect(() => {
    if (isChatOpen) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping, isChatOpen]);

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
                    <p>I'm a full-stack developer. I build modern web &amp; mobile apps, and these days I'm focused on generative AI &amp; AI automation.</p>
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
                    { value: '4+',   label: 'Projects',     onClick: () => handleNavigate('projects') },
                    { value: '3+',   label: 'Years coding', onClick: null },
                    { value: '30+',  label: 'Skills',       onClick: () => handleNavigate('tech-stack') },
                    { value: 'Open', label: 'To Collab',    onClick: null },
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
                  <p>Full-stack developer passionate about building impactful solutions with JavaScript, Python, and PHP. I enjoy crafting modern web and mobile applications that are fast, clean, and actually useful.</p>
                  <p>I've built and shipped real projects focused on practical solutions — improving workflows and understanding how technology supports real users and small teams.</p>
                  <p>Currently exploring AI automation (like building custom n8n workflows) and integrating modern tools into user-centric applications. Always looking for opportunities to collaborate on meaningful products and continue growing as an engineer.</p>
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

              {/* ── 06 — Github ────────────────────────────────────────────── */}
              <section className="mb-14 animate-fade-up" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[10px] uppercase tracking-widest text-gray-400">06 — github</span>
                  <a
                    href="https://github.com/m4rc-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-wider text-gray-400 hover:text-ink transition-colors no-underline"
                  >
                    @m4rc-dev ↗
                  </a>
                </div>
                
                {/* Contribution SVG Dot Chart — real GitHub data */}
                {(() => {
                  // Use fetched real data, fall back to mock while loading
                  const grid = ghGrid.length > 0 ? ghGrid : generateMockContributions();
                  const isMock = ghGrid.length === 0;
                  const cols = grid[0]?.length ?? 53;
                  const rows = grid.length;   // 7
                  const STEP = 13;            // px between dot centres
                  const svgW = cols * STEP;
                  const svgH = rows * STEP;

                  // Bryl's exact radii per level
                  const radii = [1.1, 2.7, 3.8, 4.8, 5.7];

                  const circles: React.ReactNode[] = [];
                  for (let c = 0; c < cols; c++) {
                    for (let r = 0; r < rows; r++) {
                      const level = grid[r]?.[c] ?? 0;
                      const cx = c * STEP + STEP / 2;
                      const cy = r * STEP + STEP / 2;
                      const rad = radii[Math.min(level, 4)];
                      const opacity = level === 0 ? 0.12 : 0.92;
                      circles.push(
                        <circle
                          key={`${c}-${r}`}
                          cx={cx}
                          cy={cy}
                          r={rad}
                          fill="currentColor"
                          opacity={opacity}
                        />
                      );
                    }
                  }

                  return (
                    <>
                      <a
                        href="https://github.com/m4rc-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full overflow-x-auto"
                        style={{ scrollbarWidth: 'none' }}
                      >
                        <svg
                          viewBox={`0 0 ${svgW} ${svgH}`}
                          width={svgW}
                          height={svgH}
                          style={{
                            display: 'block',
                            minWidth: svgW,
                            opacity: isMock ? 0.35 : 1,
                            transition: 'opacity 0.6s ease',
                          }}
                          aria-label="GitHub contribution chart"
                        >
                          {circles}
                        </svg>
                      </a>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-3 text-left">
                        {ghTotal !== null
                          ? `${ghTotal.toLocaleString()} contributions in the last year`
                          : 'loading contributions…'}
                      </p>
                    </>
                  );
                })()}
              </section>

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
                {CERTIFICATIONS.map((cert, i) => {
                  const inner = (
                    <>
                      <span className="text-[15px] font-semibold text-ink">{cert.title}</span>
                      <div className="flex items-center gap-3 sm:flex-shrink-0 sm:ml-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">{cert.issuer}</span>
                        {cert.url && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-ink transition-colors border border-gray-300 group-hover:border-ink px-2 py-0.5 rounded-sm">
                            verify →
                          </span>
                        )}
                      </div>
                    </>
                  );
                  return cert.url ? (
                    <a
                      key={i}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors no-underline animate-fade-up"
                      style={{ animationDelay: `${50 + i * 40}ms` }}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={i}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-4 border-b border-gray-200 cursor-default animate-fade-up"
                      style={{ animationDelay: `${50 + i * 40}ms` }}
                    >
                      {inner}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      </main>

      {/* ══════════════════════════════════════════════════
          AI CHATBOT ASSISTANT (Interactive Client-side Option 1)
      ══════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {/* Toggle Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 py-2 px-4 bg-background text-ink border border-gray-300 dark:border-gray-700 hover:border-ink transition-colors font-mono text-[10px] uppercase tracking-wider shadow-soft hover:bg-gray-50 dark:hover:bg-zinc-950 cursor-pointer"
          >
            <span className="w-1.5 h-1.5 bg-ink dark:bg-white rounded-none animate-pulse mr-1"></span>
            assistant
          </button>
        )}

        {/* Chat Window */}
        {isChatOpen && (
          <div className="absolute bottom-0 right-0 w-96 max-w-[calc(100vw-48px)] h-[500px] bg-background border border-ink/10 dark:border-gray-800 rounded-none shadow-soft flex flex-col overflow-hidden animate-fade-up">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-250 dark:border-gray-850">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[11px] uppercase tracking-widest text-ink font-semibold">assistant.sh</span>
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-ink dark:bg-white rounded-none"></span>
                  active
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-ink font-mono text-xs border-none bg-transparent cursor-pointer p-1 transition-colors"
              >
                [close]
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-background flex flex-col gap-4 scroll-smooth">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Sender Tag */}
                  <span className="font-mono text-[8px] uppercase tracking-widest text-gray-400 mb-1">
                    {msg.sender === 'user' ? 'visitor' : 'marcelo_ai'}
                  </span>
                  
                  {/* Message Bubble/Block */}
                  <div className={`w-full max-w-[90%] px-3.5 py-2.5 text-[13px] leading-relaxed border-l-2 ${
                    msg.sender === 'user'
                      ? 'border-gray-400 dark:border-gray-650 bg-gray-50 dark:bg-zinc-900/30 text-ink'
                      : 'border-ink bg-transparent text-ink'
                  }`}>
                    {msg.sender === 'assistant' ? renderMessageText(msg.text) : msg.text}
                  </div>
                  
                  {/* Predefined Quick Replies */}
                  {msg.sender === 'assistant' && msg.options && (
                    <div className="flex flex-col items-start gap-1 mt-3 w-full">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleSendMessage(opt)}
                          className="w-full text-left py-2 px-3 border border-gray-300 dark:border-gray-800 hover:border-ink font-mono text-[9.5px] uppercase tracking-wider text-gray-500 hover:text-ink transition-colors cursor-pointer bg-background"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="self-start w-full max-w-[90%] border-l-2 border-ink bg-transparent px-3.5 py-3">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-none animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-none animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-none animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="flex items-center gap-2 p-3 bg-background border-t border-gray-250 dark:border-gray-850"
            >
              <span className="font-mono text-xs text-gray-400 select-none ml-1">&gt;</span>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="ask a question..."
                className="flex-1 px-2 py-1.5 bg-transparent text-ink text-[12.5px] font-mono outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 border border-ink hover:bg-ink hover:text-background font-mono text-[9.5px] uppercase tracking-widest text-ink transition-colors cursor-pointer"
              >
                send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

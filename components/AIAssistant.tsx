
import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, EXPERIENCE, SKILLS } from '../constants';

interface AIAssistantProps {
  isDarkMode: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const maxChars = 1000;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxChars) {
      setInput(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Flowise integration placeholder
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hey there! Bryl Lim here, Principal AI Engineer at Standard Chartered. Great to connect!\n\nWhat's on your mind today? Always happy to chat about JavaScript, Python, PHP, AI, web development," }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999]">
      {isOpen ? (
        <div className="w-[calc(100vw-32px)] sm:w-[380px] md:w-[400px] h-[540px] bg-white border border-neutral-200 rounded-2xl flex flex-col overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-white border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQEj8gJxZoq8IQ/profile-displayphoto-shrink_200_200/B56ZPvrTmLHoAY-/0/1735031314508?e=2147483647&v=beta&t=lC0A_6tDo4KGxNTWyqVBIHvyQbv7l56E4PKGhm7rmcE"
                  alt="Bryl Lim"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900 leading-tight">Chat with Bryl</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-600 transition-colors p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                {m.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                      <img
                        src="https://media.licdn.com/dms/image/v2/D5603AQEj8gJxZoq8IQ/profile-displayphoto-shrink_200_200/B56ZPvrTmLHoAY-/0/1735031314508?e=2147483647&v=beta&t=lC0A_6tDo4KGxNTWyqVBIHvyQbv7l56E4PKGhm7rmcE"
                        alt="Bryl Lim"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">Bryl Lim</span>
                  </div>
                )}
                <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user'
                    ? 'bg-neutral-800 text-white rounded-[20px] rounded-br-md'
                    : 'bg-neutral-100 text-neutral-800 rounded-[20px] rounded-tl-md'
                  }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQEj8gJxZoq8IQ/profile-displayphoto-shrink_200_200/B56ZPvrTmLHoAY-/0/1735031314508?e=2147483647&v=beta&t=lC0A_6tDo4KGxNTWyqVBIHvyQbv7l56E4PKGhm7rmcE"
                      alt="Bryl Lim"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">Bryl Lim</span>
                </div>
                <div className="bg-neutral-100 px-4 py-3 rounded-[20px] rounded-tl-md flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-neutral-100 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 border border-neutral-200 rounded-full px-4 py-3 text-sm outline-none focus:border-neutral-400 transition-colors bg-white text-neutral-800 placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-300 text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-xs text-neutral-400">Ask me about programming, web dev, or tech!</span>
              <span className="text-xs text-neutral-400">{input.length}/{maxChars}</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="font-semibold text-sm">Chat with Bryl</span>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;

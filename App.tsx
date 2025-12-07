import React, { useState, useEffect, Suspense } from 'react';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { TechUtilityBelt } from './components/sections/TechUtilityBelt';
import { Contact } from './components/sections/Contact';
import { ChatWidget } from './components/ChatWidget';
import { EasterEgg } from './components/ui/EasterEgg';
import { ViewState } from './types';
import { DataProvider, useData } from './context/DataContext';
import { Loading } from './components/ui/Loading';
import { authClient } from './lib/auth-client';

// Lazy Load Components
const LoginPage = React.lazy(() => import('./components/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));

const AppContent: React.FC = () => {
  const {
    projects, experiences, skills, gadgets, messages, loading,
    sendMessage,
    refreshProjects, refreshMessages, refreshExperiences
  } = useData();

  const [view, setView] = useState<ViewState>('home');

  // Easter Egg State
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Reset tap count if idle
  useEffect(() => {
    const timer = setTimeout(() => setTapCount(0), 2000);
    return () => clearTimeout(timer);
  }, [tapCount]);

  // Check for active session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: session } = await authClient.getSession();
        console.log("Session Check:", session); // DEBUG
        if (session) {
          setView('dashboard');
        }
      } catch (e) {
        console.error("Session Check Failed:", e);
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  if (loading || isCheckingSession) {
    return <Loading />;
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setView('home');
    } catch (e) {
      console.error("Logout failed", e);
      setView('home'); // Force home view anyway
    }
  };

  const handleFooterInteraction = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setTapCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setShowEasterEgg(true);
          return 0;
        }
        return newCount;
      });
    } else {
      setShowEasterEgg(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // Render Logic based on View State
  if (view === 'login') {
    return (
      <Suspense fallback={<Loading />}>
        <LoginPage onLogin={() => setView('dashboard')} onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'dashboard') {
    return (
      <Suspense fallback={<Loading />}>
        <Dashboard
          onLogout={handleLogout}
        />
      </Suspense>
    );
  }

  // Public Portfolio View
  return (
    <div className="min-h-screen bg-comic-dark selection:bg-comic-accent selection:text-black">
      {/* Navbar / Brand */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto inline-block bg-comic-accent border-2 border-black px-3 py-1 shadow-[4px_4px_0px_0px_#fff] rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer">
            <span className="text-2xl font-bold comic-font text-black">COMICFOLIO</span>
          </div>

          {/* Simple Link Menu */}
          <div className="pointer-events-auto flex gap-4 items-center">
            <div className="hidden md:flex gap-4">
              <a href="#experience" className="bg-black text-white px-3 py-1 border border-white font-bold hover:bg-comic-alert hover:text-black hover:border-black transition-colors">EXPERIENCE</a>
              <a href="#projects" className="bg-black text-white px-3 py-1 border border-white font-bold hover:bg-comic-secondary hover:text-black hover:border-black transition-colors">PROJECTS</a>
              <a href="#contact" className="bg-black text-white px-3 py-1 border border-white font-bold hover:bg-comic-alert hover:text-black hover:border-black transition-colors">CONTACT</a>
            </div>
            {/* Secret Login Button */}
            <button
              onClick={() => setView('login')}
              className="bg-transparent text-gray-500 hover:text-white font-mono text-xs border border-transparent hover:border-gray-500 px-2 py-1 rounded"
              title="Admin Access"
            >
              [AUTH]
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Experience data={experiences} />
        <Projects data={projects} />
        <Skills data={skills} />
        <TechUtilityBelt data={gadgets} />
        <Contact onSendMessage={sendMessage} />
      </main>

      {/* Footer with Easter Egg Trigger */}
      <footer
        onClick={handleFooterInteraction}
        className="bg-black border-t-4 border-white py-8 text-center cursor-pointer select-none active:bg-gray-900 transition-colors"
      >
        <p className="text-gray-400 font-mono text-sm pointer-events-none">
          &copy; {new Date().getFullYear()} HERO DEV. Built with React & Tailwind.
        </p>
      </footer>

      <ChatWidget />
      <EasterEgg isOpen={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
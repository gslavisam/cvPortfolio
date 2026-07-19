/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Cpu, 
  Globe, 
  Terminal, 
  Laptop,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Sidebar from './components/PerplexityComputer/Sidebar';
import Timeline from './components/PerplexityComputer/Timeline';
import ConsoleLogs from './components/PerplexityComputer/ConsoleLogs';
import MainBio from './components/Portfolio/MainBio';
import OrbitMIWidget from './components/Portfolio/OrbitMIWidget';
import DigiKlinciWidget from './components/Portfolio/DigiKlinciWidget';
import SemantraWidget from './components/Portfolio/SemantraWidget';
import FeedbackSection from './components/Portfolio/FeedbackSection';
import { initialTimelineSteps, systemProfile } from './data';
import { TimelineStep } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('computer');
  const [language, setLanguage] = useState<'sr' | 'en'>('sr');
  const [activeStepId, setActiveStepId] = useState<number>(3); // Default on compilation step
  const [steps, setSteps] = useState<TimelineStep[]>(initialTimelineSteps);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Tick local clock in header
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRestartAgent = () => {
    setIsRestarting(true);
    
    // Set all steps to pending/running as a nice simulation
    const resetSteps = steps.map(s => {
      if (s.id === 1) return { ...s, status: 'completed' as const };
      return { ...s, status: 'pending' as const };
    });
    setSteps(resetSteps);
    setActiveStepId(1);

    setTimeout(() => {
      // Step 2 completes
      setSteps(prev => prev.map(s => {
        if (s.id === 2) return { ...s, status: 'completed' as const };
        if (s.id === 1) return { ...s, status: 'completed' as const };
        return s;
      }));
      setActiveStepId(2);

      setTimeout(() => {
        // Step 3 completes
        setSteps(prev => prev.map(s => {
          if (s.id === 3) return { ...s, status: 'completed' as const };
          return s;
        }));
        setActiveStepId(3);

        setTimeout(() => {
          // Step 4 completes and is running
          setSteps(prev => prev.map(s => {
            if (s.id === 4) return { ...s, status: 'running' as const };
            return s;
          }));
          setActiveStepId(4);
          setIsRestarting(false);
        }, 1200);

      }, 1200);

    }, 1200);
  };

  const getBreadcrumb = () => {
    const root = 'gslavisa.ai';
    switch (currentTab) {
      case 'computer':
        return `${root} > Agentic Workspace`;
      case 'bio':
        return `${root} > ${language === 'sr' ? 'Biografija' : 'Biography'}`;
      case 'orbitmi':
        return `${root} > Magna ML & ERP`;
      case 'digiklinci':
        return `${root} > Enterprise DWH & Odoo`;
      case 'semantra':
        return `${root} > Semantra Semantic Search`;
      default:
        return root;
    }
  };

  return (
    <div className="flex h-screen bg-[#030303] text-gray-200 overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Sidebar - Desktop */}
      <div className="hidden md:block shrink-0 h-full">
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          language={language} 
          setLanguage={setLanguage} 
        />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="h-full w-64 shadow-2xl relative animate-slide-in">
            <Sidebar 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab} 
              language={language} 
              setLanguage={setLanguage}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Container Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#030303]">
        
        {/* Top Header Bar */}
        <header className="h-14 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              id="mobile-hamburger-btn"
              className="md:hidden p-1.5 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
              <Laptop className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-medium text-white/95">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Right Header Controls (Clock, Status, Actions) */}
          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Live Clock */}
            <span className="hidden sm:inline-block text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
              {currentTime || '14:31:32'}
            </span>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse"></span>
              <span className="font-bold text-[10px] tracking-wider">AGENTS LIVE</span>
            </div>
          </div>
        </header>

        {/* Inner Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {currentTab === 'computer' ? (
            /* ========================================================
               COMPUTER TAB: AGENTIC WORKSPACE INTERACTIVE CLIENT
               ======================================================== */
            <div className="space-y-8">
              
              {/* Introduction Banner */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-indigo-950/20 to-black border border-indigo-500/20 overflow-hidden shadow-lg">
                <div className="absolute -right-10 -top-10 w-36 h-36 bg-indigo-500/10 rounded-full filter blur-2xl"></div>
                <div className="max-w-3xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Agentic Workspace Session</span>
                  </div>
                  <h1 className="text-xl sm:text-3xl font-light tracking-tight text-white font-display">
                    {language === 'sr' ? 'Skeniranje i kompajliranje Slavišinih digitalnih resursa' : 'Scanning & compiling Slavisa\'s digital assets'}
                  </h1>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed">
                    {language === 'sr' 
                      ? 'Ova stranica funkcioniše kao Agentic Workspace sesija. Naš AI agent je skenirao datoteke, mapirao e-mail gslavisam@gmail.com, prepoznao rad na pomorskoj inteligenciji (OrbitMI) i radionicama za decu (DigiKlinci), te kompajlirao interaktivni portfolio. Izaberi korake u levom delu ili istraži radionice!'
                      : 'This page acts as a live interactive Agentic Workspace session. Our AI Agent scanned server environments, matched gslavisam@gmail.com, detected your maritime enterprise (OrbitMI) and children educational project (DigiKlinci), and generated this playground. Select timeline steps below to view terminal logs.'}
                  </p>
                </div>
              </div>

              {/* Dynamic Division Grid: Steps Timeline vs Terminal Log Output */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Interactive steps (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <Timeline 
                    steps={steps} 
                    activeStepId={activeStepId} 
                    setActiveStepId={setActiveStepId} 
                    language={language} 
                  />
                </div>

                {/* Right: Terminal logs of the active step (7 cols) */}
                <div className="lg:col-span-7 h-full">
                  <ConsoleLogs 
                    step={steps.find(s => s.id === activeStepId) || steps[2]} 
                    language={language}
                    onRestart={handleRestartAgent}
                    isRestarting={isRestarting}
                  />
                </div>
              </div>

              {/* LIVE WEBSITES SECTION PREVIEW (Compiled Outputs) */}
              <div className="border-t border-white/5 pt-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-light text-white tracking-tight font-display flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-indigo-400" />
                      <span>{language === 'sr' ? 'Kompajlirana Web Aplikacija (Rezultat)' : 'Compiled Live Web App (Output)'}</span>
                    </h2>
                    <p className="text-xs text-gray-500 font-sans">
                      {language === 'sr' ? 'AI agent je uspešno generisao i pokrenuo sledeće module.' : 'The AI agent successfully assembled and mounted the following interactive modules.'}
                    </p>
                  </div>

                  {/* Visual Tab controller on compile view */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCurrentTab('bio')}
                      id="btn-shortcut-bio"
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium hover:text-white transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
                    >
                      <span>{language === 'sr' ? 'Biografija 👨‍💻' : 'Biography 👨‍💻'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setCurrentTab('orbitmi')}
                      id="btn-shortcut-orbitmi"
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium hover:text-white transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
                    >
                      <span>{language === 'sr' ? 'Magna ML i ERP ⚙️' : 'Magna ML & ERP ⚙️'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setCurrentTab('digiklinci')}
                      id="btn-shortcut-digiklinci"
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium hover:text-white transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
                    >
                      <span>{language === 'sr' ? 'Enterprise DWH & Odoo 📊' : 'Enterprise DWH & Odoo 📊'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => setCurrentTab('semantra')}
                      id="btn-shortcut-semantra"
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium hover:text-white transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer hover:bg-white/10"
                    >
                      <span>{language === 'sr' ? 'Semantra Search 🔍' : 'Semantra Search 🔍'}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Main Render bio previews inside computer page */}
                <div className="p-6 rounded-3xl bg-[#111111]/70 border border-white/5 backdrop-blur-sm relative">
                  <div className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-indigo-400 animate-pulse" />
                    Live Preview
                  </div>
                  <MainBio language={language} onNavigateTab={setCurrentTab} />
                </div>
              </div>

            </div>
          ) : currentTab === 'bio' ? (
            /* ========================================================
               BIOGRAPHY TAB
               ======================================================== */
            <div className="space-y-8 animate-fade-in">
              <MainBio language={language} onNavigateTab={setCurrentTab} />
              
              {/* Context back navigation button */}
              <div className="max-w-4xl mx-auto pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentTab('computer')}
                  id="btn-back-to-computer"
                  className="px-4 py-2 bg-[#111111] border border-white/5 rounded-xl hover:text-white hover:bg-white/5 text-xs font-medium transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'sr' ? 'Nazad na Agentic konzolu' : 'Back to Agentic Console'}</span>
                </button>
              </div>
            </div>
          ) : currentTab === 'orbitmi' ? (
            /* ========================================================
               ORBITMI TAB (Vessel optimization dashboard)
               ======================================================== */
            <div className="space-y-8 animate-fade-in">
              <OrbitMIWidget language={language} />
              
              {/* Navigation help */}
              <div className="max-w-4xl mx-auto pt-4 flex justify-between items-center">
                <button
                  onClick={() => setCurrentTab('digiklinci')}
                  id="btn-next-to-digiklinci"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-500/10 cursor-pointer"
                >
                  {language === 'sr' ? 'Istraži DWH i Odoo ➡️' : 'Explore DWH & Odoo ➡️'}
                </button>
                <button
                  onClick={() => setCurrentTab('computer')}
                  id="btn-back-to-computer-orbit"
                  className="px-4 py-2 bg-[#111111] border border-white/5 rounded-xl hover:text-white hover:bg-white/5 text-xs font-medium transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'sr' ? 'Nazad na Agentic' : 'Back to Agentic'}</span>
                </button>
              </div>
            </div>
          ) : currentTab === 'digiklinci' ? (
            /* ========================================================
               DIGIKLINCI TAB (Kids coding school & Guestbook comments)
               ======================================================== */
            <div className="space-y-12 animate-fade-in">
              <DigiKlinciWidget language={language} />
              
              <div className="border-t border-white/5 my-8"></div>
              
              {/* Feedback and message section */}
              <FeedbackSection language={language} />

              <div className="max-w-4xl mx-auto pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentTab('computer')}
                  id="btn-back-to-computer-digi"
                  className="px-4 py-2 bg-[#111111] border border-white/5 rounded-xl hover:text-white hover:bg-white/5 text-xs font-medium transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>{language === 'sr' ? 'Nazad na Agentic konzolu' : 'Back to Agentic Console'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================
               SEMANTRA TAB (Semantic Search local document search app)
               ======================================================== */
            <div className="space-y-8 animate-fade-in">
              <SemantraWidget language={language} />
              
              <div className="max-w-4xl mx-auto pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentTab('computer')}
                  id="btn-back-to-computer-semantra"
                  className="px-4 py-2 bg-[#111111] border border-white/5 rounded-xl hover:text-white hover:bg-white/5 text-xs font-medium transition-all text-gray-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'sr' ? 'Nazad na Agentic konzolu' : 'Back to Agentic Console'}</span>
                </button>
              </div>
            </div>
          )}

        </main>

        {/* Global Footer bar */}
        <footer className="h-10 border-t border-white/5 bg-[#080808]/60 backdrop-blur-md px-6 flex items-center justify-between text-[10px] text-gray-500 font-mono shrink-0 select-none">
          <span>{language === 'sr' ? '© 2026 Slaviša Portfolio. Sva prava zadržana.' : '© 2026 Slavisa Portfolio. All rights reserved.'}</span>
          <span className="hidden sm:inline-block">gslavisam@gmail.com</span>
        </footer>

      </div>
    </div>
  );
}

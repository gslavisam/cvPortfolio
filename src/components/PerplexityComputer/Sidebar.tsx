/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Terminal, 
  Home, 
  Compass, 
  Library, 
  Cpu, 
  Globe, 
  Database, 
  Settings,
  Search,
  X
} from 'lucide-react';
import { systemProfile } from '../../data';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: 'sr' | 'en';
  setLanguage: (lang: 'sr' | 'en') => void;
  onCloseMobile?: () => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  language, 
  setLanguage,
  onCloseMobile 
}: SidebarProps) {
  
  const navItems = [
    { id: 'computer', labelSr: 'Kompjuter', labelEn: 'Computer', icon: Cpu },
    { id: 'bio', labelSr: 'Biografija', labelEn: 'Biography', icon: Home },
    { id: 'orbitmi', labelSr: 'Magna ML & ERP', labelEn: 'Magna ML & ERP', icon: Settings },
    { id: 'digiklinci', labelSr: 'Enterprise DWH & Odoo', labelEn: 'Enterprise DWH & Odoo', icon: Database },
    { id: 'semantra', labelSr: 'Semantra Search', labelEn: 'Semantra Search', icon: Search },
  ];

  const secondaryItems = [
    { id: 'discover', labelSr: 'Istraži', labelEn: 'Discover', icon: Compass },
    { id: 'library', labelSr: 'Biblioteka', labelEn: 'Library', icon: Library },
  ];

  return (
    <div className="w-64 h-full bg-[#080808]/50 text-gray-300 border-r border-white/5 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div>
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-black font-bold animate-pulse">
              <Terminal className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight text-sm font-sans block">gslavisa.ai</span>
              <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse"></span>
                ACTIVE CLIENT
              </span>
            </div>
          </div>
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile} 
              className="md:hidden p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
              id="sidebar-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Primary Navigation */}
        <div className="p-3 space-y-1">
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-mono">
              {language === 'sr' ? 'Glavni paneli' : 'Main Panels'}
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                id={`nav-${item.id}`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 font-medium cursor-pointer ${
                  isActive 
                    ? 'bg-white/5 text-white border border-white/5 shadow-lg font-medium' 
                    : 'hover:bg-white/5 text-gray-500 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  {isActive ? (
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-transparent shrink-0"></div>
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                  <span className="font-sans text-xs">{language === 'sr' ? item.labelSr : item.labelEn}</span>
                </div>
                {item.id === 'computer' && (
                  <span className="ml-auto flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Workspace Mock Details */}
        <div className="p-3 border-t border-white/5 mt-2 space-y-1">
          <div className="px-3 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 font-mono">
              {language === 'sr' ? 'Funkcije pretrage' : 'Search Features'}
            </span>
          </div>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                disabled
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 cursor-not-allowed font-medium font-sans text-left opacity-50"
              >
                <div className="w-2 h-2 rounded-full bg-transparent shrink-0"></div>
                <Icon className="w-4 h-4 text-gray-700" />
                <span className="text-xs">{language === 'sr' ? item.labelSr : item.labelEn}</span>
                <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 font-mono uppercase border border-white/5">Pro</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer / Lang / Profile */}
      <div className="p-4 border-t border-white/5 space-y-4">
        {/* Pro Info Banner from theme */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 shadow-md">
          <div className="text-xs font-semibold text-indigo-400 mb-1">
            {language === 'sr' ? 'Pro Verzija' : 'Pro Version'}
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            {language === 'sr' 
              ? 'Napredno rezonovanje i agenti su aktivirani za analizu datoteka.' 
              : 'Enhanced reasoning and server agents enabled for your custom analysis.'}
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between p-1 bg-white/5 rounded-lg border border-white/5">
          <button
            onClick={() => setLanguage('sr')}
            id="lang-sr-btn"
            className={`flex-1 text-center text-[10px] py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              language === 'sr' 
                ? 'bg-[#111] text-white border border-white/10 shadow-sm font-bold' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            Srp
          </button>
          <button
            onClick={() => setLanguage('en')}
            id="lang-en-btn"
            className={`flex-1 text-center text-[10px] py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              language === 'en' 
                ? 'bg-[#111] text-white border border-white/10 shadow-sm font-bold' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            English
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shrink-0">
            <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-[10px] text-white font-mono font-bold">
              SM
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white truncate font-sans">{systemProfile.name}</p>
            <p className="text-[9px] text-gray-500 truncate font-mono">{systemProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

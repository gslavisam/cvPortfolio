/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Code2, 
  Database, 
  Settings, 
  Search,
  ExternalLink 
} from 'lucide-react';
import { systemProfile } from '../../data';

interface MainBioProps {
  language: 'sr' | 'en';
  onNavigateTab: (tab: string) => void;
}

export default function MainBio({ language, onNavigateTab }: MainBioProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      {/* Intro Header Section */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 shadow-2xl overflow-hidden">
        {/* Subtle decorative lights */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
          {/* Large initials avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#030303] flex items-center justify-center font-sans">
              <span className="text-3xl font-extrabold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                SM
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
                {systemProfile.name}
              </h1>
              <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/10 text-xs font-mono font-semibold">
                gslavisam
              </span>
            </div>
            
            <p className="text-sm font-semibold text-indigo-400 font-sans tracking-wide">
              {systemProfile.title}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-sans">
              <span className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{systemProfile.location}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${systemProfile.email}`} className="hover:text-white transition-colors">{systemProfile.email}</a>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            {language === 'sr' ? systemProfile.fullBio : 'Senior Business Analyst and IT Specialist with over 25 years of experience in the configuration, implementation, and optimization of Enterprise Application Solutions (ERP, MES, DWH). Highly capable of acting as an SME, aligning complex system capabilities with strategic business needs.'}
          </p>
        </div>
      </div>

      {/* Main Pillars: Magna, Enterprise DWH & Semantra */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Magna Column */}
        <motion.div 
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('orbitmi')}
          id="card-pilar-orbitmi"
          className="p-5 rounded-2xl bg-[#080808]/50 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Settings className="w-5.5 h-5.5" />
              </span>
              <span className="text-[10px] font-semibold text-cyan-400 font-mono flex items-center gap-1">
                MAGNA INT.
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight font-sans mt-4">
              Magna ML & ERP Integration
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5 font-sans">
              Senior Business Analyst
            </p>
            <p className="text-xs text-gray-300 font-sans mt-3 leading-relaxed">
              {language === 'sr' 
                ? 'Integracija Workday i OneStream platformi, SAP ekstrakcija i vođenje projekata mašinskog učenja za optimizaciju industrijske proizvodnje.'
                : 'Integrating Workday & OneStream systems, SAP financial data extraction, and guiding ML initiatives to optimize industrial production lines.'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {['SAP', 'Workday', 'OneStream', 'Python', 'ML'].map(tech => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-black/30 border border-white/5 text-gray-400 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Enterprise DWH & Odoo Column */}
        <motion.div 
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('digiklinci')}
          id="card-pilar-digiklinci"
          className="p-5 rounded-2xl bg-[#080808]/50 border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Database className="w-5.5 h-5.5" />
              </span>
              <span className="text-[10px] font-semibold text-indigo-400 font-mono flex items-center gap-1">
                S-TIM & MD&PROFY
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight font-sans mt-4">
              Enterprise Arch. & DWH
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5 font-sans">
              IT PM & Lead Architect
            </p>
            <p className="text-xs text-gray-300 font-sans mt-3 leading-relaxed">
              {language === 'sr' 
                ? 'Projektovanje sistema za SMATSA-u, procesiranje 20M+ zapisa kroz Python Pandas, implementacija Odoo ERP-a i WMS-a.'
                : 'Designing Planning systems for SMATSA, processing 20M+ records with Pandas, and deploying Odoo ERP/WMS platforms.'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {['Odoo', 'Pandas', 'Oracle', 'Talend', 'COBIT'].map(tech => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-black/30 border border-white/5 text-gray-400 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Semantra Column */}
        <motion.div 
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('semantra')}
          id="card-pilar-semantra"
          className="p-5 rounded-2xl bg-[#080808]/50 border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Search className="w-5.5 h-5.5" />
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 font-mono flex items-center gap-1">
                GITHUB OPEN SOURCE
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight font-sans mt-4">
              Semantra Semantic Search
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5 font-sans">
              Creator & Lead Developer
            </p>
            <p className="text-xs text-gray-300 font-sans mt-3 leading-relaxed">
              {language === 'sr' 
                ? 'Revolucionarni open-source alat za lokalnu i bezbednu semantičku pretragu kroz PDF i tekstualne dokumente.'
                : 'Advanced open-source CLI and Web app for high-privacy local semantic search over PDFs and files.'}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {['Python', 'FastAPI', 'Embeddings', 'React', 'ChromaDB'].map(tech => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-black/30 border border-white/5 text-gray-400 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Structured Skills Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-indigo-400">
            {language === 'sr' ? 'PREGLED VEŠTINA I TEHNOLOGIJA' : 'TECHNOLOGY STACK OVERVIEW'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {systemProfile.skills.map((categoryObj, index) => (
            <div 
              key={index}
              className="p-5 rounded-2xl bg-[#080808]/50 border border-white/5 space-y-3"
            >
              <h4 className="text-sm font-bold text-white tracking-tight font-sans">
                {categoryObj.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categoryObj.list.map((skill) => (
                  <span 
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-300 font-mono border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

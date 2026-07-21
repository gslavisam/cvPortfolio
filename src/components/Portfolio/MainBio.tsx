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
  ExternalLink,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Sliders,
  CheckCircle2,
  GitMerge,
  Linkedin,
  FileText,
  Briefcase,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { systemProfile } from '../../data';

interface MainBioProps {
  language: 'sr' | 'en';
  onNavigateTab: (tab: string) => void;
}

export default function MainBio({ language, onNavigateTab }: MainBioProps) {
  return (
    <div className="space-y-10 max-w-5xl mx-auto font-sans">
      
      {/* 1. HERO & PROFILE OVERVIEW */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c0c14] via-[#08080c] to-[#030303] border border-indigo-500/20 shadow-2xl overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
          {/* Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-indigo-600 p-0.5 shadow-xl flex-shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#050508] flex items-center justify-center font-sans">
              <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                SM
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                {systemProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
                gslavisam
              </span>
            </div>

            {/* Value Proposition Title */}
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-indigo-400 font-sans tracking-wide leading-snug">
                {language === 'sr'
                  ? 'Most između enterprise poslovne logike i transparentnih, proverljivih AI sistema'
                  : 'Bridge between Enterprise Business Logic & Explainable AI Systems'}
              </p>
              <p className="text-xs sm:text-sm text-gray-300 font-sans font-medium">
                {language === 'sr'
                  ? 'Senior IT PM / Poslovni analitičar specijalizovan za arhitekturu podataka, MDM i kontrolisanu AI integraciju'
                  : 'Senior IT PM / Business Analyst specializing in Data Architecture, MDM, and Controlled AI Integration'}
              </p>
            </div>

            {/* Contact badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-sans pt-1">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>{systemProfile.location}</span>
              </span>
              <a 
                href={`mailto:${systemProfile.email}`} 
                className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 hover:border-cyan-500/40 hover:text-white transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{systemProfile.email}</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/smilinkovic/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profil</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bio summary */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            {language === 'sr' ? systemProfile.fullBio : 'Senior Business Analyst and IT PM with over 25 years of experience configuring, implementing, and optimizing Enterprise Application Solutions (ERP, MES, DWH, MDM). Expert in bridging complex corporate logic with reliable, controlled AI systems across automotive, banking, and public sectors.'}
          </p>

          {/* Key metrics / career impact highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
              <span className="text-lg font-bold text-white font-mono">25+ {language === 'sr' ? 'godina' : 'years'}</span>
              <p className="text-[10px] text-gray-400">{language === 'sr' ? 'Enterprise IT iskustvo' : 'Enterprise IT Experience'}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
              <span className="text-lg font-bold text-indigo-400 font-mono">40% {language === 'sr' ? 'brže' : 'faster'}</span>
              <p className="text-[10px] text-gray-400">{language === 'sr' ? 'Mapiranje integracija' : 'Integration Spec Cycle'}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
              <span className="text-lg font-bold text-cyan-400 font-mono">100% {language === 'sr' ? 'proverljivo' : 'explainable'}</span>
              <p className="text-[10px] text-gray-400">{language === 'sr' ? 'Controlled AI odluke' : 'Audit-Proof AI Rules'}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
              <span className="text-lg font-bold text-emerald-400 font-mono">MDM & DWH</span>
              <p className="text-[10px] text-gray-400">{language === 'sr' ? 'Kanonska arhitektura' : 'Canonical Architecture'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARCHITECTURE SPOTLIGHT: SEMANTRA CASE STUDY (Deterministic-First AI) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#070913] to-black border border-indigo-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* Section Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                CASE STUDY & ARCHITECTURE SPOTLIGHT
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {language === 'sr' 
                  ? 'Koncept: Deterministička AI arhitektura i opseg dvosmislenosti (Ambiguity Band)'
                  : 'Concept: Deterministic-First AI Architecture & Ambiguity Band'}
              </h2>
            </div>
          </div>
          <button 
            onClick={() => onNavigateTab('semantra')}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 hover:text-white text-xs font-mono transition-all cursor-pointer"
          >
            <span>{language === 'sr' ? 'Istraži Semantra demo' : 'Explore Semantra Demo'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Challenge - Solution - Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Challenge */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>{language === 'sr' ? 'Izazov (Enterprise Problem)' : 'The Challenge'}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {language === 'sr'
                ? 'Neusaglašeni podaci i spora manuelna mapiranja u kompleksnim enterprise integracijama (npr. SAP ➔ Salesforce / MDM). Tradicionalni "black-box" LLM unosi rizik od halucinacija u produkciji.'
                : 'Heterogeneous data and slow manual mapping in enterprise integrations (e.g., SAP ➔ Salesforce / MDM). Standard "black-box" LLMs introduce dangerous hallucination risks in core systems.'}
            </p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-xl bg-black/50 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span>{language === 'sr' ? 'Rešenje (Multi-Signal Engine)' : 'The Solution'}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {language === 'sr'
                ? 'Višeslojni scoring mehanizam (lexical, canonical, pattern, semantic). AI deluje isključivo u uskom opsegu dvosmislenosti (Ambiguity Band [0.55 - 0.85]), čuvajući determinizam.'
                : 'Multi-signal candidate scoring (lexical, canonical, pattern, semantic). AI operates strictly inside a constrained Ambiguity Band [0.55 - 0.85], maintaining strict determinism.'}
            </p>
          </div>

          {/* Result */}
          <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{language === 'sr' ? 'Rezultat (Business Value)' : 'The Business Impact'}</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {language === 'sr'
                ? '100% proverljivost (explainability), verzionisanost pravila i verifikacija (Human-in-the-loop). Eliminisan rizik nepoznatih odluka uz 40% brže vreme izrade integracija.'
                : '100% auditability & explainability, versioned rule sets, and human-in-the-loop validation. Zero black-box opacity with 40% faster integration spec delivery.'}
            </p>
          </div>
        </div>

        {/* Visual Pipeline Representation */}
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span className="font-bold text-gray-200">
              {language === 'sr' ? 'PRINCESA DETERMINISTIČKOG MULTI-SIGNAL ARHITEKTURNOG TOKA' : 'DETERMINISTIC MULTI-SIGNAL ARCHITECTURE PIPELINE'}
            </span>
            <span className="text-indigo-400 font-semibold">Semantra Core Logic</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-[11px] font-mono">
            <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
              <div className="text-[9px] text-indigo-400 uppercase font-bold">1. Lexical Layer</div>
              <div className="font-bold text-white mt-0.5">Exact Match (&ge; 0.90)</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Deterministički prolaz</div>
            </div>

            <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
              <div className="text-[9px] text-cyan-400 uppercase font-bold">2. Canonical Layer</div>
              <div className="font-bold text-white mt-0.5">Schema Constraints</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Pravila i tipovi podataka</div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <div className="text-[9px] text-amber-400 uppercase font-bold">3. Ambiguity Band</div>
              <div className="font-bold text-white mt-0.5">AI Controlled [0.55 - 0.85]</div>
              <div className="text-[9px] text-amber-300 font-semibold mt-0.5">Human-in-the-Loop</div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
              <div className="text-[9px] text-emerald-400 uppercase font-bold">4. Audit Output</div>
              <div className="font-bold text-white mt-0.5">Explainable Mapping</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Verzionisana pravila</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EXPERIENCE REORGANIZED BY THEMATIC PILLARS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-indigo-400">
            {language === 'sr' ? 'ISKUSTVO ORGANIZOVANO PO STRATEŠKIM STUBOVIMA' : 'CAREER EXPERIENCE BY STRATEGIC PILLARS'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Enterprise Integration & MDM */}
          <motion.div 
            whileHover={{ y: -3 }}
            onClick={() => onNavigateTab('digiklinci')}
            id="card-pillar-integration"
            className="p-5 rounded-2xl bg-[#080808]/70 border border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Database className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  PILLAR 1
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Enterprise Integration & MDM
                </h3>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  Sistemske integracije & Governance
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {language === 'sr'
                  ? 'Arhitektura integracija i upravljanje Master Data sistemima. Mapiranje kanonskih modela za SAP, Workday, OneStream i Odoo, te eliminisanje silo-struktura u velikim organizacijama.'
                  : 'Architecture of system integrations and Master Data Management. Canonical schema mapping for SAP, Workday, OneStream, and Odoo, dismantling corporate data silos.'}
              </p>

              <ul className="text-[11px] text-gray-400 space-y-1 font-sans">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span>SAP & Workday Data Extraction</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span>Data Vault 2.0 & DWH Architecture</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span>COBIT & ISO 27000 Data Governance</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-medium">
              <span>{language === 'sr' ? 'Istraži DWH & Odoo' : 'Explore DWH & Odoo'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 2: Project & Delivery Leadership */}
          <motion.div 
            whileHover={{ y: -3 }}
            onClick={() => onNavigateTab('orbitmi')}
            id="card-pillar-leadership"
            className="p-5 rounded-2xl bg-[#080808]/70 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Settings className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  PILLAR 2
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Project & Delivery Leadership
                </h3>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  IT PM & Poslovna Analiza (25+ god)
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {language === 'sr'
                  ? 'Vođenje kros-funkcionalnih timova i kompleksnih IT transformacija u automobilskoj industriji (Magna), kontroli letenja (SMATSA), bankarstvu (ING Bank) i državnoj upravi.'
                  : 'Leading cross-functional teams and complex IT transformations across automotive (Magna), air traffic control (SMATSA), banking (ING Bank), and public sector.'}
              </p>

              <ul className="text-[11px] text-gray-400 space-y-1 font-sans">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Agile / Scrum & Waterfall Management</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Budgeting & Resource Planning</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Stakeholder & Vendor Alignment</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>{language === 'sr' ? 'Istraži Magna ML & ERP' : 'Explore Magna ML & ERP'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Pillar 3: Modern AI & Data Engineering */}
          <motion.div 
            whileHover={{ y: -3 }}
            onClick={() => onNavigateTab('semantra')}
            id="card-pillar-ai"
            className="p-5 rounded-2xl bg-[#080808]/70 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  PILLAR 3
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Modern AI & Data Engineering
                </h3>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  Controlled AI, ML & Databricks
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {language === 'sr'
                  ? 'Implementacija industrijskih ML modela na Databricks klasterima, fino podešavanje malih jezičkih modela (LoRA / PEFT), te kreiranje Semantra alata za semantičku pretragu.'
                  : 'Implementing industrial ML models on Databricks clusters, fine-tuning small language models (LoRA/PEFT), and developing the Semantra semantic search engine.'}
              </p>

              <ul className="text-[11px] text-gray-400 space-y-1 font-sans">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Databricks PySpark Big Data Profiling</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>SLM Fine-Tuning (Gemma, LLaMA)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Multi-Signal Candidate Ranking</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>{language === 'sr' ? 'Istraži Semantra engine' : 'Explore Semantra Engine'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. VISUALLY CATEGORIZED SKILLS (STRATEGIC VS TECHNICAL) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-indigo-400">
            {language === 'sr' ? 'STRUKTURISANI PREGLED VEŠTINA (STRATEGIC VS TECHNICAL)' : 'STRUCTURED SKILLS MATRIX (STRATEGIC VS TECHNICAL)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Strategic & Delivery Leadership */}
          <div className="p-6 rounded-2xl bg-[#08080c] border border-indigo-500/20 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'sr' ? 'Strategic & Delivery Leadership' : 'Strategic & Delivery Leadership'}
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  {language === 'sr' ? 'Strateško upravljanje, procesi i governance' : 'Project management, business analysis & governance'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'IT Project Management (End-to-End)',
                'Business Analysis & Requirements',
                'System Integration Architecture',
                'MDM & Data Governance',
                'COBIT & ITIL Frameworks',
                'Agile / Scrum / Kanban',
                'Stakeholder & Vendor Management',
                'UML Modeling & DDD',
                'Budgeting & Resource Planning'
              ].map((skill) => (
                <span 
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Technical & AI Architecture (Hands-on) */}
          <div className="p-6 rounded-2xl bg-[#08080c] border border-cyan-500/20 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'sr' ? 'Technical & AI Architecture (Hands-on)' : 'Technical & AI Architecture (Hands-on)'}
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  {language === 'sr' ? 'Arhitektura podataka, AI modeli i inženjering' : 'Data architecture, AI modeling & hands-on engineering'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Multi-Signal Candidate Scoring',
                'Ambiguity Band AI Filtering',
                'SLM Fine-Tuning (LoRA / PEFT)',
                'Databricks & PySpark (Big Data)',
                'Data Vault 2.0 & DWH Schemas',
                'Python & Pandas Data Profiling',
                'Advanced SQL (Oracle, Postgres, Synapse)',
                'Agentic Workflows (MCP, LangChain)',
                'FastAPI & Streamlit Services'
              ].map((skill) => (
                <span 
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-200 border border-cyan-500/20 font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

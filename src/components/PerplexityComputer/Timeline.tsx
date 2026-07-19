/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Loader2, 
  Search, 
  MousePointer, 
  Code2, 
  Terminal, 
  Play,
  MonitorCheck
} from 'lucide-react';
import { TimelineStep } from '../../types';

interface TimelineProps {
  steps: TimelineStep[];
  activeStepId: number;
  setActiveStepId: (id: number) => void;
  language: 'sr' | 'en';
}

export default function Timeline({ 
  steps, 
  activeStepId, 
  setActiveStepId, 
  language 
}: TimelineProps) {
  
  const getActionIcon = (type: TimelineStep['actionType'], status: TimelineStep['status']) => {
    if (status === 'running') {
      return <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
    }
    
    switch (type) {
      case 'search':
        return <Search className="w-4 h-4 text-sky-400" />;
      case 'click':
        return <MousePointer className="w-4 h-4 text-purple-400" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-indigo-400" />;
      case 'render':
        return <MonitorCheck className="w-4 h-4 text-cyan-400" />;
      default:
        return <Terminal className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStepStatusStyles = (status: TimelineStep['status'], isActive: boolean) => {
    if (isActive) {
      return 'border-indigo-500/30 bg-[#111111] text-white ring-2 ring-indigo-500/10 shadow-lg';
    }
    switch (status) {
      case 'completed':
        return 'border-white/5 bg-[#080808]/80 text-gray-300 hover:border-white/15';
      case 'running':
        return 'border-cyan-500/30 bg-cyan-950/10 text-cyan-300';
      default:
        return 'border-white/5 bg-transparent text-gray-600 cursor-not-allowed';
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center gap-2 px-1">
        <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/20 animate-pulse" />
        <span className="text-xs font-bold font-mono tracking-widest text-indigo-400 uppercase">
          {language === 'sr' ? 'AGENTIC WORKSPACE TOK IZVRŠAVANJA' : 'AGENTIC WORKSPACE EXECUTION FLOW'}
        </span>
      </div>

      <div className="relative pl-4 border-l border-white/5 ml-3 space-y-4 py-1">
        {steps.map((step, index) => {
          const isActive = activeStepId === step.id;
          const isCompleted = step.status === 'completed';
          const isRunning = step.status === 'running';

          return (
            <div key={step.id} className="relative group">
              {/* Dot icon on left border */}
              <div 
                className={`absolute -left-[27px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isCompleted 
                    ? 'border-indigo-500/30 bg-indigo-950/20 text-indigo-400' 
                    : isRunning
                    ? 'border-cyan-500 bg-[#0c1a1f] text-cyan-400 ring-4 ring-cyan-500/10 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
                    : 'border-white/5 bg-[#030303] text-gray-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-cyan-400 animate-ping' : 'bg-gray-600'}`}></span>
                )}
              </div>

              {/* Step Card */}
              <motion.div
                whileHover={{ x: 2 }}
                onClick={() => {
                  if (step.status !== 'pending') {
                    setActiveStepId(step.id);
                  }
                }}
                id={`timeline-step-${step.id}`}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${getStepStatusStyles(step.status, isActive)}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-black/30 border border-white/5 flex items-center justify-center">
                      {getActionIcon(step.actionType, step.status)}
                    </span>
                    <h4 className="text-sm font-semibold tracking-tight text-white/95">
                      {language === 'en' && step.titleEn ? step.titleEn : step.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 shrink-0">
                    {step.timestamp}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mt-1 pl-7 font-sans leading-relaxed">
                  {language === 'en' && step.descriptionEn ? step.descriptionEn : step.description}
                </p>

                {isActive && (
                  <div className="mt-2.5 pl-7 flex items-center gap-2 text-[10px] font-bold font-mono text-indigo-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse"></span>
                    {language === 'sr' ? 'Trenutno izabrano' : 'Currently selected'}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

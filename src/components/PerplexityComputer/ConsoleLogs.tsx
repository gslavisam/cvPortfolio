/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Terminal, 
  FileJson, 
  Copy, 
  Check, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { TimelineStep } from '../../types';

interface ConsoleLogsProps {
  step: TimelineStep;
  language: 'sr' | 'en';
  onRestart: () => void;
  isRestarting: boolean;
}

export default function ConsoleLogs({ 
  step, 
  language, 
  onRestart,
  isRestarting 
}: ConsoleLogsProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | string>('terminal');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeFile = step.codeFiles?.find(f => f.name === activeTab);

  return (
    <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full shadow-lg font-sans">
      {/* Console Header Tabs */}
      <div className="bg-[#080808]/50 border-b border-white/5 px-4 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTab('terminal')}
            id="tab-terminal"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-white/5 text-cyan-400 border border-white/5 font-bold'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>bash / log</span>
          </button>

          {step.codeFiles?.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveTab(file.name)}
              id={`tab-file-${file.name}`}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all cursor-pointer ${
                activeTab === file.name
                  ? 'bg-white/5 text-indigo-400 border border-white/5 font-bold'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5 text-indigo-400" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        {/* Copy or Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {activeTab !== 'terminal' && activeFile && (
            <button
              onClick={() => handleCopy(activeFile.content)}
              className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-gray-200 transition-colors cursor-pointer"
              title="Copy code"
              id="btn-copy-code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={onRestart}
            disabled={isRestarting}
            id="btn-restart-agent"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 border border-transparent hover:bg-indigo-500 text-white font-mono text-[10px] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-3 h-3 ${isRestarting ? 'animate-spin' : ''}`} />
            <span>{language === 'sr' ? 'POKRENI AGENTA' : 'RE-RUN AGENT'}</span>
          </button>
        </div>
      </div>

      {/* Console Content */}
      <div className="p-4 flex-1 font-mono text-xs overflow-y-auto min-h-[220px] max-h-[350px] leading-relaxed">
        {activeTab === 'terminal' ? (
          <div className="space-y-1.5">
            <div className="text-gray-500 border-b border-white/5 pb-2 mb-2 select-none flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'sr' ? 'AGENTIC WORKSPACE LOG EKSPEDICIJE (Slavišino okruženje)' : 'AGENTIC WORKSPACE MISSION LOG (Slavisa Workspace)'}</span>
            </div>
            {isRestarting ? (
              <div className="flex items-center gap-2 text-cyan-400/80 animate-pulse py-2">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Resetting agent state, analyzing files...</span>
              </div>
            ) : (
              (language === 'en' && step.outputLogEn ? step.outputLogEn : step.outputLog).map((log, index) => {
                let colorClass = 'text-gray-400';
                if (log.startsWith('🟢') || log.includes('Uspešno') || log.includes('uspešno') || log.includes('Success') || log.includes('verified')) {
                  colorClass = 'text-cyan-400';
                } else if (log.startsWith('🔍') || log.startsWith('🖥️') || log.startsWith('🤖') || log.startsWith('👉')) {
                  colorClass = 'text-teal-400';
                } else if (log.startsWith('👉')) {
                  colorClass = 'text-teal-400';
                } else if (log.startsWith('📈') || log.startsWith('💼') || log.startsWith('🏢') || log.startsWith('🔗') || log.startsWith('🌐')) {
                  colorClass = 'text-indigo-400 font-semibold';
                } else if (log.startsWith('🎨') || log.startsWith('⚙️') || log.startsWith('📊') || log.startsWith('🛠️')) {
                  colorClass = 'text-amber-400';
                }
                return (
                  <div key={index} className={`${colorClass} whitespace-pre-wrap font-mono`}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          activeFile && (
            <pre className="text-indigo-300 whitespace-pre-wrap select-text">
              <code>{activeFile.content}</code>
            </pre>
          )
        )}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="bg-[#080808]/50 border-t border-white/5 px-4 py-1.5 flex items-center justify-between text-[10px] text-gray-500 font-mono select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse"></span>
          status: online
        </span>
        <span>encoding: utf-8</span>
      </div>
    </div>
  );
}

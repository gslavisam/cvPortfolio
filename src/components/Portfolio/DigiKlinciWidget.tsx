/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Play, 
  RotateCcw, 
  PlusCircle, 
  Trash2, 
  Award, 
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';
import { projects } from '../../data';

interface DigiKlinciWidgetProps {
  language: 'sr' | 'en';
}

type CommandType = 'FORWARD' | 'LEFT' | 'RIGHT' | 'COLLECT';

interface CommandBlock {
  id: string;
  type: CommandType;
  labelSr: string;
  labelEn: string;
  color: string;
}

export default function DigiKlinciWidget({ language }: DigiKlinciWidgetProps) {
  const projectInfo = projects.find(p => p.id === 'enterprise_dwh')!;
  
  // 5x5 Grid Game State
  // ETL Agent starting position (row, col)
  // Directions: 0 = UP, 1 = RIGHT, 2 = DOWN, 3 = LEFT
  const [agentPos, setAgentPos] = useState({ r: 4, c: 0 });
  const [agentDir, setAgentDir] = useState(0); // Face UP
  const [targetWarehousePos] = useState({ r: 1, c: 3 });
  const [dirtySources] = useState([
    { r: 3, c: 1 },
    { r: 2, c: 2 },
    { r: 1, c: 1 },
  ]);

  const [commands, setCommands] = useState<CommandBlock[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExecutingIndex, setCurrentExecutingIndex] = useState<number | null>(null);
  const [pipelineMessage, setPipelineMessage] = useState<string>('');
  const [pipelineSuccess, setPipelineSuccess] = useState(false);

  // Available ETL command blocks to select
  const availableBlocks: { type: CommandType; labelSr: string; labelEn: string; color: string }[] = [
    { type: 'FORWARD', labelSr: 'EXTRACT (Napred) 🚚', labelEn: 'EXTRACT (Forward) 🚚', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { type: 'LEFT', labelSr: 'ROTATE (Levo) ↩️', labelEn: 'ROTATE (Left) ↩️', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { type: 'RIGHT', labelSr: 'ROTATE (Desno) ↪️', labelEn: 'ROTATE (Right) ↪️', color: 'bg-purple-500 hover:bg-purple-600' },
    { type: 'COLLECT', labelSr: 'LOAD_WAREHOUSE 🏛️', labelEn: 'LOAD_WAREHOUSE 🏛️', color: 'bg-amber-500 hover:bg-amber-600' },
  ];

  const handleAddCommand = (type: CommandType, labelSr: string, labelEn: string, color: string) => {
    if (commands.length >= 10) {
      setPipelineMessage(language === 'sr' ? 'Maksimalno 10 ETL koraka dozvoljeno!' : 'Max 10 ETL steps allowed!');
      return;
    }
    const newBlock: CommandBlock = {
      id: Math.random().toString(36).substring(7),
      type,
      labelSr,
      labelEn,
      color,
    };
    setCommands([...commands, newBlock]);
    setPipelineMessage('');
  };

  const handleRemoveCommand = (id: string) => {
    setCommands(commands.filter(c => c.id !== id));
  };

  const handleClear = () => {
    setCommands([]);
    setAgentPos({ r: 4, c: 0 });
    setAgentDir(0);
    setCurrentExecutingIndex(null);
    setIsPlaying(false);
    setPipelineMessage('');
    setPipelineSuccess(false);
  };

  // Run the ETL pipeline queue step-by-step
  const handleRunBlocks = async () => {
    if (commands.length === 0) {
      setPipelineMessage(language === 'sr' ? 'Dodaj korake koda prvo!' : 'Add ETL steps first!');
      return;
    }

    setIsPlaying(true);
    setPipelineSuccess(false);
    setAgentPos({ r: 4, c: 0 });
    setAgentDir(0);
    setPipelineMessage(language === 'sr' ? 'Pokretanje ETL mapiranja...' : 'Running ETL mapping script...');

    let currentPos = { r: 4, c: 0 };
    let currentDir = 0; // UP

    for (let i = 0; i < commands.length; i++) {
      setCurrentExecutingIndex(i);
      const cmd = commands[i];

      // Delay between steps for visual simulation
      await new Promise(resolve => setTimeout(resolve, 800));

      if (cmd.type === 'FORWARD') {
        let nextPos = { ...currentPos };
        if (currentDir === 0) nextPos.r -= 1; // UP
        else if (currentDir === 1) nextPos.c += 1; // RIGHT
        else if (currentDir === 2) nextPos.r += 1; // DOWN
        else if (currentDir === 3) nextPos.c -= 1; // LEFT

        // Boundary or obstacle checks
        const hitDirtyNode = dirtySources.some(node => node.r === nextPos.r && node.c === nextPos.c);
        if (nextPos.r < 0 || nextPos.r > 4 || nextPos.c < 0 || nextPos.c > 4) {
          setPipelineMessage(language === 'sr' ? 'Greška: Ekstraktor je udario u sistemsku barijeru!' : 'Error: Extractor hit systemic boundaries!');
          setIsPlaying(false);
          setCurrentExecutingIndex(null);
          return;
        } else if (hitDirtyNode) {
          setPipelineMessage(language === 'sr' ? 'Neuspeh: Ekstraktor je naleteo na korumpiran izvor podataka (Null-Constraint)!' : 'Failure: Extractor hit a corrupt dirty data source (Null-Constraint)!');
          setIsPlaying(false);
          setCurrentExecutingIndex(null);
          return;
        }

        currentPos = nextPos;
        setAgentPos(currentPos);
      } else if (cmd.type === 'LEFT') {
        currentDir = (currentDir + 3) % 4; // CCW
        setAgentDir(currentDir);
      } else if (cmd.type === 'RIGHT') {
        currentDir = (currentDir + 1) % 4; // CW
        setAgentDir(currentDir);
      } else if (cmd.type === 'COLLECT') {
        if (currentPos.r === targetWarehousePos.r && currentPos.c === targetWarehousePos.c) {
          setPipelineSuccess(true);
          setPipelineMessage(language === 'sr' ? 'Uspeh! Podaci su uspešno transformisani i skladišteni u DWH (20M+ redova)! 🏆' : 'Success! Data was beautifully loaded and merged into target DWH (20M+ records)! 🏆');
          setIsPlaying(false);
          setCurrentExecutingIndex(null);
          return;
        } else {
          setPipelineMessage(language === 'sr' ? 'Prazno učitavanje: Nema ciljne baze na ovom polju.' : 'Empty Load: There is no target database schema at this coordinate.');
          setIsPlaying(false);
          setCurrentExecutingIndex(null);
          return;
        }
      }
    }

    setIsPlaying(false);
    setCurrentExecutingIndex(null);
    if (!pipelineSuccess) {
      setPipelineMessage(language === 'sr' ? 'Skript je završen, ali podaci nisu stigli do DWH skladišta. Probaj ponovo!' : 'Script finished but data did not reach the target Warehouse. Try again!');
    }
  };

  const getDirArrow = (dir: number) => {
    switch (dir) {
      case 0: return '▲';
      case 1: return '▶';
      case 2: return '▼';
      case 3: return '◀';
      default: return '▲';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Database className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              S-TIM ICT Enterprise ETL Flow Controller
            </h2>
            <p className="text-xs text-indigo-400 font-mono font-semibold uppercase tracking-wider">
              {projectInfo?.role || 'Lead Solution Architect'}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300 font-sans leading-relaxed">
          {language === 'sr' 
            ? 'Tokom konsultantskog rada u S-TIM ICT-u, Slaviša je projektovao kompleksne tokove podataka. Ovaj simulator predstavlja principe ETL (Extract-Transform-Load) procesa. Sastavite skript (sekvencu blokova) koji ekstrahuje podatke i zaobilazi korumpirane "Dirty Data" izvore do skladišta.'
            : 'During his consulting years at S-TIM ICT, Slaviša architected robust high-throughput data layers. This interactive game represents ETL (Extract-Transform-Load) pipeline operations. Sequence coding commands to extract and direct the flow through valid nodes, avoiding dirty corrupt sources, to load into the target Warehouse.'}
        </p>
      </div>

      {/* Main Game Interface Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#080808]/50 p-5 rounded-2xl border border-white/5 shadow-lg">
        
        {/* Left Side: Blocks Drawer & Code Stack */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">
            {language === 'sr' ? '1. IZABERI ETL METODE' : '1. CHOOSE ETL INSTRUCTIONS'}
          </h3>

          {/* Block Selector */}
          <div className="grid grid-cols-2 gap-2">
            {availableBlocks.map((block) => (
              <button
                key={block.type}
                onClick={() => handleAddCommand(block.type, block.labelSr, block.labelEn, block.color)}
                disabled={isPlaying}
                id={`block-select-${block.type}`}
                className={`flex items-center justify-between px-3 py-2 text-xs font-sans font-bold rounded-xl text-white transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer ${block.color}`}
              >
                <span>{language === 'sr' ? block.labelSr : block.labelEn}</span>
                <PlusCircle className="w-4 h-4 opacity-75" />
              </button>
            ))}
          </div>

          {/* Block Code Queue Stack */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">
                {language === 'sr' ? '2. ETL SKRIPT QUEUE (MAKS. 10)' : '2. ETL PIPELINE SCRIPT QUEUE (MAX 10)'}
              </h3>
              {commands.length > 0 && (
                <button
                  onClick={handleClear}
                  id="btn-clear-code"
                  className="text-[10px] font-mono text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  {language === 'sr' ? 'Očisti' : 'Clear Script'}
                </button>
              )}
            </div>

            {/* Render Code Stack Queue */}
            <div className="min-h-[140px] bg-[#030303] border border-white/5 p-3 rounded-xl flex flex-col gap-1.5">
              {commands.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6 text-gray-500 space-y-1">
                  <Server className="w-8 h-8 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-sans">
                    {language === 'sr' ? 'Izaberite korake iznad da sastavite migracioni skript' : 'Select ETL instructions above to construct your pipeline'}
                  </span>
                </div>
              ) : (
                commands.map((cmd, index) => {
                  const isExecuting = currentExecutingIndex === index;
                  return (
                    <div 
                      key={cmd.id}
                      className={`flex items-center justify-between pl-3 pr-2 py-1.5 rounded-lg text-xs font-bold text-white transition-all ${cmd.color} ${
                        isExecuting ? 'ring-2 ring-white animate-pulse shadow-md scale-[1.02]' : 'opacity-90'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1 rounded bg-black/25 text-white/70">
                          {index + 1}
                        </span>
                        <span className="font-sans">
                          {language === 'sr' ? cmd.labelSr : cmd.labelEn}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveCommand(cmd.id)}
                        disabled={isPlaying}
                        id={`btn-remove-cmd-${cmd.id}`}
                        className="p-1 rounded hover:bg-black/20 text-white/70 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Visual Map Output */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-bold font-mono tracking-wider text-indigo-400 uppercase">
            {language === 'sr' ? '3. GRID PRIKAZ STRUKTURE' : '3. LIVE DATA FLOW GRAPH'}
          </h3>

          {/* Grid Canvas */}
          <div className="grid grid-cols-5 gap-1.5 p-3 rounded-xl bg-[#030303] border border-white/5 aspect-square relative shadow-inner">
            {/* Draw 5x5 Grid cells */}
            {Array.from({ length: 5 }).map((_, rIndex) => (
              Array.from({ length: 5 }).map((_, cIndex) => {
                const isAgent = agentPos.r === rIndex && agentPos.c === cIndex;
                const isWarehouse = targetWarehousePos.r === rIndex && targetWarehousePos.c === cIndex;
                const isDirty = dirtySources.some(node => node.r === rIndex && node.c === cIndex);

                return (
                  <div
                    key={`${rIndex}-${cIndex}`}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isAgent
                        ? 'bg-cyan-500 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] ring-2 ring-cyan-500/25 scale-[1.03]'
                        : isWarehouse
                        ? 'bg-amber-500/10 border border-dashed border-amber-500/30 text-amber-400 text-lg animate-pulse'
                        : isDirty
                        ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold'
                        : 'bg-[#111111]/40 border border-white/5'
                    }`}
                  >
                    {isAgent ? (
                      <span className="text-sm font-extrabold text-white flex flex-col items-center leading-none">
                        <span>🔄</span>
                        <span className="text-[8px] font-mono mt-0.5">{getDirArrow(agentDir)}</span>
                      </span>
                    ) : isWarehouse ? (
                      <span className="animate-pulse">🏛️</span>
                    ) : isDirty ? (
                      <span>⚠️</span>
                    ) : null}
                  </div>
                );
              })
            ))}
          </div>

          {/* Controls and Messaging Console */}
          <div className="space-y-3">
            {pipelineMessage && (
              <div className={`p-2.5 rounded-lg border text-xs font-sans text-center transition-all ${
                pipelineSuccess 
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]' 
                  : 'bg-amber-500/5 border border-amber-500/10 text-amber-300'
              }`}>
                {pipelineMessage}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRunBlocks}
                disabled={isPlaying || commands.length === 0}
                id="btn-run-blocks"
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-sans text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all disabled:pointer-events-none cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black text-black" />
                <span>{language === 'sr' ? 'Pokreni skript' : 'Run Pipeline'}</span>
              </button>
              <button
                onClick={handleClear}
                id="btn-reset-puzzle"
                className="p-2.5 rounded-xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Reset puzzle"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reward Award Badges */}
      {pipelineSuccess && (
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-2xl">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Award className="w-10 h-10 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {language === 'sr' ? 'OSVOJEN BEDŽ: S-TIM ICT ETL Architecture Master!' : 'BADGE EARNED: S-TIM ICT ETL Architecture Master!'}
            </h4>
            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              {language === 'sr'
                ? 'Čestitamo! Uspešno ste rešili lekciju projektovanja data pipeline-a. Pokazali ste izvanrednu logiku u organizovanju tokova podataka i stabilizovanju skladišta.'
                : 'Congrats! You solved the pipeline architecture lesson. You demonstrated excellent logic in organizing data flows and stabilizing target warehouses.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

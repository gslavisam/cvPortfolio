/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Settings, 
  TrendingDown, 
  RefreshCw,
  Gauge,
  Thermometer,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { projects } from '../../data';

interface OrbitMIWidgetProps {
  language: 'sr' | 'en';
}

export default function OrbitMIWidget({ language }: OrbitMIWidgetProps) {
  const projectInfo = projects.find(p => p.id === 'magna')!;
  const [isSimulating, setIsSimulating] = useState(false);
  const [productionProgress, setProductionProgress] = useState(0); // 0 to 100%
  const [mlOverride, setMlOverride] = useState(true);
  const [machineStatus, setMachineStatus] = useState<'idle' | 'running' | 'success'>('idle');

  // Dynamic ML metrics
  const pressForce = mlOverride ? 2200 : 2950; // kN
  const cyclesPerMin = mlOverride ? 14.8 : 11.4; // strokes / min
  const machineTemp = mlOverride ? '42°C (Stable)' : '68°C (High Friction)';
  const scrapRateReduction = mlOverride ? '94.2% (Minimal Scrap)' : '82.5% (Standard Yield)';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      setMachineStatus('running');
      timer = setInterval(() => {
        setProductionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsSimulating(false);
            setMachineStatus('success');
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleStartSimulation = () => {
    setProductionProgress(0);
    setIsSimulating(true);
  };

  const getPathData = () => {
    if (mlOverride) {
      // Curve downwards to bypass peak friction/stress zone centered at (200, 90)
      return 'M 40,90 Q 200,160 360,90';
    }
    // Straight line directly passing through peak friction stress zone
    return 'M 40,90 L 360,90';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Intro Context Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Cpu className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              Magna Automotive ML Production Line Optimizer
            </h2>
            <p className="text-xs text-cyan-400 font-mono font-semibold uppercase tracking-wider">
              {projectInfo?.role || 'Senior Business Analyst'}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300 font-sans leading-relaxed">
          {language === 'sr' 
            ? 'U automobilskoj industriji, neočekivani zastoji i pregrevanje presa izazivaju višemilionske gubitke. Ovaj interaktivni simulator prikazuje mašinsko učenje (Random Forest & KNN) koje Slaviša implementira u Magni za predviđanje mehaničkog stresa, dinamičko prilagođavanje tonaže presa i sprečavanje habanja.'
            : 'In the automotive industry, unexpected downtime and press overheating lead to millions in losses. This interactive simulator demonstrates the Machine Learning principles (Random Forest & KNN) Slaviša implements at Magna for predictive mechanical stress bypass, dynamic tonnage adjustment, and scrap reduction.'}
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Map Panel */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#080808]/50 border border-white/5 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-indigo-400">
                {language === 'sr' ? 'PREDIKTIVNI FEED KONTROLER PRES-LINIJE' : 'PREDICTIVE FEED STRESS OVERRIDE'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse"></span>
              <span className="text-[10px] font-mono text-gray-400">Telemetry Stream Connected</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative h-48 bg-[#030303] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-2 select-none">
            {/* Sea Grid Background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-[0.03] pointer-events-none">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border border-white"></div>
              ))}
            </div>

            {/* Ports labels */}
            <div className="absolute left-4 top-24 z-10 text-center">
              <span className="text-[10px] font-mono font-bold text-gray-400 block">Coil Feed</span>
              <span className="text-[9px] text-gray-500 font-mono">Input Roll</span>
            </div>

            <div className="absolute right-4 top-24 z-10 text-center">
              <span className="text-[10px] font-mono font-bold text-gray-400 block">Stamping Die</span>
              <span className="text-[9px] text-cyan-400 font-semibold font-mono">Completed Part</span>
            </div>

            {/* Storm Warning Indicator Zone */}
            <div className={`absolute left-1/2 top-[50px] -translate-x-1/2 w-32 h-16 rounded-full bg-amber-500/5 border border-dashed border-amber-500/25 flex flex-col items-center justify-center transition-all ${mlOverride ? 'opacity-40' : 'opacity-100 bg-red-500/10 border-red-500/45 text-red-400 animate-pulse'}`}>
              <Thermometer className="w-5 h-5 text-amber-500" />
              <span className="text-[8px] font-mono uppercase text-amber-500 tracking-wider text-center">
                {mlOverride ? 'Friction Zone Detected' : 'OVERHEAT DANGER'}
              </span>
            </div>

            {/* Simulated Vessel SVG Route */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 400 200">
              {/* Route track */}
              <path 
                d={getPathData()} 
                fill="none" 
                stroke={mlOverride ? '#22d3ee' : '#f43f5e'} 
                strokeWidth="2.5" 
                strokeDasharray="4 3"
                className="transition-all duration-300"
              />

              {/* Vessel marker positioning on path */}
              {machineStatus !== 'idle' && (
                <g 
                  className="transition-all duration-100 ease-linear"
                  transform={`translate(${40 + (productionProgress / 100) * 320}, ${
                    mlOverride 
                      // Custom quadratic curve position calculation
                      ? 90 + 4 * (productionProgress / 100) * (1 - productionProgress / 100) * 55
                      : 90
                  })`}
                >
                  <circle r="12" fill="#22d3ee" className="opacity-15 animate-ping" />
                  <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#22d3ee" stroke="#fff" strokeWidth="1.5" />
                  <polygon points="-4,-2 4,-2 0,4" fill="#fff" className="origin-center rotate-180" />
                </g>
              )}
            </svg>

            {/* Simulation Status Overlay */}
            {machineStatus === 'idle' && (
              <button 
                onClick={handleStartSimulation}
                id="btn-map-start-sim"
                className="absolute px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-sans text-xs font-semibold shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-black animate-spin" />
                <span>{language === 'sr' ? 'Pokreni Stamping' : 'Start Stamping Cycle'}</span>
              </button>
            )}

            {machineStatus === 'success' && (
              <div className="absolute px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 rounded-lg font-sans text-xs font-bold shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                🎉 {language === 'sr' ? 'Proizvodna serija je uspešno završena bez škarta!' : 'Batch completed with zero detected surface defects!'}
              </div>
            )}
          </div>

          {/* Interactive Routing Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMlOverride(!mlOverride)}
                id="toggle-storm-routing"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  mlOverride 
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.15)]' 
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {mlOverride 
                    ? (language === 'sr' ? 'ML Predikcija i Hlađenje: UKLJUČENO' : 'ML Override & Auto Lubrication: ON')
                    : (language === 'sr' ? 'ML Predikcija i Hlađenje: ISKLJUČENO' : 'ML Override & Auto Lubrication: OFF')}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartSimulation}
                disabled={isSimulating}
                id="btn-restart-routing"
                className="px-3.5 py-2 rounded-xl border border-white/5 text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all disabled:opacity-40 cursor-pointer"
              >
                {language === 'sr' ? 'Resetuj ciklus' : 'Reset Cycle'}
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#080808]/50 border border-white/5 space-y-3 shadow-lg">
            <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
              {language === 'sr' ? 'METRIKA PRESA U REALNOM VREMENU' : 'STAMPING MACHINE TELEMETRY'}
            </h3>

            <div className="space-y-3">
              {/* Metric 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-400 font-sans">
                    {language === 'sr' ? 'Sila pritiska (Tonaža)' : 'Press Applied Force'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white font-mono">{pressForce} kN</span>
                  <span className="text-[10px] text-gray-500 block">kilo-Newtons</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-gray-400 font-sans">
                    {language === 'sr' ? 'Brzina ciklusa presa' : 'Cycle Stroke Speed'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white font-mono">{cyclesPerMin} SPM</span>
                  <span className="text-[10px] text-gray-500 block">strokes per minute</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-gray-400 font-sans">
                    {language === 'sr' ? 'Temperatura alata' : 'Die Surface Heat'}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold font-mono ${mlOverride ? 'text-gray-300' : 'text-red-400'}`}>
                    {machineTemp}
                  </span>
                  <span className="text-[10px] text-gray-500 block">Friction Swell</span>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency optimization card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 text-indigo-300 space-y-2 shadow-md">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-indigo-400">
                {language === 'sr' ? 'MAŠINSKO UČENJE U STAMPINGU' : 'AUTO STAMPING OPTIMIZATION'}
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
              {language === 'sr'
                ? 'Regresija sumnjivih vibracija i auto-lubrikacioni override sprečava strukturne mikro-pukotine na metalnim panelima.'
                : 'Regression of micro-vibrations and thermal load prevents surface cracks on cold-formed automotive steel panels.'}
            </p>
            <div className="pt-2 border-t border-indigo-500/10 flex items-center justify-between text-xs font-bold font-mono">
              <span>{language === 'sr' ? 'Prinos kvaliteta:' : 'Quality Yield Score:'}</span>
              <span className="text-white text-sm">{scrapRateReduction}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

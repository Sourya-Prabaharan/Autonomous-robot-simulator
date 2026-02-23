import React from 'react';
import {
    Play, Pause, RefreshCw, Layers,
    Settings, Activity, Zap, Info, MousePointer2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    algorithm: string;
    setAlgorithm: (alg: string) => void;
    isSimulating: boolean;
    setIsSimulating: (sim: boolean) => void;
    noiseLevel: number;
    setNoiseLevel: (lvl: number) => void;
    onPlan: () => void;
    pathMetrics: { nodes: number; length: string };
}

const Sidebar: React.FC<SidebarProps> = ({
    algorithm, setAlgorithm, isSimulating, setIsSimulating,
    noiseLevel, setNoiseLevel, onPlan, pathMetrics
}) => {
    const algorithms = ['A*', 'RRT*', 'D* Lite'];

    return (
        <div className="w-80 h-full glass-panel border-l border-white/10 flex flex-col p-6 z-10 custom-scrollbar overflow-y-auto">
            <div className="space-y-8">
                {/* Navigation / Mode */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-300">
                        <Activity size={18} className="text-primary" />
                        <h2 className="text-sm font-semibold uppercase tracking-wider">Mission Control</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={() => setIsSimulating(!isSimulating)}
                            className={cn(
                                "flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-bold transition-all duration-300",
                                isSimulating
                                    ? "bg-amber-500/20 text-amber-500 border border-amber-500/50 shadow-lg shadow-amber-500/10"
                                    : "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20"
                            )}
                        >
                            {isSimulating ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            {isSimulating ? 'STOP SIMULATION' : 'START MISSION'}
                        </button>

                        <button
                            onClick={onPlan}
                            className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold transition-all"
                        >
                            <RefreshCw size={18} />
                            RE-CALCULATE PATH
                        </button>
                    </div>
                </section>

                {/* Algorithm Selection */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-300">
                        <Zap size={18} className="text-amber-400" />
                        <h2 className="text-sm font-semibold uppercase tracking-wider">Path Planner</h2>
                    </div>
                    <div className="space-y-2">
                        {algorithms.map(alg => (
                            <button
                                key={alg}
                                onClick={() => setAlgorithm(alg)}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-left",
                                    algorithm === alg
                                        ? "bg-primary/20 border-primary text-primary"
                                        : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                                )}
                            >
                                <span className="font-medium">{alg}</span>
                                {algorithm === alg && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Constraints & Noise */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-slate-300">
                        <Settings size={18} className="text-emerald-400" />
                        <h2 className="text-sm font-semibold uppercase tracking-wider">Environment</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-400">SENSOR NOISE</span>
                                <span className="text-emerald-400">{(noiseLevel * 100).toFixed(0)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="0.5" step="0.01"
                                value={noiseLevel}
                                onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                                className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </section>

                {/* Diagnostics */}
                <section className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3 text-slate-400">
                        <Info size={16} />
                        <h2 className="text-xs font-bold uppercase tracking-widest">Diagnostics</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Nodes Explored</p>
                            <p className="text-lg font-mono text-white">{pathMetrics.nodes}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Trajectory</p>
                            <p className="text-lg font-mono text-white">{pathMetrics.length}</p>
                        </div>
                    </div>
                </section>

                {/* Controls Info */}
                <div className="mt-auto space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-3 text-xs text-slate-500">
                        <MousePointer2 size={14} className="mt-0.5 shrink-0" />
                        <p><span className="text-slate-300 font-semibold">Click</span> on the grid to update the goal position.</p>
                    </div>
                    <div className="flex items-start gap-3 text-xs text-slate-500">
                        <Layers size={14} className="mt-0.5 shrink-0" />
                        <p><span className="text-slate-300 font-semibold">Shift + Click</span> to toggle obstacles in the environment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

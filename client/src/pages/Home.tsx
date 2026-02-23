import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { DAYS, getCurrentLentDay, getLentDate, type Pilar } from "@/data/days";
import { getCheckins } from "@/lib/checkin";

const PILAR_CONFIG: Record<Pilar, { emoji: string; label: string }> = {
    Oração: { emoji: "🙏", label: "ORAÇÃO" },
    Jejum: { emoji: "✦", label: "JEJUM" },
    Esmola: { emoji: "❤️", label: "ESMOLA" },
};

const PHASES = [
    { range: "D01–D10", label: "Fase 1", ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { range: "D11–D20", label: "Fase 2", ids: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { range: "D21–D30", label: "Fase 3", ids: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
    { range: "D31–D40", label: "Fase 4", ids: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
];

const FASE_TITLES = [
    "A Desconstrução do Ego e o Chamado ao Deserto",
    "O Atrito no Deserto e a Batalha Interior",
    "O Transbordamento da Caridade",
    "A Ascensão ao Calvário e o Alvorecer da Ressurreição",
];

export function Home() {
    const [todayDay, setTodayDay] = useState<number | null>(null);
    const [checkins, setCheckins] = useState<Set<number>>(new Set());
    const [, setLocation] = useLocation();

    useEffect(() => {
        setTodayDay(getCurrentLentDay());
        setCheckins(getCheckins());
        window.scrollTo(0, 0);
    }, []);

    const completedCount = checkins.size;
    const progress = Math.round((completedCount / 40) * 100);
    const todayData = todayDay ? DAYS[todayDay - 1] : null;

    function formatDate(d: Date) {
        return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    }

    return (
        <div className="min-h-screen bg-quaresma-bg text-quaresma-text font-plain selection:bg-quaresma-accent/20 pt-[env(safe-area-inset-top)] pb-10">
            <div className="texture-overlay-quaresma"></div>

            {/* Hero Header */}
            <header className="bg-quaresma-primary text-quaresma-bg px-6 pt-16 pb-12 text-center space-y-4 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full border border-white/20"></div>
                </div>
                <div className="relative z-10 space-y-2">
                    <span className="font-cinzel text-[10px] tracking-[0.4em] opacity-50 block uppercase">QUARESMA 2026</span>
                    <h1 className="font-serif-stitch text-4xl md:text-5xl font-bold leading-tight">Jornada Quaresmal</h1>
                    <p className="font-serif-stitch italic text-xl opacity-80 decoration-quaresma-accent/30 decoration-1 underline-offset-4 underline">
                        O Grande Recomeço
                    </p>
                </div>
                {todayData && (
                    <div className="relative z-10 max-w-sm mx-auto pt-6 opacity-40">
                        <p className="text-[11px] leading-relaxed italic border-t border-white/10 pt-4">
                            "{todayData.textoVersiculo}"
                            <br />
                            <span className="font-cinzel tracking-widest text-[9px] uppercase mt-1 inline-block">— {todayData.versiculo}</span>
                        </p>
                    </div>
                )}
            </header>

            <div className="max-w-xl mx-auto px-6 space-y-12 -mt-6">

                {/* Today Banner */}
                {todayData && todayDay ? (
                    <div className="card-quaresma animate-fade-in-up flex items-center justify-between gap-4 border-l-4 border-l-quaresma-accent group shadow-xl">
                        <div className="flex items-center gap-4 flex-1">
                            <span className="text-4xl group-hover:scale-110 transition-transform">{todayData.icone}</span>
                            <div>
                                <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent font-bold block mb-1">📅 HOJE · DIA {todayDay}</span>
                                <h3 className="font-serif-stitch text-xl text-quaresma-primary">{todayData.tema}</h3>
                                <p className="text-[11px] opacity-40 uppercase font-cinzel">{formatDate(getLentDate(todayDay))}</p>
                            </div>
                        </div>
                        <Link href={`/dia/${todayDay}`} className="bg-quaresma-primary text-white p-3 rounded-full hover:brightness-110 active:scale-95 transition-all">
                            <span className="material-symbols-outlined !text-xl">east</span>
                        </Link>
                    </div>
                ) : (
                    <div className="card-quaresma text-center py-8 space-y-2 animate-fade-in-up shadow-lg">
                        <span className="text-4xl block mb-2">🌿</span>
                        <h3 className="font-serif-stitch text-xl text-quaresma-primary">A Quaresma está quase aqui</h3>
                        <p className="text-sm opacity-50">Iniciamos em 18 de fevereiro de 2026</p>
                    </div>
                )}

                {/* Progress Card */}
                <div className="card-quaresma bg-white/40 space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <span className="font-cinzel text-[10px] tracking-widest text-quaresma-primary/40 block">PROGRESSO TOTAL</span>
                            <span className="font-serif-stitch text-2xl text-quaresma-primary font-bold">{completedCount} <span className="text-sm font-normal opacity-40 italic">de 40</span></span>
                        </div>
                        <span className="font-serif-stitch text-2xl text-quaresma-accent font-bold italic">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-quaresma-accent/10 rounded-full overflow-hidden">
                        <div className="h-full bg-quaresma-accent transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Intro Card */}
                <Link href="/introducao" className="block transform transition-transform active:scale-[0.98]">
                    <div className="bg-quaresma-primary p-6 rounded-[20px] shadow-2xl overflow-hidden relative group">
                        <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-5 font-serif-stitch rotate-12 group-hover:rotate-6 transition-transform">📖</div>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl text-white text-3xl">📖</div>
                            <div className="space-y-1 pr-6">
                                <h3 className="font-serif-stitch text-xl text-white">Antes de Começar: A Introdução</h3>
                                <p className="text-[11px] text-white/60 leading-relaxed max-w-[200px]">Leia as instruções e a teologia fundamental desta jornada.</p>
                            </div>
                            <span className="material-symbols-outlined text-quaresma-accent ml-auto group-hover:translate-x-2 transition-transform">east</span>
                        </div>
                    </div>
                </Link>

                {/* Phases */}
                <div className="space-y-12 pb-10">
                    {PHASES.map((phase, pi) => {
                        const phaseChecked = phase.ids.filter(id => checkins.has(id)).length;
                        return (
                            <section key={phase.label} className="space-y-6">
                                <div className="space-y-2 border-b border-quaresma-accent/10 pb-4 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <span className="font-cinzel text-[10px] tracking-widest text-quaresma-accent font-bold">{phase.range}</span>
                                        <h3 className="font-serif-stitch text-2xl text-quaresma-primary leading-none">{phase.label}</h3>
                                        <p className="text-[11px] italic opacity-50 max-w-[240px] leading-tight mt-2">{FASE_TITLES[pi]}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-serif-stitch text-lg text-quaresma-primary italic opacity-70">{phaseChecked}/{phase.ids.length}</span>
                                        <div className="h-1 w-16 bg-quaresma-accent/10 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-quaresma-accent" style={{ width: `${(phaseChecked / phase.ids.length) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {phase.ids.map((dayId) => {
                                        const day = DAYS[dayId - 1];
                                        const isDone = checkins.has(dayId);
                                        const isToday = todayDay !== null && dayId === todayDay;

                                        return (
                                            <Link
                                                key={dayId}
                                                href={`/dia/${dayId}`}
                                                className={`card-quaresma !p-4 flex flex-col gap-3 group transition-all active:scale-[0.95] touch-manipulation relative overflow-hidden ${isDone ? 'opacity-60 grayscale-[0.3]' : ''} ${isToday ? 'ring-2 ring-quaresma-accent bg-quaresma-accent/5' : ''}`}
                                            >
                                                {isDone && <span className="absolute top-2 right-2 material-symbols-outlined text-green-600 !text-xs opacity-50">check_circle</span>}
                                                <div className="flex justify-between items-center">
                                                    <span className="font-serif-stitch text-xl group-hover:italic transition-all">D{String(dayId).padStart(2, "0")}</span>
                                                    <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{day.icone}</span>
                                                </div>
                                                <h4 className="text-[11px] font-medium text-quaresma-primary leading-snug flex-grow drop-cap-small">{day.tema}</h4>
                                                <div className="h-px w-full bg-quaresma-primary/5 mt-auto"></div>
                                                <span className="font-cinzel text-[8px] tracking-widest text-quaresma-accent font-bold text-center block pt-1">{day.pilar.toUpperCase()}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>

                {/* Footer */}
                <footer className="text-center py-10 space-y-2 border-t border-quaresma-accent/5 opacity-30 px-4">
                    <p className="font-serif-stitch italic text-sm">Jornada Quaresmal 2026 · 40 dias de transformação</p>
                    <p className="text-[9px] uppercase font-cinzel tracking-[0.2em] leading-relaxed">
                        Seus dados são privados e salvos localmente.<br />
                        Em união com toda a Igreja.
                    </p>
                </footer>
            </div>
        </div>
    );
}

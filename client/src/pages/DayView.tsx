import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { DAYS, getLentDate, type DayData } from "@/data/days";
import { getCheckins, toggleCheckin } from "@/lib/checkin";

const LS_NOTES_KEY = (id: number) => `notes_dia_${id}`;

function formatDate(d: Date) {
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
}

function getFaseNumber(fase: string): number {
    if (fase.includes("Desconstrução")) return 1;
    if (fase.includes("Atrito")) return 2;
    if (fase.includes("Transbordamento")) return 3;
    return 4;
}

export function DayView() {
    const { id } = useParams<{ id: string }>();
    const dayId = parseInt(id ?? "1", 10);
    const [, setLocation] = useLocation();

    const [notes, setNotes] = useState("");
    const [saved, setSaved] = useState(false);
    const [checkedIn, setCheckedIn] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem(LS_NOTES_KEY(dayId));
        setNotes(savedNotes ?? "");
        setSaved(false);
        setCheckedIn(getCheckins().has(dayId));
        window.scrollTo(0, 0);
    }, [dayId]);

    function saveNotes() {
        localStorage.setItem(LS_NOTES_KEY(dayId), notes);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function handleCheckin() {
        const updated = toggleCheckin(dayId);
        setCheckedIn(updated.has(dayId));
    }

    /* 404 Guard */
    if (dayId < 1 || dayId > 40 || isNaN(dayId)) {
        return (
            <div className="min-h-screen bg-quaresma-bg flex flex-col items-center justify-center p-10 text-center">
                <h2 className="font-serif-stitch text-3xl text-quaresma-primary mb-4">Dia não encontrado</h2>
                <Link href="/" className="font-cinzel text-xs tracking-widest text-quaresma-accent border-b border-quaresma-accent/30 pb-1">
                    VOLTAR AO INÍCIO
                </Link>
            </div>
        );
    }

    const day: DayData = DAYS[dayId - 1];
    const date = getLentDate(dayId);
    const faseNum = getFaseNumber(day.fase);
    const nextDayId = dayId < 40 ? dayId + 1 : null;
    const prevDayId = dayId > 1 ? dayId - 1 : null;

    return (
        <div className="min-h-screen bg-quaresma-bg text-quaresma-text font-plain selection:bg-quaresma-accent/20 pt-[env(safe-area-inset-top)] pb-[calc(32px+env(safe-area-inset-bottom))] [WebkitOverflowScrolling:touch]">
            <div className="texture-overlay-quaresma"></div>

            {/* Header / Top Bar */}
            <header className="p-4 md:p-6 flex justify-between items-center bg-quaresma-bg/90 backdrop-blur-md sticky top-0 z-30 border-b border-quaresma-accent/5">
                <button
                    onClick={() => setLocation("/")}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-quaresma-primary/5 transition-all touch-manipulation"
                >
                    <span className="material-symbols-outlined text-quaresma-primary !text-2xl">arrow_back</span>
                </button>
                <div className="text-center">
                    <span className="font-cinzel text-[9px] tracking-[0.3em] text-quaresma-accent block">DIA {String(dayId).padStart(2, "0")}</span>
                    <span className="font-serif-stitch italic text-[10px] opacity-40 uppercase">FASE {faseNum}</span>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            {/* Main Content */}
            <main className="relative z-10 p-6 md:p-10 max-w-lg mx-auto w-full space-y-10 animate-fade-in-up">

                {/* Title Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 font-cinzel text-[10px] tracking-widest text-quaresma-accent font-bold">
                        <span className="text-lg leading-none">{day.icone}</span>
                        <span>{day.pilar.toUpperCase()}</span>
                    </div>
                    <h1 className="font-serif-stitch text-4xl md:text-5xl text-quaresma-primary leading-tight lowercase first-letter:uppercase">
                        {day.tema}
                    </h1>
                    <p className="text-[11px] font-cinzel tracking-widest text-quaresma-primary/40 uppercase">
                        {formatDate(date)}
                    </p>
                </div>

                {/* Verse Card */}
                <div className="card-quaresma space-y-4">
                    <p className="font-serif-stitch text-xl italic text-quaresma-primary leading-relaxed">
                        "{day.textoVersiculo}"
                    </p>
                    <div className="h-px w-8 bg-quaresma-accent/30"></div>
                    <p className="font-cinzel text-[10px] tracking-widest text-quaresma-accent font-bold">
                        — {day.versiculo}
                    </p>
                </div>

                {/* Reflection */}
                <section className="space-y-4 relative">
                    <div className="watermark-40">{dayId}</div>
                    <div className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.2em] font-bold text-quaresma-primary/60">
                        <span className="material-symbols-outlined !text-sm">auto_stories</span>
                        REFLEXÃO
                    </div>
                    <p className="text-base leading-relaxed text-quaresma-text/90 drop-cap font-light text-justify">
                        {day.reflexao}
                    </p>
                </section>

                {/* Action Card */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.2em] font-bold text-quaresma-primary/60">
                        <span className="material-symbols-outlined !text-sm">tempest</span>
                        AÇÃO PRÁTICA
                    </div>
                    <div className="card-quaresma border-l-4 border-l-quaresma-accent">
                        <p className="text-sm leading-relaxed text-quaresma-primary font-medium italic">
                            {day.acaoPratica}
                        </p>
                    </div>
                </section>

                {/* Notes & Check-in */}
                <section className="space-y-6">
                    <div className="card-quaresma space-y-4 bg-quaresma-bg/50">
                        <div className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.2em] font-bold text-quaresma-primary/60">
                            <span className="material-symbols-outlined !text-sm">edit_note</span>
                            ANOTAÇÕES PESSOAIS
                        </div>
                        <textarea
                            className="w-full min-h-[140px] bg-white/50 border border-quaresma-accent/10 rounded-xl p-4 text-sm font-plain focus:ring-1 focus:ring-quaresma-accent/30 outline-none transition-all"
                            placeholder="O que o Espírito Santo falou ao seu coração hoje?"
                            value={notes}
                            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
                        />
                        <button
                            onClick={saveNotes}
                            className={`w-full py-3 rounded-xl font-cinzel text-[10px] tracking-widest transition-all ${saved ? 'bg-green-600 text-white' : 'bg-quaresma-primary text-white hover:brightness-110 active:scale-95'}`}
                        >
                            {saved ? "✓ SALVO" : "SALVAR ANOTAÇÕES"}
                        </button>
                    </div>

                    <button
                        onClick={handleCheckin}
                        className={`glow-btn w-full !rounded-2xl py-5 touch-manipulation transition-all duration-500 ${checkedIn ? '!bg-green-600 !shadow-green-900/20' : ''}`}
                    >
                        <span className="font-cinzel text-[11px] tracking-[0.3em]">
                            {checkedIn ? "DIA CONCLUÍDO ✓" : "CONCLUIR ESTE DIA"}
                        </span>
                    </button>
                </section>

                {/* Bottom Navigation */}
                <nav className="flex flex-col gap-4 mt-10">
                    {nextDayId && (
                        <Link href={`/dia/${nextDayId}`} className="card-quaresma flex items-center justify-between group hover:border-quaresma-accent/40 transition-all active:scale-[0.98] touch-manipulation">
                            <div className="space-y-1">
                                <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent">PRÓXIMO DIA</span>
                                <h4 className="font-serif-stitch text-lg text-quaresma-primary group-hover:text-quaresma-accent transition-colors">D{String(nextDayId).padStart(2, "0")} · {DAYS[nextDayId - 1].tema}</h4>
                            </div>
                            <span className="material-symbols-outlined text-quaresma-accent group-hover:translate-x-1 transition-transform">east</span>
                        </Link>
                    )}
                    {prevDayId && (
                        <Link href={`/dia/${prevDayId}`} className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest text-quaresma-primary/40 hover:text-quaresma-accent transition-colors mx-auto p-4 touch-manipulation">
                            <span className="material-symbols-outlined !text-sm">west</span>
                            VOLTAR AO DIA ANTERIOR
                        </Link>
                    )}
                </nav>
            </main>
        </div>
    );
}

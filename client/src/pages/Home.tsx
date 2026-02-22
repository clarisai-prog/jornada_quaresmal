import { useEffect, useState } from "react";
import { Link } from "wouter";
import { DAYS, getCurrentLentDay, getLentDate, type Pilar } from "@/data/days";

import { getCheckins } from "@/lib/checkin";


/* ─── Pilar Config ───────────────────────────── */
const PILAR_CONFIG: Record<Pilar, { emoji: string; color: string }> = {
    Oração: { emoji: "🙏", color: "#C4943A" },
    Jejum: { emoji: "✦", color: "#8B7355" },
    Esmola: { emoji: "💛", color: "#D4A03C" },
};

/* ─── Phase Grouping ─────────────────────────── */
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

/* ─── Component ──────────────────────────────── */
export function Home() {
    const [todayDay, setTodayDay] = useState<number | null>(null);
    const [checkins, setCheckins] = useState<Set<number>>(new Set());

    useEffect(() => {
        setTodayDay(getCurrentLentDay());
        setCheckins(getCheckins());
    }, []);

    // Progress is based on check-ins, NOT date
    const completedCount = checkins.size;
    const progress = Math.round((completedCount / 40) * 100);

    const pilarCount: Record<Pilar, number> = { Oração: 0, Jejum: 0, Esmola: 0 };
    DAYS.forEach(d => { pilarCount[d.pilar]++; });

    const todayData = todayDay ? DAYS[todayDay - 1] : null;

    function formatDate(d: Date) {
        return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    }

    return (
        <div style={S.page}>
            {/* ── Hero Banner ──────────────────── */}
            <header style={S.hero}>
                <p style={S.heroSub}>QUARESMA 2026</p>
                <h1 style={S.heroTitle}>Jornada Quaresmal</h1>
                <p style={S.heroTagline}>O Grande Recomeço</p>
                {todayData && (
                    <p style={S.heroVerse}>
                        "{todayData.textoVersiculo}"
                        <br />
                        <span style={{ fontSize: 11, opacity: 0.5 }}>— {todayData.versiculo}</span>
                    </p>
                )}
            </header>

            <div style={S.content}>
                {/* ── Dia Atual (informativo) ────── */}
                {todayData && todayDay && (
                    <div style={S.todayBanner}>
                        <div style={S.todayLeft}>
                            <span style={S.todayIcon}>{todayData.icone}</span>
                            <div>
                                <p style={S.todayLabel}>📅 Dia de Hoje — Dia {todayDay}</p>
                                <p style={S.todayTitle}>{todayData.tema}</p>
                                <p style={S.todayDate}>{formatDate(getLentDate(todayDay))}</p>
                            </div>
                        </div>
                        <Link href={`/dia/${todayDay}`} style={S.todayBtn}>
                            Abrir →
                        </Link>
                    </div>
                )}

                {!todayData && (
                    <div style={{ ...S.todayBanner, justifyContent: "center", textAlign: "center" }}>
                        <div>
                            <p style={{ fontSize: 28, margin: "0 0 8px" }}>🌿</p>
                            <p style={S.todayTitle}>A Quaresma ainda não começou</p>
                            <p style={S.todayDate}>Começa em 18 de fevereiro de 2026</p>
                        </div>
                    </div>
                )}

                {/* ── Os Três Pilares ──────────────── */}
                <h2 style={S.sectionTitle}>Os Três Pilares</h2>
                <div style={S.pilarRow}>
                    {(["Oração", "Jejum", "Esmola"] as Pilar[]).map((p) => (
                        <div key={p} style={S.pilarCard}>
                            <span style={{ fontSize: 24 }}>{PILAR_CONFIG[p].emoji}</span>
                            <span style={S.pilarName}>{p}</span>
                            <span style={S.pilarCount}>{pilarCount[p]} dias</span>
                        </div>
                    ))}
                </div>

                {/* ── Progress Bar (check-in based) ── */}
                <div style={S.progressRow}>
                    <span style={S.progressLabel}>
                        {completedCount} de 40 dias completados
                    </span>
                    <span style={S.progressPct}>{progress}%</span>
                </div>
                <div style={S.progressBar}>
                    <div style={{ ...S.progressFill, width: `${progress}%` }} />
                </div>

                {/* ── Phases ─────────────────────── */}
                {PHASES.map((phase, pi) => {
                    const phaseChecked = phase.ids.filter(id => checkins.has(id)).length;
                    return (
                        <section key={phase.label}>
                            <div style={S.phaseHeader}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span style={S.phaseRange}>{phase.range}</span>
                                    <span style={{ fontSize: 11, color: "#8B7355" }}>{phaseChecked}/{phase.ids.length}</span>
                                </div>
                                <h3 style={S.phaseTitle}>{phase.label}</h3>
                                <p style={S.phaseSubtitle}>{FASE_TITLES[pi]}</p>
                                <div style={S.phaseDivider} />
                            </div>

                            <div style={S.grid}>
                                {phase.ids.map((dayId) => {
                                    const day = DAYS[dayId - 1];
                                    const pilar = PILAR_CONFIG[day.pilar];
                                    const isDone = checkins.has(dayId);
                                    const isToday = todayDay !== null && dayId === todayDay;

                                    return (
                                        <Link key={dayId} href={`/dia/${dayId}`} style={{ textDecoration: "none" }}>
                                            <div
                                                style={{
                                                    ...S.dayCard,
                                                    background: isToday ? "rgba(196,148,58,.06)" : "#FDFAF4",
                                                    borderColor: isToday ? "#C4943A" : "#E8E0D0",
                                                }}
                                            >
                                                <div style={S.dayTop}>
                                                    <span style={S.dayNum}>D{String(dayId).padStart(2, "0")}</span>
                                                    <span
                                                        style={{
                                                            ...S.statusDot,
                                                            background: isDone ? "#4CAF50" : isToday ? "#C4943A" : "#d4d0c8",
                                                        }}
                                                    />
                                                </div>
                                                <p style={S.dayTitle}>{day.tema}</p>
                                                <div style={S.pilarTag}>
                                                    <span style={{ color: pilar.color, fontSize: 11 }}>
                                                        {pilar.emoji} {day.pilar}
                                                    </span>
                                                    {isToday && <span style={S.hojeBadge}>Hoje</span>}
                                                    {isDone && !isToday && <span style={S.doneBadge}>✓</span>}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}

                {/* ── Footer ─────────────────────── */}
                <div style={S.footer}>
                    <p style={S.footerText}>Jornada Quaresmal 2026 · 40 dias de transformação</p>
                    <p style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                        Todas as anotações são salvas localmente no seu dispositivo.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ─── Styles ─────────────────────────────────── */
const S = {
    page: {
        minHeight: "100dvh",
        background: "#F5F1E8",
        paddingBottom: 32,
    } as React.CSSProperties,

    /* Hero */
    hero: {
        background: "linear-gradient(180deg, #1a1309 0%, #2C2416 50%, #3D3020 100%)",
        padding: "52px 24px 36px",
        paddingTop: "calc(52px + env(safe-area-inset-top))",
        textAlign: "center" as const,
        color: "#F5F1E8",
    } as React.CSSProperties,
    heroSub: {
        fontSize: 11, letterSpacing: "0.2em",
        textTransform: "uppercase" as const, opacity: 0.55, marginBottom: 10,
    } as React.CSSProperties,
    heroTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 32,
        fontWeight: 700, lineHeight: 1.2, margin: "0 0 6px",
    } as React.CSSProperties,
    heroTagline: {
        fontFamily: "'Playfair Display', serif", fontSize: 17,
        fontStyle: "italic", opacity: 0.7, marginBottom: 20,
    } as React.CSSProperties,
    heroVerse: {
        fontSize: 13, fontStyle: "italic", opacity: 0.45,
        lineHeight: 1.6, maxWidth: 340, margin: "0 auto",
    } as React.CSSProperties,

    /* Content */
    content: { padding: "0 16px", maxWidth: 680, margin: "0 auto" } as React.CSSProperties,

    /* Today banner */
    todayBanner: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, padding: "16px 18px", marginTop: -20,
        background: "#FDFAF4", borderRadius: 16,
        border: "1.5px solid #E8E0D0",
        boxShadow: "0 4px 20px rgba(44,36,22,.12)",
        marginBottom: 24,
    } as React.CSSProperties,
    todayLeft: {
        display: "flex", alignItems: "center", gap: 12, flex: 1,
    } as React.CSSProperties,
    todayIcon: { fontSize: 32 } as React.CSSProperties,
    todayLabel: {
        fontSize: 10, letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: "#8B7355", fontWeight: 600, margin: "0 0 2px",
    } as React.CSSProperties,
    todayTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 16,
        fontWeight: 700, color: "#2C2416", margin: "0 0 2px",
    } as React.CSSProperties,
    todayDate: { fontSize: 12, color: "#6B6B6B", margin: 0 } as React.CSSProperties,
    todayBtn: {
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "10px 16px", background: "#8B7355", color: "#fff",
        borderRadius: 10, fontSize: 13, fontFamily: "'Lora', serif",
        fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const,
    } as React.CSSProperties,

    /* Section title */
    sectionTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 20,
        fontWeight: 700, color: "#2C2416",
        textAlign: "center" as const, marginTop: 4, marginBottom: 16,
    } as React.CSSProperties,

    /* Pilar cards */
    pilarRow: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10, marginBottom: 24,
    } as React.CSSProperties,
    pilarCard: {
        display: "flex", flexDirection: "column" as const,
        alignItems: "center", gap: 6, padding: "18px 10px",
        border: "1.5px solid #E8E0D0", borderRadius: 14, background: "#FDFAF4",
    } as React.CSSProperties,
    pilarName: {
        fontSize: 14, fontWeight: 700, color: "#2C2416",
        fontFamily: "'Playfair Display', serif",
    } as React.CSSProperties,
    pilarCount: { fontSize: 12, color: "#8B7355" } as React.CSSProperties,

    /* Progress */
    progressRow: {
        display: "flex", justifyContent: "space-between", marginBottom: 6,
    } as React.CSSProperties,
    progressLabel: { fontSize: 12, color: "#6B6B6B" } as React.CSSProperties,
    progressPct: { fontSize: 12, color: "#8B7355", fontWeight: 600 } as React.CSSProperties,
    progressBar: {
        height: 5, borderRadius: 5, background: "#E8E0D0",
        marginBottom: 32, overflow: "hidden",
    } as React.CSSProperties,
    progressFill: {
        height: "100%", borderRadius: 5,
        background: "linear-gradient(90deg, #C4943A, #8B7355)",
        transition: "width 0.5s ease",
    } as React.CSSProperties,

    /* Phase header */
    phaseHeader: { marginBottom: 16 } as React.CSSProperties,
    phaseRange: {
        fontSize: 12, color: "#C4943A", letterSpacing: "0.08em", fontWeight: 600,
    } as React.CSSProperties,
    phaseTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 22,
        fontWeight: 700, color: "#2C2416", margin: "4px 0 4px",
    } as React.CSSProperties,
    phaseSubtitle: {
        fontSize: 13, color: "#6B6B6B", fontStyle: "italic", margin: "0 0 12px",
    } as React.CSSProperties,
    phaseDivider: { height: 1, background: "#E8E0D0" } as React.CSSProperties,

    /* Grid */
    grid: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10, marginBottom: 32,
    } as React.CSSProperties,

    /* Day card */
    dayCard: {
        border: "1.5px solid #E8E0D0", borderRadius: 14,
        padding: "14px 14px 12px", background: "#FDFAF4",
        display: "flex", flexDirection: "column" as const,
        gap: 4, minHeight: 100,
    } as React.CSSProperties,
    dayTop: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
    } as React.CSSProperties,
    dayNum: {
        fontFamily: "'Playfair Display', serif", fontSize: 16,
        fontWeight: 700, color: "#2C2416",
    } as React.CSSProperties,
    statusDot: {
        width: 7, height: 7, borderRadius: "50%",
    } as React.CSSProperties,
    dayTitle: {
        fontSize: 11, color: "#3D3020", lineHeight: 1.4,
        margin: 0, flex: 1,
    } as React.CSSProperties,
    pilarTag: {
        display: "flex", alignItems: "center", gap: 6, marginTop: "auto",
    } as React.CSSProperties,
    hojeBadge: {
        fontSize: 9, fontWeight: 700, color: "#fff", background: "#C4943A",
        borderRadius: 6, padding: "2px 6px", letterSpacing: "0.05em",
    } as React.CSSProperties,
    doneBadge: {
        fontSize: 11, fontWeight: 700, color: "#4CAF50",
    } as React.CSSProperties,

    /* Footer */
    footer: { textAlign: "center" as const, padding: "24px 0 16px" } as React.CSSProperties,
    footerText: { fontSize: 13, color: "#8B7355" } as React.CSSProperties,
};

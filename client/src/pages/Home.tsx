import { useEffect, useState } from "react";
import { Link } from "wouter";
import { DAYS, getCurrentLentDay, getLentDate, type Pilar } from "@/data/days";
import { getCheckins } from "@/lib/checkin";

/* ─── Pilar Config ───────────────────────────── */
const PILAR_CONFIG: Record<Pilar, { emoji: string; color: string }> = {
    Oração: { emoji: "🙏", color: "#C5A059" },
    Jejum: { emoji: "✦", color: "#8B7355" },
    Esmola: { emoji: "❤️", color: "#C5A059" },
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
        window.scrollTo(0, 0);
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
            <div className="texture-overlay-quaresma"></div>

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

                {/* ── Botão do Livro de Introdução ── */}
                <Link href="/introducao" style={{ textDecoration: "none" }}>
                    <div style={S.introCard}>
                        <div style={S.introIcon}>📖</div>
                        <div style={{ flex: 1 }}>
                            <h3 style={S.introTitle}>Antes de Começar: A Introdução</h3>
                            <p style={S.introText}>Abra o livro digital para ler as instruções e a teologia da jornada.</p>
                        </div>
                        <div style={S.introArrow}>→</div>
                    </div>
                </Link>

                {/* ── Phases ─────────────────────── */}
                {PHASES.map((phase, pi) => {
                    const phaseChecked = phase.ids.filter(id => checkins.has(id)).length;
                    return (
                        <section key={phase.label}>
                            <div style={S.phaseHeader}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span style={S.phaseRange}>{phase.range}</span>
                                    <span style={{ fontSize: 11, color: "#C5A059" }}>{phaseChecked}/{phase.ids.length}</span>
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
                                                    background: isToday ? "rgba(197, 160, 89, 0.08)" : "#FFFFFF",
                                                    borderColor: isToday ? "#C5A059" : "rgba(61, 11, 13, 0.08)",
                                                }}
                                            >
                                                <div style={S.dayTop}>
                                                    <span style={S.dayNum}>D{String(dayId).padStart(2, "0")}</span>
                                                    <span
                                                        style={{
                                                            ...S.statusDot,
                                                            background: isDone ? "#4CAF50" : isToday ? "#C5A059" : "#d4d0c8",
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
        background: "#F9F8F3", // Creme centralizado
        paddingBottom: 32,
        position: "relative",
    } as React.CSSProperties,

    /* Hero */
    hero: {
        background: "linear-gradient(180deg, #3D0B0D 0%, #2A0809 100%)", // Burgundy centralizado
        padding: "52px 24px 36px",
        paddingTop: "calc(52px + env(safe-area-inset-top))",
        textAlign: "center" as const,
        color: "#F9F8F3",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    } as React.CSSProperties,
    heroSub: {
        fontFamily: "'Cinzel', serif",
        fontSize: 10, letterSpacing: "0.4em",
        textTransform: "uppercase" as const, opacity: 0.6, marginBottom: 12,
    } as React.CSSProperties,
    heroTitle: {
        fontFamily: "'Cinzel', serif", fontSize: 32,
        fontWeight: 700, lineHeight: 1.2, margin: "0 0 8px",
        letterSpacing: "0.05em",
    } as React.CSSProperties,
    heroTagline: {
        fontFamily: "'Playfair Display', serif", fontSize: 17,
        fontStyle: "italic", opacity: 0.8, marginBottom: 24,
    } as React.CSSProperties,
    heroVerse: {
        fontSize: 13, fontStyle: "italic", opacity: 0.5,
        lineHeight: 1.6, maxWidth: 340, margin: "0 auto",
        fontFamily: "'Playfair Display', serif",
    } as React.CSSProperties,

    /* Content */
    content: { padding: "0 16px", maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 10 } as React.CSSProperties,

    /* Today banner */
    todayBanner: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, padding: "18px 20px", marginTop: -20,
        background: "#FFFFFF", borderRadius: 16,
        border: "1px solid rgba(61, 11, 13, 0.08)",
        boxShadow: "0 8px 30px rgba(61, 11, 13, 0.06)",
        marginBottom: 32,
    } as React.CSSProperties,
    todayLeft: {
        display: "flex", alignItems: "center", gap: 14, flex: 1,
    } as React.CSSProperties,
    todayIcon: { fontSize: 32 } as React.CSSProperties,
    todayLabel: {
        fontFamily: "'Cinzel', serif",
        fontSize: 9, letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        color: "#C5A059", fontWeight: 700, margin: "0 0 4px",
    } as React.CSSProperties,
    todayTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 17,
        fontWeight: 700, color: "#3D0B0D", margin: "0 0 2px",
    } as React.CSSProperties,
    todayDate: { fontSize: 11, color: "#6B6B6B", margin: 0, opacity: 0.7 } as React.CSSProperties,
    todayBtn: {
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "10px 18px", background: "#3D0B0D", color: "#F9F8F3",
        borderRadius: 12, fontSize: 13, fontFamily: "'Cinzel', serif",
        fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const,
        boxShadow: "0 4px 12px rgba(61, 11, 13, 0.2)",
    } as React.CSSProperties,

    /* Section title */
    sectionTitle: {
        fontFamily: "'Cinzel', serif", fontSize: 18,
        letterSpacing: "0.2em",
        fontWeight: 700, color: "#3D0B0D",
        textAlign: "center" as const, marginTop: 8, marginBottom: 20,
        textTransform: "uppercase" as const,
    } as React.CSSProperties,

    /* Pilar cards */
    pilarRow: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12, marginBottom: 32,
    } as React.CSSProperties,
    pilarCard: {
        display: "flex", flexDirection: "column" as const,
        alignItems: "center", gap: 8, padding: "20px 10px",
        border: "1px solid rgba(61, 11, 13, 0.08)", borderRadius: 16, background: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
    } as React.CSSProperties,
    pilarName: {
        fontSize: 13, fontWeight: 700, color: "#3D0B0D",
        fontFamily: "'Cinzel', serif",
        letterSpacing: "0.1em",
    } as React.CSSProperties,
    pilarCount: { fontSize: 11, color: "#C5A059", fontWeight: 600 } as React.CSSProperties,

    /* Progress */
    progressRow: {
        display: "flex", justifyContent: "space-between", marginBottom: 8,
    } as React.CSSProperties,
    progressLabel: { fontSize: 12, color: "#6B6B6B", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" } as React.CSSProperties,
    progressPct: { fontSize: 14, color: "#3D0B0D", fontWeight: 700, fontFamily: "'Playfair Display', serif" } as React.CSSProperties,
    progressBar: {
        height: 6, borderRadius: 6, background: "rgba(61, 11, 13, 0.05)",
        marginBottom: 36, overflow: "hidden",
    } as React.CSSProperties,
    progressFill: {
        height: "100%", borderRadius: 6,
        background: "linear-gradient(90deg, #C5A059, #3D0B0D)",
        transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    } as React.CSSProperties,

    /* Intro Card */
    introCard: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "22px 24px",
        background: "linear-gradient(135deg, #3D0B0D 0%, #2A0809 100%)",
        borderRadius: 20,
        marginBottom: 40,
        color: "#F9F8F3",
        boxShadow: "0 10px 30px rgba(61, 11, 13, 0.15)",
        border: "1px solid rgba(255,255,255,0.05)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
    } as React.CSSProperties,
    introIcon: { fontSize: 32, position: "relative", zIndex: 10 } as React.CSSProperties,
    introTitle: {
        fontFamily: "'Cinzel', serif",
        letterSpacing: "0.05em",
        fontSize: 18,
        fontWeight: 700,
        margin: "0 0 4px",
        position: "relative",
        zIndex: 10,
    } as React.CSSProperties,
    introText: {
        fontSize: 12,
        opacity: 0.7,
        lineHeight: 1.5,
        margin: 0,
        maxWidth: "90%",
        position: "relative",
        zIndex: 10,
    } as React.CSSProperties,
    introArrow: {
        fontSize: 20,
        opacity: 0.5,
        position: "relative",
        zIndex: 10,
    } as React.CSSProperties,

    /* Phase header */
    phaseHeader: { marginBottom: 20, paddingTop: 12 } as React.CSSProperties,
    phaseRange: {
        fontFamily: "'Cinzel', serif",
        fontSize: 11, color: "#C5A059", letterSpacing: "0.15em", fontWeight: 700,
    } as React.CSSProperties,
    phaseTitle: {
        fontFamily: "'Playfair Display', serif", fontSize: 24,
        fontWeight: 700, color: "#3D0B0D", margin: "4px 0 4px",
    } as React.CSSProperties,
    phaseSubtitle: {
        fontSize: 13, color: "#6B6B6B", fontStyle: "italic", margin: "0 0 16px",
        opacity: 0.8,
    } as React.CSSProperties,
    phaseDivider: { height: 1.5, background: "rgba(61, 11, 13, 0.05)" } as React.CSSProperties,

    /* Grid */
    grid: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12, marginBottom: 40,
    } as React.CSSProperties,

    /* Day card */
    dayCard: {
        border: "1px solid rgba(61, 11, 13, 0.08)", borderRadius: 16,
        padding: "16px", background: "#FFFFFF",
        display: "flex", flexDirection: "column" as const,
        gap: 6, minHeight: 110,
        boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
        transition: "all 0.3s ease",
    } as React.CSSProperties,
    dayTop: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
    } as React.CSSProperties,
    dayNum: {
        fontFamily: "'Cinzel', serif", fontSize: 15,
        fontWeight: 700, color: "#3D0B0D",
        letterSpacing: "0.05em",
    } as React.CSSProperties,
    statusDot: {
        width: 8, height: 8, borderRadius: "50%",
    } as React.CSSProperties,
    dayTitle: {
        fontSize: 11, color: "#2D2926", lineHeight: 1.4,
        margin: 0, flex: 1, fontWeight: 500,
        opacity: 0.9,
    } as React.CSSProperties,
    pilarTag: {
        display: "flex", alignItems: "center", gap: 6, marginTop: "auto",
        paddingTop: 8,
    } as React.CSSProperties,
    hojeBadge: {
        fontFamily: "'Cinzel', serif",
        fontSize: 8, fontWeight: 700, color: "#F9F8F3", background: "#C5A059",
        borderRadius: 4, padding: "2px 5px", letterSpacing: "0.1em",
    } as React.CSSProperties,
    doneBadge: {
        fontSize: 12, fontWeight: 700, color: "#4CAF50",
    } as React.CSSProperties,

    /* Footer */
    footer: { textAlign: "center" as const, padding: "40px 0 24px", opacity: 0.6 } as React.CSSProperties,
    footerText: { fontSize: 13, color: "#3D0B0D", fontFamily: "'Cinzel', serif", letterSpacing: "0.05em" } as React.CSSProperties,
};

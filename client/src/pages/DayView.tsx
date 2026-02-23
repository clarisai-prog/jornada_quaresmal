import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { DAYS, getLentDate } from "@/data/days";
import { getNote, saveNote, hasCheckin, saveCheckin } from "@/lib/checkin";

export function DayView() {
    const { id } = useParams();
    const dayId = parseInt(id || "1");
    const day = DAYS[dayId - 1];
    const [, setLocation] = useLocation();

    const [note, setNote] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

    useEffect(() => {
        if (!day) {
            setLocation("/");
            return;
        }
        setNote(getNote(dayId));
        setIsDone(hasCheckin(dayId));
        window.scrollTo(0, 0);
    }, [dayId, day, setLocation]);

    if (!day) return null;

    const handleSaveNote = () => {
        setSaveStatus("saving");
        saveNote(dayId, note);
        setTimeout(() => setSaveStatus("saved"), 600);
        setTimeout(() => setSaveStatus("idle"), 2000);
    };

    const handleCheckin = () => {
        saveCheckin(dayId);
        setIsDone(true);
        // Feedback visual
        const btn = document.getElementById("checkin-btn");
        if (btn) {
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 100);
        }
    };

    function formatDate(d: Date) {
        return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
    }

    return (
        <div style={S.page}>
            <div className="texture-overlay-quaresma"></div>

            {/* Header / Top Bar */}
            <header style={S.header}>
                <Link href="/" style={S.backBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>arrow_back</span>
                </Link>
                <div style={{ textAlign: "center" }}>
                    <span style={S.headerLabel}>DIA {String(dayId).padStart(2, "0")}</span>
                    <span style={S.headerPhase}>FASE {Math.ceil(dayId / 10)}</span>
                </div>
                <div style={{ width: 40 }} />
            </header>

            {/* Main Content */}
            <main style={S.main}>
                <div style={S.topSection}>
                    <span style={S.pilarBadge}>
                        {day.pilar}
                    </span>
                    <h1 style={S.title}>{day.tema}</h1>
                    <p style={S.date}>{formatDate(getLentDate(dayId))}</p>
                </div>

                {/* Verse Card */}
                <div style={S.verseCard}>
                    <p style={S.verseText}>"{day.textoVersiculo}"</p>
                    <p style={S.verseRef}>— {day.versiculo}</p>
                </div>

                {/* Reflection */}
                <section style={S.section}>
                    <div className="watermark-40">{dayId}</div>
                    <h2 style={S.sectionHeading}>REFLEXÃO</h2>
                    <p style={S.reflectionText} className="drop-cap">
                        {day.reflexao}
                    </p>
                </section>

                {/* Action Card */}
                <section style={S.section}>
                    <h2 style={S.sectionHeading}>AÇÃO PRÁTICA</h2>
                    <div style={S.actionCard}>
                        <p style={S.actionText}>{day.acaoPratica}</p>
                    </div>
                </section>

                {/* Notes & Check-in */}
                <section style={S.section}>
                    <h2 style={S.sectionHeading}>ANOTAÇÕES PESSOAIS</h2>
                    <div style={S.notesContainer}>
                        <textarea
                            style={S.textarea}
                            placeholder="O que o Espírito Santo falou ao seu coração hoje?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <button
                            onClick={handleSaveNote}
                            style={{
                                ...S.saveBtn,
                                opacity: saveStatus === "idle" ? 1 : 0.7
                            }}
                        >
                            {saveStatus === "saving" ? "SALVANDO..." : saveStatus === "saved" ? "ANOTADO ✓" : "SALVAR ANOTAÇÕES"}
                        </button>
                    </div>

                    {!isDone ? (
                        <button
                            id="checkin-btn"
                            onClick={handleCheckin}
                            className="glow-btn"
                            style={S.checkinBtn}
                        >
                            CONCLUIR ESTE DIA
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                        </button>
                    ) : (
                        <div style={S.completedBadge}>
                            <span className="material-symbols-outlined">verified</span>
                            DIA CONCLUÍDO
                        </div>
                    )}
                </section>

                {/* Bottom Navigation */}
                <nav style={S.nav}>
                    {dayId < 40 && (
                        <Link href={`/dia/${dayId + 1}`} style={S.nextLink}>
                            PRÓXIMO DIA
                            <p style={S.nextTitle}>{DAYS[dayId].tema}</p>
                            <span className="material-symbols-outlined" style={S.nextIcon}>east</span>
                        </Link>
                    )}
                </nav>
            </main>
        </div>
    );
}

const S = {
    page: {
        minHeight: "100dvh",
        background: "#F9F8F3", // Creme centralizado
        color: "#2D2926",
        fontFamily: "'Playfair Display', serif",
        paddingBottom: 40,
        position: "relative",
        overflowX: "hidden",
    } as React.CSSProperties,

    header: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px",
        paddingTop: "calc(16px + env(safe-area-inset-top))",
        background: "rgba(249, 248, 243, 0.9)",
        backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid rgba(61, 11, 13, 0.05)",
    } as React.CSSProperties,
    backBtn: {
        width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: "50%", color: "#3D0B0D", textDecoration: "none",
    } as React.CSSProperties,
    headerLabel: {
        display: "block", fontFamily: "'Cinzel', serif", fontSize: 10,
        letterSpacing: "0.4em", fontWeight: 700, color: "#C5A059",
    } as React.CSSProperties,
    headerPhase: {
        fontSize: 10, fontStyle: "italic", opacity: 0.4, textTransform: "uppercase" as const,
    } as React.CSSProperties,

    main: {
        maxWidth: 600, margin: "0 auto", padding: "32px 24px",
        position: "relative", zIndex: 10,
    } as React.CSSProperties,

    topSection: { textAlign: "center" as const, marginBottom: 40 } as React.CSSProperties,
    pilarBadge: {
        display: "inline-block", padding: "4px 12px", borderRadius: 20,
        background: "rgba(197, 160, 89, 0.1)", color: "#C5A059",
        fontSize: 10, fontFamily: "'Cinzel', serif", fontWeight: 700,
        letterSpacing: "0.15em", marginBottom: 16,
    } as React.CSSProperties,
    title: {
        fontSize: 32, lineHeight: 1.1, color: "#3D0B0D",
        fontWeight: 700, margin: "0 0 12px",
    } as React.CSSProperties,
    date: {
        fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.1em",
        opacity: 0.4, fontWeight: 600,
    } as React.CSSProperties,

    verseCard: {
        background: "rgba(61, 11, 13, 0.03)",
        borderRadius: 20, padding: "28px 24px", textAlign: "center" as const,
        marginBottom: 48, border: "1px solid rgba(61, 11, 13, 0.05)",
    } as React.CSSProperties,
    verseText: {
        fontSize: 17, fontStyle: "italic", lineHeight: 1.6, color: "#3D0B0D",
        margin: "0 0 14px", opacity: 0.9,
    } as React.CSSProperties,
    verseRef: {
        fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.1em",
        opacity: 0.5, fontWeight: 700, margin: 0,
    } as React.CSSProperties,

    section: { marginBottom: 48, position: "relative" as const } as React.CSSProperties,
    sectionHeading: {
        fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em",
        color: "#C5A059", fontWeight: 700, marginBottom: 20,
    } as React.CSSProperties,
    reflectionText: {
        fontSize: 16, lineHeight: 1.8, color: "#2D2926",
        textAlign: "justify" as const, fontWeight: 400,
        opacity: 0.9,
    } as React.CSSProperties,

    actionCard: {
        background: "#FFFFFF", borderRadius: 16, padding: "24px",
        borderLeft: "4px solid #C5A059",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    } as React.CSSProperties,
    actionText: {
        fontSize: 15, lineHeight: 1.6, color: "#3D0B0D",
        fontStyle: "italic", fontWeight: 500, margin: 0,
    } as React.CSSProperties,

    notesContainer: { marginBottom: 24 } as React.CSSProperties,
    textarea: {
        width: "100%", height: 140, borderRadius: 16, padding: "16px",
        background: "rgba(255,255,255,0.7)", border: "1px solid rgba(61, 11, 13, 0.1)",
        fontSize: 14, fontFamily: "sans-serif", lineHeight: 1.5,
        resize: "none" as const, outline: "none", color: "#2D2926",
    } as React.CSSProperties,
    saveBtn: {
        width: "100%", padding: "14px", marginTop: 12,
        background: "rgba(61, 11, 13, 0.05)", border: "none",
        borderRadius: 12, fontSize: 11, fontFamily: "'Cinzel', serif",
        fontWeight: 700, letterSpacing: "0.1em", color: "#3D0B0D",
        cursor: "pointer", transition: "all 0.3s ease",
    } as React.CSSProperties,

    checkinBtn: {
        width: "100%", padding: "18px",
        background: "#3D0B0D", color: "#F9F8F3",
        border: "none", borderRadius: 16,
        fontSize: 14, fontFamily: "'Cinzel', serif", fontWeight: 700,
        letterSpacing: "0.2em", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        boxShadow: "0 10px 25px rgba(61, 11, 13, 0.25)",
        transition: "all 0.3s ease",
    } as React.CSSProperties,
    completedBadge: {
        width: "100%", padding: "18px",
        background: "rgba(76, 175, 80, 0.1)", color: "#4CAF50",
        borderRadius: 16, border: "1px dashed #4CAF50",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        fontSize: 13, fontFamily: "'Cinzel', serif", fontWeight: 700,
        letterSpacing: "0.1em",
    } as React.CSSProperties,

    nav: { marginTop: 40, borderTop: "1.5px solid rgba(61, 11, 13, 0.05)", paddingTop: 40 } as React.CSSProperties,
    nextLink: {
        display: "block", textDecoration: "none", color: "#3D0B0D",
        textAlign: "right" as const, position: "relative" as const,
        paddingRight: 40,
    } as React.CSSProperties,
    nextTitle: {
        fontSize: 22, fontWeight: 700, margin: "4px 0 0",
    } as React.CSSProperties,
    nextIcon: {
        position: "absolute" as const, right: 0, top: "50%", transform: "translateY(-50%)",
        fontSize: 32, color: "#C5A059",
    } as React.CSSProperties,
};

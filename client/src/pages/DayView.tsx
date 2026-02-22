import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { DAYS, getLentDate, getCurrentLentDay, type DayData } from "@/data/days";
import { getCheckins, toggleCheckin } from "@/lib/checkin";

const LS_NOTES_KEY = (id: number) => `notes_dia_${id}`;

/* ─── Helpers ────────────────────────────────── */
function formatDate(d: Date) {
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
}

function getFaseNumber(fase: string): number {
    if (fase.includes("Desconstrução")) return 1;
    if (fase.includes("Atrito")) return 2;
    if (fase.includes("Transbordamento")) return 3;
    return 4;
}

/* ─── Styles ─────────────────────────────────── */
const S = {
    page: {
        minHeight: "100dvh",
        background: "var(--linen, #F5F1E8)",
        paddingBottom: 32,
    } as React.CSSProperties,

    topBar: {
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", padding: "16px 20px",
        paddingTop: "calc(16px + env(safe-area-inset-top))",
    } as React.CSSProperties,
    backLink: {
        fontSize: 14, color: "#8B7355", fontFamily: "'Lora', serif",
        background: "rgba(139,115,85,.08)", border: "1px solid #E8E0D0",
        borderRadius: 8, padding: "6px 14px", cursor: "pointer", textDecoration: "none",
    } as React.CSSProperties,
    dayBadge: { textAlign: "right" as const } as React.CSSProperties,
    dayNum: {
        fontFamily: "'Playfair Display', serif", fontSize: 22,
        fontWeight: 700, color: "#2C2416", lineHeight: 1,
    } as React.CSSProperties,
    faseTag: {
        fontSize: 10, letterSpacing: "0.12em",
        textTransform: "uppercase" as const, color: "#8B7355", marginTop: 2,
    } as React.CSSProperties,

    content: { padding: "0 20px" } as React.CSSProperties,

    catLabel: {
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 12, letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: "#C4943A", fontWeight: 700, marginTop: 8, marginBottom: 12,
    } as React.CSSProperties,

    title: {
        fontFamily: "'Playfair Display', serif", fontSize: 28,
        fontWeight: 700, color: "#2C2416", lineHeight: 1.25, margin: "0 0 6px",
    } as React.CSSProperties,
    subtitle: {
        fontSize: 13, color: "#6B6B6B",
        textDecoration: "underline", textDecorationColor: "rgba(107,107,107,.25)",
        textUnderlineOffset: "3px", marginBottom: 24,
    } as React.CSSProperties,

    verseCard: {
        border: "1.5px solid #E8E0D0", borderRadius: 14,
        padding: "20px 22px", marginBottom: 28, background: "#FDFAF4",
    } as React.CSSProperties,
    verseText: {
        fontFamily: "'Playfair Display', serif", fontSize: 17,
        fontStyle: "italic", color: "#2C2416", lineHeight: 1.65, margin: 0,
    } as React.CSSProperties,
    verseRef: { fontSize: 13, color: "#C4943A", marginTop: 10 } as React.CSSProperties,

    sectionLabel: {
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 15, fontWeight: 700, color: "#2C2416", marginBottom: 12,
    } as React.CSSProperties,

    reflexao: {
        fontSize: 15, color: "#2C2416", lineHeight: 1.8, marginBottom: 28,
    } as React.CSSProperties,

    practiceCard: {
        border: "1.5px solid #E8E0D0", borderRadius: 14,
        padding: "20px 22px", marginBottom: 28, background: "#FDFAF4",
    } as React.CSSProperties,
    practiceText: {
        fontSize: 14, color: "#2C2416", lineHeight: 1.75, margin: 0,
    } as React.CSSProperties,

    notesCard: {
        border: "1.5px solid #E8E0D0", borderRadius: 14,
        padding: "20px 22px", marginBottom: 20, background: "#FDFAF4",
    } as React.CSSProperties,
    textarea: {
        width: "100%", minHeight: 130, resize: "vertical" as const,
        border: "1px solid #E8E0D0", borderRadius: 10,
        padding: "12px 14px", fontSize: 14, fontFamily: "'Lora', serif",
        color: "#2C2416", background: "#F5F1E8", outline: "none",
    } as React.CSSProperties,
    saveBtn: {
        display: "block", marginLeft: "auto", marginTop: 12,
        padding: "10px 22px", background: "#8B7355", color: "#fff",
        border: "none", borderRadius: 10, fontSize: 13,
        fontFamily: "'Lora', serif", fontWeight: 600, cursor: "pointer",
    } as React.CSSProperties,

    /* Check-in button */
    checkinBtn: (checked: boolean) => ({
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, width: "100%", padding: "16px 0", marginBottom: 20,
        background: checked ? "#4CAF50" : "#8B7355",
        color: "#fff", border: "none", borderRadius: 14,
        fontSize: 15, fontFamily: "'Playfair Display', serif",
        fontWeight: 700, cursor: "pointer",
        transition: "background 0.3s, transform 0.15s",
    } as React.CSSProperties),

    /* Navigation */
    navCard: {
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        gap: 8, padding: "16px 20px",
        border: "1.5px solid #E8E0D0", borderRadius: 14,
        background: "#FDFAF4", textDecoration: "none",
    } as React.CSSProperties,
    navInfo: { textAlign: "right" as const } as React.CSSProperties,
    navDayLabel: {
        fontFamily: "'Playfair Display', serif", fontSize: 16,
        fontWeight: 700, color: "#2C2416",
    } as React.CSSProperties,
    navDayTitle: { fontSize: 12, color: "#6B6B6B" } as React.CSSProperties,
    navArrow: { fontSize: 18, color: "#8B7355", marginLeft: 4 } as React.CSSProperties,
};

export function DayView() {
    const { id } = useParams<{ id: string }>();
    const dayId = parseInt(id ?? "1", 10);
    const todayDay = getCurrentLentDay();

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

    /* 404 */
    if (dayId < 1 || dayId > 40 || isNaN(dayId)) {
        return (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Dia não encontrado</h2>
                <Link href="/" style={{ color: "#8B7355", marginTop: 16, display: "block" }}>
                    ← Voltar ao início
                </Link>
            </div>
        );
    }

    const day: DayData = DAYS[dayId - 1];
    const date = getLentDate(dayId);
    const faseNum = getFaseNumber(day.fase);
    const nextDay = dayId < 40 ? DAYS[dayId] : null;
    const prevDay = dayId > 1 ? DAYS[dayId - 2] : null;

    return (
        <div style={S.page}>
            {/* ── Top bar ────────────────────────── */}
            <div style={S.topBar}>
                <Link href="/" style={S.backLink}>← Inicio</Link>
                <div style={S.dayBadge}>
                    <div style={S.dayNum}>D{String(dayId).padStart(2, "0")}</div>
                    <div style={S.faseTag}>FASE {faseNum}</div>
                </div>
            </div>

            {/* ── Content ────────────────────────── */}
            <div style={S.content}>
                <div style={S.catLabel}>
                    <span>{day.icone}</span>
                    <span>DIA {dayId} DE 40</span>
                </div>

                <h1 style={S.title}>{day.tema}</h1>
                <p style={S.subtitle}>{day.fase}</p>

                {/* Verse card */}
                <div style={S.verseCard}>
                    <p style={S.verseText}>"{day.textoVersiculo}"</p>
                    <p style={S.verseRef}>— {day.versiculo}</p>
                </div>

                {/* Reflexão */}
                <div style={S.sectionLabel}><span>💬</span> Reflexão</div>
                <p style={S.reflexao}>{day.reflexao}</p>

                {/* Ação Prática */}
                <div style={S.practiceCard}>
                    <div style={{ ...S.sectionLabel, marginBottom: 10 }}>
                        <span>🌿</span> Ação Prática
                    </div>
                    <p style={S.practiceText}>{day.acaoPratica}</p>
                </div>

                {/* Anotações */}
                <div style={S.notesCard}>
                    <div style={{ ...S.sectionLabel, marginBottom: 10 }}>
                        <span>📝</span> Minhas Anotações
                    </div>
                    <textarea
                        style={S.textarea}
                        placeholder="Escreva suas reflexões pessoais aqui..."
                        value={notes}
                        onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
                    />
                    <button style={S.saveBtn} onClick={saveNotes}>
                        {saved ? "✓ Salvo!" : "Salvar Anotações"}
                    </button>
                </div>

                {/* ── Check-in Button ──────────────── */}
                <button style={S.checkinBtn(checkedIn)} onClick={handleCheckin}>
                    {checkedIn ? "✓ Dia Completado" : "Marcar Dia como Concluído"}
                </button>
            </div>

            {/* ── Bottom navigation ──────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 20px" }}>
                {prevDay && (
                    <Link href={`/dia/${dayId - 1}`} style={{ ...S.navCard, justifyContent: "flex-start" }}>
                        <span style={{ ...S.navArrow, marginLeft: 0, marginRight: 4 }}>←</span>
                        <div style={{ textAlign: "left" }}>
                            <div style={S.navDayLabel}>D{String(dayId - 1).padStart(2, "0")}</div>
                            <div style={S.navDayTitle}>{prevDay.tema}</div>
                        </div>
                    </Link>
                )}
                {nextDay && (
                    <Link href={`/dia/${dayId + 1}`} style={S.navCard}>
                        <div style={S.navInfo}>
                            <div style={S.navDayLabel}>D{String(dayId + 1).padStart(2, "0")}</div>
                            <div style={S.navDayTitle}>{nextDay.tema}</div>
                        </div>
                        <span style={S.navArrow}>→</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

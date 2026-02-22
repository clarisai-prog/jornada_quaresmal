import { Link } from "wouter";
import { IntroBook } from "@/components/IntroBook";

export function Intro() {
    return (
        <div style={S.page}>
            <header style={S.header}>
                <Link href="/" style={S.backBtn}>
                    ← Voltar à Jornada
                </Link>
                <div style={S.headerContent}>
                    <p style={S.subTitle}>PREPARAÇÃO ESPIRITUAL</p>
                    <h1 style={S.title}>Introdução</h1>
                </div>
            </header>

            <main style={S.main}>
                <IntroBook />

                <div style={S.guide}>
                    <p>
                        Este livro contém a base teológica e prática para os seus 40 dias.
                        Recomendamos a leitura completa antes de iniciar o Primeiro Dia.
                    </p>
                </div>

                <Link href="/" style={S.startBtn}>
                    Iniciar Jornada Agora
                </Link>
            </main>
        </div>
    );
}

const S = {
    page: {
        minHeight: "100dvh",
        background: "#F5F1E8",
        paddingBottom: 40,
    } as React.CSSProperties,

    header: {
        padding: "24px 20px",
        paddingTop: "calc(24px + env(safe-area-inset-top))",
        background: "#FDFAF4",
        borderBottom: "1px solid #E8E0D0",
        display: "flex",
        flexDirection: "column" as const,
        gap: 16,
    } as React.CSSProperties,

    backBtn: {
        color: "#8B7355",
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'Lora', serif",
    } as React.CSSProperties,

    headerContent: {
        textAlign: "center" as const,
    } as React.CSSProperties,

    subTitle: {
        fontSize: 10,
        letterSpacing: "0.15em",
        color: "#8B7355",
        fontWeight: 700,
        margin: "0 0 4px",
    } as React.CSSProperties,

    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: 28,
        color: "#2C2416",
        margin: 0,
    } as React.CSSProperties,

    main: {
        padding: "24px 16px",
        maxWidth: 600,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
    } as React.CSSProperties,

    guide: {
        marginTop: 32,
        padding: "20px",
        background: "rgba(139, 115, 85, 0.05)",
        borderRadius: 12,
        fontSize: 14,
        color: "#6B6B6B",
        lineHeight: 1.6,
        fontStyle: "italic",
        textAlign: "center" as const,
        border: "1px dashed #E8E0D0",
        marginBottom: 32,
    } as React.CSSProperties,

    startBtn: {
        display: "block",
        width: "100%",
        padding: "16px",
        background: "#5A2D82",
        color: "#fff",
        borderRadius: 12,
        textAlign: "center" as const,
        textDecoration: "none",
        fontFamily: "'Lora', serif",
        fontWeight: 700,
        fontSize: 16,
        boxShadow: "0 4px 15px rgba(90, 45, 130, 0.25)",
    } as React.CSSProperties,
};

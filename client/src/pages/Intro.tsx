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
        background: "#000", // Match stitch theme better
    } as React.CSSProperties,

    header: {
        padding: "16px 20px",
        paddingTop: "calc(16px + env(safe-area-inset-top))",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 8,
        position: "absolute" as const,
        top: 0, left: 0, right: 0,
        zIndex: 50,
    } as React.CSSProperties,

    backBtn: {
        color: "#fff",
        fontSize: 12,
        fontWeight: 600,
        textDecoration: "none",
        fontFamily: "'Cinzel', serif",
        opacity: 0.6,
    } as React.CSSProperties,

    headerContent: {
        textAlign: "center" as const,
        display: "none", // Design files have their own titles
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
        padding: 0,
        width: "100%",
        maxWidth: "none",
        margin: 0,
        display: "flex",
        flexDirection: "column" as const,
    } as React.CSSProperties,

    guide: { display: "none" }, // Redundant with stitch content
    startBtn: { display: "none" }, // Included in last stitch slide
};

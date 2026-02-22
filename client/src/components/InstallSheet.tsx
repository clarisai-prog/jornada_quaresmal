import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_KEY = "install_dismissed_v1";
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isInStandalone = window.matchMedia("(display-mode: standalone)").matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true;

export function InstallSheet() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isInStandalone) return;
        if (sessionStorage.getItem(LS_KEY)) return;

        if (isIOS && isSafari) {
            const t = setTimeout(() => setShow(true), 4000);
            return () => clearTimeout(t);
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            const t = setTimeout(() => setShow(true), 4000);
            return () => clearTimeout(t);
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    function dismiss() {
        sessionStorage.setItem(LS_KEY, "1");
        setShow(false);
    }

    async function install() {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") { setShow(false); return; }
        }
        dismiss();
    }

    if (!show) return null;

    return (
        <div className="install-backdrop" onClick={dismiss}>
            <div
                className="install-sheet"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="install-handle" />
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 40 }}>✝️</div>
                    <div>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600 }}>
                            Instalar Jornada Quaresmal
                        </p>
                        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                            Acesse offline • Sem App Store
                        </p>
                    </div>
                </div>

                {isIOS ? (
                    <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>
                        <p style={{ marginBottom: 8 }}>Para instalar no iPhone ou iPad:</p>
                        <ol style={{ paddingLeft: 20 }}>
                            <li>Toque no ícone de <strong>Compartilhar</strong> (quadrado com seta superior).</li>
                            <li>Role para baixo e toque em <strong>Adicionar à Tela de Início</strong>.</li>
                        </ol>
                    </div>
                ) : (
                    <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>
                        <p style={{ marginBottom: 8 }}>Acesse os 40 dias de qualquer lugar:</p>
                        <ul style={{ paddingLeft: 20, listStyleType: "none" }}>
                            <li>✨ Toque no botão <strong>Instalar</strong> abaixo.</li>
                            <li style={{ marginTop: 4, fontSize: 12, fontStyle: "italic" }}>
                                * Caso não apareça, use o menu do navegador e selecione "Instalar aplicativo".
                            </li>
                        </ul>
                    </div>
                )}

                <div style={{ display: "flex", gap: 12 }}>
                    {!isIOS && (
                        <button
                            onClick={install}
                            style={{
                                flex: 1, padding: "12px 0", background: "var(--purple, #5A2D82)",
                                color: "#fff", border: "none", borderRadius: 10,
                                fontSize: 15, fontFamily: "'Lora', serif", cursor: "pointer",
                            }}
                        >
                            Instalar
                        </button>
                    )}
                    <button
                        onClick={dismiss}
                        style={{
                            flex: isIOS ? 1 : 0, padding: "12px 20px",
                            background: "var(--border)", color: "var(--dark)",
                            border: "none", borderRadius: 10, fontSize: 15,
                            fontFamily: "'Lora', serif", cursor: "pointer",
                        }}
                    >
                        {isIOS ? "Entendi" : "Agora não"}
                    </button>
                </div>
            </div>
        </div>
    );
}

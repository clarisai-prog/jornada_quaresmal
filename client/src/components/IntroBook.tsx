import React, { useState } from "react";
import { useLocation } from "wouter";

export const IntroBook: React.FC = () => {
    const [page, setPage] = useState(0);
    const [, setLocation] = useLocation();

    const slides = [
        {
            title: "Jornada Quaresmal",
            subtitle: "O Grande Recomeço",
            content: "A Quaresma transcende a mera cronologia para se estabelecer como um paradigma de reestruturação espiritual. É o deserto existencial necessário para que o ruído do mundo seja silenciado e a voz do divino possa echoar.",
            type: "capa"
        },
        {
            title: "O Arquétipo do Deserto",
            subtitle: "Gestaçã de uma Nova Realidade",
            content: "O número quarenta figura como o arquétipo bíblico universal da gestação de uma nova realidade: Israel no deserto, Moisés no Sinai, Elias no Horebe e, fundamentalmente, Jesus no deserto.",
            type: "content"
        },
        {
            title: "A Mecânica da Graça",
            subtitle: "Os Três Pilares Interdependentes",
            content: "Jejum, Oração e Esmola compõem um sistema de energia espiritual. O jejum cria o vácuo, a oração preenche esse espaço com a presença divina, e a esmola permite que essa graça transborde para o próximo.",
            type: "content"
        },
        {
            title: "Arquitetura da Jornada",
            subtitle: "D01 a D40: Escada para a Páscoa",
            content: "Um roteiro projetado para a desconstrução da vaidade, o enfrentamento dos vícios e a união mística com a Paixão. Uma caminhada de 40 dias rumo à nova criação.",
            type: "content"
        },
        {
            title: "O Chamado Final",
            subtitle: "Rasgai o Vosso Coração",
            content: "Não buscamos um estoicismo cansado, mas uma alma genuinamente perdoada e iluminada. O seu momento ideal para começar é agora. Vamos juntos?",
            type: "final"
        }
    ];

    const currentSlide = slides[page];

    return (
        <div className="fixed inset-0 bg-[#121013] text-[#EAE0D5] font-plain overflow-hidden flex flex-col">
            <div className="texture-overlay-stitch opacity-10"></div>

            {/* Minimal Header */}
            <header className="relative z-20 p-6 flex justify-between items-center opacity-40">
                <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">Introdução</span>
                <span className="font-serif-stitch italic text-xs">{page + 1} / {slides.length}</span>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-8 text-center max-w-lg mx-auto w-full">
                <div key={page} className="animate-fade-in-up space-y-6">
                    {currentSlide.type === "capa" ? (
                        <>
                            <h1 className="font-cinzel text-5xl md:text-6xl text-[var(--stitch-gold)] leading-tight tracking-tight">
                                {currentSlide.title}
                            </h1>
                            <div className="h-px w-12 bg-[var(--stitch-gold)]/30 mx-auto"></div>
                            <h2 className="font-serif-stitch text-2xl italic opacity-80 decoration-[var(--stitch-gold)]">
                                {currentSlide.subtitle}
                            </h2>
                            <p className="text-sm leading-relaxed opacity-60 font-light pt-4">
                                {currentSlide.content}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="inline-block px-3 py-1 border border-[var(--stitch-gold)]/20 rounded-full">
                                <span className="font-cinzel text-[9px] tracking-[0.2em] text-[var(--stitch-gold)] uppercase">Capítulo {page}</span>
                            </div>
                            <h2 className="font-cinzel text-3xl text-white tracking-wide">
                                {currentSlide.title}
                            </h2>
                            <h3 className="font-serif-stitch text-xl italic text-[var(--stitch-gold-light)] opacity-70">
                                {currentSlide.subtitle}
                            </h3>
                            <div className="glass-panel-stitch p-8 rounded-3xl relative overflow-hidden group border-white/5 shadow-2xl">
                                <p className="text-base leading-relaxed opacity-80 font-light">
                                    {currentSlide.content}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Navigation Footer */}
            <footer className="relative z-20 p-8 pb-12 flex items-center justify-between gap-4 max-w-lg mx-auto w-full">
                {page > 0 ? (
                    <button
                        onClick={() => setPage(page - 1)}
                        className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-all text-xs uppercase tracking-widest"
                    >
                        <span className="material-symbols-outlined text-lg">west</span>
                        Voltar
                    </button>
                ) : <div className="w-16"></div>}

                {page < slides.length - 1 ? (
                    <button
                        onClick={() => setPage(page + 1)}
                        className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full transition-all active:scale-95 border border-white/10 flex items-center gap-3 gold-glow-stitch"
                    >
                        <span className="font-cinzel text-xs tracking-widest text-[var(--stitch-gold-light)]">Prosseguir</span>
                        <span className="material-symbols-outlined text-sm text-[var(--stitch-gold)]">east</span>
                    </button>
                ) : (
                    <button
                        onClick={() => setLocation("/")}
                        className="bg-[var(--stitch-gold)] text-[var(--stitch-purple-deep)] px-10 py-4 rounded-xl font-cinzel text-xs tracking-[0.2em] transition-all hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        Iniciar Jornada
                    </button>
                )}
            </footer>
        </div>
    );
};

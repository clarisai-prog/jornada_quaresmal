import React, { useState } from "react";
import { useLocation } from "wouter";

export const IntroBook: React.FC = () => {
    const [page, setPage] = useState(0);
    const [, setLocation] = useLocation();

    const slides = [
        {
            title: "Jornada Quaresmal",
            subtitle: "O GRANDE RECOMEÇO",
            content: "A Quaresma transcende a mera cronologia para se estabelecer como um paradigma de reestruturação espiritual.",
            type: "capa"
        },
        {
            title: "O Mistério dos 40 Dias",
            subtitle: "TEOLOGIA DO TEMPO",
            content: "O número quarenta figura como o arquétipo bíblico universal da gestação de uma nova realidade.",
            type: "content",
            details: [
                { id: "01", title: "ISRAEL NO DESERTO", text: "Foram quarenta anos em que o povo de Israel vagou para purgar a mentalidade de escravidão." },
                { id: "02", title: "MOISÉS NO SINAI", text: "Quarenta dias de jejum no Monte Sinai para receber a Lei, face a face com o Divino." },
                { id: "03", title: "ELIAS NO HOREBE", text: "A caminhada purificadora do profeta até a montanha de Deus, sustentado pelo pão do céu." }
            ]
        },
        {
            title: "A Mecânica da Graça",
            subtitle: "JORNADA QUARESMAL",
            content: "Um sistema perfeito e interdependente para sustentar o seu recomeço.",
            type: "mechanics",
            pillars: [
                { icon: "U", title: "O Jejum", text: "A restrição cria um vácuo interior, quebrando a dependência de estímulos externos." },
                { icon: "+", title: "A Oração", text: "Entra para preencher o espaço que o jejum abriu, enchendo a alma com a presença divina." },
                { icon: "↑", title: "A Esmola", text: "A graça não é retida, ela transborda em direção ao próximo." }
            ]
        },
        {
            title: "O Chamado Final",
            subtitle: "JOEL 2:13",
            content: "\"Rasgai o vosso coração, e não as vossas vestes.\"",
            type: "final"
        }
    ];

    const currentSlide = slides[page];

    return (
        <div className="fixed inset-0 bg-quaresma text-quaresma-text font-plain overflow-y-auto flex flex-col">
            {/* Header */}
            <header className="p-6 flex justify-between items-center bg-quaresma sticky top-0 z-20">
                <button
                    onClick={() => page > 0 ? setPage(page - 1) : setLocation("/")}
                    className="material-symbols-outlined text-quaresma-primary"
                >
                    arrow_back
                </button>
                <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-quaresma-accent">
                    {currentSlide.subtitle || "Jornada Quaresmal"}
                </span>
                <span className="material-symbols-outlined text-quaresma-primary">more_horiz</span>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-6 pb-12 max-w-lg mx-auto w-full">
                <div key={page} className="animate-fade-in-up space-y-8">
                    {currentSlide.type === "capa" ? (
                        <div className="pt-12 text-center space-y-6">
                            <div className="h-px w-12 bg-quaresma-accent/30 mx-auto"></div>
                            <h1 className="font-serif-stitch text-5xl text-quaresma-primary leading-tight">
                                {currentSlide.title.split(' ')[0]} <br />
                                <span className="italic font-light">{currentSlide.title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-sm leading-relaxed opacity-70 max-w-[280px] mx-auto">
                                {currentSlide.content}
                            </p>
                        </div>
                    ) : currentSlide.type === "mechanics" ? (
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <div className="h-px w-12 bg-quaresma-accent/30 mx-auto mb-4"></div>
                                <h1 className="font-serif-stitch text-4xl text-quaresma-primary leading-tight">
                                    {currentSlide.title.split(' ')[0]} <br />
                                    <span className="italic font-light">{currentSlide.title.split(' ').slice(1).join(' ')}</span>
                                </h1>
                                <p className="text-sm leading-relaxed opacity-60">
                                    {currentSlide.content}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {currentSlide.pillars?.map((pillar, i) => (
                                    <div key={i} className="card-quaresma flex gap-4 items-start relative overflow-hidden">
                                        <div className="text-2xl font-serif-stitch text-quaresma-primary mt-1">{pillar.icon}</div>
                                        <div className="space-y-1">
                                            <h4 className="font-serif-stitch italic text-xl text-quaresma-primary">{pillar.title}</h4>
                                            <p className="text-xs leading-relaxed opacity-70">{pillar.text}</p>
                                        </div>
                                        {/* Decorative watermark icon */}
                                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-7xl select-none pointer-events-none">
                                            {pillar.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : currentSlide.type === "content" ? (
                        <div className="space-y-8 relative">
                            <div className="absolute right-0 top-0 text-9xl font-serif-stitch opacity-[0.03] pointer-events-none">40</div>
                            <div className="space-y-4 pt-12">
                                <h1 className="font-serif-stitch text-4xl text-quaresma-primary leading-tight">
                                    {currentSlide.title}
                                </h1>
                                <p className="text-sm leading-relaxed opacity-70 border-l-2 border-quaresma-accent pl-4 italic">
                                    "{currentSlide.content}"
                                </p>
                            </div>

                            <div className="space-y-6">
                                {currentSlide.details?.map((detail, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="font-cinzel text-quaresma-accent font-bold">{detail.id}</span>
                                        <div className="space-y-1">
                                            <h4 className="font-cinzel text-xs tracking-wider font-bold text-quaresma-primary uppercase">{detail.title}</h4>
                                            <p className="text-xs leading-relaxed opacity-60 text-pretty">{detail.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="pt-24 text-center space-y-12">
                            <div className="space-y-4">
                                <span className="text-quaresma-accent text-3xl opacity-30 italic">"</span>
                                <h2 className="font-serif-stitch text-3xl text-quaresma-primary leading-relaxed px-4">
                                    {currentSlide.content}
                                </h2>
                                <span className="block font-cinzel text-[10px] tracking-widest text-quaresma-accent uppercase pt-4">
                                    {currentSlide.subtitle}
                                </span>
                            </div>

                            <button
                                onClick={() => setLocation("/")}
                                className="w-full bg-quaresma-primary text-white py-4 rounded-lg font-cinzel text-xs tracking-[0.2em] transition-all hover:brightness-125 active:scale-[0.98] shadow-lg shadow-burgundy-900/20"
                            >
                                INICIAR JORNADA
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Navigation (Sticky) */}
            {currentSlide.type !== "final" && (
                <footer className="p-8 bg-quaresma/80 backdrop-blur-sm flex items-center justify-between sticky bottom-0">
                    <button
                        onClick={() => page > 0 && setPage(page - 1)}
                        className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-opacity ${page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'}`}
                    >
                        <span className="material-symbols-outlined text-sm">west</span>
                        Anterior
                    </button>

                    <button
                        onClick={() => setPage(page + 1)}
                        className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest text-quaresma-accent hover:text-quaresma-primary transition-colors"
                    >
                        PRÓXIMO
                        <span className="material-symbols-outlined text-sm">east</span>
                    </button>
                </footer>
            )}
        </div>
    );
};

import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

export const IntroBook: React.FC = () => {
    const [page, setPage] = useState(0);
    const [, setLocation] = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const slides = [
        {
            title: "Jornada Quaresmal",
            subtitle: "O GRANDE RECOMEÇO",
            content: "A Quaresma transcende a mera cronologia para se estabelecer como um paradigma de reestruturação espiritual.",
            type: "capa"
        },
        {
            title: "O seu momento ideal para começar é agora",
            subtitle: "INTRODUÇÃO",
            content: "Bem-vindo ao seu deserto. No seio da tradição bíblica e cristã, o deserto nunca foi um lugar de abandono ou punição, mas o ambiente exato onde Deus atrai os Seus filhos para falar ao coração.",
            type: "content",
            details: [
                { id: "✝", title: "O DESERTO", text: "O ambiente exato onde Deus atrai os Seus filhos para falar ao coração." },
                { id: "✝", title: "RELACIONAMENTO", text: "O catolicismo é um relacionamento vivo com uma Pessoa — Jesus Cristo — e não o cumprimento estéril de uma planilha." }
            ]
        },
        {
            title: "Deus não faz chamada",
            subtitle: "A TEOLOGIA DO AGORA",
            content: "Se você pulou dias ou se sentiu atrasado, abandone a linguagem do fracasso. Deus não olha para a planilha, Ele olha para o seu coração hoje.",
            type: "content",
            details: [
                { id: "01", title: "SEM COBRANÇAS", text: "Não importa se você começou no primeiro dia ou na metade do caminho." },
                { id: "02", title: "O MOMENTO", text: "O seu momento ideal para começar é exatamente agora." }
            ]
        },
        {
            title: "O Mistério dos 40 Dias",
            subtitle: "TEOLOGIA DO TEMPO",
            content: "Na Bíblia, o número quarenta é o arquétipo universal da gestação de uma nova realidade. Não é apenas um tempo cronológico, mas um tempo kairótico — o momento oportuno de Deus.",
            type: "content",
            details: [
                { id: "01", title: "ISRAEL NO DESERTO", text: "Quarenta anos para purgar a mentalidade de escravidão antes de adentrar a Terra Prometida (Dt 8)." },
                { id: "02", title: "MOISÉS NO SINAI", text: "Quarenta dias de jejum para receber a Lei, face a face com o Divino (Êx 34:28)." },
                { id: "03", title: "ELIAS NO HOREBE", text: "A caminhada purificadora sustentado pelo pão do céu até a montanha de Deus (1 Rs 19:8)." },
                { id: "✝", title: "O NOVO ADÃO", text: "Jesus inverteu a queda de nossos primeiros pais unindo a nossa vida ao Seu mistério no deserto." }
            ]
        },
        {
            title: "A Mecânica da Graça",
            subtitle: "MATEUS 6",
            content: "Para que este recomeço seja sustentável, Cristo nos entrega três pilares que não funcionam isolados. Rasgar o coração significa parar de fingir e entregar a Ele a sua fraqueza.",
            type: "mechanics",
            pillars: [
                { icon: "U", title: "O Jejum", text: "A restrição (comida, telas, conforto) cria um vácuo interior, quebrando a dependência de estímulos. Sem oração, é apenas dieta." },
                { icon: "+", title: "A Oração", text: "Preenche o espaço que o jejum abriu, enchendo a alma com a presença divina no silêncio do quarto (Mt 6:6)." },
                { icon: "↑", title: "A Esmola", text: "A graça não é retida, ela transborda. É o ato de escoar a graça recebida em direção ao próximo (Mt 6:3)." }
            ]
        },
        {
            title: "Como usar este livro",
            subtitle: "GUIA PRÁTICO",
            content: "Este não é um teste de resistência. É um manual para o reencontro espiritual.",
            type: "mechanics",
            pillars: [
                { icon: "01", title: "Reflexões Diárias", text: "Encontre 40 reflexões (D01 a D40). Não há datas fixas. Leia e deixe o versículo iluminar sua consciência." },
                { icon: "02", title: "A Micro-Ação", text: "Espiritualidade sem obras é ilusão. Execute a ação prática que traduz sua oração em atitude visível." },
                { icon: "03", title: "Misericórdia", text: "Se falhar, não tente 'passar fome em dobro'. Apenas levante-se e retome de onde parou." }
            ]
        },
        {
            title: "O Chamado Final",
            subtitle: "JOEL 2:13",
            content: "Rasgai o vosso coração, e não as vossas vestes. Somos pó, mas o sopro do Espírito nos garante a eternidade.",
            type: "final"
        }
    ];

    const currentSlide = slides[page];

    return (
        <div className="fixed inset-0 bg-quaresma-bg text-quaresma-text font-plain overflow-y-auto flex flex-col selection:bg-quaresma-accent/20 pt-[env(safe-area-inset-top)] [WebkitOverflowScrolling:touch]">
            <div className="texture-overlay-quaresma"></div>

            {/* Header */}
            <header className="p-4 md:p-6 flex justify-between items-center bg-quaresma-bg/90 backdrop-blur-md sticky top-0 z-30 border-b border-quaresma-accent/5">
                <button
                    onClick={() => page > 0 ? setPage(page - 1) : setLocation("/")}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-quaresma-primary/5 active:scale-90 transition-all touch-manipulation"
                    aria-label="Voltar"
                >
                    <span className="material-symbols-outlined text-quaresma-primary !text-2xl">arrow_back</span>
                </button>
                <div className="text-center">
                    <span className="font-cinzel text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-quaresma-accent block">
                        JORNADA QUARESMAL
                    </span>
                    <span className="font-serif-stitch italic text-[10px] opacity-40">
                        {currentSlide.subtitle}
                    </span>
                </div>
                <div className="w-10"></div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow px-6 py-10 md:py-16 max-w-lg mx-auto w-full">
                <div key={page} className="animate-fade-in-up space-y-10 md:space-y-12">
                    {currentSlide.type === "capa" ? (
                        <div className="pt-8 text-center space-y-8">
                            <div className="h-px w-10 bg-quaresma-accent/40 mx-auto"></div>
                            <h1 className="font-serif-stitch text-5xl md:text-6xl text-quaresma-primary leading-[1.1]">
                                {currentSlide.title.split(' ')[0]} <br />
                                <span className="italic font-light">{currentSlide.title.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-[300px] mx-auto text-pretty font-light">
                                {currentSlide.content}
                            </p>
                        </div>
                    ) : currentSlide.type === "mechanics" ? (
                        <div className="space-y-10">
                            <div className="text-center space-y-4">
                                <div className="h-px w-10 bg-quaresma-accent/40 mx-auto mb-6"></div>
                                <h1 className="font-serif-stitch text-4xl md:text-5xl text-quaresma-primary leading-tight">
                                    {currentSlide.title.split(' ')[0]} <br />
                                    <span className="italic font-light">{currentSlide.title.split(' ').slice(1).join(' ')}</span>
                                </h1>
                                <p className="text-sm opacity-60 max-w-[320px] mx-auto font-light">
                                    {currentSlide.content}
                                </p>
                            </div>

                            <div className="space-y-5">
                                {currentSlide.pillars?.map((pillar, i) => (
                                    <div key={i} className="pillar-card group">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-quaresma-primary/5 text-quaresma-primary shrink-0 group-hover:bg-quaresma-primary transition-all group-hover:text-white">
                                            <span className="text-2xl font-serif-stitch italic">{pillar.icon}</span>
                                        </div>
                                        <div className="space-y-1.5 pr-4 relative z-10 flex-1">
                                            <h4 className="font-serif-stitch italic text-xl text-quaresma-primary">{pillar.title}</h4>
                                            <p className="text-[13px] leading-relaxed text-quaresma-text/70 font-light">{pillar.text}</p>
                                        </div>
                                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-8xl font-serif-stitch select-none pointer-events-none group-hover:scale-110 transition-transform">
                                            {pillar.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : currentSlide.type === "content" ? (
                        <div className="space-y-10 relative pb-10">
                            <div className="watermark-40">40</div>
                            <div className="space-y-5 pt-10">
                                <h1 className="font-serif-stitch text-4xl md:text-5xl text-quaresma-primary leading-tight">
                                    {currentSlide.title}
                                </h1>
                                <p className="text-sm md:text-base leading-relaxed opacity-80 quote-border italic font-light">
                                    "{currentSlide.content}"
                                </p>
                            </div>

                            <div className="space-y-8">
                                {currentSlide.details?.map((detail, i) => (
                                    <div key={i} className="flex gap-5 items-start group">
                                        <span className="font-cinzel text-quaresma-accent font-bold text-lg leading-none pt-1 opacity-60 group-hover:opacity-100 transition-opacity">{detail.id}</span>
                                        <div className="space-y-2">
                                            <h4 className="font-cinzel text-[11px] tracking-widest font-bold text-quaresma-primary uppercase">{detail.title}</h4>
                                            <p className="text-sm leading-relaxed text-quaresma-text/80 font-light text-pretty drop-cap">
                                                {detail.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="pt-20 text-center space-y-16">
                            <div className="space-y-6">
                                <span className="text-quaresma-accent text-5xl opacity-40 italic font-serif-stitch">"</span>
                                <h2 className="font-serif-stitch text-3xl md:text-4xl text-quaresma-primary leading-snug px-4 italic font-light">
                                    {currentSlide.content}
                                </h2>
                                <div className="h-px w-8 bg-quaresma-accent/30 mx-auto mt-8"></div>
                                <span className="block font-cinzel text-[10px] tracking-[0.4em] text-quaresma-accent uppercase pt-2 opacity-60">
                                    {currentSlide.subtitle}
                                </span>
                            </div>

                            <button
                                onClick={() => setLocation("/")}
                                className="glow-btn touch-manipulation mb-[env(safe-area-inset-bottom)]"
                            >
                                <span className="font-cinzel text-[11px] tracking-[0.3em]">INICIAR JORNADA</span>
                                <span className="material-symbols-outlined !text-lg">church</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Navigation (Sticky) */}
            {currentSlide.type !== "final" && (
                <footer className="p-6 md:p-8 pb-[calc(24px+env(safe-area-inset-bottom))] bg-quaresma-bg/95 backdrop-blur-md flex items-center justify-between sticky bottom-0 z-30 border-t border-quaresma-accent/5">
                    <button
                        onClick={() => page > 0 && setPage(page - 1)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full hover:bg-quaresma-primary/5 transition-all touch-manipulation ${page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-60 hover:opacity-100 active:scale-90'}`}
                        aria-label="Anterior"
                    >
                        <span className="material-symbols-outlined !text-2xl text-quaresma-primary">west</span>
                    </button>

                    <div className="flex gap-1.5">
                        {slides.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === page ? 'w-4 bg-quaresma-accent' : 'w-1 bg-quaresma-accent/20'}`}></div>
                        ))}
                    </div>

                    <button
                        onClick={() => page < slides.length - 1 && setPage(page + 1)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full bg-quaresma-primary/5 hover:bg-quaresma-primary/10 text-quaresma-accent transition-all active:scale-95 group touch-manipulation ${page === slides.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <span className="font-cinzel text-[10px] tracking-[0.2em] font-bold group-hover:text-quaresma-primary transition-colors">PRÓXIMO</span>
                        <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">east</span>
                    </button>
                </footer>
            )}
        </div>
    );
};

import React, { useState } from "react";
import { useLocation } from "wouter";

// ─── STITCH PAGES (EXACT REPLICAS) ───────────────────────────────────────────

export const IntroBook: React.FC = () => {
    const [page, setPage] = useState(0);
    const [, setLocation] = useLocation();

    // Map each "slide" to its exact design
    switch (page) {
        case 0: return <CapaStitch onNext={() => setPage(1)} />;
        case 1: return <Page1Stitch onNext={() => setPage(2)} onPrev={() => setPage(0)} onMenu={() => setLocation("/")} />;
        case 2: return <Page2Stitch onNext={() => setPage(3)} onPrev={() => setPage(1)} />;
        case 3: return <Page3Stitch onNext={() => setPage(4)} onPrev={() => setPage(2)} />;
        case 4: return <Page4Stitch onPrev={() => setPage(3)} onFinish={() => setLocation("/")} />;
        default: return null;
    }
};

// ─── CAPA ────────────────────────────────────────────────────────────────────
function CapaStitch({ onNext }: { onNext: () => void }) {
    return (
        <div className="bg-black text-white h-screen w-full overflow-hidden relative selection:bg-purple-500">
            <div className="absolute inset-0 z-0">
                <div className="capa-bg opacity-80 filter contrast-125 brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#2E1A47]/30 via-transparent to-black/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <main className="relative z-10 h-full flex flex-col justify-between items-center px-8 py-16 text-center">
                <div className="h-4"></div>
                <div className="flex flex-col items-center justify-center flex-grow space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-gray-300 opacity-80 mb-2 font-plain">Edição Digital</span>
                    <h1 className="font-cinzel text-5xl md:text-6xl text-[#D4AF37] leading-tight drop-shadow-lg font-normal tracking-wide">
                        Jornada<br />Quaresmal
                    </h1>
                    <div className="h-px w-16 bg-[#D4AF37]/60 my-4"></div>
                    <h2 className="font-serif-stitch text-2xl md:text-3xl text-[#F4E4BC] italic font-light tracking-wide opacity-90">
                        O Grande Recomeço
                    </h2>
                </div>
                <div className="w-full max-w-xs mb-8">
                    <button onClick={onNext} className="glass-button-stitch w-full py-4 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-white/20 active:scale-95 cursor-pointer">
                        <span className="font-cinzel text-[#F4E4BC] uppercase tracking-[0.2em] text-sm font-semibold transition-colors">
                            Iniciar Leitura
                        </span>
                    </button>
                    <p className="mt-6 text-[10px] text-gray-400 font-light tracking-widest uppercase opacity-60 font-plain">
                        40 Dias de Transformação
                    </p>
                </div>
            </main>
        </div>
    );
}

// ─── PÁGINA 1 ────────────────────────────────────────────────────────────────
function Page1Stitch({ onNext, onPrev, onMenu }: { onNext: () => void, onPrev: () => void, onMenu: () => void }) {
    return (
        <div className="antialiased min-h-screen flex flex-col relative selection:bg-[#9D84B7] bg-[#121013] text-[#EAE0D5] overflow-hidden">
            <div className="texture-overlay-stitch"></div>
            <main className="flex-grow px-6 pt-12 pb-32 relative z-10 max-w-lg mx-auto w-full overflow-y-auto no-scrollbar">
                <header className="flex justify-between items-center mb-8 opacity-60">
                    <button onClick={onPrev} className="material-symbols-outlined text-[#A89F95] text-2xl font-light hover:text-[#D4AF37] transition-colors">arrow_back</button>
                    <span className="font-cinzel text-xs tracking-[0.2em] text-[#A89F95] uppercase">Introdução</span>
                    <button className="material-symbols-outlined text-[#A89F95] text-2xl font-light opacity-0">bookmark_border</button>
                </header>
                <div className="mb-10 text-center">
                    <h2 className="font-cinzel text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-3">Introdução</h2>
                    <h1 className="text-4xl leading-tight font-medium text-[#EAE0D5] font-serif-stitch">
                        O seu momento ideal para começar é agora
                    </h1>
                    <div className="h-px w-12 bg-[#D4AF37] mx-auto mt-6 opacity-50"></div>
                </div>
                <article className="prose-like text-[#EAE0D5] font-light text-xl leading-relaxed font-serif-stitch">
                    <p className="mb-8">
                        <span className="text-5xl float-left mr-3 text-[#D4AF37] font-cinzel leading-none mt-1">B</span>
                        em-vindo ao seu deserto. No seio da tradição bíblica e cristã, o deserto nunca foi um lugar de abandono ou punição, mas o ambiente exato onde Deus atrai os Seus filhos para falar ao coração.
                    </p>
                    <p className="mb-8">
                        Talvez você esteja abrindo este livro no primeiro dia da Quaresma. Talvez você o tenha encontrado na metade do caminho, após dias de distração, sentindo o peso do atraso. A primeira verdade teológica que você precisa internalizar antes de virar esta página é esta: <span className="text-[#D4AF37] text-2xl block my-6 text-center leading-normal font-bold">"Deus não faz chamada."</span>
                    </p>
                    <p className="mb-8">
                        O catolicismo é um relacionamento vivo com uma Pessoa — Jesus Cristo — e não o cumprimento estéril de uma planilha de tarefas. Se você pulou dias, se você tropeçou, abandone a linguagem do fracasso. O seu momento ideal para começar é agora.
                    </p>
                    <div className="my-10 pl-6 border-l-2 border-[#9D84B7] opacity-90">
                        <p className="italic text-[#A89F95] text-lg">
                            "Rasgai o vosso coração, e não as vossas vestes." <br />
                            <span className="text-xs uppercase tracking-widest not-italic mt-2 block font-plain opacity-60">— Joel 2:13</span>
                        </p>
                    </div>
                    <h3 className="font-cinzel text-2xl text-[#EAE0D5] mt-12 mb-6">O Mistério dos 40 Dias</h3>
                    <p className="mb-8 font-serif-stitch leading-relaxed">
                        A Igreja nos convida a um itinerário de quarenta dias, mas este número não foi escolhido por acaso. Na Bíblia, o número quarenta é o arquétipo universal da gestação de uma nova realidade.
                    </p>
                </article>
            </main>
            <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#121013] via-[#121013] to-transparent pt-12 pb-8 z-20">
                <div className="max-w-lg mx-auto px-8 flex justify-between items-center text-[#A89F95]">
                    <button onClick={onMenu} className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-2xl">menu_book</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <button onClick={onPrev} className="w-12 h-12 rounded-full border border-[#A89F95] border-opacity-30 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121013] transition-all duration-300">
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                        </button>
                        <span className="font-cinzel text-sm tracking-widest">1 / 40</span>
                        <button onClick={onNext} className="w-12 h-12 rounded-full bg-[#EAE0D5] text-[#121013] flex items-center justify-center shadow-[0_0_15px_rgba(234,224,213,0.2)] hover:bg-[#D4AF37] transition-colors duration-300">
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                    </div>
                    <div className="w-6 opacity-0"></div>
                </div>
            </nav>
        </div>
    );
}

// ─── PÁGINA 2 ────────────────────────────────────────────────────────────────
function Page2Stitch({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    return (
        <div className="antialiased min-h-screen relative overflow-x-hidden bg-[#F9F7F2] text-[#2C2C2C] font-plain flex flex-col">
            <header className="px-6 py-12 flex justify-between items-center relative z-20 font-plain">
                <button onClick={onPrev} className="text-[#2C2C2C] opacity-70 hover:opacity-100 transition">
                    <span className="material-symbols-outlined font-light text-2xl">arrow_back</span>
                </button>
                <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold font-cinzel">Teologia do Tempo</div>
                <div className="w-6" />
            </header>
            <main className="px-8 pb-16 relative z-10 flex-grow">
                <div className="relative pt-6 pb-8 mb-6">
                    <div className="watermark-40-stitch select-none italic">40</div>
                    <div className="relative z-10">
                        <span className="block text-[#4A2C40] text-sm font-semibold tracking-widest uppercase mb-3 font-plain">Estrutura</span>
                        <h1 className="text-4xl leading-[1.15] font-medium text-[#2C2C2C] mb-2 font-serif-stitch">
                            O Mistério <br /> <span className="italic text-[#D4AF37]">dos 40 Dias</span>
                        </h1>
                        <div className="w-12 h-[2px] bg-[#4A2C40] mt-4 mb-2"></div>
                    </div>
                </div>
                <article className="space-y-6 text-[1.05rem] leading-relaxed text-[#5A5A5A] font-light font-plain">
                    <p className="font-serif-stitch text-[1.15rem] text-[#2C2C2C]">
                        Na Bíblia, o número quarenta é o arquétipo universal da gestação de uma nova realidade.
                    </p>
                    <section className="space-y-6 mt-8 font-plain">
                        {[
                            { n: "01", t: "ISRAEL NO DESERTO", p: "Quarenta anos purgando a escravidão antes da Terra Prometida." },
                            { n: "02", t: "MOISÉS NO SINAI", p: "Quarenta dias de jejum para receber a Lei, face a face com o Divino." },
                            { n: "03", t: "JESUS NO DESERTO", p: "Onde a obediência do Novo Adão reverteu ontologicamente a queda." }
                        ].map(item => (
                            <div key={item.n} className="flex gap-4 items-start group">
                                <div className="min-w-[2.5rem] text-[#D4AF37] font-serif-stitch font-bold text-2xl pt-0.5 opacity-60 group-hover:opacity-100 transition-opacity leading-none">{item.n}</div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#4A2C40] mb-1 font-plain">{item.t}</p>
                                    <p className="text-sm font-plain leading-relaxed">{item.p}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                </article>
                <div className="mt-16 flex justify-center">
                    <button onClick={onNext} className="text-xs font-bold text-[#4A2C40] uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition py-4 px-10 border border-[#4A2C40]/20 rounded-full font-plain">
                        Próxima <span className="material-symbols-outlined text-lg font-plain">east</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

// ─── PÁGINA 3 ────────────────────────────────────────────────────────────────
function Page3Stitch({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#F9F7F2] text-[#1F1B24] font-plain overflow-y-auto font-plain">
            <header className="pt-8 pb-4 px-6 flex justify-between items-center z-10 font-plain">
                <button onClick={onPrev} className="text-[#3B0944] hover:opacity-70 transition-opacity">
                    <span className="material-symbols-outlined text-3xl font-light">arrow_back</span>
                </button>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#C6A87C] font-medium font-plain">Pilares da Fé</div>
                <div className="w-8" />
            </header>
            <main className="flex-1 px-6 pb-12 overflow-y-auto no-scrollbar font-plain">
                <div className="mb-10 text-center relative pt-4 font-plain">
                    <div className="w-12 h-0.5 bg-[#3B0944] mx-auto mb-4 opacity-20"></div>
                    <h1 className="text-4xl text-[#3B0944] font-serif-stitch font-medium leading-tight mb-4">
                        A Mecânica <br /><span className="italic font-normal">da Graça</span>
                    </h1>
                    <p className="text-sm text-gray-500 font-light max-w-[280px] mx-auto leading-relaxed px-4 font-plain">
                        Um sistema perfeito para sustentar o seu recomeço diário.
                    </p>
                </div>
                <div className="space-y-6 px-2 font-plain">
                    {[
                        { t: "O Jejum", icon: "water_drop", p: "Cria um vácuo interior, quebrando a dependência de estímulos. Sem oração, é apenas dieta." },
                        { t: "A Oração", icon: "sparkles", p: "Enche a alma com a presença divina no silêncio do quarto, preenchendo o espaço aberto." },
                        { t: "A Esmola", icon: "volunteer_activism", p: "A graça não é retida, ela transborda. É o ato de servir ao próximo com o amor recebido." }
                    ].map(p => (
                        <div key={p.t} className="pillar-card-stitch rounded-2xl p-6 relative overflow-hidden transition-transform active:scale-[0.98]">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-symbols-outlined text-[#3B0944] text-2xl">{p.icon}</span>
                                <h2 className="font-serif-stitch text-xl text-[#3B0944] italic">{p.t}</h2>
                            </div>
                            <p className="text-xs text-gray-600 font-light leading-relaxed font-plain">{p.p}</p>
                        </div>
                    ))}
                </div>
                <div className="relative py-10 px-4 border-t border-b border-[#3B0944]/10 my-10 text-center font-plain">
                    <p className="font-serif-stitch text-2xl leading-relaxed text-[#3B0944] italic mb-4 px-4">
                        "Rasgai o vosso coração, e não as vossas vestes."
                    </p>
                    <p className="text-[11px] tracking-widest uppercase text-gray-400 font-medium font-plain">Joel 2:13</p>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={onNext} className="w-16 h-16 bg-[#3B0944] rounded-full shadow-xl flex items-center justify-center text-white active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

// ─── PÁGINA 4 ────────────────────────────────────────────────────────────────
function Page4Stitch({ onFinish, onPrev }: { onFinish: () => void, onPrev: () => void }) {
    return (
        <div className="antialiased min-h-screen flex flex-col relative overflow-hidden bg-[#1a1721] text-[#F3F4F6] font-plain">
            <div className="glow-stitch top-[-5%] right-[-10%] bg-purple-900/30 blur-[100px]"></div>
            <div className="glow-stitch bottom-[-10%] left-[-20%] bg-blue-900/10 blur-[100px]"></div>
            <header className="flex justify-between items-center p-6 z-10 relative font-plain">
                <button onClick={onPrev} className="text-white/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl font-light">arrow_back</span>
                </button>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-bold font-cinzel">Instruções Finais</div>
                <div className="w-8" />
            </header>
            <main className="flex-grow px-8 pb-32 z-10 flex flex-col justify-center max-w-lg mx-auto w-full relative overflow-y-auto no-scrollbar font-plain">
                <div className="mb-10 text-left font-plain">
                    <h1 className="text-4xl text-white font-medium font-serif-stitch leading-tight mb-4">Como usar<br /><span className="italic text-[#D4AF37]">este livro</span></h1>
                    <p className="text-sm text-gray-400 font-light max-w-[90%] leading-relaxed font-plain">Este não é um teste de resistência. É um itinerário sagrado para o seu reencontro.</p>
                </div>
                <div className="space-y-10 font-plain">
                    {[
                        { n: "01", t: "Reflexões Diárias", p: "40 reflexões (D01 a D40). Não há datas fixas. Leia e deixe o versículo iluminar sua consciência no silêncio." },
                        { n: "02", t: "A Micro-Ação", p: "Espiritualidade sem obras é ilusão. Execute a ação prática sugerida ao final de cada dia com fidelidade." },
                        { n: "03", t: "Seja Misericordioso", p: "Se falhar, não tente compensar com excessos. Apenas levante-se e retome o caminho com humildade." }
                    ].map(step => (
                        <div key={step.n} className="flex items-start gap-5 group">
                            <span className="font-serif-stitch text-4xl font-bold opacity-10 text-white group-hover:opacity-30 transition-opacity leading-none pt-1">{step.n}</span>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2 font-plain">{step.t}</h3>
                                <p className="text-sm text-gray-400 font-light leading-relaxed font-plain">{step.p}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-14 bg-white/5 backdrop-blur-xl p-8 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl font-plain">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37] opacity-80"></div>
                    <p className="text-base italic text-gray-200 leading-relaxed font-serif-stitch">
                        "Respire fundo. A poeira das cinzas nos lembra que somos pó, mas o sopro do Espírito nos garante que fomos feitos para o céu."
                    </p>
                </div>
                <div className="mt-16 pb-8 font-plain">
                    <button onClick={onFinish} className="w-full glow-btn-stitch text-white py-6 rounded-2xl font-medium tracking-widest flex items-center justify-center gap-3 group active:scale-[0.97] transition-all font-plain">
                        <span className="font-cinzel text-sm">Vamos recomeçar</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform font-plain">arrow_forward</span>
                    </button>
                    <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.3em] font-plain mt-6 opacity-40">40 Dias • Um Novo Coração</p>
                </div>
            </main>
        </div>
    );
}

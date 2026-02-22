import React, { useState } from "react";
import { useLocation } from "wouter";

const PAGES = [
    {
        title: "Capa",
        content: (
            <div className="page-cover-stitch font-lato">
                <div className="mt-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300 opacity-80">Edição Digital</span>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="font-cinzel text-5xl text-[var(--gold-primary)] leading-tight drop-shadow-lg font-normal tracking-wide">
                        Jornada<br />Quaresmal
                    </h1>
                    <div className="h-px w-12 bg-[var(--gold-primary)]/40 my-3"></div>
                    <h2 className="font-serif-book text-xl text-[var(--gold-light)] italic opacity-90">
                        O Grande Recomeço
                    </h2>
                </div>
                <div className="w-full px-6 mb-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 py-3 rounded-full text-[10px] font-cinzel uppercase tracking-[0.2em] font-semibold">
                        Toque para Iniciar
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Página 1",
        content: (
            <div className="page-dark-stitch font-serif-book">
                <div className="text-center mb-6 pt-4">
                    <h2 className="font-cinzel text-[10px] text-[var(--gold-primary)] tracking-[0.3em] uppercase mb-1">Introdução</h2>
                    <h1 className="text-2xl leading-tight font-medium text-[#EAE0D5]">
                        O seu momento ideal é agora
                    </h1>
                    <div className="h-px w-8 bg-[var(--gold-primary)] mx-auto mt-3 opacity-40"></div>
                </div>
                <div className="text-[14px] leading-relaxed text-[#EAE0D5]/90">
                    <span className="drop-cap-gold">B</span>
                    em-vindo ao seu deserto. No seio da tradição bíblica e cristã, o deserto nunca foi um lugar de abandono ou punição mas o ambiente exato onde Deus atrai os Seus filhos para falar ao coração.
                    <p className="mt-4 italic text-center p-3 bg-white/5 rounded-lg border-l-2 border-[#9D84B7] text-[#A89F95]">"Deus não faz chamada."</p>
                    <p className="mt-4">O catolicismo é um relacionamento vivo com uma Pessoa Jesus Cristo e não o cumprimento estéril de uma planilha de tarefas. O seu momento ideal para começar é agora.</p>
                </div>
            </div>
        )
    },
    {
        title: "Página 2",
        content: (
            <div className="page-paper-stitch font-lato">
                <div className="watermark-40">40</div>
                <div className="relative z-10 pt-4">
                    <span className="text-[10px] text-[#4A2C40] font-bold tracking-widest uppercase mb-1 block opacity-60">Teologia do Tempo</span>
                    <h1 className="text-2xl font-serif-book leading-tight text-[#2C2C2C] mb-3">
                        O Mistério <span className="italic text-[#D4AF37]">dos 40 Dias</span>
                    </h1>
                </div>
                <div className="text-[13px] leading-relaxed text-gray-600 mt-2">
                    <p>A Igreja nos convida a um itinerário de quarenta dias, mas este número não foi escolhido por acaso. Na Bíblia, é o arquétipo universal da gestação de uma nova realidade.</p>
                    <div className="space-y-3 mt-4">
                        <div className="flex gap-3">
                            <div className="text-[#D4AF37] font-serif-book font-bold text-lg">01</div>
                            <p className="text-[12px]"><strong className="text-gray-800">ISRAEL NO DESERTO:</strong> Quarenta anos purgando a escravidão.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-[#D4AF37] font-serif-book font-bold text-lg">02</div>
                            <p className="text-[12px]"><strong className="text-gray-800">MOISÉS NO SINAI:</strong> Quarenta dias para receber a Lei.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-[#D4AF37] font-serif-book font-bold text-lg">03</div>
                            <p className="text-[12px]"><strong className="text-gray-800">JESUS NO DESERTO:</strong> O Novo Adão reverte a queda.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Página 3",
        content: (
            <div className="page-cream-stitch font-lato">
                <div className="text-center pt-2 mb-4">
                    <h1 className="text-2xl font-serif-book text-[#3B0944] leading-tight">
                        A Mecânica <span className="italic font-normal">da Graça</span>
                    </h1>
                </div>
                <div className="space-y-3">
                    <div className="pillar-card-mini">
                        <h2 className="font-serif-book italic text-[#3B0944] text-[15px] mb-1">O Jejum</h2>
                        <p className="text-[11px] text-gray-500">Cria um <span className="text-[#3B0944] font-bold">vácuo interior</span>, quebrando dependências.</p>
                    </div>
                    <div className="pillar-card-mini">
                        <h2 className="font-serif-book italic text-[#3B0944] text-[15px] mb-1">A Oração</h2>
                        <p className="text-[11px] text-gray-500">Preenche o espaço com a presença divina no silêncio.</p>
                    </div>
                    <div className="pillar-card-mini">
                        <h2 className="font-serif-book italic text-[#3B0944] text-[15px] mb-1">A Esmola</h2>
                        <p className="text-[11px] text-gray-500">A graça não é retida, ela transborda ao próximo.</p>
                    </div>
                    <div className="text-center italic font-serif-book text-[#3B0944] text-[14px] px-2">
                        "Rasgai o vosso coração, e não as vossas vestes."
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Página 4",
        content: (
            <PageFinalStitch />
        )
    }
];

function PageFinalStitch() {
    const [, setLocation] = useLocation();
    return (
        <div className="page-night-stitch font-lato">
            <div className="glow-spot top-[-20%] right-[-20%]" />
            <div className="glow-spot bottom-[-20%] left-[-20%]" />
            <div className="relative z-10 pt-4 flex flex-col h-full">
                <h1 className="text-2xl text-white font-medium mb-1 font-serif-book leading-tight">Como usar<br /><span className="italic text-[var(--gold-primary)]">este livro</span></h1>
                <p className="text-[12px] text-gray-400 mb-6">Este é um manual para o reencontro.</p>

                <div className="space-y-4 flex-1">
                    <div className="flex gap-3">
                        <span className="font-serif-book text-xl font-bold text-white/50">01</span>
                        <p className="text-[12px]"><span className="text-white font-bold">REFLEXÕES:</span> 40 reflexões diárias (D01 a D40).</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-serif-book text-xl font-bold text-white/50">02</span>
                        <p className="text-[12px]"><span className="text-white font-bold">MICRO-AÇÃO:</span> Traduza sua oração em atitude.</p>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-serif-book text-xl font-bold text-white/50">03</span>
                        <p className="text-[12px]"><span className="text-white font-bold">MISERICÓRDIA:</span> Se falhar, apenas retome.</p>
                    </div>
                </div>

                <div className="mt-auto pb-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); setLocation("/"); }}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-cinzel text-[11px] tracking-widest uppercase py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        Vamos Recomeçar
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 text-center mt-3">40 Dias de Transformação</p>
                </div>
            </div>
        </div>
    );
}

export const IntroBook: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentPage < PAGES.length - 1) setCurrentPage(p => p + 1);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentPage > 0) setCurrentPage(p => p - 1);
    };

    return (
        <div className="book-container">
            <div className={`book-wrapper page-${currentPage}`}>
                <div className="book-spine" />

                <div className="book-page active" onClick={next}>
                    <div className="book-page-inner h-full">
                        {PAGES[currentPage].content}

                        {currentPage > 0 && (
                            <div className="absolute bottom-2 left-2 z-30" onClick={(e) => e.stopPropagation()}>
                                <button className="book-nav-btn prev bg-black/20 hover:bg-black/40" onClick={prev}>←</button>
                            </div>
                        )}
                        {currentPage > 0 && currentPage < PAGES.length - 1 && (
                            <div className="absolute bottom-2 right-2 z-30" onClick={(e) => e.stopPropagation()}>
                                <button className="book-nav-btn next bg-black/20 hover:bg-black/40" onClick={next}>→</button>
                            </div>
                        )}

                        {currentPage > 0 && (
                            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                <span className="text-[9px] font-cinzel tracking-widest opacity-50">
                                    {currentPage} / {PAGES.length - 1}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

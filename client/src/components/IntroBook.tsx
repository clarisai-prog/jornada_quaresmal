import React, { useState } from "react";

const PAGES = [
    {
        title: "Capa",
        content: (
            <div className="book-cover">
                <p className="cover-sub">QUARESMA 2026</p>
                <h1 className="cover-title">Jornada Quaresmal</h1>
                <h2 className="cover-subtitle">O Grande Recomeço</h2>
                <div className="cover-cross">✝️</div>
                <p className="cover-instruction">Toque para abrir</p>
            </div>
        )
    },
    {
        title: "O Seu Momento Ideal",
        content: (
            <div className="book-page-content">
                <h3 className="page-header">Página 1 — O Seu Momento Ideal Para Começar é Agora</h3>
                <p>Bem-vindo ao seu deserto.</p>
                <p>No seio da tradição bíblica e cristã, o deserto nunca foi um lugar de abandono ou punição — mas o ambiente exato onde Deus atrai os Seus filhos para falar ao coração.</p>
                <p>Talvez você esteja abrindo este livro no primeiro dia da Quaresma. Talvez você o tenha encontrado na metade do caminho, após dias de distração.</p>
                <blockquote className="page-quote">"Deus não faz chamada."</blockquote>
                <p>O catolicismo é um relacionamento vivo com uma Pessoa — Jesus Cristo — e não o cumprimento estéril de uma planilha de tarefas.</p>
                <p><strong>O seu momento ideal para começar é agora.</strong></p>
            </div>
        )
    },
    {
        title: "O Mistério dos 40 Dias",
        content: (
            <div className="book-page-content">
                <h3 className="page-header">Página 2 — O Mistério dos 40 Dias</h3>
                <p>A Igreja nos convida a um itinerário de quarenta dias, mas este número não foi escolhido por acaso.</p>
                <p>Na Bíblia, <strong>quarenta</strong> é o arquétipo universal da gestação de uma nova realidade:</p>
                <ul className="page-list">
                    <li>🌵 <strong>40 anos</strong> — Israel no deserto.</li>
                    <li>⛰️ <strong>40 dias</strong> — Moisés no Monte Sinai.</li>
                    <li>🚶 <strong>40 dias</strong> — A caminhada de Elias.</li>
                    <li>✝️ <strong>40 dias</strong> — O jejum de Jesus no deserto.</li>
                </ul>
                <p>Você está <strong>unindo a sua vida ao mistério do próprio Cristo no deserto.</strong></p>
            </div>
        )
    },
    {
        title: "A Mecânica da Graça",
        content: (
            <div className="book-page-content">
                <h3 className="page-header">Página 3 — A Mecânica da Graça</h3>
                <blockquote className="page-quote">"Rasgai o vosso coração, e não as vossas vestes." — Joel 2:13</blockquote>
                <p>Cristo nos entrega em Mateus 6 um sistema baseado em três pilares:</p>
                <div className="pilar-box">
                    <strong>🙏 Oração:</strong> Preenche o espaço que o jejum abre.
                </div>
                <div className="pilar-box">
                    <strong>✦ Jejum:</strong> Cria um vácuo no seu interior.
                </div>
                <div className="pilar-box">
                    <strong>🤲 Esmola:</strong> Faz a graça transbordar ao próximo.
                </div>
                <p>Pare de apresentar a Deus uma casca perfeita. Entregue a Ele a sua fraqueza.</p>
            </div>
        )
    },
    {
        title: "Como Usar Este Livro",
        content: (
            <div className="book-page-content">
                <h3 className="page-header">Página 4 — Como Usar Este Livro</h3>
                <p>Neste manual você encontrará <strong>40 reflexões diárias</strong> organizadas em 4 fases:</p>
                <div className="phases-summary">
                    <div><strong>F1:</strong> De01–D10 · O Ego</div>
                    <div><strong>F2:</strong> D11–D20 · A Batalha</div>
                    <div><strong>F3:</strong> D21–D30 · Caridade</div>
                    <div><strong>F4:</strong> D31–D40 · Calvário</div>
                </div>
                <p><strong>Leia</strong> a reflexão e <strong>Execute a Micro-Ação</strong>. A espiritualidade sem obras é uma ilusão.</p>
                <p>Se falhar, não tente compensar. Apenas levante-se e retome.</p>
                <p className="page-final"><em>Vamos recomeçar.</em></p>
            </div>
        )
    }
];

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
                {/* ── Background Decoration ── */}
                <div className="book-spine" />

                {/* ── Active Page ── */}
                <div className="book-page active" onClick={next}>
                    <div className="book-page-inner">
                        {PAGES[currentPage].content}

                        {/* ── Navigation ── */}
                        <div className="book-nav" onClick={(e) => e.stopPropagation()}>
                            {currentPage > 0 && (
                                <button className="book-nav-btn prev" onClick={prev}>←</button>
                            )}
                            <span className="book-page-indicator">
                                {currentPage === 0 ? "Início" : `${currentPage} de ${PAGES.length - 1}`}
                            </span>
                            {currentPage < PAGES.length - 1 && (
                                <button className="book-nav-btn next" onClick={next}>→</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Visual Pages Stack ── */}
                <div className="book-stack" />
            </div>
        </div>
    );
};

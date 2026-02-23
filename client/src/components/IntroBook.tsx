import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

export type Pilar = "Oração" | "Jejum" | "Esmola";

export interface SlideData {
    id: number;
    tema: string;
    icone: string;
    fase?: string;
    pilar?: Pilar;
    versiculo?: string;
    textoVersiculo?: string;
    reflexao: string;
    acaoPratica?: string;
    type: "capa" | "introducao" | "teologia" | "pilares" | "fases" | "pratico" | "final";
    subtitle: string;
    details?: { id: string; title: string; text: string }[];
    tabelaPilares?: { dimensao: string; fundamento: string; dinamica: string; impacto: string }[];
    fasesInfo?: { numero: string; titulo: string; dias: string; descricao: string }[];
}

export const IntroBook: React.FC = () => {
    const [page, setPage] = useState(0);
    const [, setLocation] = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const FASE_I = "A Desconstrução do Ego e o Chamado ao Deserto";
    const FASE_II = "O Atrito no Deserto e a Batalha Interior";
    const FASE_III = "O Transbordamento da Caridade";
    const FASE_IV = "A Ascensão ao Calvário e o Alvorecer da Ressurreição";

    const slides: SlideData[] = [
        {
            id: 0,
            tema: "Jornada Quaresmal",
            icone: "⚱️",
            subtitle: "O GRANDE RECOMEÇO",
            reflexao: "A Quaresma transcende a mera cronologia para se estabelecer como um paradigma de reestruturação antropológica e espiritual. O período de quarenta dias opera como o deserto existencial necessário para a maturação da fé, um intervalo onde o ruído do mundo é silenciado para que a voz do divino possa ecoar com clareza.",
            type: "capa",
            versiculo: "Joel 2:12-13",
            textoVersiculo: "Rasgai o vosso coração, e não as vossas vestes."
        },
        {
            id: 1,
            tema: "O Deserto como Paradigma",
            icone: "🏜️",
            subtitle: "INTRODUÇÃO",
            pilar: "Oração",
            versiculo: "Oséias 2:14",
            textoVersiculo: "Eis que atrairei a mim, levando-a ao deserto, e lhe falarei ao coração.",
            reflexao: "Bem-vindo ao seu deserto. No seio da tradição bíblica e cristã, o deserto nunca foi um lugar de abandono ou punição, mas o ambiente exato onde Deus atrai os Seus filhos para falar ao coração. O número quarenta não é aleatório; ele figura como o arquétipo bíblico universal da gestação de uma nova realidade.",
            acaoPratica: "Entre no deserto desta Quaresma com um coração aberto, pronto para ouvir a voz de Deus no silêncio.",
            type: "introducao",
            details: [
                { id: "01", title: "Israel no Deserto", text: "Quarenta anos para purgar a mentalidade de escravidão antes de adentrar a Terra Prometida (Dt 8)." },
                { id: "02", title: "Moisés no Sinai", text: "Quarenta dias de jejum para receber a Lei, face a face com o Divino (Êx 34:28)." },
                { id: "03", title: "Elias no Horebe", text: "A caminhada purificadora sustentado pelo pão do céu até a montanha de Deus (1 Rs 19:8)." },
                { id: "✝", title: "O Novo Adão", text: "Jesus inverteu a queda de nossos primeiros pais unindo a nossa vida ao Seu mistério no deserto." }
            ]
        },
        {
            id: 2,
            tema: "A Teologia do Agora",
            icone: "⏰",
            subtitle: "SEM COBRANÇAS",
            pilar: "Oração",
            versiculo: "2 Coríntios 6:2",
            textoVersiculo: "Eis que agora é o tempo favorável, eis que agora é o dia da salvação.",
            reflexao: "Se você pulou dias ou se sentiu atrasado, abandone a linguagem do fracasso. Deus não olha para a planilha, Ele olha para o seu coração hoje. O seu momento ideal para começar é exatamente agora. A Quaresma não é um teste de resistência, mas um convite ao reencontro.",
            acaoPratica: "Não olhe para trás com culpa. Comece hoje, exatamente onde você está, com o coração disponível.",
            type: "teologia",
            details: [
                { id: "01", title: "Sem Cobranças", text: "Não importa se você começou no primeiro dia ou na metade do caminho." },
                { id: "02", title: "O Momento", text: "O seu momento ideal para começar é exatamente agora." },
                { id: "03", title: "Novo Criação", text: "Portanto, se alguém está em Cristo, é nova criação. Tudo agora é novo (2 Cor 5:17)." }
            ]
        },
        {
            id: 3,
            tema: "A Interdependência dos Três Pilares",
            icone: "△",
            subtitle: "MATEUS 6",
            reflexao: "A teologia quaresmal repousa sobre uma tríade inseparável extraída do Sermão da Montanha: oração, jejum e esmola. Estes três pilares não operam de forma isolada; eles compõem um sistema fechado de energia espiritual onde a deficiência em um compromete a eficácia dos demais.",
            acaoPratica: "Não pratique apenas um pilar. Integre oração, jejum e esmola em sua jornada quaresmal.",
            type: "pilares",
            tabelaPilares: [
                { 
                    dimensao: "Jejum e Abstinência", 
                    fundamento: "Mateus 6:16-18; Dt 8:3", 
                    dinamica: "Mortificação dos sentidos, restrição de telas, contenção verbal e alimentar.", 
                    impacto: "Quebra da dependência de estímulos externos; domínio das paixões desordenadas." 
                },
                { 
                    dimensao: "Oração e Vigília", 
                    fundamento: "Mateus 6:6; Tg 4:8", 
                    dinamica: "Silêncio contemplativo, confissão, Lectio Divina, Santo Terço.", 
                    impacto: "Realinhamento do foco existencial; reconhecimento da filiação divina." 
                },
                { 
                    dimensao: "Esmola e Caridade", 
                    fundamento: "Tob 4:7-11; Mt 6:3-4", 
                    dinamica: "Doação de recursos, escuta empática, perdão, cuidado ecológico.", 
                    impacto: "Extinção do egoísmo; restauração do tecido social; civilização do amor." 
                }
            ]
        },
        {
            id: 4,
            tema: "A Mecânica da Graça",
            icone: "⚙️",
            subtitle: "SISTEMA ESPIRITUAL",
            reflexao: "O jejum cria um vácuo ao privar o indivíduo de confortos físicos. Santo Agostinho e São João Crisóstomo advertem: se este vazio não for preenchido pela oração, o jejum degenera em mera dieta. A oração preenche o espaço esculpido pelo jejum. A esmola atua como vetor de escoamento da graça.",
            acaoPratica: "Ao jejuar, preencha o vazio com oração. Deixe a graça transbordar em caridade para o próximo.",
            type: "pratico",
            details: [
                { id: "U", title: "O Jejum", text: "A restrição (comida, telas, conforto) cria um vácuo interior. Sem oração, é apenas dieta." },
                { id: "+", title: "A Oração", text: "Preenche o espaço que o jejum abriu, enchendo a alma com a presença divina no silêncio (Mt 6:6)." },
                { id: "↑", title: "A Esmola", text: "A graça não é retida, ela transborda. É o ato de escoar a graça recebida em direção ao próximo (Mt 6:3)." }
            ]
        },
        {
            id: 5,
            tema: "As Quatro Fases da Jornada",
            icone: "🗺️",
            subtitle: "ARQUITETURA ESPIRITUAL",
            reflexao: "A estrutura da jornada é projetada para conduzir o leitor por fases psicológicas e espirituais incrementais. O processo de 'recomeço' inicia-se com a desconstrução da vaidade, avança para o enfrentamento das inclinações e vícios, deságua na reparação do tecido fraterno e culmina na união mística com a Paixão e a Cruz.",
            acaoPratica: "Respeite o ritmo de cada fase. Não queira apressar o processo de transformação.",
            type: "fases",
            fasesInfo: [
                { numero: "I", titulo: "A Desconstrução do Ego", dias: "D01 - D10", descricao: "O chamado ao deserto. Reconhecer-se como pó e depor as armaduras do orgulho." },
                { numero: "II", titulo: "O Atrito no Deserto", dias: "D11 - D20", descricao: "A batalha interior. Enfrentar os demônios e traumas de frente, sem fugas." },
                { numero: "III", titulo: "O Transbordamento da Caridade", dias: "D21 - D30", descricao: "Reparar o tecido fraterno. A graça recebida deve escoar em direção ao próximo." },
                { numero: "IV", titulo: "A Ascensão ao Calvário", dias: "D31 - D40", descricao: "Unão mística com a Paixão. Preparar o coração para a Ressurreição." }
            ]
        },
        {
            id: 6,
            tema: "Como Usar Este Livro",
            icone: "📖",
            subtitle: "GUIA PRÁTICO",
            reflexao: "Este não é um teste de resistência. É um manual para o reencontro espiritual. Cada dia contém um versículo-âncora, uma reflexão teológica sobre o recomeço e uma ação prática embasada nos pilares da Quaresma.",
            acaoPratica: "Não leia passivamente. Execute cada ação prática como oração em movimento.",
            type: "pratico",
            details: [
                { id: "01", title: "Reflexões Diárias", text: "Encontre 40 reflexões (D01 a D40). Não há datas fixas. Leia e deixe o versículo iluminar sua consciência." },
                { id: "02", title: "A Micro-Ação", text: "Espiritualidade sem obras é ilusão. Execute a ação prática que traduz sua oração em atitude visível." },
                { id: "03", title: "Misericórdia", text: "Se falhar, não tente 'passar fome em dobro'. Apenas levante-se e retome de onde parou." }
            ]
        },
        {
            id: 7,
            tema: "Rasgai o Vosso Coração",
            icone: "💔",
            subtitle: "JOEL 2:13",
            pilar: "Oração",
            versiculo: "Joel 2:13",
            textoVersiculo: "Rasgai o vosso coração, e não as vossas vestes. Voltai para o Senhor vosso Deus, pois ele é benigno e compassivo, tardio em irar-se e cheio de amor.",
            reflexao: "Somos pó, mas o sopro do Espírito nos garante a eternidade. O fio condutor ininterrupto da narrativa do 'recomeço' — solidamente amparado em Joel 2:12 e 2 Coríntios 5:17 sobre a 'nova criação' — garante que você não chegue ao fim do quadragésimo dia como um estoico cansado, mas sim como uma criatura genuinamente perdoada, relacionalmente curada e plenamente capacitada para desfrutar da comunhão festiva da Páscoa da Ressurreição.",
            acaoPratica: "Apresente-se diante de Deus na mais profunda vulnerabilidade, com o coração rasgado e pronto para receber Sua misericórdia.",
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
                    
                    {/* CAPA */}
                    {currentSlide.type === "capa" ? (
                        <div className="pt-8 text-center space-y-8">
                            <div className="h-px w-10 bg-quaresma-accent/40 mx-auto"></div>
                            <div className="text-6xl md:text-7xl mb-4">{currentSlide.icone}</div>
                            <h1 className="font-serif-stitch text-5xl md:text-6xl text-quaresma-primary leading-[1.1]">
                                {currentSlide.tema.split(' ')[0]} <br />
                                <span className="italic font-light">{currentSlide.tema.split(' ').slice(1).join(' ')}</span>
                            </h1>
                            <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-[300px] mx-auto text-pretty font-light">
                                {currentSlide.reflexao}
                            </p>
                            {currentSlide.versiculo && (
                                <div className="pt-4 border-t border-quaresma-accent/20">
                                    <p className="font-serif-stitch italic text-quaresma-primary text-sm">
                                        "{currentSlide.textoVersiculo}"
                                    </p>
                                    <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase">
                                        {currentSlide.versiculo}
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : 
                    
                    /* FINAL */
                    currentSlide.type === "final" ? (
                        <div className="pt-12 text-center space-y-12">
                            <div className="space-y-6">
                                <div className="text-5xl md:text-6xl">{currentSlide.icone}</div>
                                <span className="text-quaresma-accent text-4xl opacity-40 italic font-serif-stitch">"</span>
                                <h2 className="font-serif-stitch text-2xl md:text-3xl text-quaresma-primary leading-snug px-4 italic font-light">
                                    {currentSlide.textoVersiculo}
                                </h2>
                                <div className="h-px w-8 bg-quaresma-accent/30 mx-auto mt-6"></div>
                                <span className="block font-cinzel text-[10px] tracking-[0.4em] text-quaresma-accent uppercase pt-2 opacity-60">
                                    {currentSlide.versiculo}
                                </span>
                            </div>
                            
                            <div className="bg-quaresma-primary/5 p-6 rounded-2xl">
                                <p className="text-sm leading-relaxed text-quaresma-text/70 font-light">
                                    {currentSlide.reflexao}
                                </p>
                            </div>

                            {currentSlide.acaoPratica && (
                                <div className="border-l-2 border-quaresma-accent pl-4 text-left">
                                    <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase block mb-1">
                                        Ação Prática
                                    </span>
                                    <p className="text-sm text-quaresma-text">{currentSlide.acaoPratica}</p>
                                </div>
                            )}

                            <button
                                onClick={() => setLocation("/")}
                                className="glow-btn touch-manipulation mb-[env(safe-area-inset-bottom)]"
                            >
                                <span className="font-cinzel text-[11px] tracking-[0.3em]">INICIAR JORNADA</span>
                                <span className="material-symbols-outlined !text-lg">church</span>
                            </button>
                        </div>
                    ) : 
                    
                    /* PILARES - Tabela especial */
                    currentSlide.type === "pilares" ? (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <div className="text-5xl md:text-6xl mb-2">{currentSlide.icone}</div>
                                <div className="h-px w-10 bg-quaresma-accent/40 mx-auto mb-6"></div>
                                <h1 className="font-serif-stitch text-3xl md:text-4xl text-quaresma-primary leading-tight">
                                    {currentSlide.tema}
                                </h1>
                                <p className="text-sm opacity-70 max-w-[320px] mx-auto font-light">
                                    {currentSlide.reflexao}
                                </p>
                            </div>

                            <div className="space-y-4">
                                {currentSlide.tabelaPilares?.map((pilar, i) => (
                                    <div key={i} className="pillar-card p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-quaresma-primary/10 text-quaresma-primary">
                                                <span className="font-serif-stitch italic text-lg">
                                                    {i === 0 ? "U" : i === 1 ? "+" : "↑"}
                                                </span>
                                            </div>
                                            <h4 className="font-serif-stitch italic text-lg text-quaresma-primary">
                                                {pilar.dimensao}
                                            </h4>
                                        </div>
                                        <div className="space-y-2 pl-13">
                                            <p className="text-[11px] leading-relaxed text-quaresma-text/70">
                                                <span className="font-cinzel text-[9px] text-quaresma-accent uppercase">Fundamento: </span>
                                                {pilar.fundamento}
                                            </p>
                                            <p className="text-[11px] leading-relaxed text-quaresma-text/70">
                                                <span className="font-cinzel text-[9px] text-quaresma-accent uppercase">Dinâmica: </span>
                                                {pilar.dinamica}
                                            </p>
                                            <p className="text-[11px] leading-relaxed text-quaresma-text/70">
                                                <span className="font-cinzel text-[9px] text-quaresma-accent uppercase">Impacto: </span>
                                                {pilar.impacto}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {currentSlide.acaoPratica && (
                                <div className="border-l-2 border-quaresma-accent pl-4">
                                    <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase block mb-1">
                                        Ação Prática
                                    </span>
                                    <p className="text-sm text-quaresma-text">{currentSlide.acaoPratica}</p>
                                </div>
                            )}
                        </div>
                    ) : 
                    
                    /* FASES - Grid especial */
                    currentSlide.type === "fases" ? (
                        <div className="space-y-8">
                            <div className="text-center space-y-4">
                                <div className="text-5xl md:text-6xl mb-2">{currentSlide.icone}</div>
                                <div className="h-px w-10 bg-quaresma-accent/40 mx-auto mb-6"></div>
                                <h1 className="font-serif-stitch text-3xl md:text-4xl text-quaresma-primary leading-tight">
                                    {currentSlide.tema}
                                </h1>
                                <p className="text-sm opacity-70 max-w-[320px] mx-auto font-light">
                                    {currentSlide.reflexao}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {currentSlide.fasesInfo?.map((fase, i) => (
                                    <div key={i} className="pillar-card p-4 flex gap-4 items-start">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-quaresma-primary/5 text-quaresma-primary shrink-0">
                                            <span className="text-2xl font-serif-stitch italic">{fase.numero}</span>
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-serif-stitch italic text-base text-quaresma-primary">
                                                    {fase.titulo}
                                                </h4>
                                                <span className="font-cinzel text-[8px] tracking-widest text-quaresma-accent bg-quaresma-accent/10 px-2 py-0.5 rounded-full">
                                                    {fase.dias}
                                                </span>
                                            </div>
                                            <p className="text-[12px] leading-relaxed text-quaresma-text/70 font-light">
                                                {fase.descricao}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {currentSlide.acaoPratica && (
                                <div className="border-l-2 border-quaresma-accent pl-4">
                                    <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase block mb-1">
                                        Ação Prática
                                    </span>
                                    <p className="text-sm text-quaresma-text">{currentSlide.acaoPratica}</p>
                                </div>
                            )}
                        </div>
                    ) : 
                    
                    /* INTRODUÇÃO, TEOLOGIA, PRATICO - Layout padrão com details */
                    (
                        <div className="space-y-10 relative pb-10">
                            <div className="watermark-40">{currentSlide.icone}</div>
                            <div className="space-y-5 pt-10">
                                <div className="text-4xl md:text-5xl">{currentSlide.icone}</div>
                                <h1 className="font-serif-stitch text-3xl md:text-4xl text-quaresma-primary leading-tight">
                                    {currentSlide.tema}
                                </h1>
                                
                                {/* Versículo */}
                                {currentSlide.versiculo && (
                                    <div className="border-l-2 border-quaresma-accent pl-4 my-4">
                                        <p className="font-serif-stitch italic text-quaresma-primary text-sm leading-relaxed">
                                            "{currentSlide.textoVersiculo}"
                                        </p>
                                        <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase">
                                            {currentSlide.versiculo}
                                        </span>
                                    </div>
                                )}
                                
                                {/* Pilar e Fase badges */}
                                <div className="flex gap-2 flex-wrap">
                                    {currentSlide.pilar && (
                                        <span className={`font-cinzel text-[8px] tracking-widest uppercase px-3 py-1 rounded-full
                                            ${currentSlide.pilar === 'Oração' ? 'bg-blue-100 text-blue-700' : 
                                              currentSlide.pilar === 'Jejum' ? 'bg-amber-100 text-amber-700' : 
                                              'bg-emerald-100 text-emerald-700'}`}>
                                            {currentSlide.pilar}
                                        </span>
                                    )}
                                    {currentSlide.fase && (
                                        <span className="font-cinzel text-[8px] tracking-widest text-quaresma-accent uppercase bg-quaresma-accent/10 px-3 py-1 rounded-full">
                                            {currentSlide.fase}
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm md:text-base leading-relaxed opacity-80 font-light">
                                    {currentSlide.reflexao}
                                </p>
                            </div>

                            {/* Details */}
                            {currentSlide.details && currentSlide.details.length > 0 && (
                                <div className="space-y-6">
                                    {currentSlide.details.map((detail, i) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            <span className="font-cinzel text-quaresma-accent font-bold text-lg leading-none pt-1 opacity-60 group-hover:opacity-100 transition-opacity shrink-0 w-8">
                                                {detail.id}
                                            </span>
                                            <div className="space-y-1">
                                                <h4 className="font-cinzel text-[11px] tracking-widest font-bold text-quaresma-text uppercase">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm leading-relaxed text-quaresma-text/70 font-light">
                                                    {detail.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Ação Prática */}
                            {currentSlide.acaoPratica && (
                                <div className="border-l-2 border-quaresma-accent pl-4 pt-2">
                                    <span className="font-cinzel text-[9px] tracking-widest text-quaresma-accent uppercase block mb-2">
                                        🎯 Ação Prática
                                    </span>
                                    <p className="text-sm text-quaresma-text leading-relaxed">{currentSlide.acaoPratica}</p>
                                </div>
                            )}
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

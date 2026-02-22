/**
 * Dados dos 40 dias da Quaresma 2026
 * Quarta-feira de Cinzas: 18 de fevereiro de 2026
 * Dia 40 (Sábado Santo): 4 de abril de 2026
 * (Domingos excluídos da contagem dos 40 dias)
 *
 * Fonte: D00 a D40.md — 4 fases temáticas
 */

export type Pilar = "Oração" | "Jejum" | "Esmola";

export interface DayData {
    id: number;
    tema: string;
    icone: string;
    fase: string;
    pilar: Pilar;
    versiculo: string;
    textoVersiculo: string;
    reflexao: string;
    acaoPratica: string;
}

/** Retorna a data do calendário para um determinado dia da Quaresma (pulando domingos) */
export function getLentDate(dayId: number): Date {
    const date = new Date(2026, 1, 18); // Quarta-feira de Cinzas
    let count = 1;
    while (count < dayId) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0) count++; // pula domingo (0)
    }
    return date;
}

/** Retorna o dia atual da Quaresma (null se antes ou depois) */
export function getCurrentLentDay(): number | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(2026, 1, 18);
    start.setHours(0, 0, 0, 0);
    if (today < start) return null;
    let day = 0;
    const d = new Date(start);
    while (d <= today) {
        if (d.getDay() !== 0) day++;
        if (d.getTime() === today.getTime()) break;
        d.setDate(d.getDate() + 1);
    }
    return Math.min(day, 40);
}

// ─── Fases ──────────────────────────────────────────────────────────────────
const FASE_I = "A Desconstrução do Ego e o Chamado ao Deserto";
const FASE_II = "O Atrito no Deserto e a Batalha Interior";
const FASE_III = "O Transbordamento da Caridade";
const FASE_IV = "A Ascensão ao Calvário e o Alvorecer da Ressurreição";

export const DAYS: DayData[] = [
    // ══════════ FASE I — D01 a D10 ══════════
    {
        id: 1,
        tema: "O Portal das Cinzas e a Finitude",
        icone: "⚱️",
        fase: FASE_I,
        pilar: "Oração",
        versiculo: "Gênesis 3:19",
        textoVersiculo: "Pois tu és pó e ao pó hás de voltar.",
        reflexao: "O recomeço autêntico exige o choque inexorável com a própria mortalidade. A imposição das cinzas não é um rito de desespero ou aniquilação, mas a constatação de que a autossuficiência humana é a mais perigosa das ilusões. O pó é a matéria-prima originária da criação; ao reconhecer-se como pó, o cristão depõe suas armaduras de orgulho e entrega-se novamente nas mãos do divino Oleiro para ser refeito. A destruição do ego vaidoso é o estágio marco zero para que o Espírito Santo inicie a reconstrução do edifício espiritual.",
        acaoPratica: "Cumprir rigorosamente o preceito do jejum e da abstinência de carne. Realizar uma refeição extremamente simples e dedicar quinze minutos de silêncio absoluto para avaliar quais áreas da vida encontram-se em ruínas e necessitam de conversão urgente.",
    },
    {
        id: 2,
        tema: "O Retorno do Coração Dilacerado",
        icone: "💔",
        fase: FASE_I,
        pilar: "Jejum",
        versiculo: "Joel 2:12-13",
        textoVersiculo: "Ainda assim, agora mesmo, diz o Senhor: Convertei-vos a mim de todo o vosso coração; e isso com jejuns, com choro e com pranto. Rasgai o vosso coração, e não as vossas vestes.",
        reflexao: "A exterioridade da religião torna-se tóxica quando desprovida da interioridade do arrependimento. O profeta Joel diagnostica o teatro espiritual das vestes rasgadas — a mera aparência de piedade — e exige uma fratura real no centro das decisões e afetos humanos: o coração. Recomeçar significa abandonar as encenações sociais de perfeição e apresentar-se diante da justiça divina na mais profunda vulnerabilidade, assumindo os próprios fracassos morais como o único ponto de partida aceitável para a misericórdia.",
        acaoPratica: "Realizar um profundo e criterioso exame de consciência noturno, listando as faltas recorrentes e as inclinações desordenadas, preparando-se ativamente para receber o sacramento da Reconciliação (Confissão) nos próximos dias.",
    },
    {
        id: 3,
        tema: "A Solitude do Quarto Secreto",
        icone: "🚪",
        fase: FASE_I,
        pilar: "Oração",
        versiculo: "Mateus 6:6",
        textoVersiculo: "Mas tu, quando orares, entra no teu aposento e, fechando a tua porta, ora a teu Pai que está em secreto; e teu Pai, que vê em secreto, te recompensará.",
        reflexao: "A sociedade hiperconectada contemporânea sofre da patologia da hiper-exposição. Cristo propõe o movimento radicalmente inverso: a ocultação deliberada. O recomeço espiritual ocorre no anonimato do \"quarto secreto\", longe da aprovação, dos aplausos e dos algoritmos do mundo. É na solitude fechada que a voz de Deus deixa de competir com o ruído ensurdecedor das demandas sociais e passa a ecoar nas paredes da alma, estabelecendo uma intimidade indissolúvel.",
        acaoPratica: "Desligar o rádio, podcasts ou músicas no carro e no transporte público durante todo o dia. Utilizar o tempo de deslocamento exclusivamente para cultivar o silêncio interior e orar mentalmente.",
    },
    {
        id: 4,
        tema: "A Condução ao Campo de Batalha",
        icone: "⚔️",
        fase: FASE_I,
        pilar: "Esmola",
        versiculo: "Mateus 4:1",
        textoVersiculo: "Então Jesus foi levado pelo Espírito ao deserto, para ser tentado pelo Diabo.",
        reflexao: "O deserto quaresmal não é um castigo punitivo, mas o laboratório essencial do Espírito. O próprio Verbo Encarnado foi conduzido a este ambiente de privação extrema para enfrentar a personificação do mal e desmascarar suas ilusões. Recomeçar exige a coragem de enfrentar os próprios demônios e traumas de frente, sem os mecanismos de fuga e distrações que o ser humano utiliza para anestesiar a consciência. A tentação, quando resistida, não é um pecado, mas a forja que fortalece os músculos da vontade.",
        acaoPratica: "Identificar a principal distração digital diária (redes sociais, vídeos curtos, jogos) e aplicar um jejum total de telas de entretenimento por 24 horas, substituindo esse tempo por leitura espiritual.",
    },
    {
        id: 5,
        tema: "O Sustento que Emana do Verbo",
        icone: "📖",
        fase: FASE_I,
        pilar: "Oração",
        versiculo: "Mateus 4:4",
        textoVersiculo: "Não só de pão vive o homem, mas de toda a palavra que sai da boca de Deus.",
        reflexao: "A fome física experimentada rigorosamente no jejum revela uma fome antropológica muito mais abissal: a fome de sentido e de eternidade. Quando o corpo enfraquece pela falta do pão material, a alma deve ser alimentada de forma maciça pelo Logos. A dependência excessiva das consolações físicas cria uma severa anemia espiritual. Retornar à Palavra de Deus é nutrir-se daquilo que possui validade permanente, compreendendo que a providência divina sustenta a existência humana de forma mais vital que os próprios nutrientes.",
        acaoPratica: "Tomar o café da manhã ou a principal refeição do dia sem a adição de qualquer tipo de açúcar ou adoçante. Oferecer este pequeno, mas constante, incômodo físico como sacrifício de louvor.",
    },
    {
        id: 6,
        tema: "A Reconfiguração Ontológica",
        icone: "🔄",
        fase: FASE_I,
        pilar: "Jejum",
        versiculo: "2 Coríntios 5:17",
        textoVersiculo: "Portanto, se alguém está em Cristo, é nova criação. O mundo velho desapareceu. Tudo agora é novo.",
        reflexao: "O recomeço proposto pela Quaresma não visa um simples verniz moral, mas culmina em uma reconfiguração ontológica completa. O \"mundo velho\" das paixões desordenadas, das memórias amargas e da mediocridade relacional perde definitivamente sua jurisdição sobre o indivíduo que é enxertado no Corpo de Cristo. Assumir ativamente esta identidade de \"nova criatura\" é o único motor psicológico capaz de sustentar a perseverança nas exigentes práticas ascéticas.",
        acaoPratica: "Exercer o controle absoluto sobre as murmurações. Passar o dia inteiro sem reclamar ou demonstrar insatisfação por absolutamente nenhum motivo. Caso ocorra uma falha, rezar imediatamente uma Ave-Maria em ato de reparação.",
    },
    {
        id: 7,
        tema: "A Cruz como Eixo Direcional",
        icone: "✝️",
        fase: FASE_I,
        pilar: "Esmola",
        versiculo: "Lucas 9:23",
        textoVersiculo: "Depois Jesus disse a todos: 'Se alguém me quer seguir, renuncie a si mesmo, tome sua cruz cada dia, e siga-me.'",
        reflexao: "A renúncia pessoal é a lei da gravidade fundamental do progresso espiritual. O ego humano atua como um buraco negro, sugando todos os afetos e atenções para si mesmo. Tomar a cruz diariamente é o mecanismo que estanca esse egocentrismo devorador. A cruz diária não se manifesta necessariamente em um grande e dramático martírio, mas na soma inexorável das pequenas mortificações, na aceitação silenciosa das contrariedades da rotina e no sacrifício voluntário em prol da harmonia alheia.",
        acaoPratica: "Assumir integralmente uma tarefa doméstica que cause aversão (como lavar toda a louça, limpar banheiros ou organizar um cômodo) sem pedir ajuda e sem esperar qualquer forma de reconhecimento ou agradecimento.",
    },
    {
        id: 8,
        tema: "O Purgatório da Memória e da Culpa",
        icone: "🕊️",
        fase: FASE_I,
        pilar: "Oração",
        versiculo: "Isaías 43:25",
        textoVersiculo: "Eu, eu mesmo, sou o que apago as tuas transgressões por amor de mim, e dos teus pecados não me lembro.",
        reflexao: "Um contingente expressivo de cristãos falha em recomeçar porque carrega o peso paralisante do passado. A dinâmica da culpa não redimida sabota o desenvolvimento humano, gerando escrúpulos e desespero. Deus, em Sua majestade, pratica um \"esquecimento divino\" voluntário em relação aos pecados que foram validamente confessados. Se o próprio Criador oblitera a memória de nossas transgressões, agarrar-se a elas é um ato de orgulho e rebelião. A aceitação plena do perdão é um supremo ato de humildade.",
        acaoPratica: "Dirigir-se a uma paróquia e buscar o Sacramento da Confissão, purificando a alma das faltas passadas e abrindo os canais da graça santificante para o restante da jornada quaresmal.",
    },
    {
        id: 9,
        tema: "A Caridade no Ocultamento",
        icone: "🤲",
        fase: FASE_I,
        pilar: "Oração",
        versiculo: "Mateus 6:3-4",
        textoVersiculo: "Quando deres esmola, que tua mão esquerda não saiba o que fez a direita. Assim, a tua esmola se fará em segredo.",
        reflexao: "A esmola orquestrada para atrair holofotes e aplausos converte a sagrada virtude da caridade em vaidade e transforma o pobre em um mero instrumento de promoção pessoal. A instrução rigorosa de Jesus garante que o ato de doação atinja o seu propósito dialético: aliviar concretamente a miséria física do próximo e, simultaneamente, aniquilar o narcisismo de quem doa. O bem feito no oculto é o mais puro, pois o único espectador e galardoador é Deus.",
        acaoPratica: "Realizar uma doação financeira significativa ou despojar-se de roupas e bens de real importância de forma totalmente anônima, garantindo que o beneficiário ou a instituição jamais descubra a autoria do gesto.",
    },
    {
        id: 10,
        tema: "A Lei da Reciprocidade Divina",
        icone: "🙏",
        fase: FASE_I,
        pilar: "Jejum",
        versiculo: "Tiago 4:8",
        textoVersiculo: "Aproximem-se de Deus, e ele se aproximará de vocês.",
        reflexao: "O relacionamento com a Trindade é ancorado na reciprocidade e no respeito ao livre-arbítrio humano. A graça divina sempre toma a iniciativa, mas a consumação do encontro salvífico requer o passo volitivo do homem. A oração não é um recurso mágico para dobrar a vontade de Deus aos nossos caprichos terrenos, mas o doloroso processo pelo qual a nossa vontade rebelde se alinha à d'Ele. Quem dá um passo consciente na direção da luz, vê as sombras do próprio ser recuarem instantaneamente.",
        acaoPratica: "Estabelecer uma \"lista de intercessão\" por escrito. Dedicar quinze minutos do período da manhã exclusivamente para rezar, um a um, pelas necessidades de outras pessoas, silenciando os próprios pedidos.",
    },

    // ══════════ FASE II — D11 a D20 ══════════
    {
        id: 11,
        tema: "A Hipocrisia do Falso Jejum",
        icone: "🎭",
        fase: FASE_II,
        pilar: "Jejum",
        versiculo: "Isaías 58:6",
        textoVersiculo: "O jejum que desejo não é este: soltar as correntes da injustiça, desatar as cordas do jugo, pôr em liberdade os oprimidos e romper todo jugo?",
        reflexao: "A veemência da profecia de Isaías desestabiliza qualquer religiosidade estéril. Jejuar rigorosamente do alimento enquanto se devora a reputação do próximo com fofocas, injustiças e rancores é considerado uma abominação teológica. O verdadeiro jejum abstém-se da comida para gerar energia moral que deve ser convertida na libertação humana. A mortificação do corpo precisa refletir uma retidão ética inabalável; caso contrário, será apenas um culto sociológico vazio de amor.",
        acaoPratica: "Exercer o controle implacável da língua: recusar-se a participar de fofocas, não criticar absolutamente ninguém e, proativamente, proferir um elogio sincero e edificante a um familiar ou colega de trabalho.",
    },
    {
        id: 12,
        tema: "O Coração Cirurgicamente Purificado",
        icone: "💧",
        fase: FASE_II,
        pilar: "Jejum",
        versiculo: "Salmos 51:10",
        textoVersiculo: "Cria em mim um coração puro, ó Deus, e renova dentro de mim um espírito estável.",
        reflexao: "O Salmo 51 (Miserere) representa o ápice da antropologia do arrependimento na Escritura. O Rei Davi, esmagado pela culpa, não pede apenas uma limpeza moral superficial; ele suplica por uma intervenção cirúrgica divina: a criação (bara, do hebraico, uma ação exclusiva de Deus a partir do nada) de um novo coração. O recomeço duradouro exige estabilidade de espírito, uma âncora invisível que impeça o indivíduo de flutuar ao sabor das instabilidades emocionais e das crises externas.",
        acaoPratica: "Rezar o Santo Terço completo meditando de forma consciente em cada mistério, oferecendo-o especificamente pela purificação dos próprios pensamentos e intenções ao longo do dia.",
    },
    {
        id: 13,
        tema: "O Domínio das Janelas da Alma",
        icone: "👁️",
        fase: FASE_II,
        pilar: "Oração",
        versiculo: "Mateus 6:22",
        textoVersiculo: "A candeia do corpo são os olhos; de sorte que, se os teus olhos forem bons, todo o teu corpo terá luz.",
        reflexao: "A entrada de luz ou de trevas na morada da alma depende diretamente das permissões que concedemos através dos nossos sentidos. A castidade ocular e a recusa categórica em consumir conteúdos degradantes, fúteis ou violentos protegem a integridade do santuário interior. Na cultura moderna, que lucra com o entretenimento incessante e a dispersão da atenção, reeducar a visão para focar apenas naquilo que eleva e constrói é um ato de profunda rebelião intelectual e ascese espiritual.",
        acaoPratica: "Abster-se completamente de assistir à televisão, acessar plataformas de streaming ou jogar videogames durante este dia, oferecendo o tédio gerado como mortificação e espaço para a reflexão.",
    },
    {
        id: 14,
        tema: "O Antídoto da Misericórdia",
        icone: "❤️‍🩹",
        fase: FASE_II,
        pilar: "Oração",
        versiculo: "Lamentações 3:22",
        textoVersiculo: "As misericórdias do Senhor são a causa de não sermos consumidos; porque as suas misericórdias não têm fim.",
        reflexao: "A percepção aguçada dos próprios defeitos crônicos, ampliada pelo silêncio da Quaresma, pode gerar um estado de desespero se não for equilibrada pela confiança inabalável na providência. A misericórdia de Deus atua como a barreira de contenção que impede a nossa auto-destruição ontológica. Ela se renova a cada manhã, providenciando o \"crédito espiritual\" estritamente necessário para que o recomeço diário seja possível, anulando as falências do dia anterior.",
        acaoPratica: "Rezar o Terço da Divina Misericórdia exatamente às 15h (a hora da Misericórdia), suplicando compaixão e graça de retorno para todos aqueles que se encontram afastados da fé católica.",
    },
    {
        id: 15,
        tema: "O Magnetismo do Tesouro Incorruptível",
        icone: "💎",
        fase: FASE_II,
        pilar: "Esmola",
        versiculo: "Mateus 6:21",
        textoVersiculo: "Porque onde estiver o vosso tesouro, ali estará também o vosso coração.",
        reflexao: "O afeto humano opera por uma lei de magnetismo inquebrável: a alma é inexoravelmente atraída e moldada pela natureza do objeto que mais valoriza. O apego cego aos bens de consumo, ao status ou ao conforto terreno corrompe a dignidade humana, pois amarra a vocação eterna da alma a coisas que fatalmente enferrujarão e perecerão. Deslocar o tesouro para o céu significa auditar e reavaliar drasticamente os investimentos pessoais de tempo, energia e amor, priorizando o que sobrevive à morte.",
        acaoPratica: "Praticar o consumo conscientemente restrito. Passar o dia inteiro sem realizar absolutamente nenhuma compra supérflua (roupas, lanches, itens não essenciais), resistindo ativamente ao impulso consumista.",
    },
    {
        id: 16,
        tema: "O Julgamento Suspenso e a Compaixão Ativa",
        icone: "⚖️",
        fase: FASE_II,
        pilar: "Oração",
        versiculo: "Lucas 6:36",
        textoVersiculo: "Sede, pois, misericordiosos, como também vosso Pai é misericordioso.",
        reflexao: "A prova cabal e incontestável de que fomos de fato alcançados pelo perdão divino é a nossa capacidade reflexa de retransmitir esse mesmo perdão aos nossos devedores. A intolerância, a amargura e a dureza de coração em relação às falhas alheias revelam um bloqueio fatal no fluxo da graça. O treinamento quaresmal recalibra a visão para enxergar o outro não como um obstáculo ou inimigo, mas como um companheiro trágico de queda e redenção que necessita desesperadamente de compaixão.",
        acaoPratica: "Realizar uma visita presencial (ou uma ligação telefônica longa e intencional) a alguém que está enfermo, enlutado ou atravessando um período de desesperança, oferecendo presença e escuta solidária.",
    },
    {
        id: 17,
        tema: "A Terapêutica do Perdão",
        icone: "🩺",
        fase: FASE_II,
        pilar: "Jejum",
        versiculo: "Salmos 103:3",
        textoVersiculo: "Pois ele te perdoa toda culpa, e cura toda a tua enfermidade.",
        reflexao: "O pecado não é apenas uma infração de um código jurídico distante; é uma doença degenerativa da alma que gera metástases emocionais, psicológicas e relacionais. O perdão atua como o antídoto bioquímico que interrompe o avanço desse veneno existencial. Jesus apresenta-se como o médico divino que desce até as raízes mais profundas de nossos traumas, inseguranças e memórias dolorosas, oferecendo uma cura integral que restaura o espírito, pacifica a mente e, frequentemente, alivia o corpo.",
        acaoPratica: "Falar menos e ouvir o dobro. Exercer o silêncio empático ao interagir com as pessoas, focando totalmente em compreender suas dores e frustrações sem interrompê-las com opiniões próprias.",
    },
    {
        id: 18,
        tema: "A Resiliência no Trânsito da Vida",
        icone: "🏋️",
        fase: FASE_II,
        pilar: "Esmola",
        versiculo: "Romanos 12:12",
        textoVersiculo: "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",
        reflexao: "A Quaresma possui um tom profundamente escatológico de espera. Esperamos a Ressurreição histórica e, no limite cósmico, o triunfo final de Cristo. Esta esperança injeta uma resiliência sobrenatural no cristão. A paciência exigida por Paulo não é uma passividade estóica ou covardia, mas uma resistência ativa que suporta as adversidades sem perder a alegria intrínseca, sabendo que a tribulação atual é passageira, mas o peso de glória é definitivo.",
        acaoPratica: "Dirigir o veículo ou comportar-se no transporte público com extrema polidez e paciência cristã. Dar a preferência de passagem, não buzinar com irritação e evitar qualquer xingamento ou pensamento de fúria.",
    },
    {
        id: 19,
        tema: "A Sede e a Água Viva",
        icone: "💧",
        fase: FASE_II,
        pilar: "Oração",
        versiculo: "João 4:10",
        textoVersiculo: "Se conheceras o dom de Deus... tu lhe pedirias, e ele te daria água viva.",
        reflexao: "O célebre diálogo de Cristo com a mulher Samaritana expõe a sede crônica de uma humanidade que tenta pateticamente se saciar em poços secos ou contaminados (relacionamentos líquidos, poder, acúmulo financeiro, distrações). O recomeço espiritual ocorre no exato momento de ruptura em que o indivíduo reconhece a exaustão de buscar água no deserto do mundo e suplica pela fonte inesgotável da graça. O Espírito Santo é esta água viva que jorra com força hidrodinâmica para a vida eterna.",
        acaoPratica: "Exercer a mortificação unida à ecologia integral: economizar água rigorosamente durante todas as atividades diárias (reduzir drasticamente o tempo de banho, não desperdiçar na lavagem), unindo o zelo pela Casa Comum ao sacrifício pessoal.",
    },
    {
        id: 20,
        tema: "A Humildade como Pista de Pouso da Graça",
        icone: "🙇",
        fase: FASE_II,
        pilar: "Jejum",
        versiculo: "Tiago 4:6",
        textoVersiculo: "Deus resiste aos soberbos, mas dá graça aos humildes.",
        reflexao: "O orgulho intelectual e moral ergue uma muralha impenetrável ao redor da alma, blindando-a efetivamente contra qualquer influência de Deus. A humildade, por sua vez, é a verdade nua e crua sobre quem somos: criaturas ontologicamente frágeis, falhas e totalmente dependentes do Sopro divino. É uma postura contínua de receptividade. Ao assumirmos voluntariamente o último lugar, pavimentamos a pista de pouso perfeita para o derramamento torrencial do Espírito Santo.",
        acaoPratica: "Entrar em contato e pedir desculpas sinceramente a alguém por uma falha, ofensa ou omissão antiga, esmagando o próprio orgulho para restaurar o relacionamento ferido.",
    },

    // ══════════ FASE III — D21 a D30 ══════════
    {
        id: 21,
        tema: "A Supremacia da Obediência sobre o Sacrifício",
        icone: "👑",
        fase: FASE_III,
        pilar: "Esmola",
        versiculo: "1 Samuel 15:22",
        textoVersiculo: "Obedecer é melhor do que sacrificar, e a submissão é melhor do que a gordura de carneiros.",
        reflexao: "É um perigo recorrente na vida espiritual que as práticas severas de mortificação se tornem motivo de vaidade se estiverem desconectadas da obediência à vontade de Deus. O coração obstinado que cumpre rituais ascéticos perfeitos, mas recusa-se a perdoar o irmão ou a servir com amor no seu dever diário, é severamente repreendido pelas Escrituras. A verdadeira e mais difícil ascese é dobrar a vontade própria diante da realidade e do dever de estado, sem murmurações.",
        acaoPratica: "Executar o próprio trabalho profissional e os deveres domésticos com extremo esmero, entregando \"um pouco mais\" do que o estritamente exigido, e oferecendo o esforço físico e o cansaço como oração não-verbal.",
    },
    {
        id: 22,
        tema: "O Apelo Frente à Fragilidade da Fé",
        icone: "🕯️",
        fase: FASE_III,
        pilar: "Oração",
        versiculo: "Marcos 9:24",
        textoVersiculo: "Eu creio; ajuda-me a vencer a minha incredulidade!",
        reflexao: "Ao cruzar a metade da Quaresma, o desgaste físico e a fadiga mental podem provocar períodos de aridez, tédio e dúvidas profundas. O clamor do pai no Evangelho de Marcos é a oração honesta da alma que, mesmo balançando diante das evidências contrárias, agarra-se desesperadamente à promessa de Cristo. Admitir a fragilidade da própria fé não é um sinal de fracasso, mas uma porta escancarada para que a força divina supra o que a natureza humana, exaurida, já não alcança. O recomeço não exige uma fé monolítica, mas uma fé disposta a se deixar socorrer.",
        acaoPratica: "Ligar de forma intencional para os pais, avós ou familiares estendidos (como a família do cônjuge), dedicando tempo de qualidade e escuta paciente a eles, sem dividir a atenção com o celular.",
    },
    {
        id: 23,
        tema: "O Jejum que Alimenta o Irmão",
        icone: "🍞",
        fase: FASE_III,
        pilar: "Esmola",
        versiculo: "Isaías 58:7",
        textoVersiculo: "Repartir sua comida com o faminto, abrigar o pobre desamparado, vestir o nu que você encontrou.",
        reflexao: "A doutrina social e a teologia do desapego nos ensinam que não somos proprietários absolutos dos bens temporais, mas meros administradores provisórios. Segundo a patrística, aquilo que acumulamos de forma supérflua no armário pertence, por estrita justiça divina, àquele que tem fome e padece de frio. O despojamento material não apenas socorre a urgência da miséria física do necessitado, mas atua como um bisturi que extirpa a miséria moral da avareza do coração de quem doa.",
        acaoPratica: "Fazer uma triagem rigorosa no guarda-roupa, separar roupas de frio, calçados ou provisões na despensa e doá-los concretamente a uma instituição de caridade ou a uma pessoa necessitada nas imediações.",
    },
    {
        id: 24,
        tema: "A Ascese da Organização e da Paciência",
        icone: "🧹",
        fase: FASE_III,
        pilar: "Esmola",
        versiculo: "Salmos 1:1-2",
        textoVersiculo: "Feliz é todo aquele que... encontra seu prazer na lei de Deus e a medita, dia e noite, sem cessar.",
        reflexao: "É frequente que o fiel nutra devaneios com grandes atos de martírio heroico no Oriente Médio, enquanto falha miseravelmente nas pequenas contrariedades do seu próprio lar. A santidade forja-se na bigorna do dia a dia. Uma resposta rude firmemente contida, a tolerância compassiva com as falhas repetitivas dos familiares e a ordenação do próprio tempo compõem o mosaico do autodomínio que agrada profundamente a Deus e transforma a meditação da lei divina em práxis.",
        acaoPratica: "Organizar minuciosamente uma gaveta, armário ou ambiente da casa que esteja caótico há muito tempo. Usar o processo de estabelecimento da ordem física externa para treinar e refletir sobre a ordem e disciplina internas da alma.",
    },
    {
        id: 25,
        tema: "A Responsabilidade Intransferível pelo Outro",
        icone: "🐟",
        fase: FASE_III,
        pilar: "Oração",
        versiculo: "Mateus 14:16",
        textoVersiculo: "Dêem-lhes vocês mesmos de comer.",
        reflexao: "Diante da fome iminente e da necessidade logística de uma multidão de cinco mil homens, os apóstolos tentaram terceirizar a crise, pedindo que Jesus enviasse o povo embora para comprar comida. A resposta de Cristo inverte violentamente a lógica da omissão: a dor e a fome do mundo são responsabilidade direta da Igreja. O mandato exige envolvimento pessoal, não apenas boas intenções. O recomeço comunitário ganha tração quando o cristão deixa de ser um mero espectador do sofrimento alheio e passa a ser um agente de provisão.",
        acaoPratica: "Desviar ativamente a própria rota ou alterar o planejamento do dia para dar carona, prestar um auxílio físico ou resolver um problema prático de um conhecido, vizinho ou colega.",
    },
    {
        id: 26,
        tema: "O Pastoreio nas Águas Tranquilas",
        icone: "🌿",
        fase: FASE_III,
        pilar: "Esmola",
        versiculo: "Salmos 23:1",
        textoVersiculo: "O Senhor é o meu pastor; nada me faltará.",
        reflexao: "A epidemia de ansiedade na era moderna nasce fundamentalmente da ilusão de que o homem possui o controle absoluto sobre as variáveis da sua vida. O Salmo 23 apresenta-se como a antítese poética e teológica do desespero contemporâneo, revelando um Deus que não apenas cria, mas providencia e pastoreia. Recomeçar é transferir o peso esmagador da gestão das nossas incertezas para os ombros do Pastor divino. A convicção profunda de que o amparo essencial não faltará libera o cristão do modo crônico de sobrevivência, permitindo-lhe habitar na paz.",
        acaoPratica: "Abster-se rigorosamente do consumo de qualquer tipo de bebida alcoólica e de todas as sobremesas. Exercer a sobriedade corporal absoluta durante todo o dia para aguçar a vigilância do espírito.",
    },
    {
        id: 27,
        tema: "A Alegria como Selo da Autenticidade",
        icone: "😊",
        fase: FASE_III,
        pilar: "Oração",
        versiculo: "2 Coríntios 9:7",
        textoVersiculo: "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.",
        reflexao: "A esmola ou o tempo oferecido ao outro com um semblante amargurado, por força de uma obrigação pesada ou com um indisfarçável ar de superioridade moral, perde instantaneamente o seu valor teológico perante o céu. A doação deve ser a resposta orgânica e natural de um coração que, sabendo-se infinitamente devedor e falido perante a misericórdia de Deus, encontra um profundo regozijo em poder aliviar o fardo do irmão. A alegria não é um acessório opcional; é o selo de autenticidade da caridade cristã.",
        acaoPratica: "Identificar uma pessoa no ambiente de trabalho, na faculdade ou na escola que frequentemente se encontra isolada e iniciar uma conversa ativa e acolhedora com ela.",
    },
    {
        id: 28,
        tema: "A Pneumatologia do Recomeço",
        icone: "🔥",
        fase: FASE_III,
        pilar: "Jejum",
        versiculo: "Atos 13:2",
        textoVersiculo: "Enquanto eles ministravam perante o Senhor e jejuavam, disse o Espírito Santo: Separai-me a Barnabé e a Saulo para a obra a que os tenho chamado.",
        reflexao: "O Espírito Santo (Pneuma) é o motor secreto e silencioso de qualquer conversão verdadeira. A Igreja primitiva compreendia que as grandes decisões e missões nasciam sempre do útero do jejum e da oração litúrgica. Nenhuma transformação ética se sustenta a longo prazo apenas pela força do estoicismo humano. É a graça do Espírito que infunde fervor onde havia indiferença e intrepidez onde habitava o medo paralisante. Renovar a fé na ação invisível da Terceira Pessoa da Trindade é garantir o fôlego para a reta final da jornada de santificação.",
        acaoPratica: "Convidar de forma intencional e amorosa um amigo ou membro da família que está afastado da Igreja Católica para participar da Santa Missa ou de um grupo de oração no próximo fim de semana.",
    },
    {
        id: 29,
        tema: "A Esperança Ativa e Escatológica",
        icone: "🌅",
        fase: FASE_III,
        pilar: "Esmola",
        versiculo: "Filipenses 3:13-14",
        textoVersiculo: "Esquecendo-me das coisas que ficaram para trás e avançando para as que estão adiante, prossigo para o alvo.",
        reflexao: "A melancolia persistente e o excesso de saudosismo paralisante são parasitas letais do crescimento espiritual. O Apóstolo Paulo, tendo um passado sombrio como cúmplice de assassinatos e perseguidor de cristãos, compreendeu que a culpa deve ser deixada na cruz e o foco deve ser estritamente escatológico (apontado para o futuro glorioso da comunhão em Cristo). O conceito de recomeço proíbe a paralisação na auto-piedade. Cada novo amanhecer é uma folha em branco na qual a providência divina redige, contando com a pena do nosso livre-arbítrio, um novo capítulo de redenção.",
        acaoPratica: "Proferir palavras de afirmação e elogiar de forma genuína o cônjuge, os filhos ou os pais. Buscar destacar verbalmente uma virtude silenciosa neles que, por força do hábito, frequentemente passa despercebida no dia a dia.",
    },
    {
        id: 30,
        tema: "A Reconciliação como Imperativo",
        icone: "🤝",
        fase: FASE_III,
        pilar: "Oração",
        versiculo: "2 Coríntios 5:20",
        textoVersiculo: "Somos, pois, embaixadores de Cristo, e é Deus mesmo que exorta através de nós. Em nome de Cristo, nós vos suplicamos: deixai-vos reconciliar com Deus.",
        reflexao: "O estado prolongado de inimizade ou indiferença para com Deus gera uma fratura estrutural oculta que compromete todas as outras dimensões da existência humana (psicológica, familiar, social). A súplica contundente de São Paulo é revestida de um tom dramático: a porta da misericórdia está completamente aberta, o preço já foi pago no Calvário, mas o cruzamento da soleira exige a nossa capitulação voluntária. Reconciliar-se é depor as armas do orgulho secular e reconhecer que o retorno humilde à Casa do Pai é a única fonte geradora de dignidade real e paz imperturbável.",
        acaoPratica: "Reservar a noite para desligar as telas individuais e assistir a um bom filme ou realizar uma refeição prolongada e construtiva em conjunto com a família, fortalecendo os laços e a harmonia da \"igreja doméstica\".",
    },

    // ══════════ FASE IV — D31 a D40 ══════════
    {
        id: 31,
        tema: "A Exposição à Luz do Conhecimento Divino",
        icone: "🔦",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "Salmos 139:1",
        textoVersiculo: "Senhor, tu me perscrutastes e me conheces.",
        reflexao: "Fugir amedrontado do olhar de Deus e esconder-se por trás de justificativas é o instinto primário da humanidade decaída desde o Éden. A Quaresma, em seu ápice, treina o espírito para não fugir ao escutar os passos do Criador, mas a deixar-se investigar profundamente por Ele. O verdadeiro conhecimento de si mesmo, como ensinam os mestres espirituais, é impossível de ser alcançado sem a luz incisiva da graça. Somente sob o holofote ofuscante do amor incondicional de Cristo podemos encarar as nossas misérias ocultas sem cair no abismo do desespero e, assim, buscar a retificação.",
        acaoPratica: "Realizar um ato de cidadania e cuidado com o meio ambiente (ecologia integral): separar o lixo reciclável da casa de forma minuciosa, utilizando essa atividade física como uma meditação externa sobre o dever de separar os vícios da alma.",
    },
    {
        id: 32,
        tema: "A Aceitação do Cálice no Getsêmani",
        icone: "🍷",
        fase: FASE_IV,
        pilar: "Esmola",
        versiculo: "Mateus 26:39",
        textoVersiculo: "Meu Pai, se for possível, tire de mim este cálice… Ainda assim, não como eu quero, mas como Tu queres.",
        reflexao: "O suor de sangue e a angústia indescritível no Jardim das Oliveiras revelam a vastidão do peso do pecado cósmico que o Salvador assumiu sobre os próprios ombros. O momento de tensão máxima entre a repulsa natural e legítima da carne humana pelo sofrimento e a decisão irrevogável do espírito em obedecer ao projeto do Pai marca o ápice do recomeço da humanidade. É a inversão suprema e definitiva da rebelião de Adão. Unir as nossas dores, enfermidades e frustrações diárias a este cálice de Cristo confere um sentido infinitamente redentor ao, de outra forma inútil, sofrimento humano.",
        acaoPratica: "Realizar o trajeto diário (a pé, de ônibus, metrô ou carro) em estado de oração mental contínua. Evitar rigorosamente escutar músicas, mexer no celular ou usar fones de ouvido, mortificando a curiosidade e focando na Paixão.",
    },
    {
        id: 33,
        tema: "O Cireneu e o Cuidado com o Sofredor",
        icone: "🤝",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "Mateus 11:28",
        textoVersiculo: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
        reflexao: "O esmagamento da cruz diária torna-se suportável quando compreendemos que não caminhamos sozinhos para o nosso calvário pessoal; Cristo atua permanentemente como o Cireneu das nossas almas. Simultaneamente, a coerência evangélica exige que, tendo sido aliviados por Ele, nos tornemos o alívio imediato para a carga insuportável dos nossos irmãos. Em uma sociedade moderna adoecida e esmagada pelo estresse e pela falta de sentido, a presença serena e compassiva de um cristão deve ser a personificação histórica desse repouso prometido por Jesus.",
        acaoPratica: "Praticar a evangelização proativa e sem vergonha: falar abertamente do amor, do perdão e da providência de Deus, de forma simples e natural, para pelo menos uma pessoa no decorrer do dia.",
    },
    {
        id: 34,
        tema: "A Invencibilidade do Espírito nas Trevas",
        icone: "🛡️",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "João 16:33",
        textoVersiculo: "No mundo tereis aflições, mas tende bom ânimo, eu venci o mundo.",
        reflexao: "A ilusão moderna e teologicamente infundada de que a adesão à fé blinda o indivíduo contra os sofrimentos terrenos e doenças colapsa fragorosamente diante desta declaração de Cristo. O que a fé autêntica garante não é uma imunidade imunológica à dor, mas a invencibilidade final do espírito. O \"bom ânimo\" solicitado por Jesus nas vésperas de sua execução não é um otimismo psicológico ingênuo, mas uma certeza enraizada na vitória metafísica contra a morte, o inferno e o pecado.",
        acaoPratica: "Jejuar radicalmente do uso de tecnologia (smartphones, computadores, TVs) nas duas horas que antecedem o sono. Trocar a luz artificial das telas e a agitação letal das redes sociais por uma leitura bíblica silenciosa e edificante.",
    },
    {
        id: 35,
        tema: "A Vigilância e a Espera na Noite Escura",
        icone: "🌙",
        fase: FASE_IV,
        pilar: "Jejum",
        versiculo: "Salmos 130:5-6",
        textoVersiculo: "Espero no Senhor com todo o meu ser, e na sua palavra ponho a minha esperança. A minha alma anseia pelo Senhor mais do que as sentinelas pela manhã.",
        reflexao: "A maturidade da fé frequentemente opera na penumbra aterradora da espera e do aparente silêncio divino. O Salmo De Profundis clama do fundo do abismo, mas recusa-se a ceder ao niilismo, confiando piamente na chegada iminente da alvorada. Recomeçar é manter-se de pé vigiando na muralha, mesmo quando o desgaste severo das cinco semanas anteriores de penitência ameaça dobrar os joelhos do corpo. A vigilância atenta assegura que o coração não adormeça no momento em que a luz da salvação estiver prestes a romper as trevas do horizonte.",
        acaoPratica: "Suportar pacientemente, heroicamente e em absoluto silêncio uma crítica injusta, uma injúria, uma grosseria no trânsito ou uma falta de educação de terceiros, sem revidar e sem tentar justificar-se, oferecendo a humilhação a Deus.",
    },
    {
        id: 36,
        tema: "O Amor Kenótico Levado ao Extremo",
        icone: "❤️‍🔥",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "João 13:1",
        textoVersiculo: "Tendo amado os seus que estavam no mundo, amou-os até o fim.",
        reflexao: "A terrível paixão de Cristo não foi um trágico erro de cálculo ou um acidente judicial na Judeia, mas a consumação friamente calculada de um amor absoluto, voluntário e irrevogável pela raça humana. Amar \"até o fim\" (no limite das forças) significa pulverizar as barreiras burguesas da conveniência, do sentimentalismo barato e da necessidade de reciprocidade. É a manifestação do amor ágape, que se doa incondicionalmente até se esvaziar por completo (kenosis). Adentrar os dias sagrados do Tríduo Pascal exige que tentemos modelar o nosso amor egoísta e frágil nesta forja de sacrifício incandescente.",
        acaoPratica: "Lavar os pés espiritualmente de alguém da sua própria família através de uma ação silenciosa de cuidado, serviço e honra extrema (como preparar uma refeição surpresa, cuidar de uma tarefa pesada por eles ou arrumar um ambiente), demonstrando amor servil.",
    },
    {
        id: 37,
        tema: "O Sacramento da Presença Eterna",
        icone: "🍞",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "Lucas 22:19",
        textoVersiculo: "E, tomando o pão, e havendo dado graças, partiu-o, e deu-lho, dizendo: Isto é o meu corpo, que por vós é dado; fazei isto em memória de mim.",
        reflexao: "Na solene instituição da Eucaristia no Cenáculo, Jesus transcende soberanamente as leis do espaço, da matéria e do tempo para perpetuar, até o fim dos séculos, o seu dom vital e palpável. O pão e o vinho, elementos terrenos, rústicos e criados pelas mãos humanas, tornam-se o Pão da imortalidade. O recomeço alimentado na Eucaristia deixa de ser um esforço moral humano e ganha um substrato diretamente divino. Foi neste exato momento que a Igreja nascente compreendeu que a salvação tem gosto de pão, cheiro de vinho e uma presença real e tátil.",
        acaoPratica: "Fazer todos os esforços logísticos e profissionais possíveis para participar presencialmente da Missa da Ceia do Senhor (Lava-pés), comungando com profundo fervor e recolhimento.",
    },
    {
        id: 38,
        tema: "A Agonia e a Solidão do Getsêmani",
        icone: "🌑",
        fase: FASE_IV,
        pilar: "Esmola",
        versiculo: "Mateus 26:40",
        textoVersiculo: "E, voltando para os seus discípulos, achou-os adormecidos; e disse a Pedro: Então nem uma hora pudestes vigiar comigo?",
        reflexao: "A desoladora solidão de Jesus no Jardim das Oliveiras espelha o drama eterno do abandono humano diante da morte. Os apóstolos mais próximos, vencidos pelo pânico e pelo peso letárgico da carne, adormecem no momento de maior necessidade do Mestre. Vigiar com Cristo nesta noite é a vocação perene da Igreja: assumir espiritualmente as dores do mundo, dos oprimidos e dos sofredores quando a sociedade inteira desvia o olhar ou anestesia-se. A verdadeira compaixão nasce desta vigília voluntária no silêncio denso e doloroso da noite escura.",
        acaoPratica: "Levantar-se 15 a 30 minutos mais cedo do que o habitual, ou retirar-se durante o dia, para prostrar-se ou rezar o Terço ajoelhado no chão duro do quarto, em um ato de profunda reparação pelas ofensas ao Sagrado Coração.",
    },
    {
        id: 39,
        tema: "O Cordeiro Imolado e a Contemplação do Patíbulo",
        icone: "✝️",
        fase: FASE_IV,
        pilar: "Esmola",
        versiculo: "Isaías 53:3-5",
        textoVersiculo: "Era desprezado, e o mais rejeitado entre os homens, homem de dores, e experimentado nos trabalhos... mas ele foi ferido por causa das nossas transgressões.",
        reflexao: "A Sexta-feira da Paixão consolida o mais aterrador e glorioso mistério da fé: a aparente aniquilação física do próprio Deus em um madeiro. O servo sofredor profetizado por Isaías encarna todo o gigantesco rastro de violência, corrupção, guerras e maldades da história de toda a humanidade em sua própria carne rasgada e o esgota na Cruz. A caminhada de quarenta dias culmina e estaciona diante deste patíbulo romano. Aqui, a eloquência cessa. Não há mais teorias ou palavras a serem ditas, exigindo-se apenas a contemplação assombrosa e silenciosa de um perdão cósmico que nos custou cada gota do sangue do Cordeiro sem mancha.",
        acaoPratica: "Adotar o jejum absoluto e a estrita abstinência de carne. Dedicar o dia ao silêncio e à contemplação, acompanhando a Via Sacra ou a meditação das Sete Palavras de Cristo na Cruz. Abster-se radicalmente de ouvir músicas profanas, consumir notícias irrelevantes ou se engajar em qualquer diversão ao longo de todo o dia.",
    },
    {
        id: 40,
        tema: "O Silêncio da Morte e a Tensão da Espera",
        icone: "🌅",
        fase: FASE_IV,
        pilar: "Oração",
        versiculo: "Lucas 23:46",
        textoVersiculo: "Jesus clamou com alta voz: Pai, nas tuas mãos entrego o meu espírito! E, dizendo isto, expirou.",
        reflexao: "O Sábado Santo é o dia do grande luto cósmico, da ausência física, do silêncio ensurdecedor da tumba fria, selada pela guarda romana. A criação inteira prende a respiração. No entanto, para o cristão, não é um dia de desespero final, mas de tensão escatológica. A alma, que foi cirurgicamente purificada, quebrantada e reordenada ao longo de quarenta intensos dias de combate ascético, deposita a sua vida exaurida no túmulo junto com Cristo. Ela não faz isso para permanecer na morte, mas aguardando com uma fé de granito a iminente explosão da pedra sepulcral e a irradiação da luz incorruptível. O longo itinerário pelo deserto foi concluído com êxito, as armaduras pesadas do homem velho despencaram, os vícios foram enfraquecidos pela falta de alimento, e o amanhecer do grande \"recomeço\" agora é inevitável.",
        acaoPratica: "Limitar o uso do smartphone e de dispositivos eletrônicos apenas a necessidades de extrema e inadiável urgência. Praticar rigorosamente o \"jejum do silêncio e das palavras\", mantendo uma postura de reverência interior constante e preparando o coração, a família e a casa — tanto física quanto espiritualmente — para as festividades esplendorosas da Vigília da Ressurreição (Páscoa) à noite.",
    },
];

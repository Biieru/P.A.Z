
  /* ============================================================
     VAULT — Dados das notícias arquivadas
     ============================================================
     Para adicionar uma nova notícia, inclua um objeto no array
     VAULT_ARTICLES seguindo a estrutura abaixo.

     Campos:
       id        : número único (auto-incrementar)
       category  : string — ex: "Recrutamento", "Evento", "Arquivo"
       date      : string — data original da publicação, ex: "10 Jan 2025"
       title     : string — título completo
       subtitle  : string — linha de resumo / subtítulo
       media     : objeto com:
                     type    — "image" | "video" | "none"
                     src     — caminho do arquivo (ex: "/assets/images/foo.jpg")
                     alt     — texto alternativo
                     caption — legenda (opcional)
                     portrait— boolean, true para mídia 9:16 (ex: vídeos verticais)
       body      : array de strings, cada string é um parágrafo
       source    : string — origem da notícia, ex: "Discord da P.A.Z"
       author    : string — assinatura, ex: "Greed"
     ============================================================ */
  const VAULT_ARTICLES = [
  {
    id: 38,
    category: "Revelação Exclusiva",
    date: "Mai 2026",
    title: "O \"WORLD D. GOVERNMENT\" Mostra Seu Abuso de Poder",
    subtitle: "O \"World D. Government\", o governo mundial no mundo do Rell Seas, aparentemente vai ser ainda mais agressivo com as frutas do que esperávamos.",
    media: {
      type: "image-twitter",
      src: "https://pbs.twimg.com/media/HHPQcHvW4AAJI2y?format=jpg&name=large",
      alt: "World D. Government — Rell Seas",
      twitterUrl: "https://x.com/i/status/2050211493925327360",
      twitterLabel: "Ver post original no X",
      caption: "Fontes das profundezas, identidade preservada em anonimato."
    },
    body: [
      "\"All Fruits Belong To The Government, It\'s The Law. Buster Calls Confirmed\""
    ],
    source: "Fontes das profundezas, identidade preservada em anonimato.",
    author: "Greed"
  },
  {
    id: 37,
    category: "Comunicado Oficial",
    date: "30 Abr 2026",
    title: "Movie 3 is the One Piece — Rell Games Esclarece Status do Projeto",
    subtitle: "Rell Games confirma que o jogo está entre 85% e 90% completo, esclarece expectativas sobre o Movie 3 e revela que o lançamento está previsto para o verão.",
    media: {
      type: "multi-image",
      thumb: "https://i.imgur.com/c5T8vY3.jpeg",
      images: [
        { src: "https://i.imgur.com/51quAIS.png",  alt: "RELL Seas — screenshot 1" },
        { src: "https://i.imgur.com/K9N8PQV.jpeg", alt: "RELL Seas — screenshot 2" },
        { src: "https://i.imgur.com/RUpOCNC.png",  alt: "RELL Seas — screenshot 3" },
        { src: "https://i.imgur.com/26uXziN.png",  alt: "RELL Seas — screenshot 4" }
      ],
      caption: "Screenshots anexados ao comunicado oficial."
    },
    body: [
      "I see a lot of speculating about Movie 3 releasing today. The Trello was listed for completion today not Movie 3. We're almost done with that checklist. If I had to put a completion, on the . Game Completion range percentage: 85% close to 90, we're finishing up Fruit Abilities and skills currently.",
      "We'll release Movie 3 sometime in the Summer. Now why would we rush the best part of the game . Movie 3. Like Movie 1, it'll be mainly be showcasing all the new core features. However, couldn't contain excitement so some rambling here and there of actually completing what we've set out to do since 2023.",
      "Movie 3 will show that big jump in quality. The Armours, Weapons, Bosses (Some ScreenShot's below)... Systems, Combat Systems (with an 's') (yes multiple combat Systems), all systems.. can't list all on top of my head, constellation system etc.",
      "We use our Dev discord mainly as the official check list and go back and check things off on Trello at the end of the month, actually need to do that rn."
    ],
    bodyStyle: "quote",
    quoteAuthor: "RellBad",
    source: "Discord oficial do Rell",
    author: "Greed"
  },
  {
    id: 34,
    category: "Confirmação Oficial",
    date: "16 Abr 2026",
    title: "RELLGames Sinaliza que a Espera por RELL Seas Pode Estar Chegando ao Fim",
    subtitle: "RELLGames amplifica mensagem sugerindo que novidades de RELL Seas podem estar próximas.",
    media: {type:"twitter",url:"https://x.com/RELLGames/status/2044846638133284951",label:"Ver post — RELLGames no X",note:"O post republicado fazia referência a uma publicação original de 13 de abril de 2026."},
    body: [
      "A conta oficial da RELLGames republicou uma mensagem com a frase 'The wait won't be much longer', indicando que a espera por novidades de RELL Seas não deve durar muito mais.",
      "Esse item precisa ser tratado com cuidado. Ele é relevante como sinal recente de comunicação, mas não deve ser escrito como confirmação de lançamento, data oficial ou abertura pública do jogo.",
      "O valor jornalístico está no tom: depois de anos de desenvolvimento, teasers, movies, dev logs e vídeos de bastidores, a RELLGames voltou a amplificar uma mensagem sugerindo proximidade. Ainda assim, proximidade não é data.",
      "O relatório-base não registrou data oficial confirmada. A leitura correta é a de um sinal de comunicação — não de uma promessa definitiva."
    ],
    source: "RELLGames no X",
    author: "Greed"
  },
  {
    id: 33,
    category: "Bastidores",
    date: "7 Fev 2026",
    title: "RELL Seas: Behind The Scenes Destaca Estrutura Não Linear do Jogo",
    subtitle: "O vídeo de bastidores reforçou que RELL Seas pretende seguir uma estrutura menos linear, com foco em descoberta, exploração e progressão aberta.",
    media: {type:"youtube",videoId:"BGCI9Ml-4q4",caption:"RELL Seas: Behind The Scenes — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou 'RELL Seas: Behind The Scenes', o vídeo público mais recente recuperado no relatório-base.",
      "Esse conteúdo não se limita a mostrar cenas bonitas. Ele reforça uma ideia de design importante: RELL Seas como um jogo de progressão não linear. O trecho verificável recuperado foi: 'This game is a nonlinear game...'",
      "Essa afirmação conversa diretamente com publicações anteriores sobre a ausência de level lock rígido entre mares e fortalece a leitura de que a RELLGames quer evitar uma estrutura simples de grind por mapa.",
      "Para o dossiê, essa matéria merece destaque alto. Ela ajuda a explicar a filosofia de design do jogo e diferencia RELL Seas de experiências mais lineares dentro do Roblox."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 32,
    category: "Comunidade",
    date: "3 Out 2025",
    title: "CaribBros Agradece Apoio da Comunidade em Vídeo Sobre RELL Seas",
    subtitle: "O vídeo reforçou a relação entre os desenvolvedores e a comunidade, destacando o apoio recebido pelo projeto ao longo dos anos.",
    media: {type:"youtube",videoId:"8PLwXoBvbK4",caption:"RELL Seas — We appreciate you. Canal CaribBros."},
    body: [
      "O canal CaribBros publicou 'Rell Seas - We appreciate you', um vídeo voltado ao apoio da comunidade em torno do projeto.",
      "O conteúdo tem um tom diferente dos teasers e dev logs. A notícia principal não é uma mecânica nova, mas a relação pública entre os criadores e a audiência que acompanha RELL Seas há anos. O trecho verificável 'support this project' indica que o vídeo trata diretamente do suporte da comunidade.",
      "Para o dossiê, esse item funciona melhor como matéria institucional ou nota de bastidor. Ele ajuda a mostrar que RELL Seas não é apenas um produto em desenvolvimento, mas um projeto sustentado por uma comunidade altamente engajada."
    ],
    source: "CaribBros no YouTube",
    author: "Greed"
  },
  {
    id: 31,
    category: "Bastidores",
    date: "13 Jul 2025",
    title: "CaribBros Descreve a Direção Visual de RELL Seas",
    subtitle: "CaribBros descreve a identidade visual de RELL Seas como uma fusão de anime, estilizado e realismo.",
    media: {type:"twitter",url:"https://x.com/CaribBros/status/1944442896884654169",label:"Ver post — CaribBros no X",note:"O relatório indica imagem visível no X, mas não recuperou o arquivo individual."},
    body: [
      "A conta CaribBros publicou uma explicação sobre a direção artística de RELL Seas, descrevendo o visual do jogo como uma mistura de Anime Style atualizado, Stylized e Realism.",
      "Esse post é muito útil porque ajuda a definir a linguagem visual correta do projeto. Em vez de tratar RELL Seas apenas como 'anime Roblox', a publicação indica uma tentativa de combinar estética anime com elementos estilizados e realistas.",
      "Para uma matéria, o melhor caminho é usar esse item como base para falar da identidade visual do jogo: modelos, iluminação, ambientação, personagens e sensação cinematográfica."
    ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 30,
    category: "Dev Update",
    date: "8 Jul 2025",
    title: "RELL Seas Not Movie 3 Explica o Estado Real do Projeto",
    subtitle: "O vídeo funcionou como uma atualização direta sobre o desenvolvimento, explicando o que estava acontecendo com RELL Seas e citando o plano de lançamento.",
    media: {type:"youtube",videoId:"QuClr80Pmc0",caption:"RELL Seas Not Movie 3 — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou 'RELL Seas Not Movie 3', um vídeo importante de comunicação direta com a comunidade.",
      "Diferente dos Movies tradicionais, esse conteúdo não foi apresentado como grande showcase cinematográfico. O foco estava em explicar o estado do projeto, o que vinha acontecendo nos bastidores e os próximos passos. O trecho verificável: 'We're going to tell you guys exactly what's been happening...'",
      "Há também indicação de capítulos relacionados a 'Game Release Plan', o que torna esse vídeo relevante para qualquer página do site que trate de expectativas de lançamento.",
      "Atenção editorial: esse item não deve ser tratado como 'Movie 3'. O correto é publicar como uma atualização oficial de desenvolvimento."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 29,
    category: "Prévia Oficial",
    date: "15 Abr 2025",
    title: "RELL Seas: Movie 3 Trailer Reacende a Campanha Promocional do Jogo",
    subtitle: "O trailer do terceiro Movie reacendeu a campanha promocional em 2025 e indicou continuidade ativa no desenvolvimento.",
    media: {type:"youtube",videoId:"rdFne7tJY68",caption:"RELL Seas: Movie 3 Trailer — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou 'RELL Seas: Movie 3 Trailer', funcionando como prévia oficial para o terceiro grande showcase do jogo.",
      "O trailer aparece depois de um período importante de comunicação em 2024, incluindo The Movie 2 e Progress. Por isso, ele tem peso estratégico: mostra que o projeto continuava ativo e que a equipe ainda pretendia avançar com grandes apresentações públicas.",
      "O relatório-base recuperou o trecho verificável: 'Follow me brother into the seas...', reforçando o tom cinematográfico e narrativo do material.",
      "Para o dossiê, a matéria deve tratar o vídeo como trailer, não como lançamento do Movie 3 completo."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 28,
    category: "Aviso Oficial",
    date: "2 Out 2024",
    title: "RELL Seas: Progress Alerta Contra Golpes e Confirma que o Jogo Não Era Público",
    subtitle: "O vídeo tornou-se uma das fontes mais importantes para autenticar o estado real do projeto, alertando contra fraudes e acessos falsos.",
    media: {type:"youtube",videoId:"ZCzdKbmQerg",caption:"RELL Seas: Progress — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou o vídeo atualmente identificado no relatório como 'RELL Seas: Progress'. O material aparece como item central para entender o estado público do jogo naquele momento.",
      "Segundo o relatório-base, o título antigo esteve associado a 'Open Testing Phase', mas depois passou a aparecer como 'Progress'. Mais importante que o título é o conteúdo: o vídeo traz alertas contra golpes e reforça que o jogo não estava público em nenhum lugar.",
      "Os trechos verificáveis mais relevantes são: 'don't fall for scams' e 'The game isn't public anywhere'.",
      "Para o site, essa matéria é obrigatória. Ela serve como referência de autenticidade e ajuda a combater fake links, falsas builds, servidores fraudulentos e promessas inventadas de acesso antecipado."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 27,
    category: "Showcase Principal",
    date: "31 Jul 2024",
    title: "RELL Seas: The Movie 2 Revela Novo Grande Showcase do Jogo",
    subtitle: "O segundo Movie apresentou uma visão ampliada do mundo, das facções e da escala planejada para RELL Seas.",
    media: {type:"youtube",videoId:"ji-L9CdSvN8",caption:"RELL Seas: The Movie 2 — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou 'RELL Seas: The Movie 2', o segundo grande showcase cinematográfico do jogo.",
      "Esse é um dos materiais mais fortes da cronologia oficial. O vídeo amplia a apresentação do projeto e reforça o escopo de RELL Seas como uma experiência de mundo aberto, progressão, exploração e múltiplas facções.",
      "O relatório-base recuperou um trecho verificável importante: 'there are over 40 in-game pirate factions...'. Essa informação aponta para a escala social e organizacional do jogo dentro do próprio universo.",
      "Como matéria, este item merece destaque central — não é nota curta. É uma publicação central da linha do tempo."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 26,
    category: "Bastidores",
    date: "6 Abr 2024",
    title: "CaribBros Provoca Comunidade com Novo Conteúdo de Dreamkono2 para RELL Seas",
    subtitle: "CaribBros questiona publicamente o que Dreamkono2 estaria desenvolvendo para RELL Seas, gerando expectativa na comunidade.",
    media: {type:"twitter",url:"https://x.com/CaribBros/status/1776646612036603979",label:"Ver post — CaribBros no X",note:""},
    body: [
      "A conta CaribBros publicou uma provocação direta para a comunidade perguntando: 'What is @Dreamkono2 cooking for Rell Seas?'",
      "A publicação funciona como um tease oficial de asset, conceito ou conteúdo visual em desenvolvimento. Como vem de uma conta ligada aos Rell brothers, o material tem alta confiabilidade, mesmo sem o relatório-base identificar exatamente o conteúdo exibido na mídia.",
      "Para o site, essa notícia deve ser escrita como provocação oficial, não como confirmação de mecânica específica. A informação segura é: CaribBros indicou que Dreamkono2 estava trabalhando em algo para RELL Seas."
    ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 25,
    category: "Teaser Oficial",
    date: "2 Abr 2024",
    title: "RELL Seas Final Teaser Marca Novo Grande Impulso Promocional",
    subtitle: "O teaser final consolidou uma nova etapa de divulgação oficial antes da chegada de RELL Seas: The Movie 2.",
    media: {type:"youtube",videoId:"mGZMgOjUcag",caption:"RELL Seas Final Teaser — canal oficial RELLGames."},
    body: [
      "A RELLGames publicou 'RELL Seas Final Teaser', apresentado como um dos grandes materiais promocionais do jogo antes do segundo Movie.",
      "O vídeo funciona como um marco de transição. Depois de meses de teasers, dev logs, sneaks e publicações no X, o conteúdo aparece como uma peça de preparação para uma divulgação maior, reforçando o tom cinematográfico e a ambição visual do projeto.",
      "O relatório-base recuperou metadados importantes da descrição, incluindo 'Produced by: RELL Games' e crédito de arte para ByHange. Isso torna o vídeo uma fonte primária forte para o dossiê."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 24,
    category: "Confirmação Oficial",
    date: "20 Fev 2024",
    title: "RELLGames Reafirma Publicamente que RELL Seas Continua Real",
    subtitle: "Em nota curta, a RELLGames confirma que o desenvolvimento permanecia ativo, respondendo diretamente à ansiedade da comunidade.",
    media: {type:"twitter",url:"https://x.com/RELLGames/status/1760038927501562313",label:"Ver post — RELLGames no X",note:""},
    body: [
      "A conta oficial da RELLGames publicou a frase 'RELL Seas is real', em uma mensagem curta, mas estrategicamente importante.",
      "Apesar de simples, esse tipo de postagem tem peso dentro da cronologia porque responde diretamente à ansiedade da comunidade. Em projetos longos, especialmente com muitos teasers, uma confirmação curta pode funcionar como manutenção de confiança.",
      "A notícia aqui não é uma mecânica nova, nem uma imagem inédita. A notícia é a própria reafirmação oficial: o projeto continuava existindo e sendo tratado pela RELLGames como algo ativo."
    ],
    source: "RELLGames no X",
    author: "Greed"
  },
  {
    id: 22,
    category: "Bastidores",
    date: "20 Dez 2023",
    title: "RELL Seas: The Path Ahead — RELLGames Aponta Nova Direção do Projeto",
    subtitle: "CaribBros e RELLGames conectam preview de boss e trilha sonora ao conceito do futuro do jogo.",
    media: {
        type: "twitter-multi",
        links: [{url: "https://x.com/CaribVros/status/1737612342291309053", label: "Post original — CaribVros"}, {url: "https://x.com/RELLGames/status/1737614573161820551", label: "Republicação — RELLGames"}],
        note: "Mídia original do post não recuperada no relatório-base."
      },
    body: [
        "A conta CaribVros publicou uma chamada relacionada a 'RELL Seas: The Path Ahead', posteriormente amplificada pela conta oficial da RELLGames.",
        "O relatório-base associa o post a termos como 'Giant Boss Man' e 'Carnage Song Sneak', indicando que o conteúdo tinha relação com uma nova etapa de divulgação, possivelmente misturando prévia de boss, atmosfera e conteúdo musical.",
        "A importância desse item está no nome: 'The Path Ahead'. Editorialmente, isso soa como uma virada de comunicação, sugerindo que a equipe queria falar sobre o caminho futuro do jogo, não apenas mostrar pequenos assets soltos.",
        "Fontes ligadas ao dossiê recomendam tratar o item como prévia oficial de direção e conteúdo — não como promessa de data de lançamento."
      ],
    source: "CaribVros no X, com amplificação da RELLGames",
    author: "Greed"
  },
  {
    id: 35,
    category: "Dev Log",
    date: "18 Dez 2023",
    title: "RELL Seas: Dev Log 2 Apresenta Novo Conteúdo de Habilidades",
    subtitle: "O segundo diário de desenvolvimento oficial confirma progresso ativo no projeto e apresenta registro de mecânica específica.",
    media: {type:"youtube",videoId:"H2HHxKdWaoQ",caption:"RELL Seas: Dev Log 2 — canal oficial RELLGames."},
    body: [
      "O vídeo 'RELL Seas: Dev Log 2' foi confirmado no relatório como material oficial da RELLGames.",
      "O trecho verificável registrado foi: 'The first move is called Bison might...'. Isso indica que o vídeo apresenta ou comenta algum movimento, habilidade ou sistema específico dentro do jogo.",
      "Esse item é forte o bastante para entrar no site por ser um Dev Log oficial. No entanto, a data exata não foi recuperada de forma totalmente confiável no relatório-base — a data aqui indicada deve ser validada manualmente no YouTube antes de ser tratada como definitiva.",
      "O correto é posicioná-lo na cronologia com a data disponível, sinalizando que ela pode estar sujeita a confirmação."
    ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 21,
    category: "Dev Log",
    date: "9 Dez 2023",
    title: "RELL Seas: Dev Log 1 Inaugura Fase Explicativa do Desenvolvimento",
    subtitle: "O primeiro dev log oficial marcou uma mudança de tom na comunicação, saindo da demonstração visual para explicações mais diretas sobre o projeto.",
    media: {
        type: "youtube",
        videoId: "Q0eU4LDPtSE",
        caption: "RELL Seas: Dev Log 1 — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas: Dev Log 1', o primeiro registro oficial no formato de diário de desenvolvimento.",
        "Diferente dos teasers e vídeos cinematográficos anteriores, o dev log tem uma função mais informativa: explicar melhor o que estava sendo feito, quais decisões estavam sendo tomadas e como o projeto estava evoluindo.",
        "O relatório-base registra um trecho verificável associado ao vídeo: 'we will be explaining a lot of things...', reforçando que o objetivo do conteúdo era justamente esclarecer aspectos do jogo para a comunidade.",
        "Esse item representa uma mudança de escala na comunicação de RELL Seas, saindo dos sneaks fragmentados para uma apresentação mais transparente sobre as direções do projeto."
      ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 20,
    category: "Prévia Oficial",
    date: "8 Nov 2023",
    title: "RELL Seas: Movie 2 Sneak Prepara Terreno para o Próximo Grande Showcase",
    subtitle: "A RELLGames publicou um short oficial antecipando o segundo grande vídeo cinematográfico de RELL Seas.",
    media: {
        type: "youtube-short",
        videoId: "LH2QBw1Umgw",
        caption: "RELL Seas: Movie 2 Sneak — YouTube Shorts, canal RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas: Movie 2 Sneak', um conteúdo curto que funcionou como preparação para o próximo grande showcase do jogo.",
        "Esse item entra como uma peça de aquecimento editorial. Ele não tem o peso de um teaser numerado ou de um Movie completo, mas é relevante porque mostra que a equipe já estava conduzindo a audiência para uma nova apresentação de maior escala.",
        "Fontes internas apontam que o material serve como chamada curta: RELLGames sinalizando ao público que algo maior estava por vir."
      ],
    source: "RELLGames no YouTube Shorts",
    author: "Greed"
  },
  {
    id: 19,
    category: "Showcase Principal",
    date: "30 Out 2023",
    title: "RELL Seas: The Movie Consolida o Primeiro Grande Showcase do Jogo",
    subtitle: "O primeiro 'Movie' de RELL Seas apresentou o projeto em escala maior e marcou uma virada na divulgação oficial.",
    media: {
        type: "youtube",
        videoId: "O9XhIEAZ2r0",
        caption: "RELL Seas: The Movie — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas: The Movie', um dos materiais mais importantes da cronologia pública do jogo.",
        "Diferente dos teasers anteriores, o vídeo funciona como um showcase mais robusto, com uma apresentação mais ampla da experiência que a equipe queria comunicar ao público.",
        "O relatório destaca um trecho verificável associado ao vídeo: 'This is actually progression in the game...', indicando que o conteúdo abordava progressão real dentro do jogo.",
        "Esse item deve ser tratado como matéria principal no dossiê. Ele representa uma mudança de escala na comunicação de RELL Seas, saindo dos sneaks fragmentados para uma apresentação mais cinematográfica e completa."
      ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 18,
    category: "Trilha Sonora Oficial",
    date: "2 Out 2023",
    title: "RELLGames Lança Lote Oficial de Trilhas Sonoras de RELL Seas",
    subtitle: "Quatro faixas oficiais foram publicadas no mesmo dia, expandindo a identidade sonora do jogo.",
    media: {
        type: "multi-youtube",
        videos: [{videoId: "uqIxcz8aIfw", label: "Whispers Of The Ocean"}, {videoId: "lHF-jLqdh0g", label: "Heroes Awakening"}, {videoId: "ouRkXXv9ykQ", label: "Time to Shine"}, {videoId: "4m98t5uvSjw", label: "God Speed"}],
        caption: "Lote de OSTs oficiais — canal RELLGames."
      },
    body: [
        "A RELLGames publicou um lote de músicas oficiais de RELL Seas, reforçando que o projeto não estava sendo desenvolvido apenas no campo visual e mecânico, mas também na construção de atmosfera.",
        "As quatro faixas lançadas foram: Whispers Of The Ocean, Heroes Awakening, Time to Shine e God Speed.",
        "Esse conjunto é relevante porque pode alimentar uma seção própria de trilha sonora oficial, ajudando a criar uma experiência mais completa para o público. Em termos jornalísticos, o lançamento das OSTs mostra um esforço de identidade audiovisual, não apenas de gameplay."
      ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 17,
    category: "Desenvolvimento",
    date: "2 Set 2023",
    title: "CaribBros Abre Chamada Pública para Trabalhar em RELL Seas",
    subtitle: "CaribBros abre chamada pública por colaboradores interessados em integrar o desenvolvimento do projeto.",
    media: {
        type: "twitter",
        url: "https://x.com/CaribBros/status/1697823684470128933",
        label: "Ver post — CaribBros no X",
        note: ""
      },
    body: [
        "A conta CaribBros publicou uma chamada pública procurando pessoas interessadas em trabalhar em RELL Seas, com o seguinte trecho verificável: 'If you're interested in working on RELL Seas comment here'.",
        "Esse item é mais importante do que parece. Ele reforça que o desenvolvimento do jogo seguia com uma estrutura aberta a colaboradores, algo que já havia sido indicado anteriormente pela confirmação de equipe comissionada.",
        "Para o dossiê, essa notícia ajuda a explicar por que tantos assets, modelos e previews aparecem em perfis de terceiros. Nem todo conteúdo externo é vazamento; parte dele pode vir de colaboradores envolvidos na produção."
      ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 16,
    category: "Teaser Oficial",
    date: "4 Ago 2023",
    title: "RELL Seas Teaser 4 Amplia a Apresentação Oficial do Jogo",
    subtitle: "O quarto teaser oficial deu continuidade à fase de demonstrações públicas de RELL Seas, reforçando o avanço do projeto após o Teaser 3.5.",
    media: {
        type: "youtube",
        videoId: "h_py6mPXKcI",
        caption: "RELL Seas Teaser 4 — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas Teaser 4', dando sequência direta à campanha de divulgação iniciada no começo de 2023.",
        "Esse teaser entra como um marco importante porque mantém a cadência de comunicação oficial do jogo depois dos vídeos focados em combate, frutas, armas e apresentações híbridas com outros projetos do estúdio.",
        "O relatório confirma o vídeo e o link, mas aponta que a duração apareceu de forma conflitante nos snippets recuperados. O correto é não cravar duração até validação manual no YouTube."
      ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 15,
    category: "Teaser Híbrido",
    date: "16 Jul 2023",
    title: "RELL Seas Teaser 3.5 Mistura Prévia do Jogo com Sneak de RELL Bloodline",
    subtitle: "O vídeo funcionou como uma prévia híbrida, mantendo RELL Seas em evidência enquanto também apresentava conteúdo ligado a RELL Bloodline.",
    media: {
        type: "youtube",
        videoId: "0SG9B3iJQtg",
        caption: "RELL Seas Teaser 3.5 / RELL Bloodline Sneak — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas Teaser 3.5 / RELL Bloodline Sneak', um vídeo intermediário entre os grandes teasers numerados de RELL Seas.",
        "O material é relevante porque mostra uma comunicação mais ampla da RELLGames naquele período, conectando RELL Seas a outros projetos do estúdio. O relatório-base registra um trecho verificável do vídeo: 'This is a dark RP game mode...', indicando que parte do conteúdo se desvia para a apresentação de RELL Bloodline.",
        "Para o dossiê, essa notícia precisa ser escrita com precisão: não é um teaser puro de RELL Seas, mas sim um vídeo híbrido. Ainda assim, ele pertence à linha cronológica oficial por estar no canal da RELLGames e carregar o nome RELL Seas no título."
      ],
    source: "RELLGames no YouTube",
    author: "Greed"
  },
  {
    id: 14,
    category: "Bastidores",
    date: "20 Jun 2023",
    title: "MuraModels Publica Novo Asset Visual Ligado a RELL Seas",
    subtitle: "Novo asset de arma ou efeito visual de colaborador confirma continuidade ativa da produção de RELL Seas.",
    media: {
        type: "twitter",
        url: "https://x.com/MuraModels/status/1671181514111963141",
        label: "Ver post — MuraModels no X",
        note: "Mídia visual do post não recuperada no relatório-base."
      },
    body: [
        "No mesmo dia do reveal do Brachiosaurus Zoan, MuraModels publicou outro preview de asset associado a RELL Seas.",
        "O relatório-base identifica o conteúdo como um asset de arma ou efeito visual, mas não recupera detalhes suficientes para afirmar exatamente o que aparece na mídia. Portanto, o correto é tratar essa notícia com cautela: ela confirma atividade de produção, mas não deve ser vendida como anúncio oficial de uma mecânica específica.",
        "Para o dossiê, essa entrada pode funcionar como nota de bastidor ou ser agrupada com o item de MuraModels anterior em uma matéria maior sobre colaboradores exibindo armas e efeitos de RELL Seas."
      ],
    source: "MuraModels no X",
    author: "Greed"
  },
  {
    id: 13,
    category: "Reveal Oficial",
    date: "20 Jun 2023",
    title: "CaribBros Revela Brachiosaurus Zoan para RELL Seas",
    subtitle: "Reveal confirma nova forma Zoan de origem pré-histórica em desenvolvimento para o jogo.",
    media: {
        type: "twitter",
        url: "https://x.com/CaribBros/status/1670985430756368384",
        label: "Ver post — CaribBros no X",
        note: "Mídia visual do post não recuperada no relatório-base."
      },
    body: [
        "A conta CaribBros publicou um reveal oficial do Brachiosaurus Zoan para RELL Seas, creditando o trabalho a @ricecoffeesalad.",
        "Esse é um dos sneaks mais fortes do período porque vem diretamente de uma conta associada aos Rell brothers e apresenta um conteúdo específico: uma forma, criatura ou poder relacionado ao conceito de Zoan.",
        "Como notícia, esse post deve ser tratado como um reveal oficial de gameplay ou conteúdo visual. Ele também reforça que RELL Seas estava trabalhando com transformações, criaturas e poderes inspirados em arquétipos animais ou pré-históricos."
      ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 12,
    category: "Bastidores",
    date: "19 Jun 2023",
    title: "MuraModels Revela Nova Arma Desenvolvida para RELL Seas",
    subtitle: "Colaborador associado à RELLGames exibe nova arma em produção, reforçando o desenvolvimento ativo de assets.",
    media: {
        type: "twitter",
        url: "https://x.com/MuraModels/status/1670833734654861313",
        label: "Ver post — MuraModels no X",
        note: ""
      },
    body: [
        "O colaborador MuraModels publicou um preview de uma nova arma criada para RELL Seas, mencionando diretamente a RELLGames.",
        "Esse tipo de postagem deve ser classificado como fonte de colaborador, não como anúncio central da RELLGames. Ainda assim, a confiabilidade é média-alta, porque o conteúdo aparece vinculado ao projeto e dialoga com a estrutura de desenvolvimento comissionado já confirmada anteriormente pela própria RELLGames.",
        "Para o site, essa notícia serve bem como matéria curta de bastidores: ela mostra que o desenvolvimento não estava limitado aos vídeos principais, mas também avançava por meio de produção externa de assets."
      ],
    source: "MuraModels no X",
    author: "Greed"
  },
  {
    id: 11,
    category: "Bastidores",
    date: "10 Jun 2023",
    title: "CaribBros Amplifica Preview de Zeus e Prometheus para RELL Seas",
    subtitle: "Habilidades associadas a Zeus e Prometheus surgem em preview amplificado pelos canais oficiais da crew.",
    media: {
        type: "twitter",
        url: "https://x.com/CaribBros/status/1667612993859747846",
        label: "Ver post — CaribBros no X",
        note: "Mídia original do post não recuperada no relatório-base."
      },
    body: [
        "A conta CaribBros republicou um preview associado a Zeus e Prometheus para RELL Seas.",
        "Esse item é importante porque não vem apenas de um colaborador solto: ele foi amplificado por uma conta diretamente ligada aos Rell brothers. Isso aumenta bastante a confiabilidade do material e permite tratá-lo como um sneak validado oficialmente.",
        "Editorialmente, essa notícia mostra que RELL Seas já estava apresentando elementos de escala mitológica ou habilidades inspiradas em figuras lendárias, ampliando a expectativa sobre a variedade de poderes e referências dentro do jogo."
      ],
    source: "CaribBros no X, republicando conteúdo de @oreI_orL",
    author: "Greed"
  },
  {
    id: 10,
    category: "Desenvolvimento",
    date: "1 Abr 2023",
    title: "CaribBros Comenta Previsão de Lançamento de RELL Seas e HWX",
    subtitle: "CaribBros aborda planejamento de lançamento de RELL Seas e do projeto paralelo HWX.",
    media: {
        type: "twitter",
        url: "https://x.com/CaribBros/status/1642168343980384256",
        label: "Ver post — CaribBros no X",
        note: ""
      },
    body: [
        "A conta CaribBros publicou uma atualização informando que havia um vídeo explicando a data de lançamento de RELL Seas e HWX.",
        "Esse item é importante, mas precisa ser tratado com precisão. Ele deve ser lido como uma comunicação oficial da época sobre planejamento e previsão, não como uma confirmação definitiva de lançamento.",
        "Para o dossiê, a abordagem correta é noticiar como: 'CaribBros comenta previsão de lançamento de RELL Seas e HWX', evitando transformar isso em promessa final ou data cravada."
      ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 9,
    category: "April Sneaks",
    date: "24 Mar 2023",
    title: "RELL Seas April Sneaks Part 2 Complementa o Pacote de Prévias",
    subtitle: "No mesmo dia, a RELLGames publicou uma segunda parte dos April Sneaks, reforçando o volume de conteúdos em desenvolvimento.",
    media: {
        type: "none",
        note: "URL individual não recuperada no relatório-base."
      },
    body: [
        "Ainda em 24 de março de 2023, a RELLGames publicou 'RELL Seas April Sneaks Part 2', funcionando como continuação direta do primeiro lote de prévias.",
        "A existência de duas partes no mesmo dia sugere que o estúdio tinha um volume considerável de material para mostrar ao público naquele momento. Para fins de dossiê, isso reforça que março de 2023 foi um período de aceleração na comunicação oficial de RELL Seas.",
        "Assim como no item anterior, o relatório confirma o vídeo no histórico do canal, mas não recupera o link individual. O correto é registrar o item sem adicionar detalhes que não estejam verificados."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 8,
    category: "April Sneaks",
    date: "24 Mar 2023",
    title: "RELL Seas April Sneaks Part 1 Inicia Lote de Prévias de Abril",
    subtitle: "A RELLGames publicou o primeiro lote de April Sneaks, expandindo a divulgação oficial de conteúdos em desenvolvimento.",
    media: {
        type: "none",
        note: "URL individual não recuperada no relatório-base."
      },
    body: [
        "A RELLGames lançou 'RELL Seas April Sneaks Part 1', listado no histórico oficial do canal como parte do ciclo de prévias de abril.",
        "O material aparece como uma nova etapa da comunicação pública do jogo, saindo dos teasers principais e entrando em um formato de sneaks — pequenas prévias de conteúdos, assets, mecânicas ou sistemas em desenvolvimento.",
        "O relatório confirma a existência do vídeo como fonte primária, mas o link individual não foi recuperado de forma confiável. Este item deve entrar na linha do tempo, mas sem inventar detalhes específicos do conteúdo interno."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 7,
    category: "Teaser Oficial",
    date: "2 Mar 2023",
    title: "RELL Seas Teaser 3 Revela Combate com Frutas e Armas",
    subtitle: "O terceiro teaser oficial ampliou a visão pública sobre a jogabilidade de RELL Seas, com destaque para frutas, armas e sistemas de combate.",
    media: {
        type: "youtube",
        videoId: "nbN6sXgREwA",
        caption: "RELL Seas Teaser 3: Fruit & Gun Combat — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou 'RELL Seas Teaser 3: Fruit & Gun Combat', um dos vídeos mais relevantes da fase inicial de divulgação do jogo.",
        "O teaser aprofunda o foco em jogabilidade e apresenta elementos ligados a frutas, armas e combate. Esse conteúdo é especialmente importante porque mostra RELL Seas se afastando da ideia de ser apenas um jogo de exploração marítima, reforçando uma proposta mais robusta de ação, progressão e variedade de estilos de luta.",
        "O relatório-base registra como trecho verificável a frase: 'I'm gonna go to every single gun...', indicando que o vídeo dedica atenção específica à demonstração de armas."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 6,
    category: "Bastidores",
    date: "1 Mar 2023",
    title: "Bastidores de Gravação Indicam Produção do Terceiro Teaser de RELL Seas",
    subtitle: "CaribBros indica nos bastidores que gravações do terceiro teaser de RELL Seas estão em andamento.",
    media: {
        type: "twitter",
        url: "https://x.com/CaribBros/status/1631036945273946116",
        label: "Ver post — CaribBros no X",
        note: ""
      },
    body: [
        "A conta CaribBros, associada diretamente aos Rell brothers, publicou uma atualização informando que estava gravando o RELL Seas Teaser 3.",
        "A postagem é importante porque funciona como registro de bastidor e confirma a continuidade ativa da divulgação oficial do jogo logo após os dois primeiros teasers. Em termos jornalísticos, esse item não mostra apenas um conteúdo finalizado, mas o processo de produção da próxima grande prévia pública.",
        "Para o dossiê, essa publicação serve como uma ponte entre o Teaser 2, focado em combate, e o Teaser 3, que viria no dia seguinte com foco em frutas e armas."
      ],
    source: "CaribBros no X",
    author: "Greed"
  },
  {
    id: 36,
    category: "Registro Histórico",
    date: "26 Fev 2023",
    title: "Gear 4th Sneak Registra Migração de Prévias do Discord para Canal Público",
    subtitle: "Vídeo documenta a migração oficial de prévias de RELL Seas do Discord para um canal público, ampliando o acesso ao histórico do projeto.",
    media: {type:"youtube",videoId:"659KBzwicME",caption:"Gear 4th Sneak — CaribBros/RELLGames."},
    body: [
      "O vídeo 'Gear 4th Sneak' aparece como um registro oficial/parcial importante por documentar uma mudança na forma de divulgação dos sneaks de RELL Seas.",
      "O trecho recuperado no relatório diz: 'Originally showcased in discord, moving all sneaks to this channel'. Isso indica que o conteúdo havia sido mostrado originalmente no Discord e depois movido para um canal público, tornando-se mais acessível para consulta e preservação.",
      "Esse item é útil para o site porque explica por que parte do material antigo de RELL Seas pode ter circulado primeiro no Discord antes de aparecer em canais mais fáceis de catalogar, como o YouTube."
    ],
    source: "CaribBros/RELLGames, conforme registro do relatório-base",
    author: "Greed"
  },
  {
    id: 5,
    category: "Desenvolvimento",
    date: "9 Fev 2023",
    title: "RELLGames Confirma Equipe Comissionada Trabalhando em RELL Seas",
    subtitle: "RELLGames confirma estrutura de equipe comissionada no desenvolvimento, validando previews de colaboradores externos.",
    media: {
        type: "twitter",
        url: "https://x.com/RELLGames/status/1623484186085531648",
        label: "Ver post — RELLGames no X",
        note: ""
      },
    body: [
        "A RELLGames publicou no X uma confirmação importante sobre o desenvolvimento de RELL Seas: o projeto contava com uma equipe baseada em comissões trabalhando em sua produção.",
        "Essa informação é relevante porque ajuda a validar a existência de materiais divulgados por colaboradores externos ao canal principal. A partir desse ponto, certos previews de artistas, modeladores e desenvolvedores associados ao projeto passam a ter mais peso, desde que estejam conectados de forma clara à RELLGames ou sejam amplificados pelos próprios canais oficiais.",
        "O post funciona como uma peça importante do dossiê porque explica parte da estrutura de produção do jogo e ajuda a separar vazamentos confiáveis de conteúdo especulativo."
      ],
    source: "RELLGames no X",
    author: "Greed"
  },
  {
    id: 4,
    category: "Teaser Oficial",
    date: "6 Fev 2023",
    title: "RELL Seas Teaser 2 Aprofunda o Foco em Combate",
    subtitle: "O segundo teaser oficial destacou sistemas de combate e mostrou uma nova camada da proposta jogável de RELL Seas.",
    media: {
        type: "youtube",
        videoId: "mDMlovdh4Cc",
        caption: "RELL Seas Teaser 2 — canal oficial RELLGames."
      },
    body: [
        "Poucas semanas após o primeiro teaser, a RELLGames publicou 'RELL Seas Teaser 2', aprofundando a apresentação pública do jogo.",
        "O vídeo teve foco maior em combate, mostrando que RELL Seas não seria apenas uma experiência de exploração marítima, mas também um jogo com sistemas de ação mais elaborados.",
        "O relatório-base aponta um trecho verificável ligado ao conteúdo: 'showcasing ... combat', reforçando que esse teaser tinha como função apresentar ao público uma amostra mais direta da jogabilidade e das mecânicas de luta."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 3,
    category: "Teaser Oficial",
    date: "19 Jan 2023",
    title: "RELL Seas Teaser 1 Marca o Início Público da Fase Moderna do Jogo",
    subtitle: "Em janeiro de 2023, a RELLGames publicou o primeiro teaser oficial do ciclo atual de RELL Seas, iniciando a apresentação pública do projeto.",
    media: {
        type: "youtube",
        videoId: "Mm8Ybn-AzcE",
        caption: "RELL Seas Teaser 1 — canal oficial RELLGames."
      },
    body: [
        "O vídeo 'RELL Seas Teaser 1' marca o primeiro grande registro público da fase moderna de RELL Seas.",
        "Publicado no canal oficial da RELLGames, o teaser abriu o ciclo de divulgação do jogo com uma apresentação inicial do projeto, dando ao público uma primeira visão do que a equipe estava desenvolvendo.",
        "O relatório identifica esse item como o primeiro teaser consistente do ciclo atual de RELL Seas. Um dos trechos verificáveis associados ao vídeo menciona: 'We are starting to develop the movie...', indicando que a equipe já pensava o jogo com uma apresentação mais cinematográfica e ambiciosa."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 2,
    category: "Pré-História",
    date: "s/d — pré-2023",
    title: "RELL Piece Open Seas Teaser Mostra a Transição Rumo ao Conceito de RELL Seas",
    subtitle: "O teaser de RELL Piece Open Seas reforça a fase intermediária do projeto, ainda antes da consolidação definitiva do nome RELL Seas.",
    media: {
        type: "youtube",
        videoId: "fP_BwUOrA78",
        caption: "RELL Piece Open Seas Teaser (In-Development) — canal oficial RELLGames."
      },
    body: [
        "A RELLGames também publicou o vídeo 'RELL Piece Open Seas Teaser (In-Development)', outro registro importante da fase anterior ao RELL Seas moderno.",
        "O material aparece como parte do ciclo RELL Piece/Open Seas, funcionando como uma ponte entre os primeiros experimentos de desenvolvimento e aquilo que mais tarde seria apresentado ao público como RELL Seas.",
        "Embora a data exata não tenha sido recuperada no relatório-base, o vídeo é relevante por mostrar que várias ideias centrais do projeto já estavam sendo testadas publicamente antes do início dos teasers oficiais de 2023."
      ],
    source: "RELLGames",
    author: "Greed"
  },
  {
    id: 1,
    category: "Pré-História",
    date: "s/d — pré-2023",
    title: "The Divine Seas Revela as Bases Iniciais do Projeto que Antecedeu RELL Seas",
    subtitle: "Antes de RELL Seas ganhar sua identidade atual, a RELLGames já apresentava conceitos navais e sistemas que serviriam como base para a evolução do projeto.",
    media: {
        type: "youtube",
        videoId: "FatLfwzpxUk",
        caption: "The Divine Seas (RELL Piece Development) — canal oficial RELLGames."
      },
    body: [
        "A RELLGames publicou o vídeo 'The Divine Seas (RELL Piece Development)', considerado um dos materiais precursores mais importantes do ciclo que mais tarde levaria ao desenvolvimento de RELL Seas.",
        "O conteúdo ainda não carregava o branding consolidado de RELL Seas, mas já apresentava ideias diretamente ligadas ao projeto: navegação, ambientação oceânica, combate e estrutura de jogo inspirada em aventuras marítimas dentro do Roblox.",
        "Por estar nos canais oficiais da RELLGames, o vídeo deve ser tratado como fonte primária de alta confiabilidade, especialmente para entender a origem conceitual do jogo antes da fase pública mais conhecida."
      ],
    source: "RELLGames",
    author: "Greed"
  }
];

  /* ============================================================
     Renderização e lógica do Vault — não editar abaixo
     ============================================================ */
  function initVault() {
    const grid  = document.getElementById("vaultGrid");
    const modal = document.getElementById("vaultModal");

    /* ---- Renderizar grid de cards ---- */
    function renderGrid() {
      if (!VAULT_ARTICLES.length) {
        grid.innerHTML = `
          <div class="vault-empty">
            Nenhum registro arquivado ainda. Em breve os arquivos serão revelados.
          </div>`;
        return;
      }

      VAULT_ARTICLES.forEach(article => {
        const card = document.createElement("article");
        card.className = "vault-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", "Abrir: " + article.title);

        card.innerHTML = `
          ${thumbHTML(article)}
          <div class="vault-card__body">
            <div class="vault-card__meta">
              <span class="vault-card__category">${article.category}</span>
              <span class="vault-card__date">${article.date}</span>
            </div>
            <h2 class="vault-card__title">${article.title}</h2>
            <p  class="vault-card__subtitle">${article.subtitle}</p>
            <div class="vault-card__footer">
              <span class="vault-card__author">— ${article.author}</span>
              <span>Fonte: ${article.source}</span>
            </div>
          </div>`;

        card.addEventListener("click",  () => openModal(article));
        card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(article); }});
        grid.appendChild(card);
      });
    }

    function ytThumb(videoId) {
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    }

    function thumbHTML(a) {
      const m = a.media;
      // Multi-image: usa a thumb dedicada
      if (m.type === "multi-image") {
        return `<div class="vault-card__thumb">
          <img src="${m.thumb}" alt="Thumbnail" loading="lazy" />
          <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Ver</span></div>
        </div>`;
      }
      // YouTube: usa thumbnail via ytimg
      if (m.type === "youtube" || m.type === "youtube-short") {
        return `<div class="vault-card__thumb">
          <img src="${ytThumb(m.videoId)}" alt="Thumbnail do vídeo" loading="lazy" />
          <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Assistir</span></div>
        </div>`;
      }
      // Multi-youtube: thumbnail do primeiro vídeo
      if (m.type === "multi-youtube") {
        return `<div class="vault-card__thumb">
          <img src="${ytThumb(m.videos[0].videoId)}" alt="Thumbnail da playlist" loading="lazy" />
          <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Ouvir</span></div>
        </div>`;
      }
      // Image + Twitter link
      if (m.type === "image-twitter") {
        return `<div class="vault-card__thumb">
          <img src="${m.src}" alt="${m.alt || ''}" loading="lazy" />
          <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Ver</span></div>
        </div>`;
      }
      // Imagem
      if (m.type === "image") {
        return `<div class="vault-card__thumb">
          <img src="${m.src}" alt="${m.alt}" loading="lazy" />
          <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Ler</span></div>
        </div>`;
      }
      // Twitter / None: card de texto
      const icon = (m.type === "twitter" || m.type === "twitter-multi") ? "𝕏" : "P.A.Z";
      return `<div class="vault-card__thumb vault-card__thumb--text">
        <span class="vault-card__thumb-icon">${icon}</span>
        <div class="vault-card__thumb-overlay"><span class="vault-card__thumb-label">Ler</span></div>
      </div>`;
    }

    /* ---- Modal ---- */
    function openModal(a) {
      document.getElementById("vaultModalCategory").textContent  = a.category;
      document.getElementById("vaultModalDate").textContent      = a.date;
      document.getElementById("vaultModalSourceTop").textContent = "Fonte: " + a.source;
      document.getElementById("vaultModalTitle").textContent     = a.title;
      document.getElementById("vaultModalSubtitle").textContent  = a.subtitle;
      document.getElementById("vaultModalSource").textContent    = a.source;
      document.getElementById("vaultModalAuthor").textContent    = "— " + a.author;

      // Mídia
      const mediaEl = document.getElementById("vaultModalMedia");
      const m = a.media;
      mediaEl.className = "vault-modal__media";

      if (m.type === "none") {
        mediaEl.innerHTML = m.note
          ? `<p class="vault-modal__media-note">${m.note}</p>` : "";
        mediaEl.style.display = m.note ? "" : "none";

      } else if (m.type === "youtube") {
        mediaEl.style.display = "";
        mediaEl.innerHTML = `
          <div class="yt-embed">
            <iframe src="https://www.youtube.com/embed/${m.videoId}?rel=0"
              title="${a.title}" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          ${m.caption ? `<p class="vault-modal__media-caption">${m.caption}</p>` : ""}`;

      } else if (m.type === "youtube-short") {
        mediaEl.style.display = "";
        mediaEl.className += " vault-modal__media--portrait";
        mediaEl.innerHTML = `
          <div class="yt-embed yt-embed--short">
            <iframe src="https://www.youtube.com/embed/${m.videoId}?rel=0"
              title="${a.title}" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
          ${m.caption ? `<p class="vault-modal__media-caption">${m.caption}</p>` : ""}`;

      } else if (m.type === "multi-youtube") {
        mediaEl.style.display = "";
        const grid = m.videos.map(v => `
          <div class="multi-yt-item">
            <p class="multi-yt-label">${v.label}</p>
            <div class="yt-embed">
              <iframe src="https://www.youtube.com/embed/${v.videoId}?rel=0"
                title="${v.label}" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>`).join("");
        mediaEl.innerHTML = `
          <div class="multi-yt-grid">${grid}</div>
          ${m.caption ? `<p class="vault-modal__media-caption">${m.caption}</p>` : ""}`;

      } else if (m.type === "multi-image") {
        mediaEl.style.display = "";
        const imgs = m.images.map(img =>
          `<img src="${img.src}" alt="${img.alt}" style="width:100%;display:block;border:1px solid rgba(201,169,97,0.22);margin-bottom:0;" />`
        ).join("");
        const gridCols = m.images.length <= 2 ? "1fr ".repeat(m.images.length).trim() : "1fr 1fr";
        mediaEl.innerHTML = `
          <div style="display:grid;grid-template-columns:${gridCols};gap:10px;">${imgs}</div>
          ${m.caption ? `<p class="vault-modal__media-caption">${m.caption}</p>` : ""}`;

      } else if (m.type === "twitter") {
        mediaEl.style.display = "";
        const note = m.note ? `<p class="vault-modal__media-note">${m.note}</p>` : "";
        mediaEl.innerHTML = `
          <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="twitter-link">
            <span>𝕏</span> ${m.label}
          </a>
          ${note}`;

      } else if (m.type === "twitter-multi") {
        mediaEl.style.display = "";
        const btns = m.links.map(l =>
          `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="twitter-link"><span>𝕏</span> ${l.label}</a>`
        ).join("");
        const note = m.note ? `<p class="vault-modal__media-note">${m.note}</p>` : "";
        mediaEl.innerHTML = `<div class="twitter-links">${btns}</div>${note}`;

      } else if (m.type === "image-twitter") {
        mediaEl.style.display = "";
        mediaEl.innerHTML = `
          <img src="${m.src}" alt="${m.alt || ''}" style="width:100%;display:block;border:1px solid rgba(201,169,97,0.22);" />
          <div style="margin-top:12px;">
            <a href="${m.twitterUrl}" target="_blank" rel="noopener noreferrer" class="twitter-link">
              <span>𝕏</span> ${m.twitterLabel || 'Ver post original no X'}
            </a>
          </div>
          ${m.caption ? `<p class="vault-modal__media-caption" style="margin-top:10px;">${m.caption}</p>` : ""}`;

      } else if (m.type === "image") {
        mediaEl.style.display = "";
        if (m.portrait) mediaEl.className += " vault-modal__media--portrait";
        mediaEl.innerHTML = `<img src="${m.src}" alt="${m.alt}" />
          ${m.caption ? `<p class="vault-modal__media-caption">${m.caption}</p>` : ""}`;
      }

      // Corpo
      const bodyEl = document.getElementById("vaultModalBody");
      const paragraphs = a.body.map(p => `<p>${p}</p>`).join("");
      if (a.bodyStyle === "quote") {
        bodyEl.innerHTML = `
          <figure class="vault-quote">
            <blockquote>${paragraphs}</blockquote>
            <figcaption>— ${a.quoteAuthor || a.author}</figcaption>
          </figure>`;
      } else {
        bodyEl.innerHTML = paragraphs;
      }

      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      document.getElementById("vaultModalClose").focus();
    }

    function closeModal() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      modal.querySelectorAll("video").forEach(v => { v.pause(); v.currentTime = 0; });
      // Parar iframes do YouTube trocando o src
      modal.querySelectorAll("iframe").forEach(f => { const s = f.src; f.src = ""; f.src = s; });
    }

    document.getElementById("vaultModalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function vaultKeyHandler(e) {
      const m = document.getElementById("vaultModal");
      if (!m) { document.removeEventListener("keydown", vaultKeyHandler); return; }
      if (e.key === "Escape" && m.classList.contains("is-open")) closeModal();
    });

    renderGrid();
   }

  /* ---- Inicialização automática ---- */

  // Chamada direta (página carregada normalmente ou refresh)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      if (document.getElementById("vaultGrid")) initVault();
    });
  } else {
    if (document.getElementById("vaultGrid")) initVault();
  }

  // Chamada via SPA (roteador dispara 'paz:pageload' após injetar conteúdo)
  window.addEventListener("paz:pageload", function() {
    if (document.getElementById("vaultGrid")) initVault();
  });

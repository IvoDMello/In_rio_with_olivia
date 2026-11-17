/**
 * Avaliacoes reais do TripAdvisor, escolhidas pela Olivia.
 *
 * O site nao publica depoimento inventado. Enquanto a lista estiver vazia,
 * a pagina de Depoimentos sai do menu, a secao de avaliacoes some da Home e
 * o schema.org fica sem nota.
 *
 * A pagina de Depoimentos ordena pela data, da mais recente para a mais
 * antiga, entao a ordem desta lista nao importa. Na Home entram as tres
 * marcadas com `destaque`.
 *
 * Traducao: cada depoimento aparece no original na versao do site do idioma
 * em que o viajante escreveu, e traduzido nas outras duas, com a linha
 * "Traduzido do ingles" no cartao e o link para o original no TripAdvisor.
 * Por isso `titulo` e `texto` levam um objeto com uma versao por idioma, e
 * `idioma` diz qual delas e a original. A traducao e feita a mao, a partir do
 * original, nunca a partir da traducao automatica do TripAdvisor.
 *
 * Uma string so, no lugar do objeto, mostra o original nos tres idiomas.
 */
import type { Idioma } from '../i18n/config';

/** Uma string (o original, igual nos tres idiomas) ou uma versao por idioma. */
export type TextoAvaliacao = string | Record<Idioma, string>;

export type Avaliacao = {
  /** Nome como aparece no TripAdvisor. */
  autor: string;
  /**
   * Pais ou cidade de origem, opcional. Uma versao por idioma quando o nome
   * muda, como Austria, Áustria e Austria.
   */
  origem?: TextoAvaliacao;
  /** Nota de 1 a 5. */
  nota: 1 | 2 | 3 | 4 | 5;
  /** Data da avaliacao, no formato AAAA-MM-DD. */
  data: string;
  /** Link direto para a avaliacao, opcional. */
  url?: string;
  /** Fotos enviadas pelo viajante, servidas pela pasta public. */
  fotos?: { src: string; alt: TextoAvaliacao }[];
  /**
   * Idioma em que o viajante escreveu, como 'en' ou 'pt'. Nas versoes de
   * outro idioma, o cartao mostra "Traduzido do ..." (ver `traduzidoDe` nos
   * arquivos de i18n). Se o texto for uma string so, vira o atributo lang do
   * trecho, para o leitor de tela pronunciar certo.
   */
  idioma?: string;
  /** Titulo que o viajante deu a avaliacao, opcional. */
  titulo?: TextoAvaliacao;
  texto: TextoAvaliacao;
  /**
   * Aparece tambem na Home, que mostra tres. Marcar avaliacoes de tamanho
   * parecido: na grade da Home, cada linha fica da altura do cartao maior.
   */
  destaque?: boolean;
};

export const AVALIACOES: Avaliacao[] = [
  {
    autor: 'Mary Perlera',
    nota: 5,
    // A viagem foi em junho de 2025 e a avaliacao foi escrita em 5 de outubro
    // de 2025. Aqui o TripAdvisor mostra as duas datas, e vale a da avaliacao.
    data: '2025-10-05',
    url: 'https://www.tripadvisor.com.br/ShowUserReviews-g303506-d4294013-r1033546692-PrivateTourGuideinRio_Tours-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/maryp1.jpg', alt: { en: 'Mary’s family with their arms raised in front of Christ the Redeemer', pt: 'A família de Mary de braços erguidos diante do Cristo Redentor', es: 'La familia de Mary con los brazos en alto frente al Cristo Redentor' } },
      { src: '/fotos-cliente/maryp2.jpg', alt: { en: 'Mary’s family dressed in Carnival costumes in front of a large golden feathered headpiece', pt: 'A família de Mary com fantasias de Carnaval, diante de um grande adereço dourado de penas', es: 'La familia de Mary con disfraces de Carnaval, frente a un gran adorno dorado de plumas' } },
    ],
    // O titulo ela escreveu em espanhol e o texto em ingles. O idioma do
    // cartao e o do texto; o titulo em ingles e traducao.
    titulo: {
      en: 'Such a spectacular trip, our dream come true',
      pt: 'Uma viagem tão espetacular, o nosso sonho realizado',
      es: 'Un viaje tan espectacular, nuestro sueño hecho realidad',
    },
    // Original em ingles, com dois ajustes: "Olvia" -> "Olivia", e o emoji de
    // beijo do fim saiu, porque o site nao usa emoji. As maiusculas sao dela.
    // O "Besos y abrazos querida" em espanhol e da propria viajante e fica nas
    // tres versoes.
    texto: {
      en: 'Such a wonderful trip thanks to the best guide Olivia.... My daughter dreamed of traveling to Rio de Janeiro for her birthday, we were a little afraid, we had planned a family trip and we wanted everything to be wonderful... so I started looking, after several days I found information from several guides, but the one that impressed me the most was a review that a tourist left for Olivia, without thinking twice I wrote to her... she contacted me after two or three days... and yes it was our best choice, Olivia was our guide and everything was absolutely wonderful, our trip was from June 23 to July 2. Olivia is a wonderful lady, full of energy and very respectful, she gives her best so that each tourist gets the best of Rio, that city that is an enchantment... Do not hesitate to look for Olivia, she will give her best so that your trip is spectacular just like the one we had... thank you Olivia, a million thanks I hope that God continues to bless your life, your work and your family YOU ARE WONDERFUL... thank you very much... Sincerely PERLERA FAMILY!!! Besos y abrazos querida',
      pt: 'Que viagem maravilhosa, graças à melhor guia, a Olivia... A minha filha sonhava em conhecer o Rio de Janeiro no aniversário dela. Estávamos com um pouco de medo, tínhamos planejado uma viagem em família e queríamos que tudo fosse maravilhoso... então comecei a procurar. Depois de vários dias, encontrei informações de vários guias, mas o que mais me impressionou foi uma avaliação que um turista deixou para a Olivia. Sem pensar duas vezes, escrevi para ela... ela entrou em contato comigo depois de dois ou três dias... e sim, foi a nossa melhor escolha. A Olivia foi a nossa guia e tudo foi absolutamente maravilhoso. A nossa viagem foi de 23 de junho a 2 de julho. A Olivia é uma mulher maravilhosa, cheia de energia e muito respeitosa, e dá o seu melhor para que cada turista aproveite o melhor do Rio, essa cidade que é um encanto... Não hesite em procurar a Olivia, ela vai dar o seu melhor para que a sua viagem seja espetacular, como foi a nossa... Olivia, o nosso muito obrigado, um milhão de vezes. Espero que Deus continue abençoando a sua vida, o seu trabalho e a sua família. VOCÊ É MARAVILHOSA... muito obrigado... Com carinho, FAMÍLIA PERLERA! Besos y abrazos querida',
      es: 'Qué viaje tan maravilloso, gracias a la mejor guía, Olivia... Mi hija soñaba con viajar a Río de Janeiro para su cumpleaños. Teníamos un poco de miedo, habíamos planeado un viaje en familia y queríamos que todo fuera maravilloso... así que empecé a buscar. Después de varios días encontré información de varios guías, pero lo que más me impresionó fue una reseña que un turista le dejó a Olivia. Sin pensarlo dos veces le escribí... se puso en contacto conmigo a los dos o tres días... y sí, fue nuestra mejor elección. Olivia fue nuestra guía y todo fue absolutamente maravilloso. Nuestro viaje fue del 23 de junio al 2 de julio. Olivia es una mujer maravillosa, llena de energía y muy respetuosa, y da lo mejor de sí para que cada turista disfrute lo mejor de Río, esa ciudad que es un encanto... No dudes en buscar a Olivia, ella dará lo mejor de sí para que tu viaje sea espectacular, como lo fue el nuestro... Olivia, gracias, un millón de gracias. Espero que Dios siga bendiciendo tu vida, tu trabajo y tu familia. ERES MARAVILLOSA... muchísimas gracias... Con cariño, ¡FAMILIA PERLERA! Besos y abrazos querida',
    },
  },
  {
    autor: 'Sandra C.',
    nota: 5,
    // O TripAdvisor mostra so o mes da viagem (ago. de 2025), nao o dia da
    // avaliacao. O cartao exibe mes e ano, entao o dia 1 e so para completar.
    data: '2025-08-01',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/sandrac1.jpg', alt: { en: 'Sandra enjoying a Rio tour with Olivia', pt: 'Sandra durante um passeio no Rio com Olivia', es: 'Sandra durante un paseo por Río con Olivia' } },
      { src: '/fotos-cliente/sandrac2.jpg', alt: { en: 'A view from Sandra’s visit to Rio', pt: 'Uma vista da visita de Sandra ao Rio', es: 'Una vista de la visita de Sandra a Río' } },
      { src: '/fotos-cliente/sandrac3.jpg', alt: { en: 'Sandra exploring Rio de Janeiro', pt: 'Sandra conhecendo o Rio de Janeiro', es: 'Sandra descubriendo Río de Janeiro' } },
    ],
    titulo: {
      en: 'A Magical Rio Experience with Olivia',
      pt: 'Uma experiência mágica no Rio com a Olivia',
      es: 'Una experiencia mágica en Río con Olivia',
    },
    // Original em ingles, com dois ajustes. Saiu a primeira linha, que repetia
    // o titulo com estrelas em emoji ("A Magical Rio Experience with Olivia,
    // Simply Unforgettable!"). E os tres travessoes viraram dois-pontos ou
    // ponto final, porque o site nao usa travessao. Os paragrafos sao os dela.
    texto: {
      en: 'From the very first moment we met Olivia, we felt as though we were exploring Rio with a dear friend who just happened to know every hidden gem, every story, and every shortcut through the city’s magic.\n\nOlivia’s professionalism is impeccable: everything was seamless and thoughtfully organized. Yet what makes her truly special is her warmth and genuine care. She didn’t just guide us; she shared Rio with us, from its breathtaking views to the little local secrets that most visitors would never discover on their own.\n\nEvery stop felt personal, every detail felt intentional, and we always felt safe, cared for, and inspired. Olivia has that rare gift of bringing history, culture, and nature alive in a way that stays with you long after the day is over.\n\nWe left feeling we had not just seen Rio, but experienced its heart. Meeting Olivia was a stroke of luck. We couldn’t have asked for a better guide or a more radiant companion for our journey.\n\nIf you’re coming to Rio and want to experience its magic through the eyes of someone who truly loves and understands it, Olivia is the one.',
      pt: 'Desde o primeiro momento em que conhecemos a Olivia, sentimos como se estivéssemos explorando o Rio com uma amiga querida que, por acaso, conhecia cada joia escondida, cada história e cada atalho para a magia da cidade.\n\nO profissionalismo da Olivia é impecável: tudo fluiu perfeitamente e foi organizado com atenção. Mas o que a torna especial de verdade é o calor humano e o cuidado sincero. Ela não só nos guiou, ela dividiu o Rio com a gente, das vistas de tirar o fôlego aos pequenos segredos locais que a maioria dos visitantes nunca descobriria sozinha.\n\nCada parada pareceu pessoal, cada detalhe pareceu pensado, e nós sempre nos sentimos seguros, bem cuidados e inspirados. A Olivia tem o dom raro de dar vida à história, à cultura e à natureza de um jeito que fica com a gente muito tempo depois que o dia termina.\n\nSaímos com a sensação de que não apenas vimos o Rio, mas vivemos o coração da cidade. Conhecer a Olivia foi um golpe de sorte. Não poderíamos ter pedido uma guia melhor nem uma companhia mais radiante para a nossa viagem.\n\nSe você vem ao Rio e quer viver a magia da cidade pelos olhos de alguém que a ama e a entende de verdade, a Olivia é a pessoa certa.',
      es: 'Desde el primer momento en que conocimos a Olivia, sentimos que estábamos explorando Río con una amiga querida que, por casualidad, conocía cada joya escondida, cada historia y cada atajo hacia la magia de la ciudad.\n\nEl profesionalismo de Olivia es impecable: todo fluyó a la perfección y estuvo organizado con atención. Pero lo que la hace realmente especial es su calidez y su cuidado sincero. No solo nos guio, compartió Río con nosotros, desde sus vistas que quitan el aliento hasta los pequeños secretos locales que la mayoría de los visitantes nunca descubriría por su cuenta.\n\nCada parada se sintió personal, cada detalle se sintió pensado, y siempre nos sentimos seguros, cuidados e inspirados. Olivia tiene ese don poco común de dar vida a la historia, la cultura y la naturaleza de una manera que te acompaña mucho después de que termina el día.\n\nNos fuimos con la sensación de que no solo habíamos visto Río, sino que habíamos vivido su corazón. Conocer a Olivia fue un golpe de suerte. No podríamos haber pedido una mejor guía ni una compañía más radiante para nuestro viaje.\n\nSi vienes a Río y quieres vivir su magia a través de los ojos de alguien que de verdad la ama y la entiende, Olivia es la indicada.',
    },
  },
  {
    autor: 'Manuela',
    origem: {
      en: 'Dornbirn, Austria',
      pt: 'Dornbirn, Áustria',
      es: 'Dornbirn, Austria',
    },
    nota: 5,
    // O TripAdvisor mostra so o mes da viagem (abril de 2025), nao o dia da
    // avaliacao. O cartao exibe mes e ano, entao o dia 1 e so para completar.
    data: '2025-04-01',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/manuela1.jpg', alt: { en: 'Manuela enjoying a Rio tour with Olivia', pt: 'Manuela durante um passeio no Rio com Olivia', es: 'Manuela durante un paseo por Río con Olivia' } },
      { src: '/fotos-cliente/manuela2.jpg', alt: { en: 'A view from Manuela’s visit to Rio', pt: 'Uma vista da visita de Manuela ao Rio', es: 'Una vista de la visita de Manuela a Río' } },
      { src: '/fotos-cliente/manuela3.jpg', alt: { en: 'Manuela exploring Rio de Janeiro', pt: 'Manuela conhecendo o Rio de Janeiro', es: 'Manuela descubriendo Río de Janeiro' } },
      { src: '/fotos-cliente/manuela4.jpg', alt: { en: 'Manuela on her trip in Rio', pt: 'Manuela em sua viagem pelo Rio', es: 'Manuela durante su viaje por Río' } },
    ],
    // Sem titulo: a avaliacao dela no TripAdvisor nao tem.
    // Original em ingles, sem nenhuma correcao. Os paragrafos sao os dela.
    texto: {
      en: 'Exploring Rio de Janeiro with Olivia was truly one of the highlights of my entire trip to Brazil. In just two days, I got to see so many different sides of the city that I didn’t want to miss a single stop. I can confidently say that I never would have discovered most of these places without her knowledge.\n\nSince I was traveling alone, Olivia helped me feel safe and comfortable from the start. She is such a warm, kind-hearted person, and her infectious zest for life made the experience even more special. Her passion for Rio is obvious, and she has an incredible intuition for people and their needs.\n\nOur tour was full of spontaneous highlights that arose simply because she understood what I wanted and what I needed during a long day of exploration. I can wholeheartedly recommend her to anyone seeking a personal, enriching, and safe way to experience Rio.',
      pt: 'Explorar o Rio de Janeiro com a Olivia foi, de verdade, um dos pontos altos de toda a minha viagem pelo Brasil. Em apenas dois dias, conheci tantos lados diferentes da cidade que não quis perder nenhuma parada. Posso dizer com confiança que eu nunca teria descoberto a maioria desses lugares sem o conhecimento dela.\n\nComo eu estava viajando sozinha, a Olivia me ajudou a me sentir segura e à vontade desde o início. Ela é uma pessoa muito calorosa e de bom coração, e a alegria de viver contagiante dela deixou a experiência ainda mais especial. A paixão dela pelo Rio é evidente, e ela tem uma intuição incrível para as pessoas e o que elas precisam.\n\nO nosso passeio foi cheio de momentos marcantes que surgiram de forma espontânea, simplesmente porque ela entendeu o que eu queria e o que eu precisava durante um longo dia de exploração. Recomendo a Olivia de todo o coração a quem procura uma forma pessoal, enriquecedora e segura de conhecer o Rio.',
      es: 'Explorar Río de Janeiro con Olivia fue, de verdad, uno de los mejores momentos de todo mi viaje por Brasil. En solo dos días conocí tantas facetas distintas de la ciudad que no quise perderme ni una sola parada. Puedo decir con confianza que nunca habría descubierto la mayoría de estos lugares sin su conocimiento.\n\nComo viajaba sola, Olivia me ayudó a sentirme segura y cómoda desde el principio. Es una persona muy cálida y de buen corazón, y sus contagiosas ganas de vivir hicieron que la experiencia fuera aún más especial. Su pasión por Río es evidente, y tiene una intuición increíble para las personas y lo que necesitan.\n\nNuestro tour estuvo lleno de momentos memorables que surgieron de forma espontánea, simplemente porque entendió lo que yo quería y lo que necesitaba durante un largo día de exploración. La recomiendo de todo corazón a cualquiera que busque una forma personal, enriquecedora y segura de conocer Río.',
    },
  },
  {
    autor: 'Ellen S.',
    nota: 5,
    // Na Home desde novembro de 2026, no lugar da Christa L., que saiu junto
    // com as outras avaliacoes sem foto. E o texto mais curto entre as que
    // tem foto, mas ainda e mais longo que os de Daniel Z. e Olaf R.
    destaque: true,
    // O TripAdvisor mostra so o mes da viagem (fev. de 2025), nao o dia da
    // avaliacao. O cartao exibe mes e ano, entao o dia 1 e so para completar.
    data: '2025-02-01',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/ellens1.jpg', alt: { en: 'Ellen enjoying a Rio tour with Olivia', pt: 'Ellen durante um passeio no Rio com Olivia', es: 'Ellen durante un paseo por Río con Olivia' } },
      { src: '/fotos-cliente/ellens2.jpg', alt: { en: 'A view from Ellen’s Rio visit', pt: 'Uma vista da visita de Ellen ao Rio', es: 'Una vista de la visita de Ellen a Río' } },
      { src: '/fotos-cliente/ellens3.jpg', alt: { en: 'Ellen exploring Rio de Janeiro', pt: 'Ellen conhecendo o Rio de Janeiro', es: 'Ellen descubriendo Río de Janeiro' } },
      { src: '/fotos-cliente/ellens4.jpg', alt: { en: 'Ellen on her trip in Rio', pt: 'Ellen em sua viagem pelo Rio', es: 'Ellen durante su viaje por Río' } },
    ],
    titulo: {
      en: 'A local friend',
      pt: 'Uma amiga local',
      es: 'Una amiga local',
    },
    // Original em ingles, so com quatro erros de digitacao corrigidos:
    // "tourguides" -> "tour guides", "didnt" -> "didn’t", "so i called" ->
    // "so I called", "sola traveler" -> "solo traveler".
    texto: {
      en: 'My experience with Olivia was amazing! I went to Brazil by myself and contacted her before I went. She at that time already thought along with me; where to go, possible tour guides etc. The contact before I even was in Brazil made it feel like I already had a friend when I arrived at the airport where she waited for me to take me into Rio. She took me to a favela and some other nice places. I stayed at her place for the night and because of that I got a local experience. We had super good food, went into stunning nature and took the motorbike to a pretty beach. Later during that holiday I had some miscommunication with a motor taxi driver. I didn’t know what to do, so I called Olivia. She helped me with that situation and made sure I was safe. Her genuine kindness and care was something I very much appreciated as a solo traveler in Brazil. I can definitely say it felt like I had a local friend and hope to be back one day!',
      pt: 'Minha experiência com a Olivia foi incrível! Fui sozinha para o Brasil e entrei em contato com ela antes da viagem. Já ali ela pensou junto comigo para onde ir, possíveis guias e tudo mais. Esse contato antes mesmo de eu chegar fez parecer que eu já tinha uma amiga quando desembarquei no aeroporto, onde ela me esperava para me levar ao Rio. Ela me levou a uma favela e a outros lugares lindos. Passei a noite na casa dela e, por isso, tive uma experiência bem local. Comemos muito bem, passeamos por uma natureza deslumbrante e fomos de moto até uma praia linda. Mais tarde, ainda nas férias, tive um mal-entendido com um mototaxista. Eu não sabia o que fazer, então liguei para a Olivia. Ela me ajudou a resolver a situação e garantiu que eu estivesse segura. Viajando sozinha pelo Brasil, valorizei muito a gentileza e o cuidado sinceros dela. Posso dizer com certeza que senti que tinha uma amiga local, e espero voltar um dia!',
      es: '¡Mi experiencia con Olivia fue increíble! Viajé sola a Brasil y me puse en contacto con ella antes de ir. Ya en ese momento pensó conmigo adónde ir, posibles guías y todo lo demás. Ese contacto antes de llegar hizo que sintiera que ya tenía una amiga cuando aterricé en el aeropuerto, donde me estaba esperando para llevarme a Río. Me llevó a una favela y a otros lugares lindos. Pasé la noche en su casa y, gracias a eso, tuve una experiencia muy local. Comimos muy bien, recorrimos una naturaleza impresionante y fuimos en moto hasta una playa preciosa. Más adelante, todavía en esas vacaciones, tuve un malentendido con un mototaxista. No sabía qué hacer, así que llamé a Olivia. Me ayudó a resolver la situación y se aseguró de que yo estuviera a salvo. Viajando sola por Brasil, valoré muchísimo su amabilidad y su cuidado sinceros. Puedo decir con seguridad que sentí que tenía una amiga local, ¡y espero volver algún día!',
    },
  },
  {
    autor: 'Daniel Z.',
    nota: 5,
    destaque: true,
    // O TripAdvisor mostra so o mes da avaliacao (mai. de 2019). O cartao
    // exibe mes e ano, entao o dia 1 e so para completar.
    data: '2019-05-01',
    fotos: [
      { src: '/fotos-cliente/danielz1.jpg', alt: { en: 'Daniel on a tour with Olivia in Rio', pt: 'Daniel em um passeio com Olivia no Rio', es: 'Daniel durante un paseo con Olivia en Río' } },
      { src: '/fotos-cliente/danielz2.jpg', alt: { en: 'A moment from Daniel’s visit to Rio', pt: 'Um momento da visita de Daniel ao Rio', es: 'Un momento de la visita de Daniel a Río' } },
      { src: '/fotos-cliente/danielz3.jpg', alt: { en: 'Daniel exploring Rio de Janeiro', pt: 'Daniel conhecendo o Rio de Janeiro', es: 'Daniel descubriendo Río de Janeiro' } },
      { src: '/fotos-cliente/danielz4.jpg', alt: { en: 'Scenery from Daniel’s Rio tour', pt: 'Paisagem do passeio de Daniel pelo Rio', es: 'Paisaje del paseo de Daniel por Río' } },
      { src: '/fotos-cliente/danielz5.jpg', alt: { en: 'Daniel enjoying the city with his group', pt: 'Daniel aproveitando a cidade com seu grupo', es: 'Daniel disfrutando de la ciudad con su grupo' } },
      { src: '/fotos-cliente/danielz6.jpg', alt: { en: 'A view from Daniel’s trip in Rio', pt: 'Uma vista da viagem de Daniel pelo Rio', es: 'Una vista del viaje de Daniel por Río' } },
      { src: '/fotos-cliente/danielz7.jpg', alt: { en: 'Daniel during his Rio experience', pt: 'Daniel durante sua experiência no Rio', es: 'Daniel durante su experiencia en Río' } },
    ],
    // Link 7 da lista da Olivia, o unico de 2019 alem do 681mat_ass.
    url: 'https://www.tripadvisor.com.br/ShowUserReviews-g303506-d14054801-r676370277-Be_Extremely_happy_in_Rio-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html',
    idioma: 'en',
    // Saiu o "(L)" do fim do titulo, um emoticon antigo de coracao que no
    // site pareceria erro.
    titulo: {
      en: 'A guide like no other in the world!',
      pt: 'Uma guia como nenhuma outra no mundo!',
      es: '¡Una guía como ninguna otra en el mundo!',
    },
    // Original em ingles, so com "to i would" -> "to, I would".
    texto: {
      en: 'There aren’t many words needed to describe our tour with Olivia, but if you allow me to, I would in one word call it fabulous! Instead of the main attractions we went to many neighbourhoods in Rio. She showed us the artistic talents of the city; good 360 degrees views, told us about the history of Rio and even extended the tour with a good dinner. Olivia has stolen our hearts!',
      pt: 'Não são necessárias muitas palavras para descrever o nosso tour com a Olivia, mas, se me permitem, eu o resumiria em uma palavra: fabuloso! Em vez das atrações principais, fomos a vários bairros do Rio. Ela nos mostrou os talentos artísticos da cidade e belas vistas de 360 graus, contou a história do Rio e ainda estendeu o passeio com um ótimo jantar. A Olivia roubou o nosso coração!',
      es: 'No hacen falta muchas palabras para describir nuestro tour con Olivia, pero, si me lo permiten, lo resumiría en una palabra: ¡fabuloso! En lugar de las atracciones principales, fuimos a muchos barrios de Río. Nos mostró los talentos artísticos de la ciudad y buenas vistas de 360 grados, nos contó la historia de Río e incluso extendió el tour con una buena cena. ¡Olivia nos robó el corazón!',
    },
  },
  {
    autor: 'Olaf R.',
    nota: 5,
    destaque: true,
    data: '2018-12-27',
    url: 'https://www.tripadvisor.com.br/ShowUserReviews-g303506-d14787973-r641755976-Discovering_the_secrets_of_Rio-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/olafr1.jpg', alt: { en: 'Olaf and the group during the tour in Rio', pt: 'Olaf e o grupo durante o passeio no Rio', es: 'Olaf y el grupo durante el paseo en Río' } },
      { src: '/fotos-cliente/olafr2.jpg', alt: { en: 'View of Rio de Janeiro from above', pt: 'Vista do Rio de Janeiro do alto', es: 'Vista de Río de Janeiro desde lo alto' } },
      { src: '/fotos-cliente/olafr3.jpg', alt: { en: 'Olaf and his family in Rio de Janeiro', pt: 'Olaf e sua família no Rio de Janeiro', es: 'Olaf y su familia en Río de Janeiro' } },
    ],
    titulo: {
      en: 'Super tour in Rio de Janeiro with Olivia',
      pt: 'Super tour no Rio de Janeiro com a Olivia',
      es: 'Súper tour en Río de Janeiro con Olivia',
    },
    // Original em ingles, so com tres erros de digitacao corrigidos:
    // "ever!." -> "ever!", "weher" -> "were", "lotery" -> "lottery".
    texto: {
      en: 'Olivia picked us up in our hotel in Santa Teresa and we went on one of our best trips ever! It was the second time we visited Rio, but this time was completely different. We didn’t know there were so many hidden places and Olivia knew them, all. Anyone who can book this lady on a tour in Rio wins the lottery!!',
      pt: 'A Olivia nos buscou no hotel, em Santa Teresa, e fizemos um dos melhores passeios da nossa vida! Era a segunda vez que visitávamos o Rio, mas dessa vez foi completamente diferente. Não sabíamos que havia tantos lugares escondidos, e a Olivia conhecia todos. Quem consegue reservar um tour com ela no Rio ganhou na loteria!',
      es: 'Olivia nos recogió en el hotel, en Santa Teresa, ¡y fue uno de los mejores paseos de nuestra vida! Era la segunda vez que visitábamos Río, pero esta vez fue completamente diferente. No sabíamos que había tantos lugares escondidos, y Olivia los conocía todos. ¡Quien consiga reservar un tour con ella en Río se gana la lotería!',
    },
  },
  {
    autor: 'MMK',
    nota: 5,
    // A viagem foi em abril de 2019 e a avaliacao foi escrita em 20 de abril
    // de 2019. O TripAdvisor mostra as duas datas, e vale a da avaliacao.
    data: '2019-04-20',
    url: 'https://www.tripadvisor.com.br/ShowUserReviews-g303506-d4294013-r667832478-PrivateTourGuideinRio_Tours-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html',
    idioma: 'en',
    fotos: [
      { src: '/fotos-cliente/mmk1.jpg', alt: { en: 'Three women smiling at a café table, in a hall with columns and an ornate iron gate', pt: 'Três mulheres sorrindo numa mesa de café, num salão com colunas e um portão de ferro trabalhado', es: 'Tres mujeres sonriendo en una mesa de café, en un salón con columnas y un portón de hierro labrado' } },
      { src: '/fotos-cliente/mmk2.jpg', alt: { en: 'Two people with their arms open in front of Christ the Redeemer', pt: 'Duas pessoas de braços abertos diante do Cristo Redentor', es: 'Dos personas con los brazos abiertos frente al Cristo Redentor' } },
    ],
    // No titulo, "tourgide" -> "tourguide", como ela mesma escreve no fim do
    // texto.
    titulo: {
      en: 'Best tourguide in Rio',
      pt: 'A melhor guia de turismo do Rio',
      es: 'La mejor guía turística de Río',
    },
    // Original em ingles, so com erros de digitacao corrigidos: "possbile",
    // "Chris the Redeemer", "Suger Loaf", "Paque Lage", "Praça Mauà",
    // "avaiable", "unfortettable" e "olivia" com minuscula. Os erros de
    // gramatica ("every possible sightseeing places", "scenic point") e os
    // nomes sem acento (Niteroi, Portugues) ficam como ela escreveu.
    // Nas traducoes, "We (two)" virou "Eramos duas pessoas", para nao
    // supor o genero de quem escreveu.
    texto: {
      en: 'We (two) have booked a three-day private tour with Olivia. This is the best choice to travel in Rio. Olivia is extremely professional and experienced. She is very knowledgeable about the history, culture and development in Rio. You will never be bored with her. Most importantly, she is friendly, flexible and responsible. All three days are very well-planned. We have been to every possible sightseeing places with her including Corcovado (Christ the Redeemer Statue), seeing sunset at Sugar Loaf, Niteroi (Niemeyer Trail), Parque Lage, Santa Teresa, Praça Mauá, Real Gabinete Portugues de Leitura, walking tour in downtown, weekend market, and many other scenic point to see the beauty of the city. Olivia is very flexible to adapt our need and tried to show us the best of Rio. She was also available all the time during those days of our stay in Rio to answer our questions and to give us tips about restaurants and shopping. It was an unforgettable trip with her! Thank you so much Olivia, you are the best!! She is not just a tourguide, she is a dear friend!!',
      pt: 'Éramos duas pessoas e reservamos um tour privado de três dias com a Olivia. É a melhor escolha para viajar pelo Rio. A Olivia é extremamente profissional e experiente. Ela conhece muito a história, a cultura e o desenvolvimento do Rio. Com ela, você nunca vai se entediar. E o mais importante: ela é simpática, flexível e responsável. Os três dias foram muito bem planejados. Fomos com ela a todos os pontos turísticos possíveis, entre eles o Corcovado (a estátua do Cristo Redentor), o pôr do sol no Pão de Açúcar, Niterói (Caminho Niemeyer), o Parque Lage, Santa Teresa, a Praça Mauá, o Real Gabinete Português de Leitura, um passeio a pé pelo centro, uma feira de fim de semana e muitos outros mirantes para ver a beleza da cidade. A Olivia é muito flexível para se adaptar ao que a gente precisa e tentou nos mostrar o melhor do Rio. Ela também ficou disponível o tempo todo durante aqueles dias da nossa estadia no Rio, para responder às nossas perguntas e nos dar dicas de restaurantes e compras. Foi uma viagem inesquecível com ela! Muito obrigado, Olivia, você é a melhor! Ela não é só uma guia de turismo, é uma amiga querida!',
      es: 'Éramos dos personas y reservamos un tour privado de tres días con Olivia. Es la mejor opción para viajar por Río. Olivia es extremadamente profesional y tiene mucha experiencia. Sabe muchísimo de la historia, la cultura y el desarrollo de Río. Con ella nunca te vas a aburrir. Y lo más importante: es simpática, flexible y responsable. Los tres días estuvieron muy bien planificados. Fuimos con ella a todos los lugares turísticos posibles, entre ellos el Corcovado (la estatua del Cristo Redentor), el atardecer en el Pan de Azúcar, Niterói (Camino Niemeyer), el Parque Lage, Santa Teresa, la Plaza Mauá, el Real Gabinete Portugués de Lectura, un paseo a pie por el centro, un mercado de fin de semana y muchos otros miradores para ver la belleza de la ciudad. Olivia es muy flexible para adaptarse a lo que necesitábamos y trató de mostrarnos lo mejor de Río. Además, estuvo disponible todo el tiempo durante esos días de nuestra estadía en Río para responder nuestras preguntas y darnos consejos sobre restaurantes y compras. ¡Fue un viaje inolvidable con ella! ¡Muchas gracias, Olivia, eres la mejor! No es solo una guía turística, ¡es una amiga querida!',
    },
  },
  // {
  //   autor: 'Nome do viajante',
  //   origem: 'London, United Kingdom',
  //   nota: 5,
  //   data: '2026-01-15',
  //   url: 'https://www.tripadvisor.com.br/ShowUserReviews-...',
  //   idioma: 'en',
  //   titulo: 'Titulo da avaliacao',
  //   texto: 'Texto da avaliacao, como o viajante escreveu.',
  // },
];

/** Versao de um texto de avaliacao no idioma da pagina. */
export function noIdioma(texto: TextoAvaliacao, lang: Idioma): string {
  return typeof texto === 'string' ? texto : texto[lang];
}

/** Media das notas, usada no schema.org. Null quando nao houver avaliacoes. */
export function mediaDasNotas(): number | null {
  if (AVALIACOES.length === 0) return null;
  const soma = AVALIACOES.reduce((total, a) => total + a.nota, 0);
  return Math.round((soma / AVALIACOES.length) * 10) / 10;
}

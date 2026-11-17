# In Rio with Olivia: documento de fundação do projeto

Este arquivo é a referência principal do projeto. Leia inteiro antes de escrever qualquer código e siga as decisões aqui registradas. Quando algo não estiver definido, pergunte antes de inventar.

## 1. Visão geral

Site institucional de Olivia, guia de turismo no Rio de Janeiro. O objetivo principal do site é transformar visitantes em conversas no WhatsApp. Objetivos secundários: passar confiança (avaliações do TripAdvisor, Instagram, credenciais) e inspirar o visitante com experiências e ideias de roteiro.

- Domínio: inriowitholivia.com (ver seção 11)
- Público: turistas estrangeiros e brasileiros de outras cidades, majoritariamente no celular
- Idiomas: inglês (padrão), português e espanhol
- Tamanho: site médio, poucas páginas, conteúdo bem cuidado
- Tom: pessoal, acolhedor e direto. Olivia fala em primeira pessoa.

## 2. Identidade visual

Estética minimalista: muito espaço em branco, poucas cores, fotografia como protagonista, tipografia elegante. Nada de gradientes, sombras pesadas ou animações em todo lugar.

### Paleta

| Nome | Hex | Uso |
|---|---|---|
| Branco | #FFFFFF | Fundo principal |
| Névoa | #EEF2F0 | Fundos de seção alternados, cartões |
| Atlântico | #123A45 | Títulos, textos fortes, rodapé, botões principais |
| Pedra | #6B7775 | Texto secundário, legendas |
| Sol | #E9A23B | Destaque pontual (botão do WhatsApp em hover, detalhes). Usar com parcimônia. |

Verificar contraste AA: texto Pedra só sobre Branco ou Névoa, nunca em tamanho pequeno sobre Sol.

### Tipografia (Google Fonts)

- Títulos: Lora (500, normal). Substituiu Instrument Serif, ver seção 11
- Textos e interface: Manrope (400, 500, 600)
- Escala sugerida: 16px base, títulos de seção 36 a 48px no desktop, 28 a 32px no mobile
- Linhas de texto com no máximo 70 caracteres

### Logo

Arquivos na pasta `/brand`:

- `logo-horizontal.svg`: versão principal (símbolo + "in Rio with Olivia")
- `logo-horizontal-escuro.svg`: versão para fundo Atlântico (rodapé)
- `logo-simbolo.svg`: símbolo isolado, usar como favicon e ícone de redes

O símbolo mostra o contorno do Pão de Açúcar, o sol e a onda do calçadão. Antes de publicar, converter os textos dos SVGs em contornos (outline) para não depender da fonte instalada.

## 3. Stack técnica

- Framework: Astro (site estático, rápido e ótimo para SEO)
- Estilo: Tailwind CSS com os tokens da paleta acima configurados no tema
- Internacionalização: roteamento nativo do Astro com prefixo de idioma (`/en`, `/pt`, `/es`)
- Conteúdo: Astro Content Collections (arquivos Markdown/JSON por idioma) para experiências e inspirações
- Imagens: componente `<Image />` do Astro, formatos AVIF/WebP, lazy loading
- Hospedagem: Vercel ou Netlify (plano gratuito atende)
- Formulário (opcional): Netlify Forms ou Formspree
- Analytics: Plausible ou GA4 com eventos de clique no WhatsApp, Instagram e TripAdvisor

JavaScript só onde for necessário (menu mobile, seletor de idioma, galeria). Nada de bibliotecas pesadas.

## 4. Estrutura de páginas

### Home (`/`)
1. Hero: foto grande do Rio (ou da Olivia em um mirante), frase curta de apresentação e botão "Falar no WhatsApp"
2. Apresentação curta da Olivia: foto, 2 ou 3 frases e link para "Sobre mim"
3. Experiências em destaque: 3 a 6 cartões com foto, título, duração e link
4. Inspirações para o seu tour: mosaico de 3 a 4 textos ou ideias de roteiro
5. Experiências especiais: bloco de destaque para roteiros personalizados, privados ou temáticos
6. Avaliações: 3 depoimentos reais do TripAdvisor com link "Ver todas no TripAdvisor"
7. Instagram: faixa com 6 fotos (imagens estáticas atualizadas manualmente, sem widget pesado) e link para o perfil
8. Chamada final: "Vamos planejar seu dia no Rio?" com botão do WhatsApp

### Como eu trabalho (`/como-trabalho`, `/how-i-work`, `/como-trabajo`)
Como a Olivia monta o roteiro, a equipe de guias, idiomas de atendimento, estrutura para grupos, credenciais (Cadastur, formação, anos de experiência), fotos e chamada para o WhatsApp. Ver seção 11.

### Experiências (`/experiencias` e `/experiencias/[slug]`)
Lista em grade e uma página por experiência com: fotos, descrição, duração, ponto de encontro, o que está incluído, o que levar, melhor horário, idiomas disponíveis e botão "Reservar pelo WhatsApp" com mensagem pré-preenchida citando o nome do tour.

Preços: o site não exibe valores em nenhum lugar. Cada experiência mostra "Valor sob consulta" logo acima do botão, e o botão abre o WhatsApp com a mensagem pré-preenchida pedindo orçamento (ex.: "Olá, Olivia! Gostaria de saber o valor do tour Pão de Açúcar ao pôr do sol para [número] pessoas em [data]."). Não incluir campo de preço no modelo de dados nem `offers` com valor no schema.org.

Sugestões iniciais (validar com a Olivia): Cristo Redentor e Santa Teresa, Pão de Açúcar ao pôr do sol, Centro Histórico e Pequena África, Praias da Zona Sul, Trilhas (Morro Dois Irmãos, Pedra Bonita), Jardim Botânico e Parque Lage, Rio gastronômico, tour personalizado.

### Inspirações (`/inspiracoes` e `/inspiracoes/[slug]`)
Pequeno blog com dicas e roteiros ("Rio em 3 dias", "O que fazer quando chove", "Melhores pores do sol"). Ajuda no SEO e no Google.

### Contato (`/contato`)
WhatsApp, Instagram, TripAdvisor, e-mail, formulário simples (nome, e-mail, datas, número de pessoas, mensagem) e perguntas frequentes (como pedir um orçamento, o que influencia o valor, formas de pagamento, cancelamento, pontos de encontro, segurança, crianças).

## 5. Componentes globais

- Header fixo e discreto: logo à esquerda; menu (Home, Sobre mim, Experiências, Inspirações, Contato); seletor de idioma (EN / PT / ES), ícone do TripAdvisor e ícone do WhatsApp à direita. No mobile, menu em painel lateral, com links de WhatsApp e TripAdvisor no rodapé do painel.
- Botão flutuante do WhatsApp no canto inferior direito, visível em todas as páginas, sem cobrir conteúdo importante no mobile.
- Links de WhatsApp no formato `https://wa.me/55XXXXXXXXXXX?text=...` com mensagem pré-preenchida no idioma ativo.
- Rodapé em Atlântico: logo claro, links de navegação, Instagram, TripAdvisor, WhatsApp, e-mail, Cadastur e ano.

## 6. Tradução

- O seletor de idioma troca a rota mantendo a página atual (ex.: `/en/experiences/sugarloaf` para `/pt/experiencias/pao-de-acucar`).
- Textos de interface em `src/i18n/en.json`, `pt.json`, `es.json`. Nada de texto fixo nos componentes.
- Conteúdos longos (experiências, inspirações, sobre) em arquivos separados por idioma.
- Tradução feita por arquivo, não por tradutor automático no navegador.
- A primeira visita à raiz vai sempre para o inglês. O idioma do navegador não é consultado. Depois que a pessoa escolhe um idioma no seletor, a escolha fica guardada e passa a valer nas próximas visitas.
- Tags `hreflang` e `lang` corretas em todas as páginas.

## 7. SEO e desempenho

- Título e descrição únicos por página e idioma, Open Graph e Twitter Card com imagem
- Dados estruturados schema.org (`LocalBusiness`/`TouristTrip`) e `Review` quando houver avaliações
- `sitemap.xml` com todas as rotas e idiomas, `robots.txt`
- Meta Lighthouse: 90+ em Performance, Acessibilidade, Boas práticas e SEO no mobile
- Imagens com `alt` descritivo em cada idioma

## 8. Acessibilidade e qualidade

- Responsivo a partir de 360px de largura
- Foco visível no teclado, contraste AA, navegação por teclado no menu e no seletor de idioma
- Respeitar `prefers-reduced-motion`
- Banner de cookies (LGPD) somente se usar GA4; com Plausible não é necessário

## 9. Estrutura de pastas sugerida

```
/public/brand          logos e favicon
/src/components        Header, Footer, WhatsAppButton, LanguageSwitcher, TourCard, ReviewCard
/src/layouts           BaseLayout
/src/pages/[lang]/     páginas por idioma
/src/content/tours     experiências (md por idioma)
/src/content/inspiracoes
/src/i18n              en.json, pt.json, es.json, utilitários
/src/config/site.ts    WhatsApp, Instagram, TripAdvisor, e-mail, Cadastur
```

Todos os contatos e links externos ficam em `site.ts` para serem trocados em um só lugar.

## 10. Informações pendentes (preencher antes de publicar)

- [x] Número do WhatsApp
- [x] Link do perfil do Instagram
- [x] Link da página do TripAdvisor
- [x] Texto das 7 avaliações do TripAdvisor escolhidas pela Olivia, em
      `src/data/reviews.ts`. Faltam os links de três de 2025 (Sandra C.,
      Manuela e Ellen S.), que não dá para deduzir pela data. Enquanto isso,
      o ícone do TripAdvisor desses cartões abre a página geral da Olivia
- [x] E-mail de contato
- [x] Número do Cadastur
- [x] Idiomas de atendimento da equipe: português, inglês, espanhol, francês e italiano
- [x] Lista de lugares que podem entrar no roteiro
- [ ] Fotos em alta resolução (Olivia, equipe e passeios)
- [x] Textos em português, a partir de `textos.txt`, com tradução para inglês e espanhol
- [ ] Revisão final dos textos pela Olivia, em especial as respostas de pagamento e
      cancelamento no FAQ, que foram escritas como rascunho

## 11. Decisões tomadas na implementação

Registradas aqui porque mudam o que as seções acima descrevem. Todas foram aprovadas
antes de escrever o código.

### Experiências não são produtos separados

Os textos da Olivia deixam claro que ela trabalha com tours privados e personalizados,
e que a lista de lugares é um cardápio para montar o roteiro, não um catálogo de
passeios vendidos um a um. Por isso **não existe `/experiencias/[slug]`**. A página
`/experiencias` mostra os 19 lugares em grade, agrupados em quatro categorias, mais
os blocos de Experiências especiais e Rio by Night.

Se um dia fizer sentido dar página própria a um lugar muito buscado, o conteúdo já
está estruturado para isso em `src/content/lugares.json`.

### O blog mudou de nome

"Inspirações" passou a nomear a lista de lugares, seguindo o texto da Olivia
("Inspirações para o seu tour"). Para não haver duas coisas com o mesmo nome, o blog
virou **Dicas / Tips / Consejos**, nas rotas `/pt/dicas`, `/en/tips` e `/es/consejos`.

### Pedra ficou um tom mais escura

A seção 2 registra Pedra como `#6B7775`. Esse tom dá contraste de 4.11:1 sobre Névoa,
abaixo do mínimo AA de 4.5:1 que a seção 8 exige. O valor em uso é **`#63706E`**, o
ajuste mínimo que passa nos dois fundos: 5.15:1 sobre Branco e 4.56:1 sobre Névoa.
A diferença visual é imperceptível.

Pelo mesmo motivo, **Sol nunca é usado como cor de texto sobre fundo claro** (daria
2.17:1). Em fundo claro ele aparece só em bordas, sublinhados e detalhes. Como texto,
apenas sobre Atlântico.

### Os idiomas são da equipe, não só da Olivia

O atendimento acontece em português, inglês, espanhol, francês e italiano, porque a
Olivia trabalha com uma equipe de guias. Isso não se confunde com os três idiomas do
site. A lista fica em `IDIOMAS_FALADOS`, em `src/config/site.ts`, e os nomes de cada
idioma ficam em `idiomasFalados`, nos arquivos de i18n. A página Sobre mim traz a
lista na tabela de credenciais e um parágrafo no bloco da equipe explicando que o
idioma do passeio define qual guia acompanha o dia.

### "Mais de 20 anos", não "22 anos"

Os textos falam em mais de 20 anos de profissão. O número exato envelhece e obriga a
revisar o site todo ano. `SITE.anosDeExperiencia` vale 20 e a tabela de credenciais
mostra `20+`. O `foundingDate` do schema.org continua com o ano real de início (2004).

### Nenhum texto prende o passeio a um horário do dia

Os primeiros rascunhos do blog recomendavam subir o Pão de Açúcar no fim da tarde,
ver o Cristo de manhã cedo e fechar o dia no Arpoador no pôr do sol. Isso cria uma
expectativa que o roteiro real nem sempre consegue cumprir, e trabalha contra a
própria proposta de montar o dia junto com o viajante.

Por isso o artigo de pôr do sol virou **Os melhores mirantes do Rio** (`mirantes`,
nos três idiomas) e os textos passaram a dizer que a paisagem compensa a qualquer
hora e que o encaixe do horário é trabalho da Olivia. Ao escrever conteúdo novo,
manter essa regra: sugerir lugares, nunca horários obrigatórios.

### Os títulos são Lora, não Instrument Serif

A seção 2 nasceu com Instrument Serif nos títulos. Ela é bonita, mas é a fonte da
moda em portfólios e revistas online, com contraste alto e ar mais editorial do que
profissional. Para um serviço que se vende pela confiança, Lora 500 diz melhor o que
precisa dizer: traço de pincel, contraste moderado, nada de exibição. E, por ser
desenhada para texto longo em tela, sustenta o título de 48px e o do cartão pequeno
com o mesmo humor. Manrope continua nos textos, sem mudança.

Só o peso 500 é carregado, e nenhum título usa itálico, então o itálico saiu também.

Isso obrigou a recalibrar o logo. Lora é cerca de 35 por cento mais larga que
Instrument Serif no mesmo corpo, e o logo depende de "Olivia" e "in Rio with"
fecharem juntas na direita. Havia duas saídas: encolher o nome 25 por cento para
caber na largura antiga, ou deixar a marca mais larga. A segunda custa menos, porque
a altura do logo é fixada pelo símbolo e a largura é livre. O nome ficou praticamente
do mesmo tamanho (corpo 68, altura de O em 49,8 contra 54,7), a linha de cima subiu
de 27 para 29 com mais tracking, e a viewBox passou de 278 para 307 de largura. Em
48px de altura, que é o tamanho no cabeçalho, a marca passou de 111 para 123px de
largura. As medidas estão no comentário do `Logo.astro` e valem também para os
arquivos de `/public/brand`.

### "Sobre mim" virou "Como eu trabalho"

A seção 4 chamava a página de Sobre mim, em `/sobre`. Mas o conteúdo que a Olivia
escreveu para ali não é biografia: é como ela monta o roteiro, quem é a equipe, que
estrutura atende cada tamanho de grupo e quais são as credenciais. No próprio
`textos.txt` o bloco está marcado como "ABOUT US", não "about me". Um rótulo que
promete história pessoal e entrega descrição de serviço desperdiça o clique.

O nome passou a ser **Como eu trabalho / How I work / Cómo trabajo**, nas rotas
`/pt/como-trabalho`, `/en/how-i-work` e `/es/como-trabajo`. A chave da seção em
`SECOES`, o bloco de i18n e o componente de página seguiram o mesmo nome
(`comoTrabalho`, `ComoTrabalho.astro`). O botão da Home que leva até lá diz agora
"Ver como eu trabalho", no lugar de "Conhecer a minha história".

O H1 da página era "O seu Rio, do seu jeito", exatamente o mesmo H1 da Home. Duas
páginas com o mesmo título principal disputam a mesma busca e não dizem o que cada
uma tem de diferente. O novo H1 é "Cada roteiro é montado do zero" / "Every itinerary
is built from scratch" / "Cada itinerario se arma desde cero", que é a promessa que o
primeiro parágrafo da página cumpre.

A página também repetia palavra por palavra o bloco de apresentação da Home
("É um prazer conhecê-lo. Eu sou a Olivia."). Esse bloco saiu, em vez de ser trocado
por outro texto. A apresentação pessoal serve na Home, onde a pessoa ainda não sabe
quem é a Olivia; aqui ela chega depois de ter clicado em "Ver como eu trabalho", ou
seja, já apresentada. Os mais de 20 anos continuam na tabela de credenciais. Se um
dia a Olivia escrever um parágrafo de história pessoal, o lugar dele é a Home ou uma
página só dele, não esta.

Sem esse bloco, a abertura e a equipe ficariam as duas em Névoa, então os fundos das
duas seções seguintes trocaram de lugar: equipe em Branco, estrutura e credenciais em
Névoa. As linhas da tabela de credenciais eram Névoa forte, que só se enxerga sobre
Branco, e passaram a ser Atlântico a 10 por cento, que funciona nos dois fundos.

### O seletor de idioma usa bandeira, e um menu no lugar das três siglas

A seção 5 descreve o seletor como "EN / PT / ES". As siglas foram trocadas por
bandeiras redondas de 22px: Estados Unidos para o inglês, Brasil para o
português, Espanha para o espanhol. São desenhos próprios em SVG, em
`Bandeira.astro`, e não emoji: o Windows não desenha emoji de bandeira e
mostraria um par de letras no lugar. Os desenhos são simplificados de propósito,
sem as estrelas da faixa brasileira, sem o escudo espanhol e com nove listras na
bandeira americana em vez de treze, porque nesse tamanho o detalhe vira sujeira.

As três siglas lado a lado não cabiam no cabeçalho do celular, então ali o
seletor só aparecia a partir de 640px e quem estava no telefone precisava abrir
o menu lateral para trocar de idioma. Agora o cabeçalho mostra um botão com a
bandeira do idioma atual, que abre a lista com o nome de cada idioma por
extenso. Ocupa a largura de um botão redondo e cabe em 360px. O menu é um
`<details>`, então abre, fecha e anda pelo teclado sem JavaScript; o script só
acrescenta fechar com Escape e com clique fora.

No painel lateral do celular o seletor mostra só uma linha com o idioma atual
(`variante="lista"`). Ao tocar nela, os outros dois aparecem logo abaixo. No
começo as três opções ficavam sempre abertas, mas com seis itens no menu elas
ocupavam tanto espaço que o último item, Contato, saía cortado no meio.

Pelo mesmo motivo, o menu e os botões de baixo rolam juntos, abaixo do logo. Antes
só o menu rolava e, em celular baixo, era espremido pelo bloco de baixo. Agora os
itens do menu aparecem sempre inteiros e, se faltar altura, quem rola é o painel.

### O Instagram entrou no cabeçalho

A seção 5 lista TripAdvisor e WhatsApp à direita do cabeçalho. O Instagram entrou
ao lado deles, com o mesmo botão redondo, porque é onde a Olivia mostra o dia a dia
dos passeios e quem chega pelo perfil espera reencontrar o link no lugar de sempre.
Ele também ficou no rodapé do painel lateral do celular, junto do WhatsApp e do
TripAdvisor.

Com quatro alvos à direita (idioma, Instagram, TripAdvisor e menu), a linha não
cabia mais em 360px. Os botões passaram a 36px no celular e voltam a 40px a partir
de 768px; o espaço entre eles caiu de 8 para 6px no celular. O seletor de idioma
acompanhou a mesma altura.

### Os depoimentos ganharam página própria

A seção 4 previa só três avaliações na Home. Em novembro de 2026 a Olivia escolheu
nove avaliações do TripAdvisor, e elas ganharam uma página: **Depoimentos / Reviews /
Testimonios**, nas rotas `/pt/depoimentos`, `/en/reviews` e `/es/testimonios`. No
menu ela fica entre Experiências e Dicas. A página mostra todas, da mais recente
para a mais antiga. A Home mostra três, as marcadas com `destaque` em `reviews.ts`,
e ganhou o botão "Ver mais depoimentos", ao lado do link do TripAdvisor. Os
destaques são escolhidos pelo tamanho parecido, e não pela ordem: na grade da Home
cada linha fica da altura do cartão maior, e um depoimento de cinco parágrafos ao
lado de dois curtos deixava dois buracos brancos.

Cada cartão mostra, de cima para baixo: o nome com a inicial num círculo e a origem,
com o ícone do TripAdvisor ao lado; as estrelas, as fotos do viajante, o título que
ele deu, o texto e, na linha de baixo, o mês da avaliação. A ordem é a que a Olivia
pediu em novembro de 2026, a mesma do TripAdvisor: quem escreveu vem primeiro. A nota
em número ("5/5") saiu a pedido dela; as estrelas já dizem isso, e o número continua
só para leitor de tela. Todo cartão tem o ícone do TripAdvisor: abre a avaliação
quando há `url` e, sem ela, a página geral da Olivia no TripAdvisor.

Os cartões seguem um padrão só, em qualquer tela. A faixa de fotos tem sempre a mesma
altura e ocupa a largura toda, com uma, duas ou três colunas; a partir da quarta foto,
a terceira mostra "+N", e o visualizador continua passando por todas. O texto fica
recolhido em 8 linhas, com "Ler mais". No computador, os cartões ficam numa grade de
três colunas (duas no tablet), cada linha com a altura do cartão maior, e a última
linha incompleta fica centralizada. Antes, a página usava colunas de mosaico, com cada
cartão da altura do próprio texto, e a fileira de fotos rolava para o lado, com barra
de rolagem aparente no Windows. A Olivia achou que os cartões pareciam soltos, sem
padrão, e isso mudou em novembro de 2026. Na Home, o mesmo recorte resolveu o espaço
em branco que sobrava embaixo dos depoimentos curtos.

### No celular, os depoimentos são um carrossel

Também a pedido da Olivia, para a página não virar uma fila comprida de cartões. Abaixo
de 768px, a Home e a página de Depoimentos mostram os cartões em um carrossel lateral
(`CarrosselAvaliacoes.astro`), no desenho do carrossel de destaques do site da
Morabilidade: cada cartão ocupa 85 por cento da largura e a ponta do próximo aparece. A
partir de 768px, os mesmos cartões viram a grade descrita acima.

O carrossel passa sozinho a cada 3 segundos, como ela pediu, e tem setas. Como três
segundos não dão para ler um depoimento, a troca para sozinha quando a pessoa mostra que
está lendo: arrasta para o lado, toca num cartão ou chega pelo teclado. Também há um
botão de pausa, exigido pela WCAG para conteúdo que se move sozinho, e com
`prefers-reduced-motion` a troca já começa parada. O texto recolhido em 8 linhas também
ajuda aqui: sem ele, cada cartão teria mais de uma tela de altura no celular. As setas
ficam no centro, e a pausa na esquerda, porque o canto direito é do botão flutuante do
WhatsApp.

O carrossel usa a rolagem do próprio navegador, com encaixe, e não uma biblioteca: o
site da Morabilidade usa Embla, que é de React. Os cartões são renderizados uma vez só,
e o mesmo HTML vira carrossel ou grade conforme a largura, para não duplicar conteúdo.

Em novembro de 2026 entraram mais duas avaliações, cada uma com duas fotos: a de
Mary Perlera (2025) e a de MMK (2019), e a página passou a ter onze.

Logo depois, a Olivia pediu para tirar as avaliações sem foto: saíram as de
Christa L., 681mat_ass, DeniseStadt e divinitylh, e ficaram sete. Os textos e as
traduções delas continuam no histórico do repositório. A Christa era destaque da
Home, e a Ellen S. entrou no lugar dela, por ter o texto mais curto entre as que
têm foto. Ainda assim é mais longa que as de Daniel Z. e Olaf R., mas com o texto
recolhido em 8 linhas os três cartões ficam do mesmo tamanho. Ao acrescentar
avaliações, a regra passa a ser: só entra avaliação com foto.

A regra de nada inventado continua valendo: com `src/data/reviews.ts` vazio, a
página sai do menu e a seção some da Home.

Cada depoimento aparece no original na versão do site do idioma em que o viajante
escreveu, e traduzido nas outras duas, com a linha "Traduzido do inglês" no cartão
e o link para o original no TripAdvisor. A cliente escolheu assim porque um
depoimento que a pessoa não consegue ler não convence. A tradução é feita a partir
do original, não da tradução automática que o TripAdvisor mostra em português, que
é fraca ("turnê" no lugar de tour). Por isso, ao pedir uma avaliação nova, pedir o
texto do link "Ver original". No original, só se corrigem erros de digitação
evidentes, sem trocar palavras.

Com seis itens, o menu não cabia em uma linha em 1024px ("Como eu trabalho" quebrava).
O espaço entre os itens passou de 28 para 20px entre 1024 e 1280px.

### O selo do KAYAK fica no rodapé

A Olivia pediu o selo "Find us on KAYAK Guides" no site para ganhar as vantagens de
parceira do KAYAK. Ele entrou no rodapé, embaixo do texto curto ao lado do logo:
assim aparece em todas as páginas, e o laranja do selo funciona como credencial
sobre o Atlântico sem disputar atenção com o botão do WhatsApp. É a única cor fora
da paleta no site, e foi aceita por ser a marca de terceiros.

O link e a imagem são os do código de incorporação oficial, sem mudança, e ficam em
`SELO_KAYAK`, no `site.ts`. O tamanho é o médio do painel do KAYAK, com 150px de
altura, no lugar do pequeno, de 50px, usado antes. A imagem é carregada do servidor do KAYAK, e não da
pasta do site, porque o CDN deles recusa downloads fora do navegador e porque é o
selo oficial que eles reconhecem. O link não leva `noreferrer`, para o KAYAK saber
de onde veio o clique. Os textos alternativos ficam em `rodape.kayak`, nos arquivos
de i18n.

### Nada é inventado

Onde falta informação real, o bloco não aparece, em vez de exibir conteúdo de exemplo:

- Sem número de WhatsApp, nenhum botão de conversa é renderizado
- Sem avaliações reais em `src/data/reviews.ts`, a seção de avaliações e o
  `aggregateRating` do schema.org ficam de fora
- Sem provedor de formulário, o formulário aparece desativado com aviso

O `npm run build` lista o que ainda falta ao terminar.

### Fotos de banco nos cartões de lugar, até a Olivia mandar as dela

As fotos enviadas pela cliente cobriam só 7 dos 19 lugares; as demais eram capturas
de imagens da internet ou montagens geradas por IA, e ficaram de fora. Para a grade
não parecer inacabada, 12 lugares usam fotos provisórias do Wikimedia Commons, todas
em domínio público ou CC0. A lista e a origem de cada uma estão em
`src/assets/places/CREDITOS.md`. A regra vale para os cartões de lugar e para os
cartões de experiências especiais (helicóptero, asa-delta, Carnaval e futebol
também usam foto de banco). O topo da Home, o retrato, a equipe e
o Instagram usam apenas fotos da própria Olivia. Uma foto de banco com pessoas
desconhecidas no bloco da equipe apresentaria estranhos como guias dela.

O Roxy Dinner Show ficou sem foto até novembro de 2026, porque não existe imagem
livre do show e uma foto de samba de outro lugar mostraria outro produto. Agora
usa uma foto do próprio show enviada pela Olivia, em
`src/assets/specials/roxy-dinner-show.jpg`. Os detalhes estão em `CREDITOS.md`.

Em outubro de 2026 as experiências especiais ganharam o ensaio de escola de samba
e a partida de futebol, e passaram de quatro para seis. A grade foi de quatro para
três colunas no desktop, para fechar duas linhas cheias em vez de deixar dois
buracos. Não existe foto livre de ensaio de quadra com qualidade para o site, então
o cartão usa a bateria de uma escola do Rio desfilando na Intendente Magalhães, e a
descrição da foto fala de ritmistas, não de ensaio. É a foto mais fraca do bloco e
a primeira a trocar quando a Olivia tiver uma de ensaio.

Em novembro de 2026 a Olivia contou que também consegue ingressos para o Carnaval.
Em vez de um sétimo cartão, que deixaria a última linha da grade com dois buracos,
o cartão do ensaio virou **Carnaval**: ingressos e, nos meses antes da festa, os
ensaios das escolas. O id passou de `ensaio-samba` para `carnaval`, e a foto de
desfile, que antes não combinava com o ensaio, agora combina com o texto. O tipo de
ingresso (arquibancada, frisa, camarote, baile) ainda não foi confirmado, por isso
o texto fala só em "ingressos para o Carnaval". Quando ela confirmar, detalhar.

A Olivia pediu para tirar das Praias da Zona Sul a foto do mirante do Vidigal, que
mostra a praia de cima da favela. Ela virou a segunda foto da Favela, que a Olivia
pediu que tivesse mais de uma, e as praias receberam uma foto provisória de
Copacabana até ela escolher as dela.

Um lugar pode ter várias fotos: `favela.jpg`, `favela-2.jpg`, `favela-3.jpg` e assim
por diante. Com mais de uma, o cartão vira uma galeria que desliza para o lado, com
botões de anterior e próxima. É CSS de rolagem com encaixe (`scroll-snap`), então
funciona com o dedo e o teclado mesmo sem JavaScript.

As descrições das fotos (`alt`) ficam em `fotos`, nos arquivos de i18n, pelo nome do
arquivo (`favela-2` tem a sua). Ao trocar uma foto, trocar também a frase dela.

### O topo da Home é um grupo de clientes da Olivia

A foto do topo era uma selfie da Olivia no alto do Pão de Açúcar. Foram testadas
três substitutas: uma foto aérea do Cristo, que era captura de tela com 866 px de
largura e não ficou boa nem ampliada por IA; uma vista de Ipanema a partir do
Arpoador, que no celular deixava o texto sobre prédios e cactos; e a silhueta do
Cristo no Corcovado contra o céu laranja, que a cliente escolheu e ficou no ar
por um tempo. Depois veio a vista clássica do Corcovado, com o Pão de Açúcar e a
enseada de Botafogo, em CC0.

Em outubro de 2026 a cliente trocou a foto de banco por uma foto dela: um grupo
de viajantes de capacete, ao lado de mototáxis, numa rua de favela. É quadrada,
com 1600 px. Foi testada também uma foto de grupo no calçadão do Arpoador, que
tinha só 960 px e saiu borrada no computador.

Ficaram registrados três pontos contra a foto atual: o grupo grande contrasta com
a promessa de tour privado do título, o texto do topo cai sobre a fila da frente,
e aparecem moradores (mototaxistas e pessoas numa janela), cujo uso da imagem
depende de autorização. Se a Olivia mandar outra foto, procurar uma
com espaço livre para o texto.

A foto fica em `src/assets/fotos/hero.jpg`, o nome que `fotoHero()` procura. A
moldura do topo muda com a tela (4:5 no celular, 16:10 no tablet, 2:1 no
desktop), e o recorte fica em `recorteHero`, no `Home.astro`. Trocando a foto,
refazer o recorte e a descrição `fotos.hero` nos arquivos de i18n.

As candidatas ficaram em `fotos-cliente/`, fora do git:
`hero-pao-de-acucar-corcovado.jpg`, `turistas1.jpeg` (a do Arpoador) e
`turistas2.jpeg` (o original da atual). As anteriores continuam no histórico do
repositório.

### Domínio .com registrado na KingHost, site na Cloudflare

A seção 1 previa `inriowitholivia.com.br`. O domínio principal passou a ser
**`inriowitholivia.com`**, porque o público é sobretudo estrangeiro e é o .com que
um turista digita por reflexo. O .com.br estava livre em outubro de 2026 e pode ser
registrado depois no registro.br, só para redirecionar ao .com.

O plano era registrar o domínio na Cloudflare Registrar, pelo preço de custo na
renovação. Ele acabou registrado na **KingHost**, em 16 de novembro de 2026, e
vence em 16 de novembro de 2027. A renovação automática precisa ficar ligada. A
titular deve ser a Olivia, não quem desenvolve o site.

A KingHost fica só com o registro do domínio. A hospedagem dela custa R$ 29,90 por
mês e não foi contratada, porque o site não usa nada que justifique o custo: não
tem PHP nem banco de dados, e o e-mail da Olivia é um Gmail. O site é publicado na
**Cloudflare**, no plano gratuito, que não pede cartão e permite uso comercial.
As outras opções gratuitas foram descartadas em novembro de 2026:

- **Netlify**, o plano original: o plano gratuito passou a ter 300 créditos por
  mês, sem como comprar mais, e o site sai do ar quando eles acabam. Em 2026 houve
  também muitos relatos de sites gratuitos pausados por erro do próprio Netlify.
- **Vercel**: o plano gratuito só permite uso não comercial, e este site vende um
  serviço.
- **GitHub Pages**: os termos proíbem usar para um negócio.

Na Cloudflare, o site é um **Worker só com arquivos estáticos**, e não um projeto
do Cloudflare Pages. É onde a Cloudflare coloca os sites novos, e tem uma opção
que o Pages não tem: `html_handling: "drop-trailing-slash"` entrega `/pt/dicas` a
partir de `pt/dicas/index.html`, sem barra no fim, sem mudar o build do Astro. No
Pages, seria preciso trocar o build para `build.format: 'file'`. Nenhum código
roda no servidor, e no plano gratuito esse tipo de acesso não tem limite.

O que isso significa no projeto:

- **Publicação.** A Cloudflare se liga ao repositório do GitHub e, a cada push no
  `main`, roda `npm run build` e `npx wrangler deploy`. Não há GitHub Action nem
  segredo para cadastrar. O projeto no painel se chama `in-rio-with-olivia`, e o
  `name` do `wrangler.jsonc` é o mesmo. Na publicação pelo GitHub vale o nome do
  painel, mas o `wrangler` rodado localmente usa o do arquivo, e com nomes
  diferentes criaria um segundo projeto. Sem `SITE_URL`, o build usa o domínio
  definitivo. `.node-version` fixa o Node 22. O endereço provisório é
  `in-rio-with-olivia.<conta>.workers.dev`.
- **Regras do servidor.** `wrangler.jsonc` cuida dos endereços sem barra no fim
  (`/pt/dicas/` redireciona para `/pt/dicas`, com status 307) e da página 404.
  `public/_headers` põe o cache de um ano em `/_astro` e os cabeçalhos de
  segurança. Tudo foi testado com `wrangler dev` antes de subir. Duas regras ficam
  no painel da Cloudflare, e não no repositório: `www` para o domínio sem `www`
  (Redirect Rule, porque o arquivo `_redirects` só enxerga o caminho, não o
  domínio) e `http` para `https` (Always Use HTTPS).
- **Formulário.** O Netlify Forms não existe fora da Netlify. O formulário usa o
  Formspree, com o endereço em `FORMULARIO_ENDPOINT`, e o campo escondido contra
  robôs se chama `_gotcha`, o nome que o Formspree reconhece.

O DNS também fica na Cloudflare: os servidores de DNS do domínio, na KingHost,
apontam para ela (`frida.ns.cloudflare.com` e `vicky.ns.cloudflare.com`). O
certificado HTTPS é emitido e renovado pela Cloudflare, e os arquivos saem de
servidores perto do visitante, o que ajuda com um público estrangeiro. A zona DNS
da KingHost deixou de valer: registros novos, como a verificação do Google, vão
na Cloudflare.

O site entrou no ar em `inriowitholivia.com` em 16 de novembro de 2026.

Antes da Cloudflare, chegou a ser preparada a publicação por FTP na hospedagem da
KingHost, com `.htaccess` e GitHub Action. Isso saiu antes de ir para o
repositório. O `netlify.toml` e o `vercel.json` ficaram para o caso de uma troca
futura. O passo a passo da configuração está em `HOSPEDAGEM.md`.

## 12. Plano de execução para o Claude Code

1. Criar o projeto Astro com Tailwind, configurar tokens de cor e fontes
2. Configurar i18n (rotas, arquivos JSON, seletor de idioma)
3. Criar layout base, Header, Footer e botão flutuante do WhatsApp
4. Montar a Home com conteúdo provisório
5. Criar coleções de conteúdo e páginas de Experiências
6. Criar Sobre mim, Inspirações e Contato
7. Aplicar SEO, schema, sitemap e favicon
8. Revisar acessibilidade e responsividade, rodar Lighthouse
9. Substituir textos provisórios pelos textos reais e traduções
10. Publicar na Cloudflare e conectar o domínio .com

Ao final de cada etapa, mostrar o que foi feito e aguardar aprovação antes de seguir.

## 13. Regras de escrita

- Não usar travessão nos textos do site
- Não usar emojis
- Frases curtas, em primeira pessoa quando for a voz da Olivia
- Botões dizem exatamente o que acontece ("Falar no WhatsApp", "Ver experiência")

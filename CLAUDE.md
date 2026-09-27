# In Rio with Olivia: documento de fundação do projeto

Este arquivo é a referência principal do projeto. Leia inteiro antes de escrever qualquer código e siga as decisões aqui registradas. Quando algo não estiver definido, pergunte antes de inventar.

## 1. Visão geral

Site institucional de Olivia, guia de turismo no Rio de Janeiro. O objetivo principal do site é transformar visitantes em conversas no WhatsApp. Objetivos secundários: passar confiança (avaliações do TripAdvisor, Instagram, credenciais) e inspirar o visitante com experiências e ideias de roteiro.

- Domínio: inriowitholivia.com.br (ainda será registrado)
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
- [ ] 3 avaliações escolhidas do TripAdvisor (colar em `src/data/reviews.ts`)
- [x] E-mail de contato
- [ ] Número do Cadastur
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

No painel lateral do celular o seletor continua aberto, com as três opções em
lista (`variante="lista"`), porque ali sobra espaço e um menu dentro do menu
seria um clique a mais.

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

### Nada é inventado

Onde falta informação real, o bloco não aparece, em vez de exibir conteúdo de exemplo:

- Sem número de WhatsApp, nenhum botão de conversa é renderizado
- Sem avaliações reais em `src/data/reviews.ts`, a seção de avaliações e o
  `aggregateRating` do schema.org ficam de fora
- Sem provedor de formulário, o formulário aparece desativado com aviso

O `npm run build` lista o que ainda falta ao terminar.

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
10. Publicar na Vercel ou Netlify e conectar o domínio .com.br

Ao final de cada etapa, mostrar o que foi feito e aguardar aprovação antes de seguir.

## 13. Regras de escrita

- Não usar travessão nos textos do site
- Não usar emojis
- Frases curtas, em primeira pessoa quando for a voz da Olivia
- Botões dizem exatamente o que acontece ("Falar no WhatsApp", "Ver experiência")

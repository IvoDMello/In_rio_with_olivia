# in Rio with Olivia

Site institucional da Olivia, guia de turismo no Rio de Janeiro. Site estático em
Astro, três idiomas, pensado para transformar visita em conversa no WhatsApp.

As decisões de projeto estão em [CLAUDE.md](CLAUDE.md). Este arquivo explica como
rodar, como alimentar o site com fotos e textos, e o que ainda falta.

## Rodar o projeto

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ e avisa o que ainda falta preencher
npm run preview  # serve o dist/ como em produção
npm run check    # verificação de tipos
```

O `npm run build` termina listando as informações que ainda não foram preenchidas.
Vale ler esse aviso antes de publicar.

> **Não use o Live Server do VS Code.** Ele serve arquivos soltos de uma pasta, e o
> Astro precisa montar as páginas antes. Use `npm run dev` e abra
> <http://localhost:4321>.

## As três coisas que você mais vai mexer

### 1. Contatos e links

Tudo em [`src/config/site.ts`](src/config/site.ts). É o único lugar onde esses
dados aparecem.

Quando um campo está vazio, o bloco correspondente **some do site** em vez de virar
um link quebrado. Sem número de WhatsApp, por exemplo, nenhum botão de conversa
aparece em lugar nenhum.

### 2. Fotos

Basta soltar o arquivo na pasta certa com o nome certo. Nenhum código precisa mudar.
Enquanto a foto não existe, aparece um espaço reservado discreto com o símbolo da marca.

| Pasta | Nome do arquivo | Onde aparece |
|---|---|---|
| `src/assets/fotos/` | `hero.jpg` | Foto grande da home |
| `src/assets/fotos/` | `olivia.jpg` | Retrato na home e no Sobre mim |
| `src/assets/fotos/` | `equipe.jpg` | Seção da equipe no Sobre mim |
| `src/assets/places/` | `cristo-redentor.jpg` e os outros ids | Cartões das experiências |
| `src/assets/specials/` | `helicoptero.jpg`, `asa-delta.jpg`, `roxy-dinner-show.jpg`, `favela-tour.jpg` | Experiências especiais |
| `src/assets/dicas/` | nome indicado no `imagem:` do artigo | Capa dos artigos |
| `src/assets/instagram/` | `01.jpg` até `06.jpg` | Faixa do Instagram na home |

Os ids dos lugares estão em [`src/content/lugares.json`](src/content/lugares.json).
Formatos aceitos: jpg, jpeg, png, avif, webp. Envie o arquivo grande, com 2000px de
largura ou mais nas fotos de destaque. O Astro corta, redimensiona e converte para
AVIF e WebP sozinho no build.

### 3. Textos

| O que | Onde |
|---|---|
| Textos de interface e das páginas | `src/i18n/en.json`, `pt.json`, `es.json` |
| Lugares do roteiro | `src/content/lugares.json` |
| Experiências especiais | `src/content/especiais.json` |
| Artigos do blog | `src/content/dicas/<idioma>/<slug>.md` |
| Avaliações do TripAdvisor | `src/data/reviews.ts` |

Os três arquivos de idioma têm exatamente a mesma estrutura de chaves. Ao mexer em um,
mexa nos três.

## Como o site está organizado

```
/                        detecta o idioma e redireciona
/en  /pt  /es            home de cada idioma
/en/about         /pt/sobre         /es/sobre-mi
/en/experiences   /pt/experiencias  /es/experiencias
/en/tips          /pt/dicas         /es/consejos
/en/contact       /pt/contato       /es/contacto
```

O mapa de rotas fica em [`src/i18n/config.ts`](src/i18n/config.ts), no objeto `SECOES`.
É a única fonte de verdade: o menu, o seletor de idioma, as tags `hreflang` e o rodapé
saem todos dele. Para mudar um endereço, mude ali e crie o arquivo correspondente em
`src/pages/<idioma>/`.

Cada arquivo em `src/pages/` tem três linhas e só define endereço e idioma. O conteúdo
de verdade está em `src/paginas/`, compartilhado pelos três idiomas.

### Artigos em três idiomas

Cada artigo existe uma vez por idioma, com slug traduzido. O campo `chave:` no
frontmatter é igual nas três versões, e é isso que permite ao seletor de idioma pular
de `/pt/dicas/rio-em-3-dias` para `/en/tips/rio-in-3-days` sem sair do artigo.

Um artigo que ainda não foi traduzido simplesmente não aparece naquele idioma, e o
`hreflang` não aponta para uma página inexistente.

## Preços

O site não exibe valor em lugar nenhum, de propósito. As experiências mostram
"Valor sob consulta" e o botão abre o WhatsApp com a mensagem já escrita pedindo
orçamento. Não existe campo de preço no modelo de dados, nem `offers` com valor nos
dados estruturados.

## Publicar

O site vai para a Netlify, com o domínio `inriowitholivia.com` registrado na
Cloudflare. O [`vercel.json`](vercel.json) continua no repositório caso um dia
seja preciso trocar de serviço, mas o arquivo que vale é o [`netlify.toml`](netlify.toml).

1. Suba o repositório para o GitHub
2. Na Netlify, importe o repositório (build `npm run build`, pasta `dist`)
3. Em **Domain management**, adicione `inriowitholivia.com`
4. Na Cloudflare, crie os registros de DNS que a Netlify indicar, com a nuvem
   cinza (DNS only), para a Netlify emitir o certificado HTTPS
5. Confira se `SITE.url` em `src/config/site.ts` bate com o domínio final. Na
   Netlify ele vem sozinho do endereço principal do site

O formulário de contato precisa de um dos dois:

- **Netlify**: funciona sozinho, o atributo `data-netlify` já está no formulário
- **Vercel**: crie um formulário no Formspree e cole o endereço em `FORMULARIO_ENDPOINT`

Enquanto nenhum dos dois estiver ativo, o formulário aparece desativado com um aviso
apontando para o WhatsApp, em vez de fingir que enviou.

## Qualidade verificada

Medido com o site construído, em emulação de celular:

- Lighthouse 100 em Performance, Acessibilidade, Boas práticas e SEO nas páginas
  home, experiências, artigo e contato
- axe-core sem nenhuma violação (WCAG 2.1 AA) em 8 páginas, no celular e no desktop
- Sem rolagem horizontal de 360px para cima
- Sem erro de JavaScript no console

A nota de performance vai cair um pouco quando as fotos reais entrarem. O componente
`<Picture />` já está configurado para emitir AVIF, depois WebP, com jpg como último
recurso, além de `srcset` por largura e carregamento preguiçoso, para segurar o
número alto.

Para medir de novo depois de adicionar as fotos, rode `npm run build && npm run preview`
e passe o Lighthouse em `http://localhost:4321/pt`.

## Ainda falta

- [ ] E-mail de contato
- [ ] Número do Cadastur
- [ ] Confirmar os idiomas que a Olivia e a equipe falam (hoje: português, inglês, espanhol)
- [ ] Escolher 3 avaliações do TripAdvisor e colar em `src/data/reviews.ts`
- [ ] Fotos em alta resolução
- [ ] Revisão dos textos pela Olivia, principalmente as respostas sobre pagamento e
      cancelamento em `src/i18n/*.json`, que foram escritas como rascunho
- [ ] Converter os textos dos SVGs em `public/brand/` para contornos antes de distribuir
      os arquivos fora do site. Dentro do site a logo é desenhada em SVG embutido e já
      usa a fonte correta.
- [ ] Analytics (Plausible ou GA4). Os links de conversão já têm atributos
      `data-analytics` prontos para virar eventos.

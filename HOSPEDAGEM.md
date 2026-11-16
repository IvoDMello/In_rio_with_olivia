# Hospedagem na Cloudflare

Passo a passo para colocar o site no ar em `inriowitholivia.com`. O domínio já
está registrado na KingHost (desde 16/11/2026). O site fica na Cloudflare, no
plano gratuito, que não pede cartão. **Não é preciso contratar a hospedagem da
KingHost.**

Siga na ordem. O site é publicado primeiro num endereço provisório da
Cloudflare, e o domínio só passa a apontar para ele depois, quando já está tudo
pronto.

## Como o site fica no ar

- **GitHub** guarda o código.
- **Cloudflare** monta o site a cada push no `main`, publica e entrega aos
  visitantes a partir de servidores no mundo todo. Também cuida do DNS e do
  cadeado do HTTPS. As regras do site (endereços sem barra no fim, página 404,
  cache) ficam em [`wrangler.jsonc`](wrangler.jsonc) e
  [`public/_headers`](public/_headers).
- **KingHost** guarda só o registro do domínio, que se renova uma vez por ano.
- **Formspree** recebe o formulário de contato e manda por e-mail para a Olivia.

## O que ter em mãos

- O e-mail da Olivia, para criar a conta da Cloudflare e a do Formspree. As
  contas são dela.
- Acesso à conta do GitHub dona do repositório (`IvoDMello/In_rio_with_olivia`),
  para autorizar a Cloudflare a ler o código.
- Acesso ao [painel da KingHost](https://painel.kinghost.com.br), onde o domínio
  está registrado.

## Ordem dos passos

1. Criar a conta na Cloudflare
2. Ligar o GitHub e fazer a primeira publicação
3. Conferir no endereço provisório
4. Criar o formulário no Formspree
5. Adicionar o domínio na Cloudflare
6. Trocar os servidores de DNS na KingHost
7. Apagar os registros antigos
8. Ligar o domínio ao site
9. Configurar o `www` e o HTTPS
10. Conferir
11. Ligar a renovação do domínio
12. Avisar o Google

Os nomes dos botões vêm da documentação da Cloudflare e podem mudar um pouco com
o tempo. O que importa são os valores indicados em cada passo.

---

## 1. Criar a conta na Cloudflare

Em [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up), crie a
conta com o e-mail da Olivia e confirme pelo link que chega no e-mail. Nenhum
passo deste guia pede cartão. Se alguma tela pedir, é porque um plano pago foi
escolhido por engano: volte e escolha o **Free**.

## 2. Ligar o GitHub e fazer a primeira publicação

1. No menu lateral, abra **Workers & Pages** e clique em **Create application**.
2. Escolha **GitHub**. A Cloudflare abre o GitHub para você autorizar o acesso.
   Entre com a conta dona do repositório e libere o repositório
   `In_rio_with_olivia`.
3. De volta à Cloudflare, escolha o repositório e preencha:

| Campo | Valor |
|---|---|
| Nome do projeto (Project name / Worker name) | `inriowitholivia` |
| Branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (é o padrão) |
| Root directory | deixe em branco |

O nome precisa ser exatamente `inriowitholivia`, igual ao `name` do
[`wrangler.jsonc`](wrangler.jsonc). Com outro nome, a publicação falha.

4. Clique em **Save and Deploy** (ou **Create and deploy**). A primeira
   publicação leva alguns minutos, porque prepara todas as fotos.

Daqui em diante, cada push no `main` publica sozinho. Não há segredo nem senha
para cadastrar no GitHub.

## 3. Conferir no endereço provisório

Quando a publicação terminar, a Cloudflare mostra um endereço do tipo
`https://inriowitholivia.<nome-da-conta>.workers.dev`. Abra e confira se o site
aparece em inglês, se o seletor de idioma funciona e se as fotos carregam.

Esse endereço continua funcionando depois que o domínio estiver ligado. Ele não
atrapalha o Google, porque todas as páginas indicam `inriowitholivia.com` como
endereço oficial.

## 4. Criar o formulário no Formspree

A Cloudflare não recebe formulários. O Formspree recebe as mensagens e manda por
e-mail.

1. Em [formspree.io](https://formspree.io), crie uma conta **com o e-mail da
   Olivia**. É para esse e-mail que as mensagens vão.
2. Crie um formulário novo (**New form**) chamado "Contato do site".
3. Copie o endereço dele, no formato `https://formspree.io/f/xxxxxxxx`.
4. Cole em `FORMULARIO_ENDPOINT`, em [`src/config/site.ts`](src/config/site.ts), e
   faça o commit. (Ou mande o endereço para o Claude fazer isso.) O push publica
   sozinho.

No primeiro envio, o Formspree manda um e-mail pedindo para confirmar o
formulário. A Olivia precisa clicar no link, senão as mensagens não chegam.

Depois de enviar, o visitante vê uma página de confirmação do Formspree com um
link para voltar ao site. O plano gratuito tem um limite mensal de envios, que
aparece no painel do Formspree.

## 5. Adicionar o domínio na Cloudflare

1. Na página inicial da Cloudflare, clique em **Add a domain** (ou **Onboard a
   domain**) e digite `inriowitholivia.com`.
2. Deixe marcada a opção de buscar os registros de DNS existentes (**Quick
   scan**) e continue.
3. Na escolha de plano, desça até o fim e escolha **Free**.
4. A Cloudflare mostra os registros que encontrou. Continue sem mexer: eles são
   limpos no passo 7.
5. No fim, ela mostra **dois servidores de DNS**, parecidos com
   `nome1.ns.cloudflare.com` e `nome2.ns.cloudflare.com`. Anote os dois exatamente
   como aparecem.

Se a Cloudflare avisar sobre **DNSSEC**, desligue o DNSSEC do domínio na KingHost
antes do passo 6. Com ele ligado, o domínio para de responder depois da troca.

## 6. Trocar os servidores de DNS na KingHost

No painel da KingHost, abra **Gerenciar Registro de Domínios**, escolha o
`inriowitholivia.com` e procure a opção de alterar os servidores de DNS. Apague
os da KingHost (`dns1.kinghost.com.br` e os seguintes) e coloque só os dois da
Cloudflare. Salve.

Se a opção não aparecer, peça ao suporte da KingHost:

> Quero alterar os servidores de DNS do domínio inriowitholivia.com, registrado
> nesta conta, para estes dois: `nome1.ns.cloudflare.com` e
> `nome2.ns.cloudflare.com`.

(Troque pelos nomes anotados no passo 5.)

A troca leva de 2 a 24 horas para valer. Não há nada no ar no domínio ainda,
então ninguém perde nada nesse meio-tempo. A Cloudflare manda um e-mail quando o
domínio fica **Active**. Para conferir antes, abra o domínio na Cloudflare e
clique em **Check nameservers**.

## 7. Apagar os registros antigos

Com o domínio **Active**, abra **DNS → Records** na Cloudflare. Apague os
registros do tipo **A**, **AAAA** ou **CNAME** que tenham o nome
`inriowitholivia.com` (às vezes aparece como `@`) ou `www`. Eles vieram da
KingHost e apontam para um servidor que não tem o site.

Os registros MX e TXT podem ficar: não atrapalham. O e-mail da Olivia é um Gmail
e não depende deles.

## 8. Ligar o domínio ao site

1. Em **Workers & Pages**, abra o `inriowitholivia`.
2. Vá em **Settings → Domains & Routes → Add → Custom Domain**.
3. Digite `inriowitholivia.com` e clique em **Add Custom Domain**.

A Cloudflare cria o registro de DNS e o certificado HTTPS sozinha. Em alguns
minutos, `https://inriowitholivia.com` abre o site com cadeado.

Se ela recusar, é porque ainda existe um registro antigo com esse nome: volte ao
passo 7.

## 9. Configurar o `www` e o HTTPS

**O `www` leva para o domínio sem `www`:**

1. Em **DNS → Records**, clique em **Add record** e crie:

| Type | Name | Target | Proxy status |
|---|---|---|---|
| CNAME | `www` | `inriowitholivia.com` | **Proxied** (nuvem laranja) |

2. Em **Rules**, crie uma regra a partir do modelo **Redirect from WWW to root**
   (fica na lista de modelos, **Templates**) e salve com **Deploy**.

Se o modelo não aparecer, crie uma **Redirect Rule** à mão: quando o
**Hostname** for igual a `www.inriowitholivia.com`, redirecionar (tipo
**Dynamic**) para a expressão
`concat("https://inriowitholivia.com", http.request.uri.path)`, com o código
**301** e a opção **Preserve query string** ligada.

**Todo acesso vai para `https`:** em **SSL/TLS → Edge Certificates**, ligue
**Always Use HTTPS**.

## 10. Conferir

| Abra | O certo |
|---|---|
| `https://inriowitholivia.com` | Abre o site em inglês, em `/en`, com cadeado |
| `http://inriowitholivia.com` | Vai sozinho para `https://` |
| `https://www.inriowitholivia.com/pt/dicas` | Vai para `https://inriowitholivia.com/pt/dicas` |
| `https://inriowitholivia.com/pt/dicas/` | Tira a barra do fim: `/pt/dicas` |
| `https://inriowitholivia.com/qualquer-coisa` | Página "Page not found" do próprio site |
| `https://inriowitholivia.com/robots.txt` | `Allow: /` e a linha `Sitemap:` |
| Página de Contato | Enviar uma mensagem de teste e ver se chega no e-mail da Olivia |

Teste também no celular, fora do Wi-Fi.

## 11. Ligar a renovação do domínio

O domínio vence em 16/11/2027. Sem renovação, o site sai do ar e o endereço fica
livre para qualquer pessoa registrar.

No painel da KingHost, em **Gerenciar Registro de Domínios**, ligue a
**renovação automática** no menu de três pontos ao lado do domínio. Se a opção
não aparecer, peça ao suporte. Confira também que a titular do domínio é a
Olivia.

## 12. Avisar o Google

1. No [Google Search Console](https://search.google.com/search-console), adicione
   uma propriedade do tipo **Domínio** com `inriowitholivia.com`.
2. Para verificar, crie na Cloudflare, em **DNS → Records**, o registro TXT que o
   Google mostrar, com o nome `@`. A verificação pode levar algumas horas.
3. Em **Sitemaps**, envie `sitemap-index.xml`.

---

## No dia a dia

- **Publicar:** push no `main`. Em poucos minutos o site está atualizado. O plano
  gratuito permite muito mais publicações do que o site vai precisar.
- **Ver se deu certo:** na Cloudflare, em **Workers & Pages → inriowitholivia**,
  a lista de builds mostra cada publicação, com o registro completo quando
  alguma falha.
- **Testar uma mudança sem publicar:** um push em outro branch que não o `main`
  gera um endereço de prévia na Cloudflare, sem mexer no site no ar.
- **Ver localmente como a Cloudflare entrega o site:** `npm run build` e depois
  `npx wrangler dev`.
- **Trocou um arquivo de `/public` mantendo o mesmo nome** (a imagem de
  compartilhamento, o logo, o favicon)? O WhatsApp e o Facebook guardam a imagem
  de compartilhamento por dias. Para a troca valer na hora, dê outro nome ao
  arquivo. As fotos de `src/assets` mudam de nome a cada troca e não têm esse
  problema.
- **Custos:** só a renovação anual do domínio na KingHost, todo 16 de novembro.
  A Cloudflare, o certificado HTTPS e o Formspree gratuito não custam nada.

## Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Publicação falha falando do nome do Worker | O nome do projeto na Cloudflare não é `inriowitholivia` | Use o mesmo nome do `wrangler.jsonc`, ver passo 2 |
| Publicação falha durante o build | Erro no código ou numa foto | Copie o registro da publicação que falhou e traga para o Claude |
| Domínio fica em **Pending** por mais de um dia | Servidores de DNS não trocados, ou DNSSEC ligado | Passos 5 e 6 |
| **Add Custom Domain** recusa o domínio | Sobrou um registro A, AAAA ou CNAME com o mesmo nome | Passo 7 |
| `www.inriowitholivia.com` não abre ou não redireciona | Falta o registro `www` com nuvem laranja, ou a regra | Passo 9 |
| `http://` não vai para `https://` | Always Use HTTPS desligado | Passo 9 |
| O domínio para de abrir o site depois de uma publicação | A publicação desfez a ligação do passo 8 | Ligue de novo e peça ao Claude para declarar o domínio no `wrangler.jsonc` (a linha já está pronta lá, comentada) |
| Formulário aparece desativado, com aviso | `FORMULARIO_ENDPOINT` vazio | Passo 4 |
| Mensagens do formulário não chegam | Formulário não confirmado no Formspree | Procure o e-mail de confirmação do Formspree, inclusive no spam |

## Arquivos envolvidos

- [`wrangler.jsonc`](wrangler.jsonc): nome do projeto, pasta publicada, endereços
  sem barra no fim e página 404
- [`public/_headers`](public/_headers): cache longo em `/_astro` e cabeçalhos de
  segurança
- [`.node-version`](.node-version): versão do Node usada no build da Cloudflare
- [`src/config/site.ts`](src/config/site.ts): `FORMULARIO_ENDPOINT` e o domínio
  definitivo
- [`netlify.toml`](netlify.toml) e [`vercel.json`](vercel.json): ficam para o caso
  de uma troca de serviço. Não têm efeito na Cloudflare

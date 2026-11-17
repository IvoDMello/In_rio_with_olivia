# Hospedagem na Cloudflare

Passo a passo para colocar o site no ar em `inriowitholivia.com`. O domínio já
está registrado na KingHost (desde 16/11/2026). O site fica na Cloudflare, no
plano gratuito, que não pede cartão. **Não é preciso contratar a hospedagem da
KingHost.**

O site entrou no ar assim em 16/11/2026. Os nomes dos botões abaixo são os do
painel em português naquela data.

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
7. Conferir os registros
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
| Nome do projeto (Project name / Worker name) | `in-rio-with-olivia` |
| Branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (é o padrão) |
| Root directory | deixe em branco |

O projeto foi criado em novembro de 2026 com o nome `in-rio-with-olivia`, que é
também o `name` do [`wrangler.jsonc`](wrangler.jsonc). Se um dia for recriado,
mantenha os dois iguais.

4. Clique em **Save and Deploy** (ou **Create and deploy**). A primeira
   publicação leva alguns minutos, porque prepara todas as fotos.

Daqui em diante, cada push no `main` publica sozinho. Não há segredo nem senha
para cadastrar no GitHub.

## 3. Conferir no endereço provisório

Quando a publicação terminar, a Cloudflare mostra um endereço do tipo
`https://in-rio-with-olivia.<nome-da-conta>.workers.dev`. Abra e confira se o site
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

Aqui o domínio não é comprado de novo: ele continua registrado e pago na
KingHost. A Cloudflare só passa a cuidar do DNS.

1. Na página inicial da Cloudflare, em **Adicionar domínio**, escolha **Conectar
   um domínio**. Não escolha **Transferir** nem **Comprar**.
2. Em **Nome do domínio**, digite `inriowitholivia.com`, sem `www`.
3. Em **Monetizo páginas que exibem anúncios**, deixe desmarcado. Nas políticas
   de IA, **Pesquisa** precisa ficar em **Permitir**, porque é o que deixa o
   Google encontrar o site. Treinamento e agentes ficaram em Permitir; dá para
   mudar depois sem afetar o Google.
4. Em **Importar registros DNS**, deixe **Automático** e continue.
5. Na escolha de plano, desça até o fim e escolha **Free**.
6. Na lista de registros encontrados, exclua os que apontam para o servidor da
   KingHost com o nome do domínio: os do tipo **A** e **AAAA** com o nome
   `inriowitholivia.com` e o **A** com o nome `www`. O resto (`ftp`, os CNAME de
   e-mail, os MX e o TXT) pode ficar: não atrapalha, e o e-mail da Olivia é um
   Gmail.
7. Clique em **Continue para ativação**. A Cloudflare mostra **dois servidores de
   DNS**. Os deste domínio são `frida.ns.cloudflare.com` e
   `vicky.ns.cloudflare.com`.

A tela diz que o registrador é a **Enom**: é a empresa que a KingHost usa por
trás para registrar domínios `.com`. A troca é feita no painel da KingHost.

Os avisos de **DNSSEC** e de **permitir apenas IPs da Cloudflare na origem**
podem ser ignorados. O painel da KingHost não tem DNSSEC ligado para este
domínio, e o site não tem servidor próprio por trás da Cloudflare.

## 6. Trocar os servidores de DNS na KingHost

1. No painel da KingHost, em **Meus planos e serviços contratados**, abra
   **Registro de Domínio**.
2. No menu de três pontos ao lado do `inriowitholivia.com`, escolha **Gerenciar
   DNS**. Na tela do domínio, clique de novo em **Gerenciar DNS**.
3. Abra a aba **Alterar servidor principal**. Não mexa na aba **Alterar zona
   DNS**: depois da troca, ela deixa de valer.
4. Troque o Servidor 1 por `frida.ns.cloudflare.com` e o Servidor 2 por
   `vicky.ns.cloudflare.com`. Remova os servidores 3 a 6 pela lixeira, que
   aparece sempre no último. A KingHost recomenda 6 servidores, mas isso vale
   para quem usa o DNS dela.
5. Clique em **Salvar alterações**.
6. Volte à Cloudflare e clique em **Atualizei meus nameservers**.

Se a opção não aparecer, peça ao suporte da KingHost:

> Quero alterar os servidores de DNS do domínio inriowitholivia.com, registrado
> nesta conta, para estes dois: frida.ns.cloudflare.com e
> vicky.ns.cloudflare.com. Os servidores dns1 a dns6.kinghost.com.br devem ser
> removidos.

A KingHost avisa que a troca pode levar até 24 horas. Em novembro de 2026 ela
valeu em minutos. Na Cloudflare, **Verificar nameservers agora** força a
conferência, e o domínio passa a aparecer como **Ativo** em **Domínios**.

## 7. Conferir os registros

Se algum registro **A**, **AAAA** ou **CNAME** com o nome `inriowitholivia.com`
ou `www` tiver ficado para trás no passo 5, apague agora, em **Domínios →
inriowitholivia.com → DNS → Registros**. O passo 8 recusa o domínio enquanto
houver um.

## 8. Ligar o domínio ao site

1. Em **Computação → Workers e Pages**, abra o `in-rio-with-olivia`. O atalho é
   digitar o nome na **Pesquisa rápida**.
2. Na aba **Domínios**, clique em **Adicionar domínio**. Não use **Adicionar
   rota**, que exige configurar o DNS à mão.
3. Deixe o **Subdomínio** vazio (vazio quer dizer o próprio
   `inriowitholivia.com`), com **Habilitar para: Produção**, e clique em
   **Adicionar domínio**.

A Cloudflare cria o registro de DNS e o certificado HTTPS sozinha. Em alguns
minutos, `https://inriowitholivia.com` abre o site com cadeado.

## 9. Configurar o `www` e o HTTPS

Tudo neste passo fica no menu do domínio: **Domínios → inriowitholivia.com**.
Nada aqui é feito na KingHost.

**O `www` leva para o domínio sem `www`:**

1. Em **DNS → Registros**, clique em **Adicionar registro** e crie:

| Tipo | Nome | Destino | Status do proxy |
|---|---|---|---|
| CNAME | `www` | `inriowitholivia.com` | **Com proxy** (nuvem laranja) |

   Logo depois disso, `www.inriowitholivia.com` mostra o **erro 522** da
   Cloudflare. É esperado: some quando a regra abaixo é criada.

2. Em **Regras**, nos **Modelos de regra**, escolha **Redirecionar de WWW para a
   raiz** e clique em **Criar a partir do modelo**. Cuidado para não escolher
   **Redirecionar da raiz para WWW**, que faz o contrário.
3. O formulário já vem certo (`https://www.*` para `https://${1}`, com **301**).
   Marque só **Preservar string de consulta**, para links com marcação de origem
   (`?utm_source=instagram`) chegarem inteiros, e clique em **Implantar**.
4. A Cloudflare avisa que a regra pode não se aplicar, porque o `www` não estaria
   com proxy. É um alarme falso, porque o modelo não escreve o nome do domínio.
   Escolha **Ignorar e implantar regra mesmo assim**. Não crie outro registro.

**Todo acesso vai para `https`:** em **SSL/TLS → Certificados de borda**, ligue
**Sempre usar HTTPS**. Usar a chave é melhor do que o modelo de regra
**Redirecionar de HTTP para HTTPS**, porque não ocupa uma regra.

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

Teste também no celular, fora do Wi-Fi. O Chrome esconde o `www` na barra de
endereço: para saber qual endereço abriu, clique na barra.

## 11. Ligar a renovação do domínio

O domínio vence em 16/11/2027. Sem renovação, o site sai do ar e o endereço fica
livre para qualquer pessoa registrar.

O menu de três pontos do domínio, em **Registro de Domínio**, só tem **Gerenciar
DNS**, **Ver dados registro** e **Transferir domínio**: a renovação automática
não está ali. Procure em **Ver todas as assinaturas** ou em **Financeiro** e, se
não houver, peça ao suporte para ligar a renovação automática do
`inriowitholivia.com`. Em **Ver dados registro**, confira que a titular é a
Olivia.

Uma alternativa, a partir de 15/01/2027 (60 dias depois do registro, o prazo
mínimo das regras de domínio), é transferir o registro para a Cloudflare, em
**Domínios → Transferências**. Ela cobra o preço de custo na renovação, e o
domínio passa a ficar todo num lugar só. Não é necessário para o site funcionar.

## 12. Avisar o Google

1. No [Google Search Console](https://search.google.com/search-console), adicione
   uma propriedade do tipo **Domínio** com `inriowitholivia.com`.
2. Para verificar, crie na Cloudflare, em **DNS → Registros**, o registro TXT que o
   Google mostrar, com o nome `@`. A verificação pode levar algumas horas.
3. Em **Sitemaps**, envie `sitemap-index.xml`.

---

## No dia a dia

- **Publicar:** push no `main`. Em poucos minutos o site está atualizado. O plano
  gratuito permite muito mais publicações do que o site vai precisar.
- **Ver se deu certo:** na Cloudflare, em **Workers & Pages → in-rio-with-olivia**,
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

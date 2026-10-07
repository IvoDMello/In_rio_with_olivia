/**
 * Ponto unico de configuracao do site.
 *
 * ATENCAO: os campos marcados com PENDENTE ainda nao foram informados pela
 * Olivia. Enquanto estiverem assim, o site funciona normalmente, mas os links
 * correspondentes ficam desativados (o componente esconde o link em vez de
 * apontar para um endereco errado). Troque aqui e vale para o site inteiro.
 */

/** Endereco definitivo, depois que o dominio estiver registrado e apontado. */
const DOMINIO_FINAL = 'https://inriowitholivia.com';

/**
 * Descobre o endereco do site no momento do build.
 *
 * Ordem: SITE_URL definido a mao, depois o endereco principal que a
 * Netlify fornece (o dominio proprio, quando estiver conectado, ou o
 * .netlify.app antes disso), depois o da Vercel, depois o dominio
 * definitivo. Sem isso, um deploy de validacao geraria URLs canonicas,
 * sitemap e imagens de compartilhamento apontando para um dominio que
 * ainda nao existe.
 */
function enderecoDoSite(): string {
  const env =
    typeof process !== 'undefined'
      ? (process.env as Record<string, string | undefined>)
      : {};

  if (env['SITE_URL']) return env['SITE_URL'].replace(/\/+$/, '');

  if (env['NETLIFY'] && env['URL']) return env['URL'].replace(/\/+$/, '');

  const vercel = env['VERCEL_PROJECT_PRODUCTION_URL'] ?? env['VERCEL_URL'];
  if (vercel) return `https://${vercel}`;

  return DOMINIO_FINAL;
}

export const SITE = {
  url: enderecoDoSite(),
  nome: 'in Rio with Olivia',
  autora: 'Olivia',

  /**
   * Anos de experiencia, arredondados para baixo de proposito.
   * Os textos do site dizem "mais de 20 anos", que continua verdadeiro sem
   * precisar de revisao a cada aniversario de carreira.
   */
  anosDeExperiencia: 20,

  /** Ano em que a Olivia comecou a guiar. Vai no foundingDate do schema.org. */
  anoDeInicio: 2004,
} as const;

/**
 * Verdadeiro so quando o build esta rodando no dominio definitivo.
 *
 * Fora dele, o site inteiro sai com noindex e o robots.txt bloqueia tudo.
 * Um deploy de validacao indexado pelo Google competiria com o site real
 * pelos mesmos termos de busca, e isso e dificil de desfazer depois.
 */
export const E_DOMINIO_FINAL = SITE.url === DOMINIO_FINAL;

/**
 * Contatos e perfis. Deixe a string vazia enquanto o dado nao existir.
 *
 * O tipo e declarado a parte de proposito: com `as const`, uma string vazia
 * viraria o tipo literal '' e o TypeScript passaria a tratar todo `if (email)`
 * como sempre falso, apagando os blocos que dependem dele.
 */
type Contatos = {
  whatsapp: string;
  instagram: string;
  tripadvisor: string;
  email: string;
  cadastur: string;
};

export const CONTATO: Contatos = {
  /** Somente digitos, com codigo do pais. */
  whatsapp: '5521979584976',

  /** URL completa do perfil. */
  instagram: 'https://www.instagram.com/in_rio_with_olivia',

  /** URL completa da pagina no TripAdvisor. */
  tripadvisor:
    'https://www.tripadvisor.com.br/Attraction_Review-g303506-d4294013-Reviews-PrivateTourGuideinRio_Tours-Rio_de_Janeiro_State_of_Rio_de_Janeiro.html',

  /** E-mail de contato. */
  email: 'privatetourguideoliviaalves@gmail.com',

  /** Numero do Cadastur, exibido no rodape e nas credenciais de Como eu trabalho. */
  cadastur: '19.385243.50-7',
};

/**
 * Idiomas em que a Olivia e a equipe atendem nos passeios.
 *
 * Nao confundir com os idiomas do site (src/i18n/config.ts), que sao tres.
 * Aqui a lista e maior porque a equipe cobre mais idiomas do que as versoes
 * traduzidas do site. Os nomes de cada idioma ficam nos arquivos de i18n,
 * em `idiomasFalados`.
 */
export const IDIOMAS_FALADOS = ['pt', 'en', 'es', 'fr', 'it'] as const;

export type IdiomaFalado = (typeof IDIOMAS_FALADOS)[number];

/** Codigo BCP 47 de cada idioma falado, para o schema.org. */
export const TAG_IDIOMA_FALADO: Record<IdiomaFalado, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
  fr: 'fr',
  it: 'it',
};

/** Ligar somente quando houver avaliacoes reais em src/data/reviews.ts. */
export const RECURSOS = {
  /** Faixa de fotos do Instagram na home. */
  instagram: true,
  /** Secao de avaliacoes. Fica oculta enquanto reviews.ts estiver vazio. */
  avaliacoes: true,
  /** Formulario de contato. Exige provedor (Formspree ou Netlify Forms). */
  formulario: true,
} as const;

/**
 * Endpoint do formulario de contato.
 * Formspree: 'https://formspree.io/f/XXXXXXXX'
 * Netlify Forms: deixe vazio e o atributo data-netlify cuida do envio.
 * PENDENTE
 */
export const FORMULARIO_ENDPOINT: string = '';

/** Monta um link wa.me com mensagem ja preenchida. */
export function linkWhatsApp(mensagem: string): string {
  if (!CONTATO.whatsapp) return '';
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Numero formatado para leitura humana, ex.: +55 21 99999-9999. */
export function whatsappLegivel(): string {
  const d = CONTATO.whatsapp;
  if (d.length < 12) return '';
  const pais = d.slice(0, 2);
  const ddd = d.slice(2, 4);
  const resto = d.slice(4);
  const meio = resto.length > 8 ? resto.slice(0, 5) : resto.slice(0, 4);
  const fim = resto.length > 8 ? resto.slice(5) : resto.slice(4);
  return `+${pais} ${ddd} ${meio}-${fim}`;
}

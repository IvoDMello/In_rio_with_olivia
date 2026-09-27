import en from './en.json';
import pt from './pt.json';
import es from './es.json';

export const IDIOMAS = ['en', 'pt', 'es'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_PADRAO: Idioma = 'en';

/**
 * Nome do idioma no proprio idioma. E o rotulo visivel do seletor, ao lado da
 * bandeira, e tambem o texto acessivel de cada opcao. Com acento, porque e
 * texto de interface e nao comentario de codigo.
 */
export const NOME_IDIOMA: Record<Idioma, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

/** Valor da tag lang e do hreflang. */
export const TAG_HREFLANG: Record<Idioma, string> = {
  en: 'en',
  pt: 'pt-BR',
  es: 'es',
};

/** Locale usado para formatar datas. */
export const LOCALE_DATA: Record<Idioma, string> = {
  en: 'en-US',
  pt: 'pt-BR',
  es: 'es-ES',
};

const DICIONARIOS = { en, pt, es } as const;

export type Dicionario = typeof en;

/** Devolve o dicionario completo de um idioma, ja tipado pelo de referencia. */
export function dicionario(lang: Idioma): Dicionario {
  return DICIONARIOS[lang] as Dicionario;
}

/**
 * Secoes do site e o slug de cada uma por idioma.
 * Este mapa e a unica fonte de verdade das rotas: o menu, o seletor de idioma,
 * o hreflang e o sitemap todos saem daqui.
 */
export const SECOES = {
  home: { en: '', pt: '', es: '' },
  comoTrabalho: { en: 'how-i-work', pt: 'como-trabalho', es: 'como-trabajo' },
  experiencias: { en: 'experiences', pt: 'experiencias', es: 'experiencias' },
  dicas: { en: 'tips', pt: 'dicas', es: 'consejos' },
  contato: { en: 'contact', pt: 'contato', es: 'contacto' },
} as const satisfies Record<string, Record<Idioma, string>>;

export type Secao = keyof typeof SECOES;

/** Secoes que aparecem no menu, na ordem. */
export const MENU: Secao[] = ['home', 'comoTrabalho', 'experiencias', 'dicas', 'contato'];

/** Caminho absoluto de uma secao em um idioma. Ex.: rota('contato', 'pt') -> /pt/contato */
export function rota(secao: Secao, lang: Idioma): string {
  const slug = SECOES[secao][lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

/** Caminho de um artigo do blog de dicas. */
export function rotaArtigo(slug: string, lang: Idioma): string {
  return `${rota('dicas', lang)}/${slug}`;
}

/**
 * Descobre qual secao esta ativa a partir do caminho da URL.
 * Usado para marcar o item de menu e para o seletor de idioma trocar de rota
 * mantendo a mesma pagina.
 */
export function secaoDoCaminho(pathname: string): Secao | null {
  const partes = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const lang = partes[0] as Idioma;
  if (!IDIOMAS.includes(lang)) return null;

  const slug = partes[1] ?? '';
  for (const secao of Object.keys(SECOES) as Secao[]) {
    if (SECOES[secao][lang] === slug) return secao;
  }
  return null;
}

/** Idioma de um caminho, ou o padrao quando nao houver prefixo. */
export function idiomaDoCaminho(pathname: string): Idioma {
  const primeiro = pathname.replace(/^\/+/, '').split('/')[0] as Idioma;
  return IDIOMAS.includes(primeiro) ? primeiro : IDIOMA_PADRAO;
}

/**
 * Equivalente de uma URL em outro idioma, preservando a pagina atual.
 * Os artigos de dicas usam o mesmo slug nos tres idiomas, entao a traducao
 * do caminho funciona tambem para eles.
 */
export function traduzirCaminho(pathname: string, destino: Idioma): string {
  const partes = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const origem = partes[0] as Idioma;
  if (!IDIOMAS.includes(origem)) return `/${destino}`;

  const secao = secaoDoCaminho(pathname);
  if (!secao) return `/${destino}`;

  const base = rota(secao, destino);
  const cauda = partes.slice(2);
  return cauda.length ? `${base}/${cauda.join('/')}` : base;
}

/** Todas as versoes de idioma de um caminho, para as tags hreflang. */
export function alternativas(pathname: string): { lang: Idioma; href: string }[] {
  return IDIOMAS.map((lang) => ({ lang, href: traduzirCaminho(pathname, lang) }));
}

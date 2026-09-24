import { getCollection, type CollectionEntry } from 'astro:content';
import { IDIOMAS, rotaArtigo, type Idioma } from '~/i18n/config';

export type Artigo = CollectionEntry<'dicas'>;

/** O id de uma entrada e '<idioma>/<slug>'. Esta funcao separa as duas partes. */
export function partes(artigo: Artigo): { lang: Idioma; slug: string } {
  const [lang, ...resto] = artigo.id.split('/');
  return { lang: lang as Idioma, slug: resto.join('/') };
}

/** Artigos publicados de um idioma, do mais recente para o mais antigo. */
export async function artigosDe(lang: Idioma): Promise<Artigo[]> {
  const todos = await getCollection('dicas', ({ data }) => !data.rascunho);
  return todos
    .filter((artigo) => partes(artigo).lang === lang)
    .sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** Todos os artigos publicados, usados pelos getStaticPaths. */
export async function todosOsArtigos(): Promise<Artigo[]> {
  return getCollection('dicas', ({ data }) => !data.rascunho);
}

/**
 * Enderecos de um artigo em cada idioma, a partir da chave de traducao.
 * Quando um idioma ainda nao tem a versao traduzida, ele simplesmente nao
 * aparece na lista, e o hreflang nao aponta para uma pagina inexistente.
 */
export async function alternativasDoArtigo(
  chave: string,
): Promise<{ lang: Idioma; href: string }[]> {
  const todos = await todosOsArtigos();
  const saida: { lang: Idioma; href: string }[] = [];

  for (const lang of IDIOMAS) {
    const irmao = todos.find((artigo) => {
      const p = partes(artigo);
      return p.lang === lang && artigo.data.chave === chave;
    });
    if (irmao) saida.push({ lang, href: rotaArtigo(partes(irmao).slug, lang) });
  }

  return saida;
}

/** Estimativa de tempo de leitura, arredondada para cima, minimo de 1 minuto. */
export function minutosDeLeitura(corpo: string | undefined): number {
  const palavras = (corpo ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

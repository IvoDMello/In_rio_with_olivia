import type { ImageMetadata } from 'astro';

/**
 * Catalogo de fotos do site.
 *
 * COMO ADICIONAR UMA FOTO
 * Basta soltar o arquivo na pasta certa com o nome certo. Nao e preciso
 * editar codigo nenhum: o site encontra a imagem pelo nome do arquivo e,
 * enquanto ela nao existir, mostra um espaco reservado discreto no lugar.
 *
 *   src/assets/places/<id-do-lugar>.jpg      ex.: cristo-redentor.jpg
 *   src/assets/places/<id-do-lugar>-2.jpg    fotos extras, em ordem: -2, -3...
 *   src/assets/specials/<id-da-experiencia>.jpg
 *   src/assets/dicas/<nome-no-frontmatter>.jpg
 *   src/assets/instagram/01.jpg ate 06.jpg
 *   src/assets/fotos/<nome>.jpg              fotos da Olivia e do hero
 *
 * Formatos aceitos: jpg, jpeg, png, avif, webp. O Astro converte para AVIF
 * e WebP no build, entao envie o arquivo grande e sem compressao agressiva
 * (largura de 2000px ou mais nas fotos de destaque).
 *
 * NOTA TECNICA
 * Os caminhos abaixo estao escritos por extenso, repetindo o mesmo padrao
 * cinco vezes. Isso e proposital: o Vite le import.meta.glob antes de o
 * codigo rodar e exige um texto literal. Montar o caminho com uma constante
 * ou com template literal quebra o servidor de desenvolvimento e, pior,
 * passa despercebido no build, onde o resultado vazio fica igual a "ainda
 * nao tem foto".
 */

type Modulos = Record<string, { default: ImageMetadata }>;

const lugares = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/places/*.{jpg,jpeg,png,avif,webp}',
  { eager: true },
) as Modulos;

const especiais = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/specials/*.{jpg,jpeg,png,avif,webp}',
  { eager: true },
) as Modulos;

const artigos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/dicas/*.{jpg,jpeg,png,avif,webp}',
  { eager: true },
) as Modulos;

const instagram = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/instagram/*.{jpg,jpeg,png,avif,webp}',
  { eager: true },
) as Modulos;

const fotos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/fotos/*.{jpg,jpeg,png,avif,webp}',
  { eager: true },
) as Modulos;

/** Indexa um grupo de modulos pelo nome do arquivo sem extensao. */
function porNome(modulos: Modulos): Record<string, ImageMetadata> {
  const mapa: Record<string, ImageMetadata> = {};
  for (const caminho in modulos) {
    const nome = caminho.split('/').pop()!.replace(/\.[^.]+$/, '');
    mapa[nome] = modulos[caminho]!.default;
  }
  return mapa;
}

export const IMAGENS = {
  lugares: porNome(lugares),
  especiais: porNome(especiais),
  artigos: porNome(artigos),
  fotos: porNome(fotos),
} as const;

export type GrupoDeImagem = keyof typeof IMAGENS;

/** Devolve a imagem de um item, ou undefined quando o arquivo ainda nao existe. */
export function imagem(grupo: GrupoDeImagem, nome: string | undefined): ImageMetadata | undefined {
  if (!nome) return undefined;
  return IMAGENS[grupo][nome];
}

/**
 * Todas as fotos de um item, em ordem: <id>.jpg, depois <id>-2.jpg, <id>-3.jpg
 * e assim por diante. A contagem para no primeiro numero que faltar, entao
 * pular do -2 para o -4 deixa o -4 de fora.
 *
 * Cada foto vem com o nome do arquivo, que e a chave da descricao dela em
 * `fotos.lugares` ou `fotos.especiais`, nos arquivos de i18n.
 */
export function fotosNumeradas(
  grupo: GrupoDeImagem,
  id: string,
): { nome: string; src: ImageMetadata }[] {
  const mapa = IMAGENS[grupo];
  const nomes = [id];
  for (let n = 2; mapa[`${id}-${n}`]; n++) nomes.push(`${id}-${n}`);
  return nomes.filter((nome) => mapa[nome]).map((nome) => ({ nome, src: mapa[nome]! }));
}

/** Fotos de um lugar: favela.jpg, favela-2.jpg e assim por diante. */
export function fotosLugar(id: string): { nome: string; src: ImageMetadata }[] {
  return fotosNumeradas('lugares', id);
}

/** Fotos da faixa do Instagram, em ordem de nome de arquivo. */
export function fotosInstagram(): ImageMetadata[] {
  return Object.keys(instagram)
    .sort()
    .map((caminho) => instagram[caminho]!.default);
}

/**
 * Foto principal do hero. Procura, em ordem: hero.jpg, rio.jpg, olivia.jpg.
 * Assim a Olivia pode enviar qualquer uma delas primeiro.
 */
export function fotoHero(): ImageMetadata | undefined {
  const mapa = IMAGENS.fotos;
  return mapa['hero'] ?? mapa['rio'] ?? mapa['olivia'];
}

/** Retrato da Olivia. */
export function fotoOlivia(): ImageMetadata | undefined {
  const mapa = IMAGENS.fotos;
  return mapa['olivia'] ?? mapa['olivia-retrato'];
}

import { defineCollection } from 'astro:content';
import * as z from 'astro/zod';
import { file, glob } from 'astro/loaders';

/** Bloco de texto de um item, repetido para cada idioma. */
const textoPorIdioma = z.object({
  nome: z.string(),
  resumo: z.string(),
});

/**
 * Lugares que podem entrar no roteiro ("Inspiracoes para o seu tour").
 * Os tres idiomas ficam lado a lado no mesmo registro, o que torna facil
 * ver o que ainda falta traduzir.
 */
const lugares = defineCollection({
  loader: file('./src/content/lugares.json'),
  schema: z.object({
    /** Posicao na listagem. Define a ordem em que os cartoes aparecem. */
    ordem: z.number(),
    grupo: z.enum(['classicos', 'historia', 'natureza', 'praias']),
    destaque: z.boolean().default(false),
    en: textoPorIdioma,
    pt: textoPorIdioma,
    es: textoPorIdioma,
  }),
});

/** Experiencias especiais, reservadas pela Olivia com parceiros. */
const especiais = defineCollection({
  loader: file('./src/content/especiais.json'),
  schema: z.object({
    ordem: z.number(),
    en: textoPorIdioma,
    pt: textoPorIdioma,
    es: textoPorIdioma,
  }),
});

/**
 * Blog de dicas. Um arquivo por idioma, em src/content/dicas/<idioma>/<slug>.md
 * O slug e igual nos tres idiomas, entao o seletor de idioma consegue trocar
 * de rota sem perder o artigo.
 */
const dicas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dicas' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    /**
     * Identificador do artigo, igual nos tres idiomas. E o que permite ao
     * seletor de idioma trocar de rota sem sair do artigo, mesmo com slugs
     * traduzidos.
     */
    chave: z.string(),
    data: z.coerce.date(),
    /** Nome do arquivo em src/assets/dicas, sem extensao. Opcional. */
    imagem: z.string().optional(),
    alt: z.string().optional(),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { lugares, especiais, dicas };

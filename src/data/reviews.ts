/**
 * Avaliacoes reais do TripAdvisor, escolhidas pela Olivia.
 *
 * ESTA LISTA ESTA VAZIA DE PROPOSITO.
 * O site nao publica depoimento inventado. Enquanto a lista estiver vazia,
 * a secao de avaliacoes simplesmente nao aparece, na home nem no schema.org.
 *
 * Para ligar a secao, copie tres avaliacoes reais do TripAdvisor e preencha
 * abaixo, seguindo o modelo comentado. Traduza o texto para os tres idiomas,
 * ou repita o original quando preferir manter as palavras do viajante. Manter
 * o texto original e o mais honesto, e o normal em sites de turismo.
 */

export type Avaliacao = {
  /** Nome como aparece no TripAdvisor. */
  autor: string;
  /** Pais ou cidade de origem, opcional. */
  origem?: string;
  /** Nota de 1 a 5. */
  nota: 1 | 2 | 3 | 4 | 5;
  /** Data da avaliacao, no formato AAAA-MM-DD. */
  data: string;
  /** Link direto para a avaliacao, opcional. */
  url?: string;
  /** Texto da avaliacao por idioma. Use a mesma string quando nao traduzir. */
  texto: { en: string; pt: string; es: string };
};

export const AVALIACOES: Avaliacao[] = [
  // {
  //   autor: 'Nome do viajante',
  //   origem: 'London, United Kingdom',
  //   nota: 5,
  //   data: '2026-01-15',
  //   url: 'https://www.tripadvisor.com/...',
  //   texto: {
  //     en: 'Texto da avaliacao em ingles.',
  //     pt: 'Texto da avaliacao em portugues.',
  //     es: 'Texto da avaliacao em espanhol.',
  //   },
  // },
];

/** Media das notas, usada no schema.org. Null quando nao houver avaliacoes. */
export function mediaDasNotas(): number | null {
  if (AVALIACOES.length === 0) return null;
  const soma = AVALIACOES.reduce((total, a) => total + a.nota, 0);
  return Math.round((soma / AVALIACOES.length) * 10) / 10;
}

import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * getCollection devolve as entradas em ordem alfabetica de id, e nao na ordem
 * em que elas aparecem no arquivo JSON. Como a sequencia dos cartoes foi
 * escolhida a mao, ela fica gravada no campo `ordem` de cada item.
 */
export async function lugares(): Promise<CollectionEntry<'lugares'>[]> {
  const todos = await getCollection('lugares');
  return todos.sort((a, b) => a.data.ordem - b.data.ordem);
}

export async function especiais(): Promise<CollectionEntry<'especiais'>[]> {
  const todos = await getCollection('especiais');
  return todos.sort((a, b) => a.data.ordem - b.data.ordem);
}

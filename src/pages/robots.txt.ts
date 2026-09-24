import type { APIRoute } from 'astro';
import { E_DOMINIO_FINAL, SITE } from '~/config/site';

/**
 * robots.txt gerado no build, e nao um arquivo fixo em /public.
 *
 * O motivo e o endereco do sitemap, que muda conforme o dominio do build,
 * e a protecao dos deploys de validacao: fora do dominio definitivo, o
 * arquivo pede para os buscadores ignorarem o site inteiro.
 */
export const GET: APIRoute = () => {
  const corpo = E_DOMINIO_FINAL
    ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE.url}/sitemap-index.xml`, ''].join('\n')
    : [
        '# Deploy de validacao, fora do dominio definitivo.',
        '# Nada aqui deve ser indexado.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(corpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

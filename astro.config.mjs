// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { E_DOMINIO_FINAL, SITE } from './src/config/site.ts';
import { avisoPendencias } from './src/lib/avisoPendencias.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  // Sem barra no fim. Assim a URL canonica, as tags hreflang e o sitemap
  // falam todos da mesma forma, e nao existem dois enderecos para a mesma
  // pagina aos olhos do Google.
  trailingSlash: 'never',

  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  // Fontes auto-hospedadas pelo Astro: sem requisicao ao Google no navegador,
  // com preload e fallback otimizado por metrica. Ajuda o Lighthouse.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-titulo',
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-texto',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],

  integrations: [
    avisoPendencias(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt-BR', es: 'es' },
      },
      // Fora do sitemap: a pagina de erro e a raiz, que existe apenas para
      // redirecionar quem chega sem idioma na URL. O ponto de entrada real
      // de cada idioma e /en, /pt e /es.
      filter: (page) => {
        // Deploy de validacao nao publica sitemap: nada ali deve ser indexado.
        if (!E_DOMINIO_FINAL) return false;
        const caminho = new URL(page).pathname.replace(/\/$/, '');
        return caminho !== '' && !caminho.includes('/404');
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    // Formatos modernos primeiro; o componente <Image /> cuida do resto.
    responsiveStyles: true,
  },
});

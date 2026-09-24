import type { AstroIntegration } from 'astro';

import { CONTATO, FORMULARIO_ENDPOINT } from '~/config/site';
import { AVALIACOES } from '~/data/reviews';

/**
 * Integracao que lista, no fim do build, o que ainda falta preencher.
 *
 * Nada aqui quebra o build. E um lembrete, porque varios blocos do site
 * desaparecem sozinhos quando o dado nao existe (o botao do WhatsApp, por
 * exemplo). Sem este aviso, daria para publicar um site sem botao nenhum
 * e so descobrir depois.
 */
export function avisoPendencias(): AstroIntegration {
  return {
    name: 'aviso-pendencias',
    hooks: {
      'astro:build:done': ({ logger }) => {
        const pendencias: string[] = [];

        if (!CONTATO.whatsapp) {
          pendencias.push(
            'WhatsApp: sem numero, TODOS os botoes de conversa somem do site. ' +
              'Preencha CONTATO.whatsapp em src/config/site.ts.',
          );
        }
        if (!CONTATO.instagram) pendencias.push('Instagram: link do perfil.');
        if (!CONTATO.tripadvisor) pendencias.push('TripAdvisor: link da pagina.');
        if (!CONTATO.email) pendencias.push('E-mail de contato.');
        if (!CONTATO.cadastur) pendencias.push('Numero do Cadastur, exibido no rodape.');

        if (AVALIACOES.length === 0) {
          pendencias.push(
            'Avaliacoes: a secao fica oculta ate haver depoimentos reais ' +
              'em src/data/reviews.ts.',
          );
        }

        if (!FORMULARIO_ENDPOINT && !process.env['NETLIFY']) {
          pendencias.push(
            'Formulario de contato: sem endpoint do Formspree e fora da Netlify, ' +
              'ele aparece desativado.',
          );
        }

        if (pendencias.length === 0) {
          logger.info('Nenhuma pendencia. O site esta pronto para publicar.');
          return;
        }

        logger.warn(`Faltam ${pendencias.length} informacoes antes de publicar:`);
        pendencias.forEach((item, i) => logger.warn(`  ${i + 1}. ${item}`));
      },
    },
  };
}

import type { GlobalConfig } from 'payload'

export const Giardino: GlobalConfig = {
  label: 'Giardino',
  access: {
    read: () => true,
  },

  slug: 'giardino',
  fields: [
    {
      type: 'tabs',

      tabs: [
        {
          name: 'Atelier',
          fields: [
            {
              name: 'testo-atelier',
              label: 'Testo Atelier',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Compostiera',
          fields: [
            {
              name: 'testo-compostiera',
              label: 'Testo Compostiera',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Alberi',
          fields: [
            {
              name: 'testo-alberi',
              label: 'Testo Alberi',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Ingresso orto',
          fields: [
            {
              name: 'testo-ingresso-orto',
              label: 'Testo Ingresso Orto',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Orto Digitale',
          fields: [
            {
              name: 'testo-orto-digitale',
              label: 'Testo Orto Digitale',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Percorso Alimurgico',
          fields: [
            {
              name: 'testo-percorso-alimurgico',
              label: 'Testo Percorso Alimurgico',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Percorso Aromatico',
          fields: [
            {
              name: 'testo-percorso-aromatico',
              label: 'Testo Percorso Aromatico',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Ricettario di Quartiere',
          fields: [
            {
              name: 'testo-ricettario-di-quartiere',
              label: 'Testo Ricettario di Quartiere',
              type: 'richText',
            },
          ],
        },
        {
          name: "Serra d'Artista",
          fields: [
            {
              name: 'testo-serra-d-artista',
              label: "Testo Serra d'Artista",
              type: 'richText',
            },
          ],
        },
        {
          name: 'Serra',
          fields: [
            {
              name: 'testo-serra',
              label: 'Testo Serra',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Tapee',
          fields: [
            {
              name: 'testo-tapee',
              label: 'Testo Tapee',
              type: 'richText',
            },
          ],
        },
        {
          name: 'Vasche CPS',
          fields: [
            {
              name: 'testo-vasche-cps',
              label: 'Testo Vasche CPS',
              type: 'richText',
            },
          ],
        },
      ],
    },
  ],
}

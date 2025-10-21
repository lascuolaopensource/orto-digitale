import type { GlobalConfig } from 'payload'
import { area } from '../index'

export const Aree: GlobalConfig = {
  slug: 'aree',
  label: {
    en: 'Areas',
    it: 'Aree',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        area('entrata'),
        area('atelier'),
        area('vasche'),
        area('ricettario'),
        area('percorso_alimurgico'),
        area('serra'),
        area('percorso_aromatico'),
        area('alberi_da_frutto'),
        area('eventi'),
        area('tapee'),
        area('compostiera'),
      ],
    },
  ],
}

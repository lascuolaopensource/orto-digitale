import type { CollectionConfig } from 'payload'
import * as F from '@/collections/index'
import { formatSlug } from '@/fields/slug/formatSlug'

export const Piante = {
  slug: 'piante',
  defaultPopulate: {
    slug: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'descrizione'],
  },
  hooks: {
    beforeChange: [
      async ({ req, data, originalDoc, operation }) => {
        // For localized fields, ensure the slug is properly updated for each locale
        if (data.name && typeof data.name === 'object') {
          // Initialize slug object if it doesn't exist
          if (!data.slug) {
            data.slug = {}
          } else if (typeof data.slug === 'string') {
            // If slug exists as a string, convert to object
            const defaultSlug = data.slug
            data.slug = { [req.locale || 'it']: defaultSlug }
          }

          Object.entries(data.name).forEach(([locale, value]) => {
            if (typeof value === 'string' && value.trim()) {
              data.slug[locale] = formatSlug(value)
            }
          })
        }

        return data
      },
    ],
  },
  labels: {
    singular: {
      en: 'Plant',
      it: 'Pianta',
    },
    plural: {
      en: 'Plants',
      it: 'Piante',
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
        },
        {
          name: 'latin_name',
          label: 'Nome latino',
          type: 'text',
        },
      ],
    },

    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
    },

    {
      name: 'seasone',
      label: 'Stagione',
      type: 'select',
      options: [
        {
          label: 'Primavera / Estate',
          value: 'primavera_estate',
        },
        {
          label: 'Autunno / Inverno',
          value: 'autunno_inverno',
        },
        {
          label: "Tutto l'anno",
          value: 'tutto_l_anno',
        },
      ],
    },

    {
      name: 'zones',
      label: 'Zonizzazione',
      type: 'select',
      options: [
        {
          label: 'Percorso Alimurgico',
          value: 'percorso_alimurgico',
        },
        {
          label: 'Verdure',
          value: 'verdure',
        },
        {
          label: 'Arboree da frutto',
          value: 'arboree_da_frutto',
        },
      ],
    },

    {
      name: 'immagine',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },

    {
      name: 'descrizione',
      type: 'richText',
      localized: true,
    },
  ],
} satisfies CollectionConfig

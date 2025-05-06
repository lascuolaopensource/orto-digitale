import type { CollectionConfig } from 'payload'
import * as F from '@/collections/index'
import { formatSlug } from '@/fields/slug/formatSlug'

export const Ricette: CollectionConfig = {
  slug: 'ricette',
  defaultPopulate: {
    slug: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'autore'],
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
      en: 'Recipe',
      it: 'Ricetta',
    },
    plural: {
      en: 'Recipes',
      it: 'Ricette',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: {
            en: 'Content',
            it: 'Contenuto',
          },
          fields: [
            {
              name: 'autore',
              label: {
                en: 'Authora',
                it: 'Autori/Autrici',
              },
              type: 'text',
              localized: true,
            },
            {
              name: 'descrizione',
              label: {
                en: 'Description',
                it: 'Descrizione',
              },
              type: 'richText',
              localized: true,
            },
            {
              name: 'immagine',
              label: {
                en: 'Image',
                it: 'Immagine',
              },
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'ingredienti',
              label: {
                en: 'Ingredients',
                it: 'Ingredienti',
              },
              type: 'richText',
              localized: true,
            },
            {
              name: 'preparazione',
              label: {
                en: 'Preparation',
                it: 'Preparazione',
              },
              type: 'richText',
              localized: true,
            },
            {
              name: 'piante',
              label: {
                en: 'Plants',
                it: 'Piante',
              },
              type: 'relationship',
              relationTo: 'piante',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Link',
          fields: [...F.slugField('name')],
        },
      ],
    },
  ],
}

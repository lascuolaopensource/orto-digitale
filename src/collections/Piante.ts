import type { CollectionConfig } from 'payload'
import * as F from '@/collections/index'
import { formatSlug } from '@/fields/slug/formatSlug'

export const Piante: CollectionConfig = {
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
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'short_description',
              type: 'text',
              localized: true,
            },
            {
              name: 'descrizione',
              type: 'richText',
              localized: true,
            },
            {
              name: 'immagine',
              type: 'upload',
              relationTo: 'media',
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

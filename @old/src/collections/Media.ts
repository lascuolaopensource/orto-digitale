import type { CollectionConfig } from 'payload'

import { APIError, CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

const generateBlurHash: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      const buffer = req?.file?.data

      if (buffer) {
        const { base64 } = await getPlaiceholder(buffer, { size: 10 })

        return {
          ...data,
          blurHash: base64,
        }
      }
    } catch (error) {
      throw new APIError('Failed to generate blur data url')
    }
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,
    formatOptions: { format: 'webp' },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
        withoutEnlargement: true,
      },
      {
        name: 'medium',
        width: 900,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
        withoutEnlargement: true,
      },
      {
        name: 'large',
        width: 1400,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
        withoutEnlargement: true,
      },
      {
        name: 'xlarge',
        width: 1920,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
        withoutEnlargement: true,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
        withoutEnlargement: true,
      },
    ],
  },
}

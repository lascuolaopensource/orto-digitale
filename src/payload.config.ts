import { buildConfig } from 'payload'
import { it } from '@payloadcms/translations/languages/it'
import { en } from '@payloadcms/translations/languages/en'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { User } from './collections/User'
import { Media } from './collections/Media'
import { Piante } from './collections/Piante'
import { Ricette } from './collections/Ricette'
// Globals
import { Aree } from './collections/globals/Aree'
// Storage
import { s3Storage } from '@payloadcms/storage-s3'

import { seoPlugin } from '@payloadcms/plugin-seo'

import {
  lexicalEditor,
  BoldFeature,
  ParagraphFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_DOMAIN,

  i18n: {
    fallbackLanguage: 'it',
    supportedLanguages: { it, en },
  },
  localization: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    fallback: true,
  },

  admin: {
    user: User.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'd MMMM yyyy - HH:mm',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    components: {
      // Rimuoviamo il componente Nav personalizzato che sta causando problemi
      // Nav: '/components/admin/CustomNav',
    },
  },
  collections: [User, Media, Piante, Ricette],
  globals: [Aree],
  editor: lexicalEditor({
    features: () => [
      InlineToolbarFeature(),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
      HeadingFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    seoPlugin({}),

    s3Storage({
      collections: {
        [Media.slug]: {
          disableLocalStorage: true,
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      disableLocalStorage: true,
      enabled: true,
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: true,
      },
    }),
  ],
})

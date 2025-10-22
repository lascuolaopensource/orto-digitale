// storage-adapter-import-placeholder

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './db/collections/Media'
import { Users } from './db/collections/Users'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Users, Media],

  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

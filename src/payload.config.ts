// storage-adapter-import-placeholder

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { it } from '@payloadcms/translations/languages/it'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Areas } from './db/collections/Areas'
import { Media } from './db/collections/Media'
import { Plants } from './db/collections/Plants'
import { Recipes } from './db/collections/Recipes'
import { Users } from './db/collections/Users'
import { About } from './db/globals/About'
import { Meta } from './db/globals/Meta'

//

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	collections: [Users, Media, Areas, Plants, Recipes],
	globals: [About, Meta],

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
	i18n: {
		fallbackLanguage: 'it',
		supportedLanguages: { it },
	},
	editor: lexicalEditor(),
	sharp,
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
})

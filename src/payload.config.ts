// storage-adapter-import-placeholder

import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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

	db: db(),
	plugins: [s3()],

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

function env<T>(props: { prod: T; dev: T }) {
	return process.env.NODE_ENV === 'production' ? props.prod : props.dev
}

function db() {
	return env({
		prod: postgresAdapter({
			pool: {
				connectionString: process.env.DATABASE_URI || '',
			},
		}),
		dev: sqliteAdapter({
			client: {
				url: process.env.DATABASE_URI || '',
			},
		}),
	})
}

function s3() {
	return s3Storage({
		disableLocalStorage: true,
		collections: {
			[Media.slug]: {
				disableLocalStorage: true,
				prefix: 'media',
			},
		},
		bucket: process.env.S3_BUCKET!,
		enabled: process.env.NODE_ENV === 'production',
		config: {
			endpoint: process.env.S3_ENDPOINT!,
			region: process.env.S3_REGION!,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
			},
			forcePathStyle: true,
		},
	})
}

import type { CollectionConfig } from 'payload'
import { Collection } from './_index'

export const Media: CollectionConfig = {
	slug: Collection.Media,
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
	],
	upload: true,
}

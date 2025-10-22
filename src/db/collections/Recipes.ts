import * as F from '@/db/fields'
import type { CollectionConfig } from 'payload'
import { Collection } from './_index'

//

export const Recipes: CollectionConfig = {
	slug: Collection.Recipes,
	access: {
		read: () => true,
	},
	labels: {
		singular: 'Ricetta',
		plural: 'Ricette',
	},
	admin: {
		useAsTitle: F.name.name,
	},
	fields: [
		F.name,
		F.description,
		{
			name: 'plants_used',
			label: 'Piante utilizzate',
			type: 'relationship',
			relationTo: Collection.Plants,
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
	],
} as const satisfies CollectionConfig

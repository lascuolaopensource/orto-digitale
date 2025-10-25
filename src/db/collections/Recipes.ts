import { slugField, type CollectionConfig } from 'payload'

import * as F from '@/db/fields'

export const Recipes: CollectionConfig = {
	slug: 'recipes',
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
		slugField({
			fieldToUse: F.name.name,
			position: 'sidebar',
		}),
		F.relation({
			name: 'plants_used',
			label: 'Piante utilizzate',
			collection: 'plants',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		}),
	],
}

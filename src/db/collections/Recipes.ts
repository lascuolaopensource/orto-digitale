import * as F from '@/db/fields'
import type { CollectionConfig } from 'payload'

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

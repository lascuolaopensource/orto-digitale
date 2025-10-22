import * as F from '@/db/fields'
import type { CollectionConfig } from 'payload'
import { Collection } from './_index'

//

export const Plants = {
	slug: Collection.Plants,
	access: {
		read: () => true,
	},
	labels: {
		singular: 'Pianta',
		plural: 'Piante',
	},
	admin: {
		useAsTitle: F.name.name,
	},
	fields: [
		F.name,
		{
			name: 'latin_name',
			label: 'Nome latino',
			type: 'text',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'season',
			label: 'Stagione',
			type: 'select',
			options: [
				{
					label: 'Primavera / Estate',
					value: 'spring-summer',
				},
				{
					label: 'Autunno / Inverno',
					value: 'fall-winter',
				},
				{
					label: "Tutto l'anno",
					value: 'all-year',
				},
			],
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'area',
			label: 'Area',
			type: 'relationship',
			relationTo: Collection.Areas,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'immagine',
			type: 'upload',
			relationTo: Collection.Media,
			admin: {
				position: 'sidebar',
			},
		},
		F.description,
		F.join({
			name: 'recipes',
			label: 'Ricette correlate',
			collection: Collection.Recipes,
			on: 'plants_used',
			admin: { position: 'sidebar' },
		}),
	],
} as const satisfies CollectionConfig

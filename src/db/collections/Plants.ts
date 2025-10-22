import * as F from '@/db/fields'
import { Plant } from '@/payload-types'
import type { CollectionConfig } from 'payload'

//

export const Plants: CollectionConfig = {
	slug: 'plants',
	access: {
		read: () => true,
	},
	labels: {
		singular: 'Pianta',
		plural: 'Piante',
	},
	admin: {
		useAsTitle: F.name.name,
		defaultColumns: ['name', 'latin_name', 'season', 'area'] as (keyof Plant)[],
	},
	fields: [
		F.name,
		F.description,

		{
			name: 'latin_name',
			label: 'Nome latino',
			type: 'text',
			required: true,
			admin: {
				position: 'sidebar',
			},
		},

		{
			name: 'season',
			label: 'Stagione',
			type: 'select',
			required: true,
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

		F.relation({
			name: 'area',
			label: 'Area',
			collection: 'areas',
			admin: {
				position: 'sidebar',
			},
		}),

		F.media({
			name: 'immagine',
			admin: {
				position: 'sidebar',
			},
		}),

		F.join({
			name: 'recipes',
			label: 'Ricette correlate',
			collection: 'recipes',
			on: 'plants_used',
			admin: { position: 'sidebar' },
		}),
	],
}

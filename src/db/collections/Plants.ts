import * as F from '@/db/fields'
import type { CollectionConfig } from 'payload'
import { Collection } from '.'

//

export const Plants: CollectionConfig = {
	slug: Collection.Plants,
	admin: {
		useAsTitle: F.name.name,
	},
	labels: {
		singular: 'Pianta',
		plural: 'Piante',
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
			name: 'areas',
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
			relationTo: 'media',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},

		{
			name: 'descrizione',
			type: 'richText',
			localized: true,
		},
	],
}

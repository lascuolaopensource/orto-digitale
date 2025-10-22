import * as F from '@/db/fields'
import type { CollectionConfig } from 'payload'
import { Collection as C } from './_index'

export const AREAS_IDS = {
	atelier: 'atelier',
	entrata: 'entrata',
	percorsoAromatico: 'percorso-aromatico',
	tepee: 'tepee',
	vasche: 'vasche',
	percorsoAlimurgico: 'percorso-alimurgico',
	compostiera: 'compostiera',
	ricettario: 'ricettario',
	serra: 'serra',
	eventi: 'eventi',
	alberiDaFrutto: 'alberi-da-frutto',
} as const

export const Areas = {
	slug: C.Areas,
	access: {
		read: () => true,
	},
	labels: {
		singular: 'Area',
		plural: 'Aree',
	},
	admin: {
		useAsTitle: F.name.name,
	},
	fields: [
		F.name,
		{
			name: 'key',
			label: 'ID',
			type: 'select',
			options: Object.values(AREAS_IDS).map((id) => ({
				label: id,
				value: id,
			})),
			required: true,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'short_description',
			label: 'Descrizione breve',
			type: 'text',
			required: true,
		},
		F.description,
		{
			name: 'icon',
			label: 'Icona',
			type: 'upload',
			relationTo: 'media',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'gallery',
			label: 'Galleria',
			type: 'upload',
			relationTo: 'media',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		F.join({
			name: 'plants',
			label: "Piante nell'area",
			collection: C.Plants,
			on: 'area',
			admin: { position: 'sidebar' },
		}),
	],
} as const satisfies CollectionConfig

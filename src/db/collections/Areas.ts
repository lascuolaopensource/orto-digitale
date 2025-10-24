import type { CollectionConfig } from 'payload'

import * as F from '@/db/fields'

//

export const AREAS_IDS = {
	alberiDaFrutto: 'alberi-da-frutto',
	atelier: 'atelier',
	compostiera: 'compostiera',
	entrata: 'entrata',
	eventi: 'eventi',
	percorsoAlimurgico: 'percorso-alimurgico',
	percorsoAromatico: 'percorso-aromatico',
	ricettario: 'ricettario',
	serra: 'serra',
	tepee: 'tepee',
	vasche: 'vasche',
} as const

export const Areas = {
	slug: 'areas',
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

		F.description,

		F.media({
			name: 'icon',
			label: 'Icona',
			admin: {
				position: 'sidebar',
			},
		}),

		F.media({
			name: 'gallery',
			label: 'Galleria',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		}),

		F.join({
			name: 'plants',
			label: "Piante nell'area",
			collection: 'plants',
			on: 'area',
			admin: {
				defaultColumns: ['name'],
			},
		}),
	],
} as const satisfies CollectionConfig

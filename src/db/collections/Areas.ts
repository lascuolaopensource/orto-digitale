import { CollectionConfig } from 'payload'
import { Collection } from '.'

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

export const Areas: CollectionConfig = {
	slug: Collection.Areas,
	labels: {
		singular: 'Area',
		plural: 'Aree',
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'name',
			label: 'Nome',
			type: 'text',
			required: true,
		},
		{
			name: 'id',
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
		{
			name: 'description',
			label: 'Descrizione',
			type: 'richText',
			required: true,
		},
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
	],
}

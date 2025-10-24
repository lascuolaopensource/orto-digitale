import { GlobalConfig } from 'payload'

//

export const Meta: GlobalConfig = {
	slug: 'meta',
	label: 'Meta',
	fields: [
		{
			name: 'recipes_form_url',
			label: 'URL del form per le ricette',
			type: 'text',
		},
	],
}

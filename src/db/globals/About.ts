import { GlobalConfig } from 'payload'

import * as F from '@/db/fields'

//

export const About: GlobalConfig = {
	slug: 'about',
	label: 'About',
	fields: [{ ...F.description, required: true }],
}

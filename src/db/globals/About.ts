import * as F from '@/db/fields'
import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
	slug: 'about',
	label: 'About',
	fields: [{ ...F.description, required: true }],
}

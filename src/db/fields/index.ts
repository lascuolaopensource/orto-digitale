import type { CollectionField, Collections } from '@/db/collections/_types'
import { JoinField, RichTextField, TextField } from 'payload'

export const name = {
	name: 'name',
	label: 'Nome',
	type: 'text',
	required: true,
} as const satisfies TextField

export const description = {
	name: 'description',
	label: 'Descrizione',
	type: 'richText',
} as const satisfies RichTextField

export function join<C extends keyof Collections>(
	props: { collection: C; on: CollectionField<C> } & Omit<JoinField, 'collection' | 'on' | 'type'>,
) {
	const { collection, on, ...rest } = props
	return {
		type: 'join',
		collection,
		on: on as string,
		...rest,
	} as const satisfies JoinField
}

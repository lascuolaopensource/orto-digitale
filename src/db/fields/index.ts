import {
	CollectionSlug,
	JoinField,
	RelationshipField,
	RichTextField,
	TextField,
	UploadField,
} from 'payload'

import type { Area, Media, Plant, Recipe, User } from '@/payload-types'

//

type Collections = {
	users: User
	media: Media
	areas: Area
	plants: Plant
	recipes: Recipe
}

type Collection = keyof Collections
type CollectionField<C extends Collection> = keyof Collections[C]

//

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

export function relation<C extends CollectionSlug>(
	props: { collection: C } & Omit<RelationshipField, 'relationTo' | 'type'>,
): RelationshipField {
	const { collection, ...rest } = props
	// @ts-expect-error - Slight type mismatch
	return {
		...rest,
		type: 'relationship',
		relationTo: collection,
	}
}

export function join<C extends Collection>(
	props: { collection: C; on: CollectionField<C> } & Omit<JoinField, 'collection' | 'on' | 'type'>,
): JoinField {
	const { collection, on, ...rest } = props
	return {
		...rest,
		type: 'join',
		collection,
		defaultLimit: 0,
		on: on as string,
	}
}

export function upload<C extends CollectionSlug>(
	props: { collection: C } & Omit<UploadField, 'relationTo' | 'type'>,
): UploadField {
	const { collection, ...rest } = props
	// @ts-expect-error - Slight type mismatch
	return {
		...rest,
		type: 'upload',
		relationTo: collection,
	}
}

export function media(props: Omit<Parameters<typeof upload>[0], 'collection'>): UploadField {
	return upload({ collection: 'media', ...props })
}

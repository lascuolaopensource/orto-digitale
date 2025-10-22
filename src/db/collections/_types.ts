import type { Area, Plant, Recipe } from '@/payload-types'
import type { SimplifyDeep } from 'type-fest'
import { Collection } from './_index'

export type Collections = {
	[Collection.Areas]: Area
	[Collection.Plants]: Plant
	[Collection.Recipes]: Recipe
}

export type CollectionField<C extends keyof Collections> = SimplifyDeep<keyof Collections[C]>

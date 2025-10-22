import { Area, Plant, Recipe } from '@/payload-types'
import config from '@payload-config'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { arrayShuffle } from 'array-shuffle'
import frontMatter from 'front-matter'
import fs from 'fs'
import { CollectionSlug, getPayload, Payload } from 'payload'
import z from 'zod'

/* Procedure */

console.log('🌱 Starting seed...')

const payload = await getPayload({ config })
const markdownConverter = await createMarkdownConverter()

await clearDb(payload)
const areas = await createAreas(payload, markdownConverter)
const plants = await createPlants(payload, markdownConverter, areas)
await createRecipes(payload, markdownConverter, plants)
await createAbout(payload, markdownConverter)

console.log('✅ Seed completed')
process.exit(0)

/* Functions */

async function createAreas(payload: Payload, markdownConverter: MarkdownConverter) {
	const areas = readMarkdownFilesInFolder('./src/db/seed/content/areas')
	const schema = z.object({
		name: z.string(),
		key: z.string(),
	})
	const areasRecords: Area[] = []
	for (const area of areas) {
		const { attributes, body } = frontMatter(area)
		const content = markdownConverter(body)
		const meta = schema.parse(attributes)
		const areaRecord = await payload.create({
			collection: 'areas',
			data: {
				key: meta.key as never,
				name: meta.name,
				description: content,
			},
		})
		areasRecords.push(areaRecord)
	}
	return areasRecords
}

async function createPlants(payload: Payload, markdownConverter: MarkdownConverter, areas: Area[]) {
	const plants = readMarkdownFilesInFolder('./src/db/seed/content/plants')
	const schema = z.object({
		name: z.string(),
		latinName: z.string(),
		zoning: z.string(),
		season: z.string(),
	})
	const plantsRecords: Plant[] = []
	for (const plant of plants) {
		const { attributes, body } = frontMatter(plant)
		const content = markdownConverter(body)
		const meta = schema.parse(attributes)
		const area = areas.find((area) => area.key === meta.zoning)
		const plantRecord = await payload.create({
			collection: 'plants',
			data: {
				name: meta.name,
				latin_name: meta.latinName,
				area: area?.id,
				season: meta.season as never,
				description: content,
			},
		})
		plantsRecords.push(plantRecord)
	}
	return plantsRecords
}

async function createRecipes(
	payload: Payload,
	markdownConverter: MarkdownConverter,
	plants: Plant[],
) {
	const recipes = readMarkdownFilesInFolder('./src/db/seed/content/recipes')
	const schema = z.object({
		name: z.string(),
	})
	const recipesRecords: Recipe[] = []
	for (const recipe of recipes) {
		const { attributes, body } = frontMatter(recipe)
		const content = markdownConverter(body)
		const meta = schema.parse(attributes)
		const recipeRecord = await payload.create({
			collection: 'recipes',
			data: {
				name: meta.name,
				description: content,
				plants_used: arrayShuffle(plants)
					.slice(0, 3)
					.map((plant) => plant.id),
			},
		})
		recipesRecords.push(recipeRecord)
	}
	return recipesRecords
}

async function createAbout(payload: Payload, markdownConverter: MarkdownConverter) {
	const about = fs.readFileSync('./src/db/seed/content/globals/about.md', 'utf-8')
	const content = markdownConverter(about)
	await payload.updateGlobal({
		slug: 'about',
		data: {
			description: content,
		},
	})
}

/* Utils */

async function clearDb(payload: Payload) {
	const collections: CollectionSlug[] = ['areas', 'plants', 'recipes']
	for (const collection of collections) {
		await payload.delete({
			collection: collection,
			where: { id: { exists: true } },
		})
	}
}

function readMarkdownFilesInFolder(folderPath: string): string[] {
	const files = fs.readdirSync(folderPath)
	const markdownFiles = files.filter((file) => file.endsWith('.md'))
	return markdownFiles.map((file) => fs.readFileSync(`${folderPath}/${file}`, 'utf-8'))
}

async function createMarkdownConverter() {
	const payloadConfig = await config
	const editorConfig = await editorConfigFactory.default({
		config: payloadConfig,
	})
	return (markdown: string) =>
		convertMarkdownToLexical({
			markdown: markdown,
			editorConfig: editorConfig,
		})
}

type MarkdownConverter = Awaited<ReturnType<typeof createMarkdownConverter>>

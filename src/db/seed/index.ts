import config from '@payload-config'
import { CollectionSlug, getPayload, Payload } from 'payload'

/* Procedure */

console.log('🌱 Starting seed...')

const payload = await getPayload({ config })
await clearDb(payload)

// const comuni = await createComuni(payload)
// const sottosistemi = await createSottosistemi(payload, comuni)
// const localita = await createLocalita(payload, sottosistemi)
// const edifici = await createEdifici(payload, localita)

console.log('✅ Seed completed')
process.exit(0)

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

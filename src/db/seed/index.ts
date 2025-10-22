import config from '@payload-config'
import { getPayload, Payload } from 'payload'

/* Procedure */

const payload = await getPayload({ config })
await clearDb(payload)
// const comuni = await createComuni(payload)
// const sottosistemi = await createSottosistemi(payload, comuni)
// const localita = await createLocalita(payload, sottosistemi)
// const edifici = await createEdifici(payload, localita)
// process.exit(0)

/* Utils */

async function clearDb(payload: Payload) {
	// const collections = [Collection.Areas, Collection.Plants, Collection.Recipes]
	// for (const collection of collections) {
	// 	await payload.delete({
	// 		collection: collection,
	// 		where: { id: { exists: true } },
	// 	})
	// }
}

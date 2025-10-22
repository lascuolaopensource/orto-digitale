import { getDb } from '@/modules/utils'

//

export default async function HomePage() {
	const db = await getDb()

	const areas = await db.find({
		collection: 'areas',
		select: {
			description: false,
		},
	})

	return (
		<div>
			<pre>{JSON.stringify(areas, null, 2)}</pre>
		</div>
	)
}

import { getDb } from '@/modules/utils'

//

export default async function HomePage() {
	const db = await getDb()

	const plants = await db.find({
		collection: 'plants',
		select: {
			name: true,
		},
	})

	return (
		<div>
			<pre>{JSON.stringify(plants, null, 2)}</pre>
		</div>
	)
}

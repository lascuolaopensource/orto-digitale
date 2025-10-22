import { getDb } from '@/modules/utils'

//

export default async function HomePage() {
	const db = await getDb()

	const recipes = await db.find({
		collection: 'recipes',
		select: {
			name: true,
		},
	})

	return (
		<div>
			<pre>{JSON.stringify(recipes, null, 2)}</pre>
		</div>
	)
}

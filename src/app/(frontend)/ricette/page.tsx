import { getPageParam, Pagination } from '@/modules/components/pagination'
import { getDb, PageProps } from '@/modules/utils'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const recipes = await db.find({
		collection: 'recipes',
		page: await getPageParam(props),
		select: {
			name: true,
		},
	})

	return (
		<div>
			<pre>{JSON.stringify(recipes, null, 2)}</pre>
			<Pagination docs={recipes} basePath="/ricette" />
		</div>
	)
}

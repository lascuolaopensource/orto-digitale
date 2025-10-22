import { getPageParam, Pagination } from '@/modules/components/pagination'
import { getDb, PageProps } from '@/modules/utils'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const plants = await db.find({
		collection: 'plants',
		limit: 20,
		page: await getPageParam(props),
		select: {
			name: true,
		},
	})

	return (
		<>
			<div>
				<pre>{JSON.stringify(plants, null, 2)}</pre>
			</div>

			<Pagination docs={plants} basePath="/piante" />
		</>
	)
}

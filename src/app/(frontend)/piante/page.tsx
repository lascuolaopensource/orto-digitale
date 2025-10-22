import { PageContainer } from '#/components/page-container'
import { getPageParam, Pagination } from '#/components/pagination'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils'
import { PlantCard } from './plant-card'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const plants = await db.find({
		collection: 'plants',
		limit: 18,
		page: await getPageParam(props),
		sort: 'name',
	})

	return (
		<PageContainer className="space-y-8">
			<div className='py-5'>
				<T tag="h1" className='text-center -rotate-2'>{it.plants.page_title}</T>
			</div>

			<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{plants.docs.map((plant) => (
					<PlantCard key={plant.id} plant={plant} />
				))}
			</div>

			<Pagination docs={plants} basePath="/piante" />
		</PageContainer>
	)
}

import { CollectionPage } from '#/components/collection-page'
import { getPageParam } from '#/components/pagination'
import { PlantCard } from '#/components/plant-card'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils/server'

//

export const dynamic = 'force-dynamic'

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const plants = await db.find({
		collection: 'plants',
		limit: 18,
		page: await getPageParam(props),
		sort: 'name',
	})

	return (
		<CollectionPage
			docs={plants}
			basePath="/piante"
			title={it.plants.page_title}
			item={(plant) => <PlantCard key={plant.id} plant={plant} />}
		/>
	)
}

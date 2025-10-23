import { PageContainer } from '#/components/page-container'
import { PageGrid } from '#/components/page-grid'
import { getPageParam, Pagination } from '#/components/pagination'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils'

import { Card } from '@/modules/components/card'
import { Plant } from '@/payload-types'

import { SeasonTag } from './utils'

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
			<div className="py-5">
				<T tag="h1" className="text-center -rotate-2">
					{it.plants.page_title}
				</T>
			</div>

			<PageGrid>
				{plants.docs.map((plant) => (
					<PlantCard key={plant.id} plant={plant} />
				))}
			</PageGrid>

			<Pagination docs={plants} basePath="/piante" />
		</PageContainer>
	)
}

//

type PlantCardProps = {
	plant: Plant
	exploreLinkText?: string
}

export function PlantCard({ plant }: PlantCardProps) {
	return (
		<Card href={`/piante/${plant.id}`} image={true}>
			<h3 className="text-base font-medium transition-colors group-hover:text-primary">
				{plant.name}
			</h3>
			<p className="text-xs italic text-gray-500 text-balance mb-3">{plant.latin_name}</p>
			<SeasonTag season={plant.season} className="-translate-x-1" />
		</Card>
	)
}

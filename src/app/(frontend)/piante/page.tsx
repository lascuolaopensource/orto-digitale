import { Card } from '#/components/card'
import { CollectionPage } from '#/components/collection-page'
import { getPageParam } from '#/components/pagination'
import it from '#/i18n/it.json'
import { PageProps } from '#/utils'
import { getDb } from '#/utils/db'

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
		<CollectionPage
			docs={plants}
			basePath="/piante"
			title={it.plants.page_title}
			item={(plant) => <PlantCard key={plant.id} plant={plant} />}
		/>
	)
}

//

type PlantCardProps = {
	plant: Plant
	className?: string
}

export function PlantCard({ plant, className }: PlantCardProps) {
	return (
		<Card href={`/piante/${plant.id}`} image={true} className={className}>
			<h3 className="text-base font-medium transition-colors group-hover:text-primary">
				{plant.name}
			</h3>
			<p className="text-xs italic text-gray-500 text-balance mb-3">{plant.latin_name}</p>
			<SeasonTag season={plant.season} className="-translate-x-1" />
		</Card>
	)
}

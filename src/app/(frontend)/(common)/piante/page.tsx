import { Card } from '#/components/card'
import { CollectionPage } from '#/components/collection-page'
import { getPageParam } from '#/components/pagination'
import { cn } from '#/components/shadcn/lib/utils'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils/server'

import { Plant } from '@/payload-types'

import { getSeasonDisplayData, SeasonTag } from './utils'

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
	const { tagClassName } = getSeasonDisplayData(plant.season)
	return (
		<Card href={`/piante/${plant.slug}`} image={true} className={className}>
			<T className="font-medium text-balance">{plant.name}</T>
			<p className="text-xs text-primary/70 text-balance italic mb-3">{plant.latin_name}</p>
			<SeasonTag season={plant.season} className={cn(tagClassName, '-translate-x-1')} />
		</Card>
	)
}

import { Card } from '#/components/card'
import { CollectionPage } from '#/components/collection-page'
import { getPageParam } from '#/components/pagination'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils/server'

import { cn } from '@/modules/components/shadcn/lib/utils'
import { Plant } from '@/payload-types'

import { getSeasonDisplayData, SeasonTag } from './utils'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const plants = await db.find({
		collection: 'plants',
		limit: 12,
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
	const { tagClassName, label, cardClassName, titleClassName } = getSeasonDisplayData(plant.season)
	return (
		<Card
			href={`/piante/${plant.slug}`}
			image={true}
			className={cn(className, cardClassName, 'bg-[#fef4e0]')}
			arrowClassName="text-green-900/20 group-hover:text-green-900"
		>
			<h3
				className={cn(
					titleClassName,
					'text-green-900',
					'text-base text-balance font-medium transition-colors',
					'leading-tight mb-1',
				)}
			>
				{plant.name}
			</h3>
			<p className="text-xs italic text-green-900/70 text-balance mb-3">{plant.latin_name}</p>
			<SeasonTag className={cn(tagClassName, '-translate-x-1')}>{label}</SeasonTag>
		</Card>
	)
}

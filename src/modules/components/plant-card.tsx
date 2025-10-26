import { cn } from '$/lib/utils'

import { getSeasonDisplayData, SeasonTag } from '@/app/(frontend)/(common)/piante/utils'
import { Plant } from '@/payload-types'

import { Card } from './card'
import { T } from './t'

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

import { Badge } from '#/components/badge'
import { cn } from '#/components/shadcn/lib/utils'
import it from '#/i18n/it.json'

import { Plant } from '@/payload-types'

//

type Season = Plant['season']

type SeasonDisplayData = {
	tagClassName: string
	label: string
}

const seasonDisplayDataMap: Record<Season, SeasonDisplayData> = {
	'spring-summer': {
		tagClassName: 'bg-yellow-100 text-yellow-700',
		label: it.plants.seasons.spring_summer,
	},
	'fall-winter': {
		tagClassName: 'bg-sky-100 text-sky-700',
		label: it.plants.seasons.fall_winter,
	},
	'all-year': {
		tagClassName: 'bg-lime-100 text-lime-700',
		label: it.plants.seasons.all_year,
	},
}

export function getSeasonDisplayData(season: Season): SeasonDisplayData {
	return seasonDisplayDataMap[season]
}

type SeasonTagProps = {
	season: Season
	className?: string
}

export function SeasonTag(props: SeasonTagProps) {
	const { season, className } = props
	const { label, tagClassName } = getSeasonDisplayData(season)

	return <Badge className={cn(tagClassName, className)}>{label}</Badge>
}

import it from '#/i18n/it.json'
import { cn } from '$/lib/utils'
import { Badge } from '@/modules/components/badge'
import { Plant } from '@/payload-types'

//

type Season = Plant['season']

type SeasonDisplayData = {
	bgClass: string
	label: string
}

const seasonDisplayDataMap: Record<Season, SeasonDisplayData> = {
	'spring-summer': {
		bgClass: 'bg-yellow-500',
		label: it.plants.seasons.spring_summer,
	},
	'fall-winter': {
		bgClass: 'bg-blue-500',
		label: it.plants.seasons.fall_winter,
	},
	'all-year': {
		bgClass: 'bg-purple-500',
		label: it.plants.seasons.all_year,
	},
}

type SeasonTagProps = {
	season: Season
	className?: string
}

export function SeasonTag(props: SeasonTagProps) {
	const { season, className } = props
	const seasonDisplayData = seasonDisplayDataMap[season]
	return (
		<Badge className={cn(seasonDisplayData.bgClass, className)}>{seasonDisplayData.label}</Badge>
	)
}

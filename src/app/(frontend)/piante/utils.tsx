import { Badge } from '#/components/badge'
import it from '#/i18n/it.json'

import { Plant } from '@/payload-types'

//

type Season = Plant['season']

type SeasonDisplayData = {
	tagClassName: string
	cardClassName: string
	titleClassName: string
	label: string
}

const seasonDisplayDataMap: Record<Season, SeasonDisplayData> = {
	'spring-summer': {
		tagClassName: 'bg-yellow-200 text-yellow-800',
		cardClassName: 'border-yellow-300 hover:border-yellow-400',
		titleClassName: '',
		label: it.plants.seasons.spring_summer,
	},
	'fall-winter': {
		tagClassName: 'bg-sky-200 text-sky-800',
		cardClassName: 'border-sky-300 hover:border-sky-400',
		titleClassName: '',
		label: it.plants.seasons.fall_winter,
	},
	'all-year': {
		tagClassName: 'bg-lime-200 text-lime-900',
		cardClassName: 'border-lime-400 hover:border-lime-500',
		titleClassName: '',
		label: it.plants.seasons.all_year,
	},
}

export function getSeasonDisplayData(season: Season): SeasonDisplayData {
	return seasonDisplayDataMap[season]
}

type SeasonTagProps = {
	children: React.ReactNode
	className?: string
}

export function SeasonTag(props: SeasonTagProps) {
	const { children, className } = props

	return <Badge className={className}>{children}</Badge>
}

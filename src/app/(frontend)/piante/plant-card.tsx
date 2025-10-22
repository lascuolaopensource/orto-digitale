import it from '#/i18n/it.json'
import { cn } from '$/lib/utils'
import { getRandomItem } from '@/modules/utils'
import { Plant } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

// 

type PlantCardProps = {
	plant: Plant
	exploreLinkText?: string
}

export function PlantCard({ plant}: PlantCardProps) {
	const rotationClass = getRandomItem(rotationClasses)

	return (
		<Link
			href={`/piante/${plant.id}`}
			className={cn(
				"p-4 group flex justify-between items-center rounded-lg gap-4 bg-card",
				"border border-gray-200 hover:border-gray-300 hover:shadow-sm",
				rotationClass,
				"transition-transform hover:z-10",
			)}
		>
			<div className="flex items-center gap-4">
				<FallbackImage />
				<div>
					<h3 className="text-base font-medium transition-colors group-hover:text-primary">
						{plant.name}
					</h3>
					<p className="text-xs italic text-gray-500 text-balance mb-3">{plant.latin_name}</p>
					<SeasonTag season={plant.season} className='-translate-x-1' />
				</div>
			</div>
			<ArrowRight size={24} className="text-primary/20 transition-transform group-hover:translate-x-1" />
		</Link>
	)
}

function FallbackImage() {
	return (
		<div
			className={cn(
				'shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100',
				'flex items-center justify-center',
			)}
		>
			<svg
				className="h-8 w-8 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
				/>
			</svg>
		</div>
	)
}

const rotationClasses = [
	'rotate-0 hover:-rotate-2',
	'rotate-2 hover:rotate-0',
	'rotate-4 hover:rotate-2',
	'rotate-0 hover:-rotate-2',
	'-rotate-2 hover:-rotate-4',
	'-rotate-4 hover:-rotate-6',
]

// 

type Season = Plant["season"]

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

function SeasonTag(props: SeasonTagProps) {
	const { season, className } = props
	const seasonDisplayData = seasonDisplayDataMap[season]
	return (
		<div className={cn(
			'px-2 py-0.5 rounded-md text-white text-xs w-fit',
			seasonDisplayData.bgClass,
			className,
		)}>
			{seasonDisplayData.label}
		</div>
	)
}
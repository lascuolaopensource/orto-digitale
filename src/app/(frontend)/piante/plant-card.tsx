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
				"p-4 group flex justify-between items-center rounded-lg gap-4",
				"border border-gray-200 hover:border-gray-300 hover:shadow-sm",
				rotationClass,
				"transition-transform",
			)}
		>
			<div className="flex items-center gap-4">
				<FallbackImage />
				<div>
					<h3 className="text-base font-medium transition-colors group-hover:text-primary">
						{plant.name}
					</h3>
					<p className="text-xs italic text-gray-500 text-balance">{plant.latin_name}</p>
					<p className="text-sm text-gray-500">{plant.season}</p>
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
	'rotate-0 hover:rotate-2',
	'rotate-2 hover:rotate-4',
	'rotate-4 hover:rotate-6',
	'rotate-0 hover:-rotate-2',
	'-rotate-2 hover:-rotate-4',
	'-rotate-4 hover:-rotate-6',
]
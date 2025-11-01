import { BoxedHeading } from '#/components/boxed-heading'
import OrtoMap from '#/components/orto-map'
import { T } from '#/components/t'
import { getDb } from '#/utils/server'
import { cn } from '$/lib/utils'
import { ArrowBigDown } from 'lucide-react'

//

export const dynamic = 'force-dynamic'

export default async function HomePage() {
	const db = await getDb()
	const { docs } = await db.find({
		collection: 'areas',
		limit: 0,
	})

	return (
		<div
			className={cn(
				'flex flex-row-reverse overflow-x-scroll p-6',
				'xl:flex-col xl:max-w-7xl xl:mx-auto xl:overflow-auto xl:w-full',
			)}
		>
			<OrtoMap areas={docs} className="h-[calc(100svh-6.5rem)] xl:h-auto">
				<div className="flex items-center gap-6 pr-6">
					<ArrowBigDown size={40} className="animate-bounce rotate-90 text-primary" />
					<div className="flex flex-col items-end">
						<BoxedHeading tag="h1" className="w-fit mb-2 translate-x-2">
							Scopri l'orto!
						</BoxedHeading>
						<T className="max-w-[300px] text-balance text-right">
							Clicca su un'area colorata
							<br /> per scoprire di più!
							<br /> <span className="text-xs italic">(scrolla a sinistra se serve)</span>
						</T>
					</div>
				</div>
			</OrtoMap>
		</div>
	)
}

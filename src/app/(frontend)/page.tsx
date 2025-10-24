import { BoxedHeading } from '#/components/boxed-heading'
import OrtoMap from '#/components/orto-map'
import { T } from '#/components/t'
import { getDb } from '#/utils/db'
import { cn } from '$/lib/utils'
import { ArrowBigDown } from 'lucide-react'

//

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
			<OrtoMap areas={docs} className="h-[calc(100svh-102px)] xl:h-auto">
				<div className="flex items-center gap-8 pr-6">
					<ArrowBigDown size={40} className="animate-bounce rotate-90" />
					<div className="flex flex-col items-end">
						<BoxedHeading tag="h2" className="w-fit mb-2 translate-x-2">
							Scopri l'orto!
						</BoxedHeading>
						<T className="max-w-[300px] text-balance text-right">
							Clicca su un'area colorata
							<br /> per scoprire di più!
						</T>
					</div>
				</div>
			</OrtoMap>
		</div>
	)
}

import { cn } from '$/lib/utils'
import { ArrowBigDown } from 'lucide-react'

import { BoxedHeading } from '@/modules/components/boxed-heading'
import Giardino from '@/modules/components/giardino'
import { T } from '@/modules/components/t'

export default async function HomePage() {
	return (
		<div
			className={cn(
				'flex flex-row-reverse overflow-x-scroll p-6',
				'xl:flex-col xl:max-w-7xl xl:mx-auto xl:overflow-auto xl:w-full',
			)}
		>
			<Giardino className="h-[calc(100svh-102px)] xl:h-auto">
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
			</Giardino>
		</div>
	)
}

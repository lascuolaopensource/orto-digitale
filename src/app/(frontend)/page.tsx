import { ArrowBigDown } from 'lucide-react'

import { BoxedHeading } from '@/modules/components/boxed-heading'
import Giardino from '@/modules/components/giardino'
import { T } from '@/modules/components/t'

export default async function HomePage() {
	return (
		<div className="flex flex-row-reverse w-full overflow-x-scroll p-6">
			<Giardino className="h-[calc(100vh-86px)]">
				<div className="flex items-center gap-8 pr-6">
					<ArrowBigDown size={40} className="animate-bounce rotate-90" />
					<div className="flex flex-col items-end">
						<BoxedHeading tag="h2" className="w-fit mb-2 translate-x-2">
							Scopri l'orto!
						</BoxedHeading>
						<T className="max-w-[300px] text-balance text-right">
							Clicca su un'area colorata
							<br /> per scoprire di più!
							<br />
							<span className="text-sm italic">(Se serve, scrolla a sinistra)</span>
						</T>
					</div>
				</div>
			</Giardino>
		</div>
	)
}

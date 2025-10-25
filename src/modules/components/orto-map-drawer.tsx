'use client'

import { Drawer, DrawerContent, DrawerTitle } from '$/components/ui/drawer'

import { Area } from '@/payload-types'

import { BoxedHeading } from './boxed-heading'
import { RichText } from './richtext'

//

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
	area?: Area
}

export function OrtoMapDrawer(props: Props) {
	const { open, setOpen, area } = props

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent className="min-h-[50vh] [&>:first-child]:bg-primary">
				<div className="overflow-y-auto">
					<div className="flex mx-auto max-w-lg flex-col items-center gap-6 p-6 ">
						<DrawerTitle asChild>
							<BoxedHeading tag="h1" className="w-fit">
								{area?.name}
							</BoxedHeading>
						</DrawerTitle>
						{area?.description && <RichText data={area.description} />}
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

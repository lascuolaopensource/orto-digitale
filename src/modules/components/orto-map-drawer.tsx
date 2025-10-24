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
			<DrawerContent className="min-h-[50vh]">
				<div className="mx-auto max-w-lg p-6 overflow-y-auto flex flex-col items-center gap-6">
					<DrawerTitle asChild>
						<BoxedHeading tag="h1" className="w-fit">
							{area?.name}
						</BoxedHeading>
					</DrawerTitle>
					{area?.description && <RichText data={area.description} />}
				</div>
			</DrawerContent>
		</Drawer>
	)
}

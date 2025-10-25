import { getRandomRotationClass, LinkProps } from '#/utils'
import { cn } from '$/lib/utils'
import { ArrowRight, LeafIcon } from 'lucide-react'
import Link from 'next/link'

//

type Props = LinkProps & {
	image?: boolean
}

export function Card(props: Props) {
	const { children, href, className, image = true, ...rest } = props
	const [outerRotationClass, innerRotationClass] = getRandomRotationClass('lg')

	return (
		<Link
			href={href}
			className={cn(
				'p-4 group rounded-lg bg-card transition-all border border-primary notebook',
				'hover:z-10 hover:-translate-1 hover:ring-2 hover:ring-primary hover:border-primary hover:shadow-sm',
				outerRotationClass,
				className,
			)}
			{...rest}
		>
			<div className={cn(innerRotationClass, 'flex justify-between items-center gap-5')}>
				<div className="flex items-center gap-4 text-primary">
					{image && <FallbackImage />}
					<div>{children}</div>
				</div>
				<ArrowRight
					size={20}
					className="transition-transform group-hover:translate-x-1 text-primary shrink-0"
				/>
			</div>
		</Link>
	)
}

function FallbackImage() {
	return (
		<div
			className={cn(
				'shrink-0 h-12 w-12 rounded-full overflow-hidden bg-primary/10',
				'flex items-center justify-center',
			)}
		>
			<LeafIcon />
		</div>
	)
}

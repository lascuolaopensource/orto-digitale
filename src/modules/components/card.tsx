import { getRandomRotationClass, LinkProps } from '#/utils'
import { cn } from '$/lib/utils'
import { ArrowRight } from 'lucide-react'
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
				'p-4 group rounded-lg bg-card transition-all',
				'border border-primary',
				'hover:border-primary hover:shadow-sm',
				outerRotationClass,
				'hover:z-10 hover:-translate-1 hover:ring-2 hover:ring-primary',
				className,
			)}
			{...rest}
		>
			<div className={cn(innerRotationClass, 'flex justify-between items-center gap-5')}>
				<div className="flex items-center gap-4">
					{image && <FallbackImage />}
					<div>{children}</div>
				</div>
				<ArrowRight
					size={20}
					className="text-primary/20 transition-transform group-hover:translate-x-1 group-hover:text-primary shrink-0"
				/>
			</div>
		</Link>
	)
}

function FallbackImage() {
	return (
		<div
			className={cn(
				'shrink-0 h-12 w-12 rounded-full overflow-hidden bg-orange-900/5',
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

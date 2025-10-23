import { getRandomRotationClass } from '#/utils'
import { cn } from '$/lib/utils'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

//

type Props = {
	children: React.ReactNode
	href: string
	className?: string
	image?: boolean
}

export function Card(props: Props) {
	const { children, href, className, image = true } = props

	return (
		<Link
			href={href}
			className={cn(
				'p-4 group flex justify-between items-center rounded-lg gap-4 bg-card',
				'border border-gray-200 hover:border-gray-300 hover:shadow-sm',
				getRandomRotationClass('lg'),
				'transition-transform hover:z-10',
				className,
			)}
		>
			<div className="flex items-center gap-4">
				{image && <FallbackImage />}
				<div>{children}</div>
			</div>
			<ArrowRight
				size={24}
				className="text-primary/20 transition-transform group-hover:translate-x-1"
			/>
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

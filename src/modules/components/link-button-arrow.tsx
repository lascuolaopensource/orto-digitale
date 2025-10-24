import { cn } from '$/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	href: string
	children: React.ReactNode
	className?: string
	external?: boolean
}

export function LinkButtonArrow(props: Props) {
	const { href, children, className, external } = props
	return (
		<Link
			href={href}
			className={cn(
				'group',
				'flex justify-center items-center gap-1 ',
				'p-3 py-2 rounded-lg',
				'bg-card text-orange-600 border border-orange-500',
				'hover:ring-2 hover:ring-orange-600',
				className,
			)}
			target={external ? '_blank' : undefined}
		>
			<span>{children}</span>
			<ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
		</Link>
	)
}

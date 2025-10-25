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
				'flex justify-center items-center gap-1 transition-all',
				'p-3 py-2 rounded-lg',
				' text-rose-400 bg-rose-50 border border-rose-300',
				'hover:ring-2',
				className,
			)}
			target={external ? '_blank' : undefined}
		>
			<span>{children}</span>
			<ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
		</Link>
	)
}

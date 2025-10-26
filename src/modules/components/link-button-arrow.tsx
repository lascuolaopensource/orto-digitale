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
				'px-4 py-2 rounded-lg bg-accent text-accent-foreground font-bold',
				className,
			)}
			target={external ? '_blank' : undefined}
		>
			<span>{children}</span>
			<ArrowRightIcon
				size={16}
				strokeWidth="4"
				className="group-hover:translate-x-1 transition-transform"
			/>
		</Link>
	)
}

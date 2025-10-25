import { cn } from '$/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export function PageGrid(props: Props) {
	const { children, className } = props
	return (
		<div
			className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-center', className)}
		>
			{children}
		</div>
	)
}

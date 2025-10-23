import { cn } from './shadcn/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export function Badge(props: Props) {
	const { children, className } = props
	return (
		<div className={cn('px-2 py-0.5 rounded-md bg-blue-500 text-white text-xs w-fit', className)}>
			{children}
		</div>
	)
}

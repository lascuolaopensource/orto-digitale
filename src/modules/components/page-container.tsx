import { cn } from '$/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export function PageContainer({ children, className }: Props) {
	return <div className={cn('max-w-7xl mx-auto px-6 py-8', className)}>{children}</div>
}

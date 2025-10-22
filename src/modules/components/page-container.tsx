import { cn } from '$/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export function PageContainer({ children, className }: Props) {
	return <div className={cn('container mx-auto px-4 py-8', className)}>{children}</div>
}

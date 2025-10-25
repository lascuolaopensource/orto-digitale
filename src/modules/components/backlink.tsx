import { cn } from '$/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

type BackLinkProps = {
	href: string
	children: React.ReactNode
	className?: string
}

export async function BackLink({ href, children, className }: BackLinkProps) {
	let actualHref = href

	// This is needed to preserve previous searchParams
	const headersList = await headers()
	const referer = headersList.get('referer')
	if (referer) {
		const previousUrl = new URL(referer)
		if (previousUrl.pathname === href) {
			actualHref = previousUrl.pathname + previousUrl.search
		}
	}

	return (
		<Link
			href={actualHref}
			className={cn(
				'flex gap-1 items-center',
				'text-sm font-medium text-primary transition-colors hover:text-primary-foreground hover:bg-primary p-2 rounded-lg w-fit',
				className,
			)}
		>
			<ArrowLeft size={16} />
			{children}
		</Link>
	)
}

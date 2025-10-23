import { getRandomRotationClass } from '#/utils'
import { cn } from '$/lib/utils'
import Link from 'next/link'

//

export function Navbar() {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
				<NavbarLink href="/">🏠 Home</NavbarLink>
				<div className="flex -space-x-0.5">
					<NavbarLink href="/piante">🌱 Piante</NavbarLink>
					<NavbarLink href="/scopri">🍱 Scopri l'orto</NavbarLink>
					<NavbarLink href="/ricette">🍽️ Ricette</NavbarLink>
					<NavbarLink href="/about">👤 About</NavbarLink>
				</div>
			</div>
		</div>
	)
}

//

type NavbarLinkProps = {
	href: string
	children: React.ReactNode
}

function NavbarLink(props: NavbarLinkProps) {
	const { href, children } = props
	return (
		<Link
			href={href}
			className={cn(
				'border border-red-500 p-2 rounded-lg block w-fit bg-card',
				'text-sm font-medium text-primary hover:text-primary/80',
				'transition-transform hover:bg-red-400 hover:text-white hover:z-10',
				getRandomRotationClass('md'),
			)}
		>
			{children}
		</Link>
	)
}

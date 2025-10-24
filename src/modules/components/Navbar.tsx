import { getRandomRotationClass } from '#/utils'
import { Button } from '$/components/ui/button'
import { cn } from '$/lib/utils'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

//

export function Navbar() {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
				<NavbarLink href="/">🏠 Home</NavbarLink>

				<div className="-space-x-0.5 hidden sm:flex">
					<NavbarLink href="/piante">🌱 Piante</NavbarLink>
					<NavbarLink href="/scopri">🍱 Scopri l'orto</NavbarLink>
					<NavbarLink href="/ricette">🍽️ Ricette</NavbarLink>
					<NavbarLink href="/about">👤 About</NavbarLink>
				</div>

				<Button className={cn(buttonClasses(), 'sm:hidden flex items-center cursor-pointer')}>
					<MenuIcon size={24} />
					<span>Menu</span>
				</Button>
			</div>
		</div>
	)
}

//

type NavbarLinkProps = {
	href: string
	children: React.ReactNode
}

function buttonClasses() {
	return cn(
		'border border-red-500 p-2 rounded-lg block w-fit bg-card',
		'text-sm font-medium text-primary hover:text-primary/80',
		'transition-transform hover:bg-red-400 hover:text-white hover:z-10',
		getRandomRotationClass('md'),
	)
}

function NavbarLink(props: NavbarLinkProps) {
	const { href, children } = props
	return (
		<Link href={href} className={buttonClasses()}>
			{children}
		</Link>
	)
}

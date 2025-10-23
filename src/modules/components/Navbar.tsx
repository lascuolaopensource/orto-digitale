import Link from 'next/link'

export function Navbar() {
	return (
		<div>
			<div className="max-w-7xl mx-auto px-6 py-2">
				<NavbarLink href="/">Home</NavbarLink>
				<NavbarLink href="/piante">Piante</NavbarLink>
				<NavbarLink href="/scopri">Scopri</NavbarLink>
				<NavbarLink href="/ricette">Ricette</NavbarLink>
				<NavbarLink href="/about">About</NavbarLink>
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
			className="text-sm font-medium text-primary hover:text-primary/80 hover:underline"
		>
			{children}
		</Link>
	)
}

import Link from 'next/link'

export function Navbar() {
	return (
		<div>
			<Link href="/">Home</Link>
			<Link href="/plants">Piante</Link>
			<Link href="/recipes">Ricette</Link>
			<Link href="/about">About</Link>
			<Link href="/contact">Contact</Link>
		</div>
	)
}

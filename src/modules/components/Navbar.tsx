import Link from 'next/link'

export function Navbar() {
	return (
		<div>
			<Link href="/">Home</Link>
			<Link href="/piante">Piante</Link>
			<Link href="/scopri">Scopri</Link>
			<Link href="/ricette">Ricette</Link>
			<Link href="/about">About</Link>
		</div>
	)
}

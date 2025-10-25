import Link from 'next/link'

const footerLinks = [
	{
		title: 'Fondazione Cascina Cotica',
		href: 'https://www.cascinacotica.com/la-fondazione/',
	},
]

export default async function Footer() {
	return (
		<footer className="bg-green-900 text-white grow mt-20">
			<div className="mx-auto max-w-7xl px-8 py-6 pt-20">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					{/* Left side: Links */}
					<ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
						{footerLinks.map(({ title, href }) => (
							<li key={title}>
								<Link href={href}>{title}</Link>
							</li>
						))}
					</ul>

					{/* Right side: Social & copyright */}
					<div className="mt-4 flex flex-col items-start sm:mt-0 sm:items-end">
						<div className="flex items-center gap-3 text-muted-foreground">
							<Link href="https://www.instagram.com/cascinacotica/?hl=it" target="_blank">
								<img src="/instagram.svg" className="h-4 w-4" />
							</Link>

							<Link href="https://www.facebook.com/cascinacoticacooperativa" target="_blank">
								<img src="/facebook.svg" className="h-4 w-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

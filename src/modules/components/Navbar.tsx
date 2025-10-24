'use client'

import { getRandomRotationClass } from '#/utils'
import { Button } from '$/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '$/components/ui/drawer'
import { cn } from '$/lib/utils'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

//

type Link = {
	href: string
	text: string
}

const navbarLinks: Link[] = [
	{ href: '/piante', text: '🌱 Piante' },
	{ href: '/scopri', text: "🍱 Scopri l'orto" },
	{ href: '/ricette', text: '🍽️ Ricette' },
	{ href: '/about', text: '👤 About' },
]

export function Navbar() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<div>
				<div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
					<NavbarLink href="/" text="🏠 Home" />

					<div className="-space-x-0.5 hidden sm:flex">
						{navbarLinks.map((link) => (
							<NavbarLink key={link.href} {...link} />
						))}
					</div>

					<Button
						onClick={() => setOpen(true)}
						className={cn(buttonClasses(), 'sm:hidden flex items-center cursor-pointer')}
					>
						<MenuIcon size={24} />
						<span>Menu</span>
					</Button>
				</div>
			</div>

			<Drawer open={open} onOpenChange={setOpen} direction="right">
				<DrawerContent className="min-h-[50vh] p-6">
					<DrawerTitle asChild>
						<div className="flex items-center justify-between">
							<p>Menu</p>
							<DrawerClose asChild>
								<Button className={buttonClasses()}>
									<XIcon />
								</Button>
							</DrawerClose>
						</div>
					</DrawerTitle>

					<div className="space-y-2 pt-6">
						{navbarLinks.map((link) => (
							<NavbarLink
								key={link.href}
								{...link}
								className="w-full text-center"
								onClick={() => setOpen(false)}
							/>
						))}
					</div>
				</DrawerContent>
			</Drawer>
		</>
	)
}

//

function buttonClasses() {
	return cn(
		'border border-red-500 p-2 rounded-lg block w-fit bg-card',
		'text-sm font-medium text-primary hover:text-primary/80',
		'transition-transform hover:bg-red-400 hover:text-white hover:z-10 cursor-pointer',
		getRandomRotationClass('md'),
	)
}

type NavbarLinkProps = Link & {
	className?: string
	onClick?: () => void
}

function NavbarLink(props: NavbarLinkProps) {
	const { href, text, className, onClick } = props
	return (
		<Link href={href} className={cn(buttonClasses(), className)} onClick={onClick}>
			{text}
		</Link>
	)
}

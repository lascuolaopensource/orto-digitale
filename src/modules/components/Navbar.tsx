'use client'

import it from '#/i18n/it.json'
import { getRandomRotationClass } from '#/utils'
import { Button } from '$/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '$/components/ui/drawer'
import { cn } from '$/lib/utils'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

//

type Link = {
	href: string
	text: string
	external?: boolean
}

type Props = {
	formUrl?: string | null
}

export function Navbar(props: Props) {
	const { formUrl } = props
	const [open, setOpen] = useState(false)

	const navbarLinks: Link[] = [
		{ href: '/about', text: '👤 About' },
		{ href: '/scopri', text: "🍱 Scopri l'orto" },
		{ href: '/piante', text: '🌱 Piante' },
		{ href: '/ricette', text: '🍽️ Ricette' },
	]

	if (formUrl) {
		navbarLinks.push({ href: formUrl, text: `💬 ${it.Suggest_a_recipe}`, external: true })
	}

	return (
		<>
			<div>
				<div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
					<NavbarLink href="/" text="🏠 Home" />

					<div className="space-x-0.5 hidden md:flex">
						{navbarLinks.map((link) => (
							<NavbarLink key={link.href} {...link} />
						))}
					</div>

					<Button
						onClick={() => setOpen(true)}
						className={cn(buttonClasses(), 'md:hidden flex items-center cursor-pointer')}
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
	)
}

type NavbarLinkProps = Link & {
	className?: string
	onClick?: () => void
	external?: boolean
}

function NavbarLink(props: NavbarLinkProps) {
	const { href, text, className, onClick, external } = props

	const [isHydrated, setIsHydrated] = useState(false)
	useEffect(() => {
		setIsHydrated(true)
	}, [])

	return (
		<Link
			href={href}
			className={cn(
				buttonClasses(),
				className,
				isHydrated ? getRandomRotationClass('md') : undefined,
			)}
			onClick={onClick}
			target={external ? '_blank' : undefined}
		>
			{text}
		</Link>
	)
}

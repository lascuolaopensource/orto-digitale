'use client'

import { Button } from '$/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '$/components/ui/drawer'
import { cn } from '$/lib/utils'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { LinkProps } from '../utils'
import { T } from './t'

//

type Props = {
	formUrl?: string | null
}

export function Navbar(props: Props) {
	const { formUrl } = props
	const [open, setOpen] = useState(false)

	const navbarLinks: LinkProps[] = [
		{ href: '/about', title: '👤 About' },
		{ href: '/scopri', title: "🍱 Scopri l'orto" },
		{ href: '/piante', title: '🌱 Piante' },
		{ href: '/ricette', title: '🍽️ Ricette' },
		{
			href: formUrl ?? '',
			title: '💬 Proponi una ricetta',
			target: '_blank',
			className: 'visible sm:hidden',
		},
	]

	return (
		<>
			<div>
				<div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
					<NavbarLink href="/" title="🏠 Home" />

					<div className="space-x-0.5 hidden md:flex">
						{navbarLinks.map((link) => (
							<NavbarLink key={link.href.toString()} {...link} />
						))}
					</div>

					<Button
						onClick={() => setOpen(true)}
						variant={'ghost'}
						className={cn(buttonClasses(), 'md:hidden flex items-center cursor-pointer')}
					>
						<MenuIcon size={24} />
						<span>Menu</span>
					</Button>
				</div>
			</div>

			<Drawer open={open} onOpenChange={setOpen} direction="right">
				<DrawerContent className="min-h-[50vh] p-6" aria-describedby={undefined}>
					<DrawerTitle asChild>
						<div className="flex items-center justify-between">
							<T className="text-primary">Menu</T>
							<DrawerClose asChild>
								<Button
									variant="default"
									className={cn(buttonClasses(), 'text-primary-foreground hover:bg-primary/90')}
								>
									<XIcon />
								</Button>
							</DrawerClose>
						</div>
					</DrawerTitle>

					<div className="flex flex-col gap-2 items-center pt-6">
						{navbarLinks.map((link) => (
							<NavbarLink
								key={link.href.toString()}
								{...link}
								className="text-center border w-full max-w-[300px] bg-primary text-primary-foreground hover:bg-primary/90"
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

function NavbarLink(props: LinkProps) {
	const { className, title, ...rest } = props
	return (
		<Link className={cn(buttonClasses(), className)} title={title} {...rest}>
			{title}
		</Link>
	)
}

function buttonClasses() {
	return cn(
		'p-2 rounded-lg block w-fit cursor-pointer',
		'font-medium text-primary hover:bg-primary hover:text-primary-foreground',
		'hover:-rotate-2 transition-transform',
		'select-none',
	)
}

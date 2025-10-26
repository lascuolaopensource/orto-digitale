import { Navbar } from '#/components/navbar'
import { cn } from '#/components/shadcn/lib/utils'
import { getDb } from '#/utils/server'
import { Solway } from 'next/font/google'
import React from 'react'

import './layout.css'

//

const crimsonPro = Solway({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700', '800'],
	variable: '--font-solway',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props
	const db = await getDb()

	const meta = await db.findGlobal({
		slug: 'meta',
	})

	return (
		<html lang="en" className={cn(crimsonPro.className, 'bg-primary')}>
			<body>
				<main className="min-h-screen flex flex-col bg-background">
					<Navbar formUrl={meta.recipes_form_url} />
					{children}
				</main>
			</body>
		</html>
	)
}

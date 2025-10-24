import { Navbar } from '#/components/navbar'
import React from 'react'

import { getDb } from '@/modules/utils/server'

import './layout.css'

//

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props
	const db = await getDb()

	const meta = await db.findGlobal({
		slug: 'meta',
	})

	return (
		<html lang="en">
			<body>
				<main className="min-h-screen flex flex-col">
					<Navbar formUrl={meta.recipes_form_url} />
					{children}
					{/* <Footer /> */}
				</main>
			</body>
		</html>
	)
}

import Footer from '#/components/footer'
import { Navbar } from '#/components/navbar'
import React from 'react'

import './layout.css'

//

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="en">
			<body>
				<main>
					<Navbar />
					{children}
					<Footer />
				</main>
			</body>
		</html>
	)
}

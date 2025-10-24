import { Navbar } from '#/components/navbar'
import React from 'react'

import './layout.css'

//

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="en">
			<body>
				<main className="min-h-screen flex flex-col">
					<Navbar />
					{children}
					{/* <Footer /> */}
				</main>
			</body>
		</html>
	)
}

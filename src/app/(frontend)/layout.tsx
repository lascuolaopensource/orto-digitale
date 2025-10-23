import { Navbar } from '#/components/Navbar'
import React from 'react'
import './layout.css'

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props

	return (
		<html lang="en">
			<body>
				<main>
					<Navbar />
					{children}
					{/* <Footer /> */}
				</main>
			</body>
		</html>
	)
}

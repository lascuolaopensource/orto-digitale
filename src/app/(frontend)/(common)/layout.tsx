import Footer from '#/components/footer'
import React from 'react'

//

export default async function FooterLayout(props: { children: React.ReactNode }) {
	const { children } = props
	return (
		<>
			{children}
			<Footer />
		</>
	)
}

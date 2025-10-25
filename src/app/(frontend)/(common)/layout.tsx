import React from 'react'

import Footer from '#/components/footer'

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

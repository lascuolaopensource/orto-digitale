import it from '#/i18n/it.json'
import { getDb } from '#/utils'

import { Card } from '@/modules/components/card'
import { PageStructure } from '@/modules/components/page-structure'

//

export default async function HomePage() {
	const db = await getDb()

	const areas = await db.find({
		collection: 'areas',
		limit: 0,
		select: {
			description: false,
		},
	})

	return (
		<PageStructure
			docs={areas}
			basePath="/scopri"
			title={it.discover.page_title}
			item={(area) => (
				<Card key={area.id} href={`/scopri/${area.id}`}>
					{area.name}
				</Card>
			)}
		/>
	)
}

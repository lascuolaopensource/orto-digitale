import { Badge } from '#/components/badge'
import { Card } from '#/components/card'
import { PageStructure } from '#/components/page-structure'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, getRecords } from '#/utils'
import { Area } from '@/payload-types'

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
			item={(area) => <AreaCard key={area.id} area={area} />}
		/>
	)
}

function AreaCard({ area }: { area: Area }) {
	const plants = getRecords(area.plants?.docs)
	return (
		<Card href={`/scopri/${area.id}`}>
			<T>{area.name}</T>
			{plants.length > 0 && (
				<Badge className="bg-green-600 mt-1">
					{plants.length} {it.plants_count}
				</Badge>
			)}
		</Card>
	)
}

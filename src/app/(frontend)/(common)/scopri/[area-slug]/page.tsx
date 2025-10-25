import { BackLink } from '#/components/backlink'
import { BoxedHeading } from '#/components/boxed-heading'
import { PageContainer } from '#/components/page-container'
import { PageGrid } from '#/components/page-grid'
import { RichText } from '#/components/richtext'
import it from '#/i18n/it.json'
import { getDb, getOne, getRecords } from '#/utils/server'

import { PlantCard } from '../../piante/page'

//

type Props = {
	params: Promise<{ 'area-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const key = (await props.params)['area-slug']

	const area = getOne(
		await db.find({
			collection: 'areas',
			where: { key: { equals: key } },
		}),
	)

	const plants = getRecords(area.plants?.docs)

	return (
		<PageContainer className="max-w-4xl space-y-10">
			<BackLink href="/scopri">{it.discover.back}</BackLink>
			<div className="space-y-6">
				<BoxedHeading tag="h1" className="w-fit">
					{area.name}
				</BoxedHeading>
				{area.description && <RichText data={area.description} className="max-w-xl" />}
			</div>
			{plants.length > 0 && (
				<div className="flex flex-col items-center justify-center gap-6">
					<BoxedHeading tag="h3">{it.discover.plants}</BoxedHeading>
					<PageGrid>
						{plants.map((plant) => (
							<PlantCard key={plant.id} plant={plant} />
						))}
					</PageGrid>
				</div>
			)}
		</PageContainer>
	)
}

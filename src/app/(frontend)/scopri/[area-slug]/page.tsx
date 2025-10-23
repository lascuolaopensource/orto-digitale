import it from '#/i18n/it.json'
import { getDb, getOne, getRecords } from '#/utils'
import { BackLink } from '@/modules/components/backlink'
import { BoxedHeading } from '@/modules/components/boxed-heading'
import { PageContainer } from '@/modules/components/page-container'
import { RichText } from '@/modules/components/richtext'
import { PlantCard } from '../../piante/page'

type Props = {
	params: Promise<{ 'area-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const areaId = (await props.params)['area-slug']

	const area = getOne(
		await db.find({
			collection: 'areas',
			where: { id: { equals: areaId } },
		}),
	)

	const plants = getRecords(area.plants?.docs)

	return (
		<PageContainer className="max-w-4xl space-y-10">
			<BackLink fallbackHref="/scopri">{it.discover.back}</BackLink>
			<div className="flex flex-col items-center justify-center gap-4">
				<BoxedHeading tag="h1" className="w-fit">
					{area.name}
				</BoxedHeading>
				{area.description && <RichText data={area.description} className="max-w-xl" />}
			</div>
			{plants.length > 0 && (
				<div className="flex flex-col items-center justify-center gap-4">
					<BoxedHeading tag="h3" className="text-center w-fit">
						{it.discover.plants}
					</BoxedHeading>
					<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{plants.map((plant) => (
							<PlantCard key={plant.id} plant={plant} />
						))}
					</div>
				</div>
			)}
		</PageContainer>
	)
}

import it from '#/i18n/it.json'
import { getDb, getOne, getRecords } from '#/utils'
import { BackLink } from '@/modules/components/backlink'
import { PageContainer } from '@/modules/components/page-container'
import { RichText } from '@/modules/components/richtext'

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
		<PageContainer>
			<BackLink href="/scopri">{it.discover.back}</BackLink>
			{area.description && <RichText data={area.description} />}
		</PageContainer>
	)
}

import { getDb, getOne } from '#/utils'

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
}

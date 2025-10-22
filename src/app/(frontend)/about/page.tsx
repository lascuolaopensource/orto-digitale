import { getDb } from '@/modules/utils'

//

export default async function HomePage() {
	const db = await getDb()

	const about = await db.findGlobal({
		slug: 'about',
	})

	return (
		<div>
			<pre>{JSON.stringify(about, null, 2)}</pre>
		</div>
	)
}

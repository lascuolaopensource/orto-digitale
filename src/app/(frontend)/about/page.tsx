import { BoxedHeading } from '#/components/boxed-heading'
import { PageContainer } from '#/components/page-container'
import { RichText } from '#/components/richtext'
import it from '#/i18n/it.json'
import { getDb } from '#/utils'

//

export default async function HomePage() {
	const db = await getDb()

	const about = await db.findGlobal({
		slug: 'about',
	})

	return (
		<PageContainer>
			<div className="max-w-xl mx-auto">
				<BoxedHeading tag="h1" className="-rotate-2 mb-8">
					{it.about_us}
				</BoxedHeading>
				<RichText data={about.description} />
			</div>
		</PageContainer>
	)
}

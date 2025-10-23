import { Card } from '#/components/card'
import { getPageParam } from '#/components/pagination'
import it from '#/i18n/it.json'
import { getDb, PageProps } from '#/utils'

import { CollectionPage } from '#/components/collection-page'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const recipes = await db.find({
		collection: 'recipes',
		page: await getPageParam(props),
		select: {
			name: true,
		},
	})

	return (
		<CollectionPage
			docs={recipes}
			basePath="/ricette"
			title={it.recipes.page_title}
			item={(recipe) => (
				<Card key={recipe.id} href={`/ricette/${recipe.id}`}>
					{recipe.name}
				</Card>
			)}
		/>
	)
}

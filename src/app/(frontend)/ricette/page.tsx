import { LinkButtonArrow } from '#/components/link-button-arrow'
import { PageContainer } from '#/components/page-container'
import { getPageParam, Pagination } from '#/components/pagination'
import { getDb, PageProps } from '#/utils'

import { PageGrid } from '@/modules/components/page-grid'

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
		<PageContainer>
			<PageGrid>
				{recipes.docs.map((recipe) => (
					<LinkButtonArrow key={recipe.id} href={`/ricette/${recipe.id}`}>
						{recipe.name}
					</LinkButtonArrow>
				))}
			</PageGrid>
			<Pagination docs={recipes} basePath="/ricette" />
		</PageContainer>
	)
}

import { Card } from '#/components/card'
import { CollectionPage } from '#/components/collection-page'
import { LinkButtonArrow } from '#/components/link-button-arrow'
import { getPageParam } from '#/components/pagination'
import it from '#/i18n/it.json'
import { PageProps, getDb } from '#/utils/server'
import { UtensilsCrossed } from 'lucide-react'

//

export default async function HomePage(props: PageProps) {
	const db = await getDb()

	const recipes = await db.find({
		collection: 'recipes',
		page: await getPageParam(props),
		select: {
			name: true,
			slug: true,
		},
	})

	const { recipes_form_url } = await db.findGlobal({
		slug: 'meta',
	})
	if (!recipes_form_url) {
		return null
	}

	return (
		<CollectionPage
			docs={recipes}
			basePath="/ricette"
			title={it.recipes.page_title}
			item={(recipe) => (
				<Card key={recipe.id} href={`/ricette/${recipe.slug}`} icon={<UtensilsCrossed />}>
					{recipe.name}
				</Card>
			)}
			subtitle={
				<div className="pt-6">
					<LinkButtonArrow href={recipes_form_url} className="w-fit -rotate-1 hover:-rotate-2">
						{it.Suggest_a_recipe}
					</LinkButtonArrow>
				</div>
			}
		/>
	)
}

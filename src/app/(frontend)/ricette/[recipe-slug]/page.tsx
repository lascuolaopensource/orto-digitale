import { BackLink } from '#/components/backlink'
import { BoxedHeading } from '#/components/boxed-heading'
import { PageContainer } from '#/components/page-container'
import { RichText } from '#/components/richtext'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, getOne, getRecords } from '#/utils/server'

import { PlantCard } from '../../piante/page'

//

type Props = {
	params: Promise<{ 'recipe-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const recipeSlug = (await props.params)['recipe-slug']

	const recipe = getOne(
		await db.find({
			collection: 'recipes',
			where: {
				slug: {
					equals: recipeSlug,
				},
			},
		}),
	)

	const plants = getRecords(recipe.plants_used)

	return (
		<PageContainer className="max-w-4xl space-y-10">
			<BackLink href="/ricette">{it.recipes.back_to_recipes}</BackLink>
			<div className="flex flex-col sm:flex-row items-start gap-10">
				<div className="bg-white border border-green-900 rounded-lg notebook -mx-2 sm:mx-0 p-6 -rotate-1">
					<div className="space-y-10">
						<BoxedHeading tag="h1" className="w-fit -rotate-1">
							{recipe.name}
						</BoxedHeading>
						{recipe.description && <RichText data={recipe.description} className="max-w-xl" />}
					</div>
				</div>

				{plants.length > 0 && (
					<div className="space-y-2 w-full sm:w-auto pt-20">
						<T tag="h3">{it.recipes.plants_used}</T>
						<div className="space-y-1">
							{plants.map((plant) => (
								<PlantCard key={plant.id} plant={plant} />
							))}
						</div>
					</div>
				)}
			</div>
		</PageContainer>
	)
}

import { BackLink } from '#/components/backlink'
import { BoxedHeading } from '#/components/boxed-heading'
import { PageContainer } from '#/components/page-container'
import { RichText } from '#/components/richtext'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getOne, getRecords } from '#/utils'
import { getDb } from '#/utils/db'

import { PlantCard } from '../../piante/page'

//

type Props = {
	params: Promise<{ 'recipe-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const recipeId = (await props.params)['recipe-slug']

	const recipe = getOne(
		await db.find({
			collection: 'recipes',
			where: {
				id: {
					equals: recipeId,
				},
			},
		}),
	)

	const plants = getRecords(recipe.plants_used)

	return (
		<PageContainer className="max-w-4xl">
			<BackLink href="/ricette">{it.recipes.back_to_recipes}</BackLink>
			<div className="py-10">
				<BoxedHeading tag="h1" className="w-fit">
					{recipe.name}
				</BoxedHeading>
			</div>
			<div className="flex flex-col sm:flex-row items-start gap-10">
				{recipe.description && <RichText data={recipe.description} className="max-w-xl" />}

				{plants.length > 0 && (
					<div className="space-y-2 w-full sm:w-auto">
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

import { BackLink } from '#/components/backlink'
import { PageContainer } from '#/components/page-container'
import it from '#/i18n/it.json'
import { getDb, getOne, getRecords } from '#/utils/server'

import { BoxedHeading } from '@/modules/components/boxed-heading'
import { RichText } from '@/modules/components/richtext'
import { T } from '@/modules/components/t'

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
				<div className="bg-white max-w-lg border border-primary/30 rounded-lg notebook -mx-2 sm:mx-0 p-6 -rotate-1">
					<div className="space-y-10">
						<BoxedHeading tag="h1" className="rotate-0">
							{recipe.name}
						</BoxedHeading>
						{recipe.description && <RichText data={recipe.description} />}
					</div>
				</div>

				{plants.length > 0 && (
					<div className="space-y-2 w-full sm:w-auto sm:pt-30">
						<T tag="h3">{it.recipes.plants_used}</T>
						<div className="flex flex-col gap-4 pt-2">
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

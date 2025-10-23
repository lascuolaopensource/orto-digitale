import it from '#/i18n/it.json'
import { BackLink } from '@/modules/components/backlink'
import { BoxedHeading } from '@/modules/components/boxed-heading'
import { PageContainer } from '@/modules/components/page-container'
import { RichText } from '@/modules/components/richtext'
import { getDb, getRecords } from '@/modules/utils'
import { notFound } from 'next/navigation'
import { PlantCard } from '../../piante/page'

//

type Props = {
	params: Promise<{ 'recipe-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const recipeId = (await props.params)['recipe-slug']

	const { docs } = await db.find({
		collection: 'recipes',
		where: {
			id: {
				equals: recipeId,
			},
		},
	})

	const recipe = docs[0]
	if (!recipe) return notFound()

	const plants = getRecords(recipe.plants_used)

	return (
		<PageContainer>
			<BackLink href="/ricette">{it.recipes.back_to_recipes}</BackLink>
			<div>
				<BoxedHeading tag="h1" className="w-fit">
					{recipe.name}
				</BoxedHeading>
			</div>
			<div className="flex items-start">
				<div>
					{recipe.description && <RichText data={recipe.description} className="max-w-xl" />}
				</div>
				{plants.length > 0 && (
					<div>
						<h2>{it.recipes.plants_used}</h2>
						<div>
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

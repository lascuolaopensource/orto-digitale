type Props = {
	params: Promise<{ 'recipe-slug': string }>
}

export default async function Page(props: Props) {
	const db = await getDb()
	const recipeId = (await props.params)['recipe-slug']

	const recipe = await db.find({
		collection: 'recipes',
		where: {
			id: {
				equals: recipeId,
			},
		},
	})
}

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { BackLink } from '#/components/backlink'
import { BoxedHeading } from '#/components/boxed-heading'
import { LinkButtonArrow } from '#/components/link-button-arrow'
import { PageContainer } from '#/components/page-container'
import { RichText } from '#/components/richtext'
import { T } from '#/components/t'
import it from '#/i18n/it.json'
import { getDb, getRecord } from '#/utils'
import { cn } from '$/lib/utils'
import { notFound } from 'next/navigation'

import { Area, Plant } from '@/payload-types'

import { SeasonTag } from '../utils'

//

type PageProps = {
	params: Promise<{ 'plant-slug': string }>
}

export default async function Page(props: PageProps) {
	const db = await getDb()
	const plantId = (await props.params)['plant-slug']

	const docs = await db.find({
		collection: 'plants',
		depth: 2,
		where: {
			id: {
				equals: plantId,
			},
		},
	})

	const plant = docs.docs[0]
	if (!plant) return notFound()

	const area = getRecord(plant.area)
	const recipes = plant.recipes?.docs?.map(getRecord) ?? []

	return (
		<PageContainer>
			<BackLink href="/piante">{it.plants.back_to_plants}</BackLink>

			<div className="flex items-center flex-col md:flex-row gap-10 md:items-start md:justify-center pt-10">
				<InfoCard plant={plant} area={area} />
				<div className="space-y-8 md:pt-20">
					<div>
						<BoxedHeading tag="h2" className="rotate-1 mb-6">
							{it.tell_me_everything}
						</BoxedHeading>
						<RichText data={plant.description as SerializedEditorState} />
					</div>

					{recipes.length > 0 && (
						<div>
							<BoxedHeading tag="h2" className="-rotate-1 mb-6">
								{it.plants.with_this_plant_you_can_make}:
							</BoxedHeading>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{recipes.map((recipe) => (
									<LinkButtonArrow key={recipe.id} href={`/ricette/${recipe.id}`}>
										{recipe.name}
									</LinkButtonArrow>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</PageContainer>
	)
}

//

function InfoCard(props: { plant: Plant; area: Area }) {
	const { plant, area } = props
	return (
		<div className="-rotate-2 p-8 flex w-fit flex-col items-center gap-3 bg-stone-100 border border-stone-200 rounded-lg">
			<div className="size-56 rounded-full block bg-stone-300 mb-2"></div>
			<T tag="h2">{plant.name}</T>
			<InfoContainer label={it.plants.scientific_name}>
				<T tag="p" className="italic">
					{plant.latin_name}
				</T>
			</InfoContainer>
			<InfoContainer label={it.plants.season} className="gap-0.5">
				<SeasonTag season={plant.season} className="text-md" />
			</InfoContainer>
			<InfoContainer label={it.plants.you_find_in} className="gap-1 self-stretch">
				<LinkButtonArrow href={`/aree/${area.key}`}>{area.name}</LinkButtonArrow>
			</InfoContainer>
		</div>
	)
}

type InfoContainerProps = {
	label: string
	children: React.ReactNode
	className?: string
}

function InfoContainer(props: InfoContainerProps) {
	const { label, children, className } = props
	return (
		<div className={cn('flex flex-col items-center', className)}>
			<T className="font-bold">{label}:</T>
			{children}
		</div>
	)
}

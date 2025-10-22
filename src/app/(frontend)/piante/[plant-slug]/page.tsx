import { BackLink } from "#/components/backlink";
import { PageContainer } from "#/components/page-container";
import { T } from "#/components/t";
import it from "#/i18n/it.json";
import { getDb, getRecord } from "#/utils";
import { notFound } from "next/navigation";
import { SeasonTag } from "../utils";

// 

type PageProps = {
	params: Promise<{ "plant-slug": string }>
}

export default async function Page(props: PageProps) {
	const db = await getDb()
	const plantId = (await props.params)["plant-slug"]

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

			<div className="py-8">
					<T tag="h1">{plant.name}</T>
				<div className="flex items-baseline gap-2">
				<T>{it.plants.scientific_name}:</T>
				<T tag="p" className="italic">{plant.latin_name}</T>
				</div>
				<div className="flex items-baseline gap-2">
					<T>{it.plants.season}:</T>
					<SeasonTag season={plant.season} />
				</div>
			</div>

			{/* <p>
          {area)} / {getSeasoneLabel(pianta.seasone)}
        </p> */}

			<pre>{JSON.stringify(plant, null, 2)}</pre>


			{/* <div>
  


      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          {pianta.name} <span className="italic">({pianta.latin_name})</span>
        </h1>
    
      </header>

    
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
  
        <div className="prose prose-lg">
          <img src="/Users/giovanniabbatepaolo/Desktop/Achillea_millefolium.jpg" alt="Img" />
        
          <PlantAreas areas={areasWithPlant} />
        </div>

        {pianta.descrizione && (
          <div className="prose -mt-5">
            <RichText data={pianta.descrizione as SerializedEditorState} />
          </div>
        )}
      </div>
    </div> */}
		</PageContainer>
	)
}
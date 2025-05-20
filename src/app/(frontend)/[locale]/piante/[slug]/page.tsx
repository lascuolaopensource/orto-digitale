import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RecipeImageGallery } from '@/components/RecipeImageGallery'
import { PlantAreas } from '@/components/PlantAreas'
import { NotFound } from '@/components/ui/NotFound'
import type { Piante as PianteType, Aree, Media } from '@/payload-types'
import { BackLink } from '@/components/ui/BackLink'

type PageProps = {
  params: Promise<{ slug: string }>
}

type AreaKey = keyof Omit<Aree, 'id' | 'updatedAt' | 'createdAt'>
type SingleArea = Exclude<Aree[AreaKey], undefined>

export default async function PiantaDetail({ params }: PageProps) {
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const t = await getTranslations()

  // Resolve the params promise
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Find the plant by slug
  const piante = await db.find({
    collection: 'piante',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale,
    depth: 2,
  })

  // Get the first result if exists
  const pianta = piante.docs[0] as PianteType | undefined

  if (!pianta) {
    return (
      <NotFound
        title={t('plants.plantNotFound')}
        backLink={{
          href: '/piante',
          label: t('plants.backToPlants'),
        }}
      />
    )
  }

  // Fetch all areas to find which ones contain this plant
  const areeGlobal = (await db.findGlobal({
    slug: 'aree',
    depth: 3,
    locale,
  })) as Aree

  // Find areas where this plant is located
  const areasWithPlant: [string, SingleArea][] = []

  // Loop through all areas and check if this plant is in them
  Object.entries(areeGlobal).forEach(([areaSlug, areaData]) => {
    // Skip non-object entries (like updatedAt, etc.)
    if (typeof areaData !== 'object' || !areaData) return

    const typedAreaData = areaData as SingleArea

    // Check if this area has plants and if the current plant is in the area
    const areaPlants = typedAreaData.contenuto?.piante || []
    const plantInArea = areaPlants.some((plantId: string | { id: string }) => {
      const id = typeof plantId === 'string' ? plantId : plantId.id
      return id === pianta.id
    })

    if (plantInArea) {
      areasWithPlant.push([areaSlug, typedAreaData])
    }
  })

  return (
    <div>
      {/* Back navigation */}
      <BackLink href="/piante" label={t('plants.backToPlants')} />

      {/* Title at the top */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{pianta.name}</h1>
      </header>

      {/* Content grid with perfectly aligned columns */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Colonna sinistra: immagini */}
        <div className="prose prose-lg">
          <div className="not-prose w-full">
            <RecipeImageGallery
              immagine={pianta.content?.immagine}
              altText={pianta.name || 'Immagine Pianta'}
              priority
            />
          </div>
          {/* Sezione delle aree dove si trova questa pianta */}
          <PlantAreas areas={areasWithPlant} />
        </div>

        {pianta.content?.descrizione && (
          <div className="prose prose-lg -mt-5">
            <RichText data={pianta.content?.descrizione as SerializedEditorState} />
          </div>
        )}
      </div>
    </div>
  )
}

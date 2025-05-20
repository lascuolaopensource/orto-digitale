import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { MediaDisplay } from '@/components/MediaDisplay'
import { PlantAreas } from '@/components/PlantAreas'
import { NotFound } from '@/components/ui/NotFound'
import type { Piante as PianteType, Aree, Media } from '@/payload-types'
import { BackLink } from '@/components/ui/BackLink'

type PageProps = {
  params: Promise<{ slug: string }>
}

type PiantaMedia = {
  url: string
  alt?: string
  filename?: string
}

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
    depth: 2,
    locale,
  })) as Aree

  // Find areas where this plant is located
  const areasWithPlant: { id: string; name: string; slug: string; description: string }[] = []

  // Loop through all areas and check if this plant is in them
  Object.entries(areeGlobal).forEach(([areaSlug, areaData]) => {
    // Skip non-object entries (like updatedAt, etc.)
    if (typeof areaData !== 'object' || !areaData) return

    // Check if this area has plants and if the current plant is in the area
    const areaPlants = areaData.contenuto?.piante || []
    const plantInArea = areaPlants.some((plantId: string | { id: string }) => {
      const id = typeof plantId === 'string' ? plantId : plantId.id
      return id === pianta.id
    })

    if (plantInArea) {
      areasWithPlant.push({
        id: areaSlug,
        name: areaData.informazioni?.nome || areaSlug,
        slug: areaSlug,
        description: areaData.informazioni?.short_description || '',
      })
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
          <div className="w-full">
            <MediaDisplay
              media={
                (Array.isArray(pianta.content?.immagine) && pianta.content?.immagine.length > 0
                  ? (pianta.content?.immagine[0] as unknown as PiantaMedia)
                  : (pianta.content?.immagine as unknown as PiantaMedia)
                )?.url || ''
              }
              alt={pianta.name || ''}
            />
          </div>
        </div>

        {/* Colonna destra: dettagli della pianta */}
        <div className="mt-2">
          {pianta.content?.descrizione && (
            <div className="prose prose-lg mb-8">
              <RichText data={pianta.content?.descrizione as SerializedEditorState} />
            </div>
          )}

          {/* Sezione delle aree dove si trova questa pianta */}
          <PlantAreas areas={areasWithPlant} />
        </div>
      </div>
    </div>
  )
}

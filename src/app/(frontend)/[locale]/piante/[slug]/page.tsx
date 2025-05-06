import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Piante as PianteType, Aree } from '@/payload-types'

type PageProps = {
  params: Promise<{ slug: string }>
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
      <div className="container py-12">
        <h1 className="mb-8 text-3xl font-bold">
          {locale === 'it' ? 'Pianta non trovata' : 'Plant not found'}
        </h1>
      </div>
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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Colonna sinistra: immagini */}
      <div>
        {pianta.content?.immagine && pianta.content?.immagine.length > 0 ? (
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={(pianta.content?.immagine[0] as any).url}
              alt={pianta.name || ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
            <span className="text-muted-foreground">
              {locale === 'it' ? 'Nessuna immagine disponibile' : 'No image available'}
            </span>
          </div>
        )}

        {/* Gallery thumbnails */}
        {pianta.content?.immagine && pianta.content?.immagine.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {pianta.content?.immagine.slice(0, 4).map((img: any, index: number) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={img.url}
                  alt={`${pianta.name || ''} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Sezione delle aree dove si trova questa pianta */}
        {areasWithPlant.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              {locale === 'it' ? 'Dove trovare questa pianta' : 'Where to find this plant'}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {areasWithPlant.map((area) => (
                <Link
                  key={area.id}
                  href={`/aree/${area.slug}`}
                  className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
                >
                  <h3 className="font-semibold capitalize transition-colors group-hover:text-primary">
                    {area.name}
                  </h3>
                  {area.description && (
                    <p className="mt-1 text-sm text-gray-600">{area.description}</p>
                  )}
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
                    {locale === 'it' ? 'Visita area' : 'Visit area'}
                    <svg
                      className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Colonna destra: dettagli della pianta */}
      <div>
        <h1 className="mb-2 text-3xl font-bold">{pianta.name}</h1>

        {pianta.content?.short_description && (
          <p className="mb-6 text-lg text-gray-600">{pianta.content?.short_description}</p>
        )}

        {pianta.content?.descrizione && (
          <div className="prose prose-lg max-w-none">
            <RichText data={pianta.content?.descrizione as SerializedEditorState} />
          </div>
        )}
      </div>
    </div>
  )
}

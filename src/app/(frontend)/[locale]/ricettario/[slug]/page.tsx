import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { PlantCard } from '@/components/PlantCard'
import { MediaDisplay } from '@/components/MediaDisplay'
import { NotFound } from '@/components/ui/NotFound'
import type { Ricette as RicetteType, Piante } from '@/payload-types'
import { BackLink } from '@/components/ui/BackLink'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function RecipeDetail({ params }: PageProps) {
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const t = await getTranslations()

  // Resolve the params promise
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Find the recipe by slug
  const ricette = await db.find({
    collection: 'ricette',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    locale,
  })

  // Get the first result if exists
  const recipe = ricette.docs[0] as RicetteType | undefined

  // If recipe is not found
  if (!recipe) {
    return (
      <NotFound
        title={locale === 'it' ? 'Ricetta non trovata' : 'Recipe not found'}
        backLink={{
          href: '/ricettario',
          label: locale === 'it' ? 'Torna al ricettario' : 'Back to recipe book',
        }}
      />
    )
  }

  // Get related plants if any
  const relatedPlants = recipe.content?.piante || []

  return (
    <div>
      {/* Back navigation */}
      <BackLink
        href="/ricettario"
        label={locale === 'it' ? 'Torna al ricettario' : 'Back to recipe book'}
      />

      {/* Recipe header with title and author */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{recipe.name}</h1>
        {recipe.content?.autore && (
          <p className="text-lg text-gray-600">
            {locale === 'it' ? 'Ricetta di: ' : 'Recipe by: '}
            <span className="font-medium">{recipe.content.autore}</span>
          </p>
        )}
      </header>

      {/* Top section with image and related plants */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recipe hero image */}
        <div className="lg:col-span-2">
          {recipe.content?.immagine ? (
            <div className="overflow-hidden rounded-lg">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={
                    typeof recipe.content.immagine === 'string'
                      ? recipe.content.immagine
                      : recipe.content.immagine?.url || ''
                  }
                  alt={recipe.name || ''}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-gray-100">
              <span className="text-muted-foreground">
                {locale === 'it' ? 'Nessuna immagine disponibile' : 'No image available'}
              </span>
            </div>
          )}
        </div>

        {/* Related Plants next to the image */}
        <div className="lg:col-span-1">
          {relatedPlants.length > 0 ? (
            <div>
              <h2 className="mb-4 text-xl font-semibold">
                {locale === 'it' ? 'Piante utilizzate' : 'Plants used'}
              </h2>
              <div className="space-y-4">
                {relatedPlants.map((plant: string | Piante) => {
                  const plantData = typeof plant === 'string' ? null : plant
                  if (!plantData) return null

                  return <PlantCard key={plantData.id} plant={plantData} />
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
              <p className="text-gray-600">
                {locale === 'it' ? 'Nessuna pianta utilizzata' : 'No plants used'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe description - full width */}
      {recipe.content?.descrizione && (
        <div className="mb-10">
          <div className="prose prose-lg max-w-none prose-img:w-full prose-img:max-w-full">
            <RichText data={recipe.content.descrizione as SerializedEditorState} />
          </div>
        </div>
      )}

      {/* Recipe main content - ingredients and preparation */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
        {/* Left column: Ingredients - takes 1/4 of the width on large screens */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              {locale === 'it' ? 'Ingredienti' : 'Ingredients'}
            </h2>
            {recipe.content?.ingredienti ? (
              <div className="prose max-w-none prose-img:w-full prose-img:max-w-full">
                <RichText data={recipe.content.ingredienti as SerializedEditorState} />
              </div>
            ) : (
              <p className="text-gray-500">
                {locale === 'it' ? 'Nessun ingrediente specificato' : 'No ingredients specified'}
              </p>
            )}
          </div>
        </div>

        {/* Right column: Preparation steps - takes 3/4 of the width on large screens */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              {locale === 'it' ? 'Preparazione' : 'Preparation'}
            </h2>
            {recipe.content?.preparazione ? (
              <div className="prose prose-lg max-w-none prose-img:w-full prose-img:max-w-full">
                <RichText data={recipe.content.preparazione as SerializedEditorState} />
              </div>
            ) : (
              <p className="text-gray-500">
                {locale === 'it'
                  ? 'Nessuna istruzione di preparazione specificata'
                  : 'No preparation instructions specified'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

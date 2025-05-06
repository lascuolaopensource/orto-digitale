import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { PlantCard } from '@/components/PlantCard'
import type { Ricette as RicetteType, Piante } from '@/payload-types'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
}

export default async function RecipeDetail({ params }: PageProps) {
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const t = await getTranslations()

  // Find the recipe by ID
  const recipeResult = await db.findByID({
    collection: 'ricette',
    id: params.slug,
    depth: 2,
    locale,
  })

  // If recipe is not found
  if (!recipeResult) {
    return (
      <div className="container py-12">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-bold">
            {locale === 'it' ? 'Ricetta non trovata' : 'Recipe not found'}
          </h1>
          <Link href="/ricettario" className="text-primary hover:underline">
            {locale === 'it' ? 'Torna al ricettario' : 'Back to recipe book'}
          </Link>
        </div>
      </div>
    )
  }

  const recipe = recipeResult as RicetteType

  // Get related plants if any
  const relatedPlants = recipe.content?.piante || []

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/ricettario"
          className="mb-4 inline-flex items-center text-sm font-medium text-primary"
        >
          <svg
            className="mr-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          {locale === 'it' ? 'Torna al ricettario' : 'Back to recipe book'}
        </Link>
      </div>

      {/* Recipe Header */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column: Image */}
        <div>
          {recipe.content?.immagine ? (
            <div className="relative aspect-video overflow-hidden rounded-lg">
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
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
              <span className="text-muted-foreground">
                {locale === 'it' ? 'Nessuna immagine disponibile' : 'No image available'}
              </span>
            </div>
          )}
        </div>

        {/* Right column: Recipe info */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{recipe.name}</h1>

          {recipe.content?.autore && (
            <p className="mb-4 text-lg text-gray-600">
              {locale === 'it' ? 'Ricetta di: ' : 'Recipe by: '}
              <span className="font-medium">{recipe.content.autore}</span>
            </p>
          )}

          {recipe.content?.descrizione && (
            <div className="prose prose-lg max-w-none">
              <RichText data={recipe.content.descrizione as SerializedEditorState} />
            </div>
          )}
        </div>
      </div>

      {/* Ingredients and Preparation */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Ingredients */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            {locale === 'it' ? 'Ingredienti' : 'Ingredients'}
          </h2>
          {recipe.content?.ingredienti ? (
            <div className="prose prose-lg max-w-none">
              <RichText data={recipe.content.ingredienti as SerializedEditorState} />
            </div>
          ) : (
            <p className="text-gray-500">
              {locale === 'it' ? 'Nessun ingrediente specificato' : 'No ingredients specified'}
            </p>
          )}
        </div>

        {/* Preparation */}
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            {locale === 'it' ? 'Preparazione' : 'Preparation'}
          </h2>
          {recipe.content?.preparazione ? (
            <div className="prose prose-lg max-w-none">
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

      {/* Related Plants */}
      {relatedPlants.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold">
            {locale === 'it' ? 'Piante utilizzate' : 'Plants used'}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPlants.map((plant: string | Piante) => {
              const plantData = typeof plant === 'string' ? null : plant
              if (!plantData) return null

              return <PlantCard key={plantData.id} plant={plantData} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}

import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { NotFound } from '@/components/ui/NotFound'
import type { Ricette as RicetteType, Piante, Media } from '@/payload-types'
import { BackLink } from '@/components/ui/BackLink'
import { RecipeImageGallery } from '@/components/RecipeImageGallery'
import { RecipePlantsSection } from '@/components/RecipePlantsSection'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

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
    depth: 3,
    locale,
  })

  // Get the first result if exists
  const recipe = ricette.docs[0] as RicetteType | undefined

  // If recipe is not found
  if (!recipe) {
    return (
      <NotFound
        title={t('recipes.recipeNotFound')}
        backLink={{
          href: '/ricettario',
          label: t('recipes.backToRecipes'),
        }}
      />
    )
  }

  // Get related plants - ensure we have complete plant data
  let relatedPlants: Piante[] = []

  // Extract plant IDs from recipe
  const plantRefs = recipe.content?.piante || []

  // If we have plant references, fetch the full data
  if (plantRefs.length > 0) {
    const plantIds = plantRefs
      .map((plant) => (typeof plant === 'string' ? plant : plant.id))
      .filter(Boolean)

    if (plantIds.length > 0) {
      // Fetch full plant data
      const plantsResult = await db.find({
        collection: 'piante',
        where: {
          id: {
            in: plantIds,
          },
        },
        depth: 2, // Ensure we get image data
        locale,
      })

      relatedPlants = plantsResult.docs as Piante[]
    }
  }

  // Debug log
  console.log(`Found ${relatedPlants.length} plants with complete data`)

  return (
    <div>
      {/* Back navigation */}
      <BackLink href="/ricettario" label={t('recipes.backToRecipes')} />

      {/* Recipe header with title and author */}
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{recipe.name}</h1>
        {recipe.content?.autore && (
          <p className="text-lg text-gray-600">
            {t('recipes.recipeBy')} {}
            <span className="font-medium">{recipe.content.autore}</span>
          </p>
        )}
      </header>

      {/* Top section with image and related plants */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recipe hero image */}
        <div className="lg:col-span-2">
          <RecipeImageGallery
            immagine={recipe.content?.immagine}
            altText={recipe.name || ''}
            priority
          />
        </div>

        {/* Related Plants next to the image */}
        <div className="lg:col-span-1">
          <RecipePlantsSection relatedPlants={relatedPlants} />
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
            <h2 className="mb-4 text-xl font-semibold">{t('recipes.ingredients')}</h2>
            {recipe.content?.ingredienti ? (
              <div className="prose max-w-none prose-img:w-full prose-img:max-w-full">
                <RichText data={recipe.content.ingredienti as SerializedEditorState} />
              </div>
            ) : (
              <p className="text-gray-500">{t('recipes.noIngredients')}</p>
            )}
          </div>
        </div>

        {/* Right column: Preparation steps - takes 3/4 of the width on large screens */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">{t('recipes.preparation')}</h2>
            {recipe.content?.preparazione ? (
              <div className="prose prose-lg max-w-none prose-img:w-full prose-img:max-w-full">
                <RichText data={recipe.content.preparazione as SerializedEditorState} />
              </div>
            ) : (
              <p className="text-gray-500">{t('recipes.noPreparation')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

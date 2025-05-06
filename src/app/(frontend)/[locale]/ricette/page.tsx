import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import type { Ricette } from '@/payload-types'

export default async function Ricette() {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const t = await getTranslations()

  // Fetch recipes data from Payload
  const recipesList = await db.find({
    collection: 'ricette',
    locale: locale,
    depth: 2,
  })

  const recipes = recipesList.docs || []

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">{t('recipes.ourRecipes')}</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: any) => (
          <Link
            href={`/ricette/${recipe.id}`}
            key={recipe.id}
            className="group block rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            {recipe.immagine && (
              <div className="mb-4 overflow-hidden rounded-md">
                <div className="relative aspect-square w-full">
                  <Image
                    src={
                      typeof recipe.immagine === 'string'
                        ? recipe.immagine
                        : recipe.immagine?.url || ''
                    }
                    alt={recipe.name || 'Immagine ricetta'}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            )}
            <h2 className="mb-3 text-xl font-semibold capitalize transition-colors group-hover:text-primary">
              {recipe.name}
            </h2>
            <p className="text-muted-foreground">{getRecipeDescription(recipe)}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Dettagli ricetta
              <svg
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
  )
}

async function getRecipeDescription(recipe: any): Promise<string> {
  const t = await getTranslations()
  // First check for short_description field
  if (recipe && recipe.short_description) {
    return recipe.short_description
  }

  // Fall back to rich text descrizione field
  if (recipe && recipe.descrizione) {
    // Try to extract text from the rich text field if it exists
    if (typeof recipe.descrizione === 'object' && recipe.descrizione?.root?.children?.[0]?.text) {
      const text = recipe.descrizione.root.children
        .map((child: any) => child.text || '')
        .join(' ')
        .trim()
      return text.substring(0, 100) + (text.length > 100 ? '...' : '')
    }
  }

  return t('recipes.cardShortDefault')
}

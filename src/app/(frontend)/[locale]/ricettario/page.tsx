import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RecipeGrid } from '@/components/recipes/RecipeGrid'

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
      <RecipeGrid recipes={recipes} detailsText={t('recipes.details')} />
    </div>
  )
}

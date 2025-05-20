import { RecipeCard } from './RecipeCard'

interface RecipeGridProps {
  recipes: any[]
  detailsText: string
}

export function RecipeGrid({ recipes, detailsText }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div key={recipe.id || recipe.slug}>
          <RecipeCard recipe={recipe} detailsText={detailsText} />
        </div>
      ))}
    </div>
  )
}

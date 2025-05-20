import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { getRecipeDescription, getRecipeAuthor } from '@/lib/recipe-helpers'

interface RecipeCardProps {
  recipe: any
  detailsText: string
}

export function RecipeCard({ recipe, detailsText }: RecipeCardProps) {
  const content = recipe.content || recipe

  return (
    <Link
      href={`/ricettario/${recipe.slug}`}
      className="group block rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      {content.immagine && (
        <div className="mb-4 overflow-hidden rounded-md">
          <div className="relative aspect-square w-full">
            <Image
              src={
                typeof content.immagine === 'string'
                  ? content.immagine
                  : Array.isArray(content.immagine) && content.immagine.length > 0
                    ? content.immagine[0]?.url || ''
                    : content.immagine?.url || ''
              }
              alt={recipe.name || 'Immagine ricetta'}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      )}
      <h2 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
        {recipe.name}
      </h2>
      <div className="mt-1 text-sm text-gray-500">{getRecipeAuthor(recipe)}</div>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
        {detailsText}
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
  )
}

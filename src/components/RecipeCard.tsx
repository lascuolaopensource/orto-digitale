import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Ricette } from '@/payload-types'

interface RecipeCardProps {
  recipe: Ricette
  detailsText: string
}

export function RecipeCard({ recipe, detailsText }: RecipeCardProps) {
  return (
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
                typeof recipe.immagine === 'string' ? recipe.immagine : recipe.immagine?.url || ''
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
      <p className="text-muted-foreground">{recipe.autore}</p>
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

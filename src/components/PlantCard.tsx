import { Link } from '@/i18n/routing'
import { Piante, Media } from '@/payload-types'
import Image from 'next/image'

type PlantCardProps = {
  plant: Piante
  exploreLinkText?: string
}

export function PlantCard({ plant, exploreLinkText = 'Scopri di più' }: PlantCardProps) {
  return (
    <Link
      href={`/piante/${plant.slug}`}
      className="group flex w-full overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm"
    >
      <div className="flex-shrink-0">
        <div className="relative m-3 h-16 w-16 overflow-hidden rounded-md">
          {plant.content?.immagine &&
          plant.content.immagine[0] &&
          typeof plant.content.immagine[0] !== 'string' ? (
            <Image
              src={(plant.content.immagine[0] as Media).url || ''}
              alt={plant.name || ''}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <svg
                className="h-8 w-8 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 py-3 pr-3">
        <h3 className="text-base font-medium transition-colors group-hover:text-primary">
          {plant.name}
        </h3>
        <p className="text-xs text-muted-foreground">{plant.content?.short_description}</p>
        <span className="mt-1 inline-flex items-center text-xs font-medium text-primary">
          {exploreLinkText}
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
      </div>
    </Link>
  )
}

export function PlantsList({ plants }: { plants: Piante[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  )
}

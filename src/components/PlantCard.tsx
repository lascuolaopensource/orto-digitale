import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { Piante, Media } from '@/payload-types'
import { useTranslations } from 'next-intl'

type PlantCardProps = {
  plant: Piante
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const t = useTranslations()

  return (
    <Link
      href={`/piante/${plant.slug}`}
      key={plant.slug}
      className="group flex items-start gap-4 rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      <div className="flex-shrink-0 overflow-hidden rounded-md">
        <div className="relative h-24 w-24 bg-gray-100">
          {plant.content?.immagine && plant.content?.immagine[0] ? (
            <Image
              src={(plant.content?.immagine?.[0] as Media).sizes?.medium?.url || ''}
              alt={plant.name || ''}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold capitalize transition-colors group-hover:text-primary">
          {plant.name}
        </h3>
        <p className="text-muted-foreground">
          {plant.content?.short_description || t('plants.cardShortDefault')}
        </p>
        <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
          {t('plants.cardPlantDetails')}
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
      </div>
    </Link>
  )
}

type PlantsListProps = {
  plants: Piante[]
}

export const PlantsList: React.FC<PlantsListProps> = ({ plants }) => {
  return (
    <div className="w-full space-y-6">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  )
}

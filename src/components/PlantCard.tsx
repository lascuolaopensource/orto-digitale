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
      className="group flex items-start gap-4 rounded-lg border border-black p-4 transition-all hover:border-gray-700 hover:shadow-sm"
    >
      {plant.content?.immagine && plant.content?.immagine[0] && (
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={(plant.content?.immagine?.[0] as Media).sizes?.medium?.url || ''}
            alt={plant.name || ''}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-grow">
        <h3 className="font-semibold capitalize transition-colors group-hover:text-primary">
          {plant.name}
        </h3>
        <p className="text-muted-foreground">
          {plant.content?.short_description || t('plants.cardShortDefault')}
        </p>
        <span className="mt-1 inline-flex items-center text-sm font-medium text-primary">
          {t('aree.exploreLinkText')}
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

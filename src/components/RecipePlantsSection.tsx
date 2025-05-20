import { Piante } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

interface RecipePlantsSectionProps {
  relatedPlants: Piante[]
}

export async function RecipePlantsSection({ relatedPlants }: RecipePlantsSectionProps) {
  const t = await getTranslations()

  return (
    <div>
      {relatedPlants.length > 0 ? (
        <>
          <h2 className="mb-2 text-lg font-medium text-gray-900">{t('plants.plantsUsed')}</h2>

          <div className="space-y-2.5">
            {relatedPlants.map((plant) => {
              const firstImage = plant.content?.immagine?.[0]
              const thumbnailUrl =
                typeof firstImage !== 'string' ? firstImage?.sizes?.thumbnail?.url : null

              return (
                <div key={plant.id}>
                  <Link
                    href={`/piante/${plant.slug}`}
                    className="group flex items-center py-1.5 text-base text-gray-800 hover:text-primary"
                  >
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={plant.name || ''}
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 rounded-sm object-cover"
                      />
                    ) : (
                      <div className="mr-3 h-6 w-6 rounded-sm bg-gray-300" />
                    )}
                    <span className="capitalize">{plant.name}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <p className="text-gray-600">{t('plants.noPlantsUsed')}</p>
        </div>
      )}
    </div>
  )
}

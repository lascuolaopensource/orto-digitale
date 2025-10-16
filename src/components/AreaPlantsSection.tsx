import { Piante } from '@/payload-types'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

interface AreaPlantsSectionProps {
  pianteCorrelate: Piante[]
}

export async function AreaPlantsSection({ pianteCorrelate }: AreaPlantsSectionProps) {
  const t = await getTranslations()

  return (
    <div>
      {pianteCorrelate && pianteCorrelate.length > 0 ? (
        <>
          <h2 className="mb-2 text-lg font-medium text-gray-900">{t('aree.plantsInThisArea')}</h2>

          <div className="space-y-2.5">
            {pianteCorrelate.map((pianta) => {
              const firstImage = pianta.immagine?.[0]
              const thumbnailUrl =
                typeof firstImage !== 'string' ? firstImage?.sizes?.thumbnail?.url : null

              return (
                <div key={pianta.id}>
                  <Link
                    href={`/piante/${pianta.slug}`}
                    className="group flex items-center py-1.5 text-base text-gray-800 hover:text-primary"
                  >
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={pianta.name || ''}
                        width={24}
                        height={24}
                        className="mr-3 h-6 w-6 rounded-sm object-cover"
                      />
                    ) : (
                      <div className="mr-3 h-6 w-6 rounded-sm bg-gray-300" />
                    )}
                    <span className="capitalize">{pianta.name}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="mb-8 rounded-lg border border-dashed border-gray-300 p-6 pt-5 text-center">
          <p className="">{t('aree.noPlantsInArea')}</p>
        </div>
      )}
    </div>
  )
}

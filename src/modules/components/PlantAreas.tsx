import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { type Media, type Aree } from '@/payload-types'

type AreaKey = keyof Omit<Aree, 'id' | 'updatedAt' | 'createdAt'>
type SingleArea = Exclude<Aree[AreaKey], undefined>

type PlantAreasProps = {
  areas: [string, SingleArea][]
}

export async function PlantAreas({ areas }: PlantAreasProps) {
  if (areas.length === 0) return null
  const t = await getTranslations()

  return (
    <div>
      <h2 className="mb-2 text-lg font-medium text-gray-900">{t('plants.whereToFindThisPlant')}</h2>

      {areas.map(([areaKey, area]) => {
        // Get the first image if it exists and is a Media object
        const firstImage = area.contenuto?.immagine?.[0]
        const thumbnailUrl =
          typeof firstImage !== 'string' ? firstImage?.sizes?.thumbnail?.url : null
        const name = area.informazioni?.nome || areaKey

        return (
          <div key={areaKey}>
            <Link
              href={`/aree/${areaKey}`}
              className="group flex items-center py-1.5 text-base text-gray-800 hover:text-primary"
            >
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={name}
                  width={24}
                  height={24}
                  className="mr-3 h-6 w-6 rounded-sm object-cover"
                />
              ) : (
                <div className="mr-3 h-6 w-6 rounded-sm bg-gray-300" />
              )}
              <span className="capitalize">{name}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

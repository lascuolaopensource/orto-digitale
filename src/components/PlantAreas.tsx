import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

type Area = {
  id: string
  name: string
  slug: string
  description: string
}

type PlantAreasProps = {
  areas: Area[]
}

export async function PlantAreas({ areas }: PlantAreasProps) {
  if (areas.length === 0) return null
  const t = await getTranslations()

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{t('plants.whereToFindThisPlant')}</h2>
      <div className="grid grid-cols-1 gap-3">
        {areas.map((area) => (
          <Link
            key={area.id}
            href={`/aree/${area.slug}`}
            className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <h3 className="font-semibold capitalize transition-colors group-hover:text-primary">
              {area.name}
            </h3>
            {area.description && <p className="mt-1 text-sm text-gray-600">{area.description}</p>}
            <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
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
          </Link>
        ))}
      </div>
    </div>
  )
}

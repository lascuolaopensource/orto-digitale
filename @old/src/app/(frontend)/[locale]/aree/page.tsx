import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { AreaCard } from '@/components/AreaCard'

export default async function Aree() {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const t = await getTranslations()

  const areasData = await db.findGlobal({
    slug: 'aree',
    locale: locale,
  })

  // Filter to get only object-type area keys
  const areaKeys = Object.keys(areasData).filter(
    (key) =>
      typeof areasData[key as keyof typeof areasData] === 'object' &&
      areasData[key as keyof typeof areasData] !== null,
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Aree del Giardino</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areaKeys.map((area) => {
          const areaData = areasData[area as keyof typeof areasData] as any

          // Safely access nested properties with optional chaining
          const name = areaData?.informazioni?.nome || area
          const description =
            areaData?.informazioni?.short_description || t('aree.default_description')

          return (
            <AreaCard
              key={area}
              areaKey={area}
              name={name}
              description={description}
              exploreLinkText={t('aree.exploreLinkText')}
            />
          )
        })}
      </div>
    </div>
  )
}

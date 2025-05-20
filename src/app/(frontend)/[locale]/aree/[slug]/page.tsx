import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Link } from '@/i18n/routing'
import { Aree, Media, Piante } from '@/payload-types'
import { PlantCard, PlantsList } from '@/components/PlantCard'
import { MediaDisplay } from '@/components/MediaDisplay'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
}

type AreaKey = keyof Omit<Aree, 'id' | 'updatedAt' | 'createdAt'>
type SingleArea = Exclude<Aree[AreaKey], undefined>

export default async function Area({ params }: PageProps) {
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const t = await getTranslations()

  // Get all areas from the global 'aree'
  const areeGlobal = await db.findGlobal({
    slug: 'aree',
    depth: 3,
    locale,
  })

  const areaKey = params.slug
  const areaData = areeGlobal?.[areaKey as keyof typeof areeGlobal] as SingleArea

  // Not found se il global aree non esiste o l'area specifica non esiste
  if (!areeGlobal || !areaData || typeof areaData !== 'object') {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">{t('aree.areaNotFound')}</h2>
        <Link href="/aree" className="text-primary hover:underline">
          {t('aree.backToAreas')}
        </Link>
      </div>
    )
  }

  // Ottieni tutte le piante
  const pianteResult = await db.find({
    collection: 'piante',
    depth: 1,
    locale,
  })

  // Estrai le piante dall'area corrente (se ci sono)
  const areaPlantIds = areaData.contenuto?.piante || []

  // Trova le piante correlate a questa area
  let pianteCorrelate = pianteResult.docs.filter((pianta) =>
    areaPlantIds.some((plantId: string | { id: string }) =>
      typeof plantId === 'string' ? plantId === pianta.id : plantId.id === pianta.id,
    ),
  )

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{areaData.informazioni?.nome || areaKey}</h1>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Colonna sinistra: immagine dell'area */}
        <div className="prose prose-lg">
          {/* Area image */}
          <div className="w-full">
            <MediaDisplay
              media={(areaData?.contenuto?.immagine as Media).url}
              alt={areaData.informazioni?.nome || areaKey}
            />
          </div>
        </div>

        {/* Colonna destra: descrizione e piante correlate */}
        <div className="mt-2">
          <div className="prose prose-lg mb-8">
            <RichText data={areaData.contenuto?.descrizione as SerializedEditorState} />
          </div>

          {pianteCorrelate && pianteCorrelate.length > 0 ? (
            <div>
              <h2 className="mb-4 text-2xl font-bold">{t('aree.plantsInThisArea')}</h2>
              <PlantsList plants={pianteCorrelate} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
              <p className="text-gray-600">{t('aree.noPlantsInArea')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

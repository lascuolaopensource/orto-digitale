import { loadDb } from '@/lib/db'
import { getLocale, getTranslations } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Link } from '@/i18n/routing'
import { Aree, Media, Piante } from '@/payload-types'
import { RecipeImageGallery } from '@/components/RecipeImageGallery'
import { NotFound } from '@/components/ui/NotFound'
import { notFound } from 'next/navigation'
import { BackLink } from '@/components/ui/BackLink'
import { AreaPlantsSection } from '@/components/AreaPlantsSection'

type PageProps = {
  params: Promise<{ slug: string }>
}

type AreaKey = keyof Omit<Aree, 'id' | 'updatedAt' | 'createdAt'>
type SingleArea = Exclude<Aree[AreaKey], undefined>

export default async function Area({ params }: PageProps) {
  const db = await loadDb()
  const locale = (await getLocale()) as 'it' | 'en'
  const t = await getTranslations()

  // Resolve the params promise before accessing its properties
  const resolvedParams = await params

  // Get all areas from the global 'aree'
  const areeGlobal = await db.findGlobal({
    slug: 'aree',
    depth: 3,
    locale,
  })

  const areaKey = resolvedParams.slug
  const areaData = areeGlobal?.[areaKey as keyof typeof areeGlobal] as SingleArea

  // Not found se il global aree non esiste o l'area specifica non esiste
  if (!areeGlobal || !areaData || typeof areaData !== 'object') {
    return (
      <NotFound
        title={t('aree.areaNotFound')}
        backLink={{
          href: '/aree',
          label: t('aree.backToAreas'),
        }}
      />
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
      {/* Back navigation */}
      <BackLink href="/aree" label={t('aree.backToAreas')} />

      <header className="mb-6">
        <h1 className="text-2xl font-bold">{areaData.informazioni?.nome || areaKey}</h1>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Colonna sinistra: immagine dell'area */}
        <div className="prose prose-lg">
          <div className="not-prose w-full">
            <RecipeImageGallery
              immagine={areaData?.contenuto?.immagine}
              altText={areaData.informazioni?.nome || areaKey}
              priority
            />
          </div>
          <AreaPlantsSection pianteCorrelate={pianteCorrelate} />
        </div>

        {/* Colonna destra: descrizione e piante correlate */}
        <div className="-mt-5">
          <div className="prose prose-lg">
            <RichText data={areaData.contenuto?.descrizione as SerializedEditorState} />
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Giardino } from '@/payload-types'
import { areaKeyMap } from '../config/areas'

export function getAreaData(selectedArea: string | null, giardino: Giardino | null) {
  if (!selectedArea || !giardino) return null

  const areaKey = areaKeyMap[selectedArea]
  if (!areaKey) return null

  const area = giardino[areaKey as keyof Giardino]
  if (!area || typeof area !== 'object') return null

  // Get the rich text content based on the area key
  const richTextKey = `testo-${areaKey.toLowerCase().replace(/ /g, '-')}` as keyof typeof area
  const richTextContent = (area as any)[richTextKey]

  console.log('Rich text content:', {
    selectedArea,
    areaKey,
    richTextKey,
    content: richTextContent,
  })

  return richTextContent || null
}

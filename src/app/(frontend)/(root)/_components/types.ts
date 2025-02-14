import type { Giardino } from '@/payload-types'

export type Area = {
  id: string
  title: string
  cx: string
  cy: string
  r: string
  className: string
}

export type Season = 'estate' | 'inverno'

export type MapViewerProps = {
  giardino: Giardino | null
}

export type AreaClickHandler = (areaId: string) => void 
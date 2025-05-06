import { Aree } from '@/payload-types'

export type AreaDescription = {
  it: string
  en: string
}

export type AreaDescriptionData = Record<string, AreaDescription>

export const areaDescriptions: AreaDescriptionData = {
  entrata: {
    it: "L'ingresso principale del giardino, punto di accoglienza per i visitatori.",
    en: 'The main entrance to the garden, welcoming point for visitors.',
  },
  atelier: {
    it: 'Spazio creativo per attività artistiche e workshop.',
    en: 'Creative space for artistic activities and workshops.',
  },
  vasche: {
    it: 'Area con vasche per coltivazioni speciali e piante acquatiche.',
    en: 'Area with tanks for special cultivations and aquatic plants.',
  },
  ricettario: {
    it: 'Raccolta di ricette che utilizzano le piante del giardino.',
    en: 'Collection of recipes using plants from the garden.',
  },
  percorso_alimurgico: {
    it: 'Sentiero dedicato alle piante selvatiche commestibili.',
    en: 'Path dedicated to edible wild plants.',
  },
  serra: {
    it: 'Ambiente protetto per la coltivazione di piante in ogni stagione.',
    en: 'Protected environment for growing plants in every season.',
  },
  percorso_aromatico: {
    it: 'Sentiero ricco di erbe aromatiche e profumate.',
    en: 'Path rich in aromatic and fragrant herbs.',
  },
  alberi_da_frutto: {
    it: 'Collezione di alberi da frutto locali e tradizionali.',
    en: 'Collection of local and traditional fruit trees.',
  },
  eventi: {
    it: 'Spazio dedicato a incontri, workshop e attività comunitarie.',
    en: 'Space dedicated to meetings, workshops and community activities.',
  },
  tapee: {
    it: 'Area dedicata a una tecnica di coltivazione tradizionale veneta.',
    en: 'Area dedicated to a traditional Venetian cultivation technique.',
  },
  compostiera: {
    it: 'Zona per il compostaggio e il riciclo dei materiali organici.',
    en: 'Area for composting and recycling organic materials.',
  },
}

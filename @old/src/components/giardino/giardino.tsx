'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

type Season = 'estate' | 'inverno'

// Definisco le aree cliccabili
const areas = [
  {
    id: 'atelier',
    title: 'Atelier',
    cx: 2695.61,
    cy: 1077.79,
    r: 294.92,
    className: 'cls-11',
  },
  {
    id: 'entrata',
    title: 'Entrata',
    cx: 4828.79,
    cy: 2102.09,
    r: 295.86,
    className: 'cls-2',
  },
  {
    id: 'percorso_aromatico',
    title: 'Percorso Aromatico',
    cx: 3083.8,
    cy: 2262.1,
    r: 253.31,
    className: 'cls-3',
  },
  {
    id: 'tepee',
    title: 'Tepee',
    cx: 2429.78,
    cy: 3022.26,
    r: 236.68,
    className: 'cls-4',
  },
  {
    id: 'vasche',
    title: 'Vasche',
    cx: 2767.06,
    cy: 1695.05,
    r: 287.52,
    className: 'cls-8',
  },
  {
    id: 'percorso_alimurgico',
    title: 'Percorso Alimurgico',
    cx: 1667.81,
    cy: 1976.27,
    r: 312.56,
    className: 'cls-5',
  },
  {
    id: 'compostiera',
    title: 'Compostiera',
    cx: 1559.8,
    cy: 3250.37,
    r: 243.57,
    className: 'cls-7',
  },
  {
    id: 'ricettario',
    title: 'Ricettario',
    cx: 3273.24,
    cy: 1670.54,
    r: 172.78,
    className: 'cls-1',
  },
  {
    id: 'serra',
    title: 'Serra',
    cx: 2411.77,
    cy: 2290.63,
    r: 346.86,
    className: 'cls-9',
  },
  {
    id: 'eventi',
    title: 'Eventi',
    cx: 3251.49,
    cy: 2899.5,
    r: 297.14,
    className: 'cls-12',
  },
  {
    id: 'alberi_da_frutto',
    title: 'Alberi da Frutto',
    cx: 4087.78,
    cy: 2477.42,
    r: 327.06,
    className: 'cls-10',
  },
]

export default function Giardino() {
  const router = useRouter()
  const t = useTranslations()
  const [currentSeason, setCurrentSeason] = useState<Season>('estate')
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId === selectedArea ? null : areaId)

    router.push(`/aree/${areaId}`)
  }

  const toggleSeason = () => {
    setCurrentSeason(currentSeason === 'estate' ? 'inverno' : 'estate')
  }

  return (
    <div className="container mx-auto px-4 pt-16">
      <div className="relative mx-auto aspect-[4667/3190] w-full max-w-4xl overflow-hidden rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="610 600 4667 3190"
          className="h-full w-full"
        >
          <defs>
            <style>
              {`
                .cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9,.cls-10,.cls-11,.cls-12{opacity:.5;transition: opacity 0.3s ease;}
                .cls-1,.cls-13{fill:#d3a182;}
                .cls-14,.cls-12{fill:#e3ae24;}
                .cls-15,.cls-11{fill:#d0aba2;}
                .cls-2,.cls-16{fill:#8dac5c;}
                .cls-3,.cls-17{fill:#688b3f;}
                .cls-4,.cls-18{fill:#c3d898;}
                .cls-19,.cls-5{fill:#649c9e;}
                .cls-20,.cls-9{fill:#c7e0df;}
                .cls-6{fill:none;}
                .cls-21,.cls-7{fill:#9c6e55;}
                .cls-8,.cls-22{fill:#d87670;}
                .cls-10,.cls-23{fill:#eecc79;}
                .map { 
                  opacity: 0;
                  transition: opacity 0.5s ease;
                }
                .map.visible {
                  opacity: 1;
                }
                .item {
                  cursor: pointer;
                }
                .item:hover {
                  opacity: 0.8;
                }
                .item.selected {
                  opacity: 1;
                  stroke: #000;
                  stroke-width: 2;
                }
                .season-toggle {
                  transition: all 0.3s ease;
                }
                .season-toggle-estate {
                  background: linear-gradient(to right, #8dac5c, #c3d898);
                  color: #2d3748;
                }
                .season-toggle-inverno {
                  background: linear-gradient(to right, #90cdf4, #c7e0df);
                  color: #2d3748;
                }
              `}
            </style>
          </defs>

          <g id="Livello_6">
            <image
              className={`map ${currentSeason === 'inverno' ? 'visible' : ''}`}
              id="inverno"
              width="4000"
              height="5500"
              transform="translate(-793.52 2904.79) rotate(-64.21)"
              href="/PNG-INVERNO.png"
            />

            <image
              className={`map ${currentSeason === 'estate' ? 'visible' : ''}`}
              id="estate"
              width="4000"
              height="5500"
              transform="translate(-793.52 2904.79) rotate(-64.21)"
              href="/PNG-ESTATE.png"
            />

            {areas.map((area) => (
              <circle
                key={area.id}
                id={area.id}
                className={`item ${area.className} ${selectedArea === area.id ? 'selected' : ''}`}
                cx={area.cx}
                cy={area.cy}
                r={area.r}
                onClick={() => handleAreaClick(area.id)}
                aria-label={area.title}
              />
            ))}
          </g>
        </svg>

        {/* Toggle button - positioned over the SVG */}
        <button
          className={`season-toggle absolute right-4 top-4 z-10 ${currentSeason === 'estate' ? 'season-toggle-estate' : 'season-toggle-inverno'} flex transform items-center gap-2 rounded-full border-none px-5 py-2 font-medium focus:outline-none`}
          onClick={toggleSeason}
        >
          {currentSeason === 'inverno' ? (
            <>
              <p>{t('garden.inverno')}</p>
            </>
          ) : (
            <>
              <p>{t('garden.estate')}</p>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

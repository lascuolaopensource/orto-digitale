import React from 'react'
import { areas } from './config/areas'
import type { Season, AreaClickHandler } from './types'

type GardenMapProps = {
  season: Season
  selectedArea: string | null
  onAreaClick: AreaClickHandler
}

export function GardenMap({ season, selectedArea, onAreaClick }: GardenMapProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="610 600 4667 3190" className="w-full h-full">
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
            .cls-24{fill:#1d1d1b;}
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
          `}
        </style>
      </defs>

      <g id="Livello_6">
        <image
          className={`map ${season === 'inverno' ? 'visible' : ''}`}
          id="inverno"
          width="4000"
          height="5500"
          transform="translate(-793.52 2904.79) rotate(-64.21)"
          href="/mappa-inverno.png"
        />

        <image
          className={`map ${season === 'estate' ? 'visible' : ''}`}
          id="estate"
          width="4000"
          height="5500"
          transform="translate(-793.52 2904.79) rotate(-64.21)"
          href="/mappa-estate.png"
        />

        {areas.map((area) => (
          <circle
            key={area.id}
            id={area.id}
            className={`item ${area.className} ${selectedArea === area.id ? 'selected' : ''}`}
            cx={area.cx}
            cy={area.cy}
            r={area.r}
            onClick={() => onAreaClick(area.id)}
            aria-label={area.title}
          />
        ))}
      </g>
    </svg>
  )
}

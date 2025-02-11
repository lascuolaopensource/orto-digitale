'use client'

import React, { useState } from 'react'
import { SeasonToggle } from './SeasonToggle'

type Area = {
  id: string
  title: string
}

type Season = 'estate' | 'inverno'

const areas: Area[] = [
  { id: 'atelier', title: 'Atelier' },
  { id: 'entrata', title: 'Entrata' },
  { id: 'percorso_aromatico', title: 'Percorso Aromatico' },
  { id: 'tepee', title: 'Tepee' },
  { id: 'vasche', title: 'Vasche' },
  { id: 'percorso_alimurgico', title: 'Percorso Alimurgico' },
  { id: 'compostiera', title: 'Compostiera' },
  { id: 'ricettario', title: 'Ricettario' },
  { id: 'serra', title: 'Serra' },
  { id: 'eventi', title: 'Eventi' },
  { id: 'alberi_da_frutto', title: 'Alberi da Frutto' },
]

export function MapViewer() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [season, setSeason] = useState<Season>('estate')

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId)
    // Qui puoi aggiungere la logica per mostrare informazioni sull'area selezionata
    console.log('Area selezionata:', areaId)
  }

  const toggleSeason = () => {
    setSeason((prev) => (prev === 'estate' ? 'inverno' : 'estate'))
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SeasonToggle season={season} onToggle={toggleSeason} />

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
              className={`item cls-${
                area.id === 'atelier'
                  ? '11'
                  : area.id === 'entrata'
                    ? '2'
                    : area.id === 'percorso_aromatico'
                      ? '3'
                      : area.id === 'tepee'
                        ? '4'
                        : area.id === 'vasche'
                          ? '8'
                          : area.id === 'percorso_alimurgico'
                            ? '5'
                            : area.id === 'compostiera'
                              ? '7'
                              : area.id === 'ricettario'
                                ? '1'
                                : area.id === 'serra'
                                  ? '9'
                                  : area.id === 'eventi'
                                    ? '12'
                                    : area.id === 'alberi_da_frutto'
                                      ? '10'
                                      : ''
              } ${selectedArea === area.id ? 'selected' : ''}`}
              cx={
                area.id === 'atelier'
                  ? '2695.61'
                  : area.id === 'entrata'
                    ? '4828.79'
                    : area.id === 'percorso_aromatico'
                      ? '3083.8'
                      : area.id === 'tepee'
                        ? '2429.78'
                        : area.id === 'vasche'
                          ? '2767.06'
                          : area.id === 'percorso_alimurgico'
                            ? '1667.81'
                            : area.id === 'compostiera'
                              ? '1559.8'
                              : area.id === 'ricettario'
                                ? '3273.24'
                                : area.id === 'serra'
                                  ? '2411.77'
                                  : area.id === 'eventi'
                                    ? '3251.49'
                                    : area.id === 'alberi_da_frutto'
                                      ? '4087.78'
                                      : '0'
              }
              cy={
                area.id === 'atelier'
                  ? '1077.79'
                  : area.id === 'entrata'
                    ? '2102.09'
                    : area.id === 'percorso_aromatico'
                      ? '2262.1'
                      : area.id === 'tepee'
                        ? '3022.26'
                        : area.id === 'vasche'
                          ? '1695.05'
                          : area.id === 'percorso_alimurgico'
                            ? '1976.27'
                            : area.id === 'compostiera'
                              ? '3250.37'
                              : area.id === 'ricettario'
                                ? '1670.54'
                                : area.id === 'serra'
                                  ? '2290.63'
                                  : area.id === 'eventi'
                                    ? '2899.5'
                                    : area.id === 'alberi_da_frutto'
                                      ? '2477.42'
                                      : '0'
              }
              r={
                area.id === 'atelier'
                  ? '294.92'
                  : area.id === 'entrata'
                    ? '295.86'
                    : area.id === 'percorso_aromatico'
                      ? '253.31'
                      : area.id === 'tepee'
                        ? '236.68'
                        : area.id === 'vasche'
                          ? '287.52'
                          : area.id === 'percorso_alimurgico'
                            ? '312.56'
                            : area.id === 'compostiera'
                              ? '243.57'
                              : area.id === 'ricettario'
                                ? '172.78'
                                : area.id === 'serra'
                                  ? '346.86'
                                  : area.id === 'eventi'
                                    ? '297.14'
                                    : area.id === 'alberi_da_frutto'
                                      ? '327.06'
                                      : '0'
              }
              onClick={() => handleAreaClick(area.id)}
              aria-label={area.title}
            />
          ))}
        </g>
      </svg>
      {selectedArea && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
          {areas.find((area) => area.id === selectedArea)?.title}
        </div>
      )}
    </div>
  )
}

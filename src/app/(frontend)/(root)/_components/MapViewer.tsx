'use client'

import React, { useState, useEffect } from 'react'
import { SeasonToggle } from './SeasonToggle'
import { DescriptionDrawer } from './DescriptionDrawer'
import { GardenMap } from './GardenMap'
import { getGiardinoData } from './utils/getGiardinoData'
import { getAreaData } from './utils/getAreaData'
import type { Season } from './types'
import type { Giardino } from '@/payload-types'

export const dynamic = 'force-dynamic'

export function MapViewer() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [season, setSeason] = useState<Season>('estate')
  const [giardino, setGiardino] = useState<Giardino | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGiardinoData()
        console.log('Fetched data:', data) // Debug log
        if (!data || !data.giardino) {
          throw new Error('No giardino data received')
        }
        setGiardino(data.giardino)
      } catch (err) {
        console.error('Error fetching giardino data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      }
    }
    fetchData()
  }, [])

  const handleAreaClick = (areaId: string) => {
    setSelectedArea(areaId)
    // Debug log
    const areaData = getAreaData(areaId, giardino)
    console.log('Selected area data:', { areaId, data: areaData })
  }

  const toggleSeason = () => {
    setSeason((prev) => (prev === 'estate' ? 'inverno' : 'estate'))
  }

  // Debug log when giardino data changes
  useEffect(() => {
    console.log('Current giardino data:', giardino)
  }, [giardino])

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <SeasonToggle season={season} onToggle={toggleSeason} />

      <GardenMap season={season} selectedArea={selectedArea} onAreaClick={handleAreaClick} />

      {selectedArea && (
        <DescriptionDrawer
          isOpen={selectedArea !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedArea(null)
          }}
          areaData={getAreaData(selectedArea, giardino)}
        />
      )}
    </div>
  )
}

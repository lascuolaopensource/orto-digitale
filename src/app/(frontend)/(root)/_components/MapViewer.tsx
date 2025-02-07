'use client'

import React from 'react'

export function MapViewer() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <object
        data="/mappa.svg"
        type="image/svg+xml"
        className="w-full h-full object-contain"
        style={{ minWidth: '100%', minHeight: '100%' }}
        aria-label="mappa"
      />
    </div>
  )
}

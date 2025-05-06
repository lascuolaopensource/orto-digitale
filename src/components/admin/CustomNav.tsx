'use client'

import React from 'react'
import { Nav } from '@payloadcms/ui'
import GlobalSeedButton from './GlobalSeedButton'

// Il componente Nav riceve tutte le proprietà del componente originale di Payload
const CustomNav: React.FC<any> = (props) => {
  return (
    <div>
      <Nav {...props} />
      <div
        style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          zIndex: 10,
          backgroundColor: 'var(--theme-elevation-100)',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <GlobalSeedButton />
      </div>
    </div>
  )
}

export default CustomNav

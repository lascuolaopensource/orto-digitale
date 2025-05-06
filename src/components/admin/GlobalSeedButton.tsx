'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'

type SeedType = 'all' | 'areas'

const GlobalSeedButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const seedOptions = [
    { label: 'Tutto il database', value: 'all' },
    { label: 'Solo aree', value: 'areas' },
  ]

  const handleSeed = async (type: SeedType) => {
    try {
      setIsLoading(true)
      setIsOpen(false)

      const response = await fetch('/api/seed-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(type !== 'all' ? { type } : {}),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed database')
      }

      window.alert('Database seeded successfully!')
    } catch (error) {
      console.error('Error seeding database:', error)
      window.alert(error instanceof Error ? error.message : 'Failed to seed database')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seed-dropdown">
      <h2>Database Seed Utility</h2>
      <p>Utilizza questi pulsanti per popolare il database con dati iniziali.</p>

      <div style={{ marginTop: '20px' }}>
        {seedOptions.map((option) => (
          <Button
            key={option.value}
            buttonStyle="primary"
            onClick={() => handleSeed(option.value as SeedType)}
            disabled={isLoading}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          >
            {isLoading ? 'Seeding...' : `Seed ${option.label}`}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GlobalSeedButton

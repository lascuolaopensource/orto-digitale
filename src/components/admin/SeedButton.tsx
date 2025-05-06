'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { useConfig } from '@payloadcms/ui'

const SeedButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { config } = useConfig()

  const handleSeed = async () => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/seed-areas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed area descriptions')
      }

      // Use window.alert for simplicity instead of custom toast
      window.alert('Area descriptions seeded successfully!')
    } catch (error) {
      console.error('Error seeding area descriptions:', error)
      window.alert(error instanceof Error ? error.message : 'Failed to seed area descriptions')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="seed-button-field">
      <p className="field-description">
        Clicca per popolare automaticamente le descrizioni delle aree in italiano e inglese.
      </p>
      <Button buttonStyle="primary" onClick={handleSeed} disabled={isLoading}>
        {isLoading ? 'Seeding...' : 'Seed Area Descriptions'}
      </Button>
    </div>
  )
}

export default SeedButton

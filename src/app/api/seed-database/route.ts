import { NextRequest, NextResponse } from 'next/server'
import { loadDb } from '@/lib/db'
import { seedAreas } from '@/seed/seedAreas'

// Qui possiamo aggiungere altre funzioni di seed in futuro
const seeders = {
  areas: seedAreas,
}

export async function POST(req: NextRequest) {
  try {
    const payload = await loadDb()
    const body = await req.json().catch(() => ({}))

    const specificSeed = body.type

    // Log dell'operazione di seed
    console.log('Starting database seed...')

    if (specificSeed && seeders[specificSeed as keyof typeof seeders]) {
      // Esegui solo un seeder specifico
      const seeder = seeders[specificSeed as keyof typeof seeders]
      await seeder(payload)
      console.log(`Completed seed for ${specificSeed}`)
    } else {
      // Esegui tutti i seeder
      for (const [key, seeder] of Object.entries(seeders)) {
        console.log(`Running seeder: ${key}...`)
        await seeder(payload)
        console.log(`Completed seeder: ${key}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error seeding database',
      },
      { status: 500 },
    )
  }
}

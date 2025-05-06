import { getPayload } from 'payload'
import config from '@payload-config'
import { seedAreas } from './seedAreas'

// This script can be run directly from the command line
async function seed() {
  // Initialize Payload
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  try {
    console.log('=== Starting seed process ===')

    // Seed areas
    await seedAreas(payload)

    console.log('=== Seed process completed ===')
  } catch (error) {
    console.error('Seed process failed:', error)
  } finally {
    // Close the database connection
    console.log('Closing Payload...')
    await payload.closeDB()
    process.exit(0)
  }
}

// Check if this file is being run directly
if (require.main === module) {
  seed()
}

export { seed }

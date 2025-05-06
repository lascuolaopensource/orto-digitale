import { Payload } from 'payload'
import { areaDescriptions } from './areaDescriptions'
import { Aree } from '@/payload-types'

export async function seedAreas(payload: Payload): Promise<void> {
  try {
    console.log('Starting area descriptions seeding...')

    // Get the current global to merge with the seed data
    const currentAreas = (await payload.findGlobal({
      slug: 'aree',
    })) as Aree

    // Create an object that will hold our updates
    const updateData: Record<string, any> = {}

    // For each area in our seed data, update its short_description
    Object.entries(areaDescriptions).forEach(([areaSlug, descriptions]) => {
      // Initialize the area if it doesn't exist in the current data
      if (!currentAreas[areaSlug as keyof typeof currentAreas]) {
        updateData[areaSlug] = {}
      }

      // Set the short_description for Italian
      updateData[areaSlug] = {
        ...(updateData[areaSlug] || {}),
        short_description: descriptions.it,
      }
    })

    // Update the global with Italian descriptions
    await payload.updateGlobal({
      slug: 'aree',
      data: updateData,
      locale: 'it',
    })

    // Now do the same for English
    const updateDataEn: Record<string, any> = {}

    Object.entries(areaDescriptions).forEach(([areaSlug, descriptions]) => {
      updateDataEn[areaSlug] = {
        ...(updateDataEn[areaSlug] || {}),
        short_description: descriptions.en,
      }
    })

    // Update the global with English descriptions
    await payload.updateGlobal({
      slug: 'aree',
      data: updateDataEn,
      locale: 'en',
    })

    console.log('Area descriptions seeding completed!')
  } catch (error) {
    console.error('Error seeding area descriptions:', error)
  }
}

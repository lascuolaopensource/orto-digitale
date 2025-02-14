'use server'

import { loadDb } from './db'

export async function getGiardinoData() {
  try {
    const db = await loadDb()
    const home = await db.findGlobal({
      slug: 'giardino',
      depth: 3,
    })

    if (!home) {
      throw new Error('Failed to fetch giardino data')
    }

    return {
      giardino: home,
    }
  } catch (error) {
    console.error('Error fetching giardino data:', error)
    throw error
  }
}

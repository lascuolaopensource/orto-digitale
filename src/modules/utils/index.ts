import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

//

export async function getDb(): Promise<Payload> {
	return getPayload({ config }) as Promise<Payload>
}

export interface PageProps {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export function getRandomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}
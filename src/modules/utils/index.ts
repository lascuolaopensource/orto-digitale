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

export function getRecord<T>(data: T | number): T {
	if (typeof data === 'number') {
		throw new Error('Data is a number')
	}
	return data
}

export function getRecords<T>(data: (number | T)[] | null | undefined): T[] {
	return data?.map(getRecord) ?? []
}

import { notFound } from 'next/navigation'
import { PaginatedDocs } from 'payload'

//

export function getOne<Docs extends PaginatedDocs>(docs: Docs): Docs['docs'][number] {
	const doc = docs.docs[0]
	if (!doc) return notFound()
	return doc
}

//

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

//

type Amplitude = 'sm' | 'md' | 'lg'

export function getRandomRotationClass(amplitude: Amplitude = 'md'): string {
	const sizeToIndex = {
		sm: 2,
		md: 4,
		lg: 6,
	}

	const rotationClasses = [
		// sm
		'rotate-0 hover:-rotate-2',
		'rotate-1 hover:-rotate-1',
		// md
		'-rotate-1 hover:-rotate-3',
		'rotate-2 hover:rotate-0',
		// lg
		'-rotate-2 hover:-rotate-4',
		'rotate-3 hover:rotate-1',
	]

	return getRandomItem(rotationClasses.slice(0, sizeToIndex[amplitude]))
}

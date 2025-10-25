import type { ArrowBigDown } from 'lucide-react'
import type Link from 'next/link'
import type { ComponentProps } from 'react'

//

export function getRandomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

type Amplitude = 'sm' | 'md' | 'lg'

export function getRandomRotationClass(amplitude: Amplitude = 'md'): [string, string] {
	const sizeToIndex = {
		sm: 2,
		md: 4,
		lg: 6,
	}

	const rotationClasses: [string, string][] = [
		// sm
		['rotate-0 hover:-rotate-2', 'rotate-0'],
		['rotate-1 hover:-rotate-1', '-rotate-1'],
		// md
		['-rotate-1 hover:-rotate-3', 'rotate-1'],
		['rotate-2 hover:rotate-0', '-rotate-2'],
		// lg
		['-rotate-2 hover:-rotate-4', 'rotate-2'],
		['rotate-3 hover:rotate-1', '-rotate-3'],
	]

	return getRandomItem(rotationClasses.slice(0, sizeToIndex[amplitude]))
}

//

export type LinkProps = ComponentProps<typeof Link>
export type IconComponent = ComponentProps<typeof ArrowBigDown>

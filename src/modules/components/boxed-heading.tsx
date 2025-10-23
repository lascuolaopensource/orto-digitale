import { cn } from '$/lib/utils'
import { ComponentProps } from 'react'

import { getRandomItem } from '../utils'
import { T } from './t'

type Props = ComponentProps<typeof T>

export function BoxedHeading(props: Props) {
	const { className, children, ...rest } = props
	const randomRotationClass = getRandomItem([
		'-rotate-1',
		'-rotate-2',
		'-rotate-3',
		'rotate-1',
		'rotate-2',
		'rotate-3',
	])
	return (
		<T
			className={cn(
				'bg-stone-100 border border-stone-200 rounded-lg p-2!',
				'text-center',
				randomRotationClass,
				className,
			)}
			{...rest}
		>
			{children}
		</T>
	)
}

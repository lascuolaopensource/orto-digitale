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
		<T className={cn('py-2! w-fit text-primary wavy', randomRotationClass, className)} {...rest}>
			{children}
		</T>
	)
}

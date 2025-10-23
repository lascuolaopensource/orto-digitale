import { cn } from '$/lib/utils'
import { ComponentProps } from 'react'

import { T } from './t'

type Props = ComponentProps<typeof T>

export function BoxedHeading(props: Props) {
	const { className, children, ...rest } = props
	return (
		<T
			className={cn(
				'bg-stone-100 border border-stone-200 rounded-lg p-2!',
				'text-center',
				className,
			)}
			{...rest}
		>
			{children}
		</T>
	)
}

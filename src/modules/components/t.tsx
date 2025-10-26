import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

const textVariants = cva('', {
	variants: {
		tag: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
			h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			p: 'block',
			small: 'text-sm font-medium leading-none',
			huge: 'scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl',
		},
		margin: {
			true: 'leading-7 [&:not(:first-child)]:mt-6',
			false: '',
		},
	},
	compoundVariants: [
		// You can add further customization here if needed
	],
	defaultVariants: {
		tag: 'p',
		margin: false,
	},
})

export type TProps = React.PropsWithChildren<{
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'huge'
	margin?: boolean
	className?: string
}> &
	VariantProps<typeof textVariants>

export function T(props: TProps) {
	const { tag = 'p', margin = false, className, children, ...rest } = props
	const allClassNames = textVariants({ tag, margin }) + (className ? ` ${className}` : '')

	switch (tag) {
		case 'h1':
			return (
				<h1 className={allClassNames} {...rest}>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 className={allClassNames} {...rest}>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3 className={allClassNames} {...rest}>
					{children}
				</h3>
			)
		case 'h4':
			return (
				<h4 className={allClassNames} {...rest}>
					{children}
				</h4>
			)
		case 'small':
			return (
				<small className={allClassNames} {...rest}>
					{children}
				</small>
			)
		case 'huge':
			return (
				<h1 className={allClassNames} {...rest}>
					{children}
				</h1>
			)
		case 'p':
		default:
			return (
				<p className={allClassNames} {...rest}>
					{children}
				</p>
			)
	}
}

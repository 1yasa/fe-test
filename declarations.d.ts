import 'react'

declare module '*.css' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export default classNames
}

declare module 'react' {
	interface CSSProperties {
		[key: string]: any
	}
}

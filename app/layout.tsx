import '@/styles/global.css'

import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default ({ children }: PropsWithChildren) => {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}

export const metadata: Metadata = {
	title: 'Fe Test',
	description: 'The test project for front-end'
}

'use client'

import { useMemo } from 'react'

import { Sidebar, Tabs } from './components'
import { useModel } from './hooks'

import type { IPropsSidebar, IPropsTabs } from './types'

const Index = () => {
	const { tabs, width, toggleTabActive, onDragEnd } = useModel()

	const props_sidebar: IPropsSidebar = {
		tabs,
		toggleTabActive
	}

	const props_tabs: IPropsTabs = {
		tabs: useMemo(
			() =>
				tabs.reduce((total, item) => {
					if (item.active) total.push(item.id)

					return total
				}, [] as Array<string>),
			[tabs]
		),
		width,
		toggleTabActive,
		onDragEnd
	}

	return (
		<div className='w-screen h-screen flex'>
			<Sidebar {...props_sidebar} />
			<Tabs {...props_tabs} />
		</div>
	)
}

export default Index

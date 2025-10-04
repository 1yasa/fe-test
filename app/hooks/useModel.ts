import { useLayoutEffect, useMemo, useState } from 'react'
import { useEventListener, useMemoizedFn } from 'ahooks'

import { getComputedStyleValue } from '@/utils'

import type { Tabs } from '../types'

const raw_tabs = [
	{ id: 'Map', active: true },
	{ id: 'Music', active: true },
	{ id: 'Chat', active: true }
] as Tabs

export default () => {
	const [tabs, setTabs] = useState<Tabs>(raw_tabs)
	const counts = useMemo(() => tabs.filter(item => item.active).length, [tabs])
	const [width, setWidth] = useState<string | number>(() => `calc(100% / ${counts})`)

	const calcTabWidth = useMemoizedFn(() => {
		const body_width = getComputedStyleValue(document.body, 'width')
		const sidebar_width = getComputedStyleValue(document.documentElement, '--sidebar-width')

		const tabs_width = body_width - sidebar_width
		const target_width = tabs_width / counts

		if (target_width < 300) return setWidth(300)

		setWidth(`calc(100% / ${counts})`)
	})

	const toggleTabActive = useMemoizedFn((id: string, active?: boolean) => {
		setTabs(prev => {
			const next = prev.slice()

			for (let i = 0; i < next.length; i++) {
				if (next[i].id === id) {
					next[i] = { ...next[i], active: active ?? !next[i].active }

					break
				}
			}

			return next
		})
	})

	useLayoutEffect(calcTabWidth, [counts])
	useEventListener('resize', calcTabWidth)

	return { tabs, width, toggleTabActive }
}

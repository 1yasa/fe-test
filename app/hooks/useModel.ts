import { useLayoutEffect, useMemo, useState } from 'react'
import { useEventListener, useMemoizedFn } from 'ahooks'

import { getComputedStyleValue } from '@/utils'
import { arrayMove } from '@dnd-kit/sortable'

import type { DragEndEvent } from '@dnd-kit/core'
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
		if (!counts) return setWidth(300)

		const body_width = getComputedStyleValue(document.body, 'width')
		const sidebar_width = getComputedStyleValue(document.documentElement, '--sidebar-width')

		const tabs_width = body_width - sidebar_width
		const target_width = tabs_width / counts

		if (target_width < 300) return setWidth(300)

		setWidth(target_width)
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

	const onDragEnd = useMemoizedFn((args: DragEndEvent) => {
		const { active, over } = args

		if (!over?.id || active.id === over.id) return

		setTabs(prev => {
			const active_index = prev.findIndex(item => item.id === active.id)
			const over_index = prev.findIndex(item => item.id === over.id)

			return arrayMove(prev, active_index, over_index)
		})
	})

	useLayoutEffect(calcTabWidth, [counts])
	useEventListener('resize', calcTabWidth)

	return { tabs, width, toggleTabActive, onDragEnd }
}

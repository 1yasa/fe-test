import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import cx from 'classix'
import { createPortal } from 'react-dom'

import { useMounted } from '@/app/hooks'
import { memo } from '@/utils'
import { DndContext, DragOverlay, MeasuringStrategy, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

import Item from './Item'

import styles from './index.module.css'

import type { IPropsTabs } from '@/app/types'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { AnimateLayoutChanges } from '@dnd-kit/sortable'

const Index = (props: IPropsTabs) => {
	const { tabs, width, toggleTabActive, onDragEnd: handleDragEnd } = props
	const [active, setActive] = useState<string | null>(null)
	const mounted = useMounted()

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

	const onDragStart = useMemoizedFn(({ active }: DragStartEvent) => {
		setActive(active.id as string)
	})

	const onDragEnd = useMemoizedFn((args: DragEndEvent) => {
		handleDragEnd(args)
		setActive(null)
	})

	return (
		<div className={cx('flex', styles._local)}>
			<div className='flex' style={{ width: width === 300 ? 'max-content' : '100%' }}>
				<DndContext
					sensors={sensors}
					measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
				>
					<SortableContext items={tabs} strategy={horizontalListSortingStrategy}>
						{tabs.map(id => (
							<Item {...{ id, width, toggleTabActive }} key={id} />
						))}
					</SortableContext>
					{mounted
						? createPortal(
								<DragOverlay adjustScale>
									{active && (
										<Item id={active} overlay {...{ width, toggleTabActive }} />
									)}
								</DragOverlay>,
								document.body
							)
						: null}
				</DndContext>
			</div>
		</div>
	)
}

export default memo(Index)

import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import cx from 'classix'

import { useMounted } from '@/app/hooks'
import { memo } from '@/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { XMarkIcon } from '@heroicons/react/24/outline'

import Lazy from '../Lazy'

import styles from './index.module.css'

import type { IPropsTabsItem } from '@/app/types'

const Index = (props: IPropsTabsItem) => {
	const { id, width, overlay, toggleTabActive } = props
	const mounted = useMounted()

	const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable(
		{ id }
	)

	const dragging = useMemo(() => overlay || isDragging, [overlay, isDragging])

	const onClick = useMemoizedFn(() => toggleTabActive(id, false))

	return (
		<div
			className={cx(
				'flex flex-col border-r-2',
				dragging
					? 'h-screen border-transparent outline-2 outline-gray-100 z-10 rounded backdrop-blur-lg'
					: 'border-gray-100',
				!overlay && isDragging && 'opacity-0'
			)}
			ref={setNodeRef}
			style={{ width, transform: CSS.Translate.toString(transform), transition }}
		>
			<div
				className={cx(
					'relative flex cursor-pointer items-center justify-center bg-gray-50 select-none',
					styles.tab,
					dragging && styles.isDragging
				)}
				ref={setActivatorNodeRef}
				{...(mounted && attributes)}
				{...listeners}
			>
				<span className='text-xs hover:text-gray-900'>{id}</span>
				<div
					className='btn_close absolute right-2 flex h-4 w-4 cursor-pointer select-none items-center justify-center text-gray-400 hover:scale-105 hover:text-gray-900 active:scale-95 transition-[scale,color] duration-150 ease-in-out'
					onPointerDown={e => e.stopPropagation()}
					onClick={onClick}
				>
					<XMarkIcon />
				</div>
			</div>
			<div className={cx('flex items-center justify-center', styles.content)}>
				<Lazy name={id} />
			</div>
		</div>
	)
}

export default memo(Index)

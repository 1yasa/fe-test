import cx from 'classix'

import { memo } from '@/utils'
import { ChatBubbleBottomCenterIcon, MapIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'

import styles from './index.module.css'

import type { IPropsSidebar } from '@/app/types'

const icons_map = {
	Map: MapIcon,
	Music: MusicalNoteIcon,
	Chat: ChatBubbleBottomCenterIcon
}

const Index = (props: IPropsSidebar) => {
	const { tabs, toggleTabActive } = props

	return (
		<div className={cx('flex flex-col gap-6 py-6 border-r-2 border-gray-100', styles._local)}>
			{tabs.map(({ id, active }) => {
				const Icon = icons_map[id]

				return (
					<div
						className={cx(
							'flex flex-col items-center gap-1 cursor-pointer hover:text-black hover:scale-105 active:scale-95 transition-[scale,color] duration-150 ease-in-out select-none',
							!active && 'text-gray-400'
						)}
						onClick={() => toggleTabActive(id)}
						key={id}
					>
						<Icon className='h-6 w-6' />
						<span className='text-xs'>{id}</span>
					</div>
				)
			})}
		</div>
	)
}

export default memo(Index)

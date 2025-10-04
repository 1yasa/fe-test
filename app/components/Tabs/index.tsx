import cx from 'classix'

import { memo } from '@/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'

import Lazy from '../Lazy'

import styles from './index.module.css'

import type { IPropsTabs } from '@/app/types'

const Index = (props: IPropsTabs) => {
	const { tabs, width, toggleTabActive } = props

	return (
		<div className={cx('flex', styles._local)}>
			<div className='flex' style={{ width: width === 300 ? 'max-content' : '100%' }}>
				{tabs.map(id => (
					<div className='flex flex-col border-r-2 border-gray-100' style={{ width }} key={id}>
						<div
							className={cx(
								'relative flex cursor-pointer items-center justify-center bg-gray-50',
								styles.tab
							)}
						>
							<span className='text-xs hover:text-gray-900'>{id}</span>
							<div
								className='btn_close absolute right-2 flex h-4 w-4 cursor-pointer select-none items-center justify-center text-gray-400 hover:scale-105 hover:text-gray-900 active:scale-95 transition-[scale,color] duration-150 ease-in-out'
								onClick={() => toggleTabActive(id, false)}
							>
								<XMarkIcon />
							</div>
						</div>
						<div className={cx('flex items-center justify-center', styles.content)}>
							<Lazy name={id} />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default memo(Index)

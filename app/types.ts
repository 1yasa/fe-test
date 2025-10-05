import type { DragEndEvent } from '@dnd-kit/core'

export interface Tab {
	id: string
	active: boolean
}

export type Tabs = Array<Tab>

export interface IPropsSidebar {
	tabs: Tabs
	toggleTabActive: (id: string, active?: boolean) => void
}

export interface IPropsTabs extends Pick<IPropsSidebar, 'toggleTabActive'> {
	tabs: Array<Tab['id']>
	width: number | string
	onDragEnd: (args: DragEndEvent) => void
}

export interface IPropsTabsItem extends Pick<IPropsTabs, 'width' | 'toggleTabActive'> {
	id: string
	overlay?: boolean
}

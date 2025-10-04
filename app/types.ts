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
}

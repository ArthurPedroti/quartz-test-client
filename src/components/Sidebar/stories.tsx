import { Story, Meta } from '@storybook/react/types-6-0'
import Sidebar from '.'
import sidebarMock from './mock'
import { SidebarNavProps } from './SidebarNav'

export default {
  title: 'Sidebar',
  component: Sidebar
} as Meta

export const Default: Story<SidebarNavProps> = () => (
  <Sidebar menuItems={sidebarMock} />
)

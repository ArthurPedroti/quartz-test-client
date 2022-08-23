import { Story, Meta } from '@storybook/react/types-6-0'
import Sidebar, { SidebarProps } from '.'
import sidebarMock from './mock'

export default {
  title: 'Sidebar',
  component: Sidebar
} as Meta

export const Default: Story<SidebarProps> = () => (
  <Sidebar menuItems={sidebarMock} />
)

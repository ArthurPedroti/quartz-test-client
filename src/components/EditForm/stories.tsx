import { Story, Meta } from '@storybook/react/types-6-0'
import EditForm from '.'
import editFormMock from './mock'

export default {
  title: 'Edit',
  component: EditForm
} as Meta

export const Default: Story = () => (
  <EditForm formDefaultValues={editFormMock} />
)

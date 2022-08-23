import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react/types-6-0'
import OrdersTable, { OrdersTableProps } from '.'
import orders from './mock'

export default {
  title: 'OrdersTable',
  component: OrdersTable
} as Meta

export const Default: Story<OrdersTableProps> = (args) => (
  <Box maxWidth="1144px" p="32px" bg="gray.800">
    <OrdersTable {...args} />
  </Box>
)

Default.args = {
  orders: orders,
  handleEdit: () => true
}

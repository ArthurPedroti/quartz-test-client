import Base from 'templates/Base'
import OrdersTable, { Order } from 'components/OrdersTable'
import { EditFormData } from 'components/OrdersTable/Edit'
import { api } from 'services/api'

export type PurchasesProps = {
  orders: Omit<Order, 'month'>[]
}
export default function Purchases({ orders }: PurchasesProps) {
  const handleEdit = async (data: EditFormData) => {
    await api.put(`protheus-orders`, data)
  }

  return (
    <Base>
      <OrdersTable orders={orders} handleEdit={handleEdit} />
    </Base>
  )
}

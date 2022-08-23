import { GetServerSideProps } from 'next'
import { setupAPIClient } from 'services/apiClient'
import Purchases, { PurchasesProps } from 'templates/Purchases'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function PurchasesPage({ orders }: PurchasesProps) {
  return <Purchases orders={orders} />
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const purchaseOrders = await setupAPIClient(ctx).get('protheus-orders', {
      params: {
        branch: '0101'
      }
    })

    return {
      props: {
        orders: purchaseOrders.data
      }
    }
  }
)

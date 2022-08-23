import { render, screen } from '@testing-library/react'

import Sidebar from '.'
import sidebarMock from './mock'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const asPath = '/orders'

useRouter.mockImplementation(() => ({
  asPath
}))

describe('<Sidebar />', () => {
  it('should render the heading', () => {
    render(<Sidebar menuItems={sidebarMock} />)

    expect(
      screen.getByRole('link', { name: 'Pedidos' }).firstChild
    ).toHaveAttribute('class', expect.stringContaining('chakra-icon'))

    // Orders Link
    const ordersLink = screen.getByRole('link', { name: 'Pedidos' })
    expect(ordersLink).toHaveAttribute(
      'href',
      expect.stringContaining('/orders')
    )

    // Users Link
    const usersLink = screen.getByRole('link', { name: 'Usuários' })
    expect(usersLink).toHaveAttribute('href', expect.stringContaining('/users'))

    //Approvals Link
    const approvalsLink = screen.getByRole('link', { name: 'Aprovações' })
    expect(approvalsLink).toHaveAttribute(
      'href',
      expect.stringContaining('/approvals')
    )

    // Cancel Link
    const cancelLink = screen.getByRole('link', { name: 'Cancelamento' })
    expect(cancelLink).toHaveAttribute(
      'href',
      expect.stringContaining('/cancel')
    )

    //Resquests Link
    const requestsLink = screen.getByRole('link', { name: 'Solicitações' })
    expect(requestsLink).toHaveAttribute(
      'href',
      expect.stringContaining('/requests')
    )
  })
})

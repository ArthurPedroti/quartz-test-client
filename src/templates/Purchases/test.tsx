import { render, screen } from '@testing-library/react'
import React from 'react'
import Purchases from '.'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/OrdersTable', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock OrdersTable"></div>
    }
  }
})

const orders = [
  {
    number: '016',
    provider: 'Arthur',
    tags: 'pedido CE34p',
    observation: 'Alguma coisa esta errada',
    delivery: '2022-04-12T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Alana',
    approved: 'Sim'
  },
  {
    number: '007',
    provider: 'Arthur',
    tags: 'pedido CE34p',
    observation: 'Alguma coisa esta errada',
    delivery: '2022-04-12T16:37:45.333Z',
    status: 'Aguardando aprovação',
    buyer: 'Alana',
    approved: 'Sim'
  }
]

describe('<Purchases />', () => {
  it('should be possible to render the "Table"', () => {
    render(<Purchases orders={orders} />)

    expect(screen.getByTestId('Mock OrdersTable')).toBeInTheDocument()
  })
})

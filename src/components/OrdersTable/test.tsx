import { render, screen } from '@testing-library/react'

import OrdersTable from '.'

describe('<OrdersTable />', () => {
  it('should render the heading', () => {
    const { container } = render(<OrdersTable />)

    expect(
      screen.getByRole('heading', { name: /OrdersTable/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})

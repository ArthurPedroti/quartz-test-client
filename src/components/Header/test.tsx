import { render, screen } from '@testing-library/react'

import Header from '.'

describe('<Header />', () => {
  it('should render the "nome"', () => {
    render(<Header name="Beatriz" department="Usinagem" />)

    expect(screen.getByText(/Beatriz/i)).toBeInTheDocument()
  })

  it('should render the "department"', () => {
    render(<Header name="Beatriz" department="Usinagem" />)

    expect(screen.getByText(/Usinagem/i)).toBeInTheDocument()
  })
})

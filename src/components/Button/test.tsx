import { render, screen } from '@testing-library/react'

import Button from '.'

describe('<Button />', () => {
  it('should render with passed value', () => {
    render(<Button name="Click" text="Foi" />)
    expect(screen.getByText('Foi')).toBeInTheDocument()
  })
})

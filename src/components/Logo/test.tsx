import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('<Logo />', () => {
  it('should render Dashgo ', () => {
    render(<Logo />)

    expect(screen.getByText('Dashgo'))
  })
})

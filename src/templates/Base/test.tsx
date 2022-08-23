import { render, screen } from '@testing-library/react'
import Base from '.'

jest.mock('components/Header', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Header"></div>
    }
  }
})

jest.mock('components/Sidebar', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Sidebar"></div>
    }
  }
})

describe('<Base />', () => {
  it('should render the heading"', () => {
    render(
      <Base name="Alana" department="TI">
        <h1>Heading</h1>
      </Base>
    )
    expect(screen.getByTestId('Mock Sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Header')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /heading/i })
    ).toBeInTheDocument()
  })
})

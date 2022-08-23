import { render, screen } from '@testing-library/react'
import { Input } from '.'

describe('<Input />', () => {
  it('should render with passed values', () => {
    render(<Input name="teste" label="Deu certo" />)

    expect(screen.getByLabelText('Deu certo')).toBeInTheDocument()
  })

  it('should render witch passed value in "name"', () => {
    render(<Input name="teste" label="Deu certo" />)

    expect(screen.getByRole('textbox', { name: 'Deu certo' })).toHaveAttribute(
      'name',
      'teste'
    )
  })

  it('should render the chakra styles', () => {
    const { container } = render(<Input name="teste" label="Deu certo" />)

    expect(container.firstChild).toMatchSnapshot()
  })
})

import { render, screen } from '@testing-library/react'
import EditForm from '.'
import editFormMock from './mock'

describe('<Edit />', () => {
  it('should render the "defaultValues" of the Input of the tags and the observation and the dropdown', () => {
    render(<EditForm formDefaultValues={editFormMock} />)

    const tagsInput = screen.getByLabelText('Tags') as HTMLInputElement
    const statusDropdown = screen.getByLabelText('Status') as HTMLSelectElement
    const observationInput = screen.getByLabelText(
      'Observação'
    ) as HTMLInputElement

    expect(tagsInput.value).toBe('pedido CE29p')
    expect(statusDropdown.value).toBe('Confirmado')
    expect(observationInput.value).toBe('Não deu certo')
  })
})

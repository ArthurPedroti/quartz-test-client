import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditForm from '.'

const formDefaultValues = {
  approved: 'Não',
  buyer: 'Kevin',
  delivery: '2022-03-29T16:37:45.333Z',
  month: 3,
  number: '002',
  observation: '',
  provider: 'Alana',
  status: 'Aguardando envio ao fornecedor',
  tags: 'pedido CE26p'
}

describe('<EditForm />', () => {
  it('should be possible to edit the "tags", "observation", "status"', async () => {
    const handleEdit = jest.fn()
    render(
      <EditForm
        isOpen={true}
        handleClose={() => false}
        handleEdit={handleEdit}
        formDefaultValues={formDefaultValues}
      />
    )

    //TagInput
    const tagsInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagsInput, { target: { value: 'PEDIDO CE27P' } })

    fireEvent.keyDown(tagsInput, { key: 'Enter' })

    // Input observation
    const observationInput = screen.getByLabelText('Observação')
    fireEvent.change(observationInput, { target: { value: 'Deu certo' } })

    const button = screen.getByText('Salvar')

    // Dropdown status
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Status' }),
      screen.getByRole('option', { name: 'Confirmado' })
    )
    fireEvent.click(button)

    await waitFor(() =>
      expect(handleEdit).toHaveBeenCalledWith({
        approved: 'Não',
        buyer: 'Kevin',
        delivery: '2022-03-29T16:37:45.333Z',
        month: 3,
        number: '002',
        observation: 'Deu certo',
        provider: 'Alana',
        status: 'Confirmado',
        tags: 'pedido CE26p;PEDIDO CE27P'
      })
    )
  })

  it('should be possible to "close" the Edit', () => {
    const handleClose = jest.fn()
    formDefaultValues.tags = ''

    render(
      <EditForm
        isOpen={true}
        handleClose={handleClose}
        handleEdit={() => true}
        formDefaultValues={formDefaultValues}
      />
    )

    const button = screen.getByText('Cancelar')
    fireEvent.click(button)

    expect(handleClose).toHaveBeenCalled()
  })
})

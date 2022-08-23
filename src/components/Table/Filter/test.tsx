import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterModal from '.'

describe('< FilterModal/>', () => {
  it('should be possible to filter', async () => {
    const handleFilter = jest.fn()

    render(
      <FilterModal
        isOpen={true}
        handleClose={() => false}
        handleFilter={handleFilter}
      />
    )

    // Input number
    const numberInput = screen.getByLabelText('Número')
    fireEvent.change(numberInput, { target: { value: '011' } })

    const button = screen.getByText('Filtrar')

    // Input provider
    const providerInput = screen.getByLabelText('Fornecedor')
    fireEvent.change(providerInput, { target: { value: 'Arthur' } })

    //TagInput
    const tagsInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagsInput, { target: { value: 'PEDIDO CE27P' } })

    fireEvent.keyDown(tagsInput, { key: 'Enter' })

    //Input observation
    const observationInput = screen.getByLabelText('Observação')
    fireEvent.change(observationInput, { target: { value: 'Deu certo' } })

    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Mês' }),
      screen.getByRole('option', { name: 'Janeiro' })
    )
    //Dropdown approved
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Aprovado' }),
      screen.getByRole('option', { name: 'Sim' })
    )

    // Input delivery
    const deliveryInput = screen.getByLabelText('Entrega')
    fireEvent.change(deliveryInput, {
      target: { value: '2022-04-04' }
    })

    //Dropdown status
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Status' }),
      screen.getByRole('option', { name: 'Confirmado' })
    )
    //Input buyer

    const buyerInput = screen.getByLabelText('Comprador')
    fireEvent.change(buyerInput, { target: { value: 'Ronaldo' } })

    fireEvent.click(button)

    await waitFor(() =>
      expect(handleFilter).toHaveBeenCalledWith([
        {
          id: 'number',
          value: '011'
        },
        {
          id: 'provider',
          value: 'Arthur'
        },
        {
          id: 'tags',
          value: 'PEDIDO CE27P'
        },
        {
          id: 'observation',
          value: 'Deu certo'
        },
        {
          id: 'month',
          value: '1'
        },
        {
          id: 'approved',
          value: 'Sim'
        },
        {
          id: 'delivery',
          value: '2022-04-04'
        },
        {
          id: 'status',
          value: 'Confirmado'
        },
        {
          id: 'buyer',
          value: 'Ronaldo'
        }
      ])
    )
  })
  it('should beb possible to clean the filter', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={() => false}
        handleFilter={() => true}
      />
    )
    //Input number
    const numberInput = screen.getByLabelText('Número') as HTMLInputElement
    fireEvent.change(numberInput, { target: { value: '012' } })

    // Input provider
    const providerInput = screen.getByLabelText(
      'Fornecedor'
    ) as HTMLInputElement
    fireEvent.change(providerInput, { target: { value: 'Alana' } })

    const button = screen.getByText('Limpar')
    fireEvent.click(button)

    expect(numberInput.value).toBe('')
    expect(providerInput.value).toBe('')
  })
  it('should be possible to "close" the filter', () => {
    const handleClose = jest.fn()
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleFilter={() => true}
      />
    )
    expect(handleClose).not.toHaveBeenCalled()

    const button = screen.getByText('Cancelar')
    fireEvent.click(button)

    expect(handleClose).toHaveBeenCalled()
  })
})

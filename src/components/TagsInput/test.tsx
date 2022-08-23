import { fireEvent, render, screen } from '@testing-library/react'
import { TagsInput } from '.'

const tags = ['CE25P', 'MF75P2', 'CE28P']

describe('<TagsInput />', () => {
  it('should render the "defaultValues" of the tags', () => {
    render(<TagsInput setValue={() => true} initialTags={tags} />)

    expect(screen.getByText('MF75P2')).toBeInTheDocument()
    expect(screen.getByText('CE25P')).toBeInTheDocument()
    expect(screen.getByText('CE28P')).toBeInTheDocument()
  })

  it('should delete a tag', () => {
    render(<TagsInput setValue={() => true} initialTags={tags} />)
    const button = screen.getByText('MF75P2').nextSibling

    if (button === null) return

    fireEvent.click(button)
    expect(screen.queryByText('MF75P2')).not.toBeInTheDocument()
  })

  it('should create new tag', () => {
    render(<TagsInput setValue={() => true} />)

    const tagInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagInput, { target: { value: 'alana' } })

    fireEvent.keyDown(tagInput, { key: 'Enter' })
    expect(screen.getByText('alana')).toBeInTheDocument()
  })

  it('should not be able ro create a tag by pressing a key other tahn "Enter"', () => {
    render(<TagsInput setValue={() => true} />)

    const tagInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagInput, { target: { value: 'alana' } })

    fireEvent.keyDown(tagInput, { key: 'Tab' })
    expect(screen.queryByText('alana')).not.toBeInTheDocument()
  })

  it('should not render empty', () => {
    render(<TagsInput setValue={() => true} initialTags={tags} />)

    const tagInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagInput, { target: { value: '  ' } })

    fireEvent.keyDown(tagInput, { key: 'Enter' })

    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('should trigger the "setValue" function', () => {
    const setValue = jest.fn()

    // initial tags
    render(<TagsInput setValue={setValue} initialTags={tags} />)
    expect(setValue).toHaveBeenCalledWith('tags', tags.join(';'))

    // add tag
    const tagInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagInput, { target: { value: 'bia' } })

    fireEvent.keyDown(tagInput, { key: 'Enter' })

    expect(setValue).toHaveBeenCalledWith('tags', 'CE25P;MF75P2;CE28P;bia')

    // remove tag
    const button = screen.getByText('bia').nextSibling

    if (button === null) return
    fireEvent.click(button)

    expect(setValue).toBeCalledWith('tags', 'CE25P;MF75P2;CE28P')
  })

  it('should be able to clear the tags', () => {
    const { rerender } = render(
      <TagsInput setValue={() => true} initialTags={tags} />
    )

    const tagInput = screen.getByPlaceholderText('Adicionar Tag...')
    fireEvent.change(tagInput, { target: { value: 'bia' } })
    fireEvent.keyDown(tagInput, { key: 'Enter' })

    rerender(
      <TagsInput
        setValue={() => true}
        initialTags={tags}
        callbackInputValue="CE25P;MF75P2;CE28P;bia"
      />
    )
    // click button clear
    rerender(
      <TagsInput
        setValue={() => true}
        initialTags={tags}
        callbackInputValue={undefined}
      />
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

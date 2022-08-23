import {
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Text,
  forwardRef
} from '@chakra-ui/react'
import { Input } from 'components/Input'
import {
  ForwardRefRenderFunction,
  KeyboardEvent,
  useEffect,
  useState
} from 'react'
import { UseFormSetValue } from 'react-hook-form'

export type TagsInputProps = {
  initialTags?: string[]
  setValue: UseFormSetValue<any>
  callbackInputValue?: string
}

const TagsInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  TagsInputProps
> = ({ initialTags = [], setValue, callbackInputValue }, ref) => {
  const [tags, setTags] = useState<string[]>(initialTags)

  function handleCreateTags(
    e: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, i) => i !== index))
  }

  useEffect(() => {
    if (callbackInputValue === undefined) {
      setTags([])
    }
  }, [callbackInputValue])

  useEffect(() => {
    setValue('tags', tags.join(';'))
  }, [tags, setValue])

  useEffect(() => {
    setTags(initialTags)
  }, [])

  return (
    <Box borderRadius={8} bg="gray.700" p={4}>
      <Text mb={2}>Tags</Text>
      <input type="text" hidden ref={ref} />
      <Flex flexWrap="wrap" gap="10px">
        {tags.map((tag, index) => (
          <Tag colorScheme="green" key={index}>
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(index)} />
          </Tag>
        ))}
        <Input
          variant="unstyled"
          maxW="120px"
          name="tags"
          placeholder="Adicionar Tag..."
          onKeyDown={handleCreateTags}
        />
      </Flex>
    </Box>
  )
}
export const TagsInput = forwardRef(TagsInputBase)

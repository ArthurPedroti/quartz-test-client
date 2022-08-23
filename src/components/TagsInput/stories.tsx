import { Box } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { TagsInput, TagsInputProps } from '.'

export default {
  title: 'TagsInput',
  component: TagsInput,
  args: {
    setValue: () => true,
    initialTags: ['MF75P2', 'CE25P']
  }
} as Meta

export const Default: Story<TagsInputProps> = (args) => (
  <Box maxW="720px">
    <TagsInput {...args} />
  </Box>
)

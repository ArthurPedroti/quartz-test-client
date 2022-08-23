import { Story, Meta } from '@storybook/react/types-6-0'
import { Dropdown, SelectProps } from '.'

export default {
  title: 'Dropdown',
  component: Dropdown
} as Meta

export const Default: Story<SelectProps> = (args) => <Dropdown {...args} />
Default.args = {
  name: 'Mês',
  label: 'Mês',
  items: [
    {
      label: 'Janeiro',
      value: 0
    },
    {
      label: 'Fevereiro',
      value: 1
    },
    {
      label: 'Março',
      value: 2
    }
  ]
}

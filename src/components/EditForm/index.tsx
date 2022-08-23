import { Box, Divider, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { Input } from 'components/Input'
import { Dropdown } from 'components/Dropdown'
import Button from 'components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'

const optionStatus = [
  {
    label: 'Aguardando aprovação',
    value: 'Aguardando aprovação',
    disabled: true
  },
  {
    label: 'Aguardando envio ao fornecedor',
    value: 'Aguardando envio ao fornecedor'
  },
  {
    label: 'Aguardando confirmação',
    value: 'Aguardando confirmação'
  },
  {
    label: 'Confirmado',
    value: 'Confirmado'
  },
  {
    label: 'Atrasado',
    value: 'Atrasado',
    disabled: true
  }
]

type EditFormProps = {
  formDefaultValues: {
    id: string
    value: string | number | undefined
  }[]
}

const schema = yup.object().shape({
  tags: yup.string(),
  status: yup.string(),
  observation: yup.string()
})

const EditForm: React.FC<EditFormProps> = ({ formDefaultValues }) => {
  const { register, formState, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    formDefaultValues.map((defaultValue) => {
      setValue(defaultValue.id, defaultValue.value)
    })
  }, [formDefaultValues, setValue])

  return (
    <>
      <Box as="form">
        <Heading size="lg">Editar</Heading>
        <Divider my="6" borderColor="gray.600" />
        <Stack spacing={3}>
          <Input label="Tags" size="sm" {...register('tags')} />
          <Dropdown
            label="Status"
            items={optionStatus}
            placeholder="Selecione uma opção"
            size="sm"
            {...register('status')}
          />
          <Input label="Observação" size="sm" {...register('observation')} />
        </Stack>
        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button text="Cancelar" bg="gray.500" />
            <Button
              text="Salvar"
              colorScheme="yellow"
              type="submit"
              isLoading={formState.isSubmitting}
            />
          </HStack>
        </Flex>
      </Box>
    </>
  )
}
export default EditForm

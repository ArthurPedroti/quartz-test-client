import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack
} from '@chakra-ui/react'
import { Input } from 'components/Input'
import Button from 'components/Button'
import { TagsInput } from 'components/TagsInput'
import { Dropdown } from 'components/Dropdown'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Order } from '..'
import { useEffect } from 'react'

export type EditFormData = {
  protheusNumber: string | null
  status: string | null
  observation: string | null
  tags: string | null
}

type EditFormProps = {
  isOpen: boolean
  handleClose(): void
  handleEdit: (data: EditFormData, protheus_code: string) => void
  formDefaultValues: Order
}

export type TableData = {
  number: string
  tags: string
  observation: string
  status: string
}

const optionsStatus = [
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

const schema = yup.object().shape({
  tags: yup.string(),
  observation: yup.string(),
  status: yup.string()
})
const EditForm: React.FC<EditFormProps> = ({
  isOpen,
  handleClose,
  handleEdit,
  formDefaultValues
}) => {
  const { setValue, register, handleSubmit, formState } = useForm<TableData>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const formKeys = Object.keys(formDefaultValues) as [keyof TableData]
    formKeys.map((formName) => {
      setValue(formName, formDefaultValues[formName])
    })
  }, [formDefaultValues, setValue])

  const handleEditSave: SubmitHandler<TableData> = async (values) => {
    await handleEdit(
      {
        protheusNumber: values.number || '',
        status: values.status || '',
        observation: values.observation || '',
        tags: values.tags || ''
      },
      values.number
    )

    location.reload()
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Editar</ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
              <TagsInput
                focusBorderColor="yellow.500"
                size="sm"
                setValue={setValue}
                initialTags={
                  formDefaultValues.tags
                    ? formDefaultValues.tags.split(';')
                    : []
                }
                {...register('tags')}
              />

              <Input
                size="sm"
                label="Observação"
                focusBorderColor="yellow.500"
                {...register('observation')}
              />

              <Dropdown
                label="Status"
                focusBorderColor="yellow.5000"
                items={optionsStatus}
                isDisabled={formDefaultValues.approved === 'Não'}
                placeholder="Selecione uma opção"
                size="sm"
                {...register('status')}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              bgColor="gray.600"
              text="Cancelar"
              onClick={handleClose}
            />
            <Button
              text="Salvar"
              colorScheme="yellow"
              onClick={handleSubmit(handleEditSave)}
              isLoading={formState.isSubmitting}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default EditForm

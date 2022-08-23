import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Stack,
  Box
} from '@chakra-ui/react'

import { ColumnFiltersState, Updater } from '@tanstack/react-table'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from 'components/Input'
import { Dropdown } from 'components/Dropdown'
import Button from 'components/Button'
import { TagsInput } from 'components/TagsInput'
import { monthOptions } from 'utils/options/monthOptions'
import { optionsStatus } from 'utils/options/optionsStatus'

export type FilterModalProps = {
  isOpen: boolean
  handleClose(): void
  handleFilter: (updater: Updater<ColumnFiltersState>) => void
}

export type FilterFormData = {
  number: string
  provider: string
  tags: string
  month: number
  observation: string
  delivery: string
  status: string
  buyer: string
  approved: string
}

const schema = yup.object().shape({
  number: yup.string(),
  provider: yup.string(),
  tags: yup.string(),
  month: yup.string(),
  observation: yup.string(),
  delivery: yup.string(),
  status: yup.string(),
  buyer: yup.string(),
  approved: yup.string()
})

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  handleClose,
  handleFilter
}) => {
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    reset,
    watch
  } = useForm<FilterFormData>({
    resolver: yupResolver(schema)
  })
  const watchTags = watch('tags')

  const handleFilterModal: SubmitHandler<FilterFormData> = async (values) => {
    handleFilter(
      Object.keys(values).map((key) => ({
        id: key,
        value: values[key as keyof FilterFormData]
      }))
    )

    // console.log(
    //   Object.keys(values).map((key) => ({
    //     id: key,
    //     value: values[key as keyof FilterFormData]
    //   }))
    // )
    handleClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Filtro</ModalHeader>
          <Box as="form">
            <ModalBody>
              <Stack direction="row" justifyContent="space-evenly">
                <Box w="50%">
                  <Input
                    label="Número"
                    focusBorderColor="yellow.500"
                    size="sm"
                    {...register('number')}
                  />
                </Box>
                <Box w="50%">
                  <Input
                    label="Fornecedor"
                    focusBorderColor="yellow.500"
                    size="sm"
                    {...register('provider')}
                  />
                </Box>
              </Stack>
              <Stack direction="row" mt={4} justifyContent="space-evenly">
                <Box w="100%">
                  <TagsInput
                    initialTags={
                      getValues('tags') ? getValues('tags')?.split(';') : []
                    }
                    setValue={setValue}
                    callbackInputValue={watchTags}
                    {...register('tags')}
                  />
                </Box>
              </Stack>
              <Stack direction="row" mt={4} justifyContent="space-evenly">
                <Box w="50%">
                  <Input
                    label="Observação"
                    focusBorderColor="yellow.500"
                    size="sm"
                    {...register('observation')}
                  />
                </Box>
                <Box w="50%">
                  <Dropdown
                    label="Mês"
                    size="sm"
                    items={monthOptions}
                    {...register('month')}
                  />
                </Box>
              </Stack>
              <Stack direction="row" mt={4} justifyContent="space-evenly">
                <Box w="50%">
                  <Dropdown
                    placeholder="Selecione uma opção"
                    label="Aprovado"
                    size="sm"
                    items={[
                      {
                        label: 'Sim',
                        value: 'Sim'
                      },
                      {
                        label: 'Não',
                        value: 'Não'
                      }
                    ]}
                    {...register('approved')}
                  />
                </Box>
                <Box w="50%">
                  <Input
                    label="Entrega"
                    type="date"
                    size="sm"
                    {...register('delivery')}
                  />
                </Box>
              </Stack>
              <Stack direction="row" mt={4} justifyContent="space-evenly">
                <Box w="50%">
                  <Dropdown
                    size="sm"
                    placeholder="Selecione uma opção"
                    label="Status"
                    items={optionsStatus}
                    {...register('status')}
                  />
                </Box>
                <Box w="50%">
                  <Input
                    label="Comprador"
                    focusBorderColor="yellow.500"
                    size="sm"
                    {...register('buyer')}
                  />
                </Box>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                bgColor="gray.600"
                mr={3}
                text="Cancelar"
                onClick={handleClose}
              />
              <Button
                bgColor="gray.500"
                text="Limpar"
                mr={3}
                onClick={() => reset()}
              />
              <Button
                type="button"
                text="Filtrar"
                colorScheme="yellow"
                isLoading={formState.isSubmitting}
                onClick={handleSubmit(handleFilterModal)}
              />
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}
export default FilterModal

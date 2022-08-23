import { Flex, Stack } from '@chakra-ui/react'
import { Input } from 'components/Input'
import Button from 'components/Button'
import Image from 'next/image'
import quartz from '../../assets/quartz.png'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'contexts/AuthContext'

type SignInFormData = {
  username: string
  password: string
}

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

const Login = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const { signIn } = useAuth()

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await signIn(values)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={['6', '8']}
        mx={['4', 'auto']}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Flex justifyContent="center" textAlign="center">
            <Image src={quartz} />
          </Flex>

          <Stack spacing="4">
            <Input type="text" label="Usuário" {...register('username')} />
            <Input type="password" label="Senha" {...register('password')} />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="yellow"
            size="lg"
            isLoading={formState.isSubmitting}
            text="Entrar"
            width="100%"
          />
        </Stack>
      </Flex>
    </Flex>
  )
}

export default Login

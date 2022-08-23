import axios, { AxiosError } from 'axios'
import { signOut } from 'contexts/AuthContext'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined
) {
  const { [`${process.env.NEXT_PUBLIC_APP_NAME}.token`]: token } =
    parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        if (typeof window !== 'undefined') {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
      return Promise.reject(error)
    }
  )

  return api
}

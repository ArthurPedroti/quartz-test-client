import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { api } from 'services/api'
import { AuthTokenError } from 'services/errors/AuthTokenError'

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies[`${process.env.NEXT_PUBLIC_APP_NAME}.token`]) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, `${process.env.NEXT_PUBLIC_APP_NAME}.token`)
        delete api.defaults.headers['Authorization']

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
      return {
        props: {} as P
      }
    }
  }
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (cookies[`${process.env.NEXT_PUBLIC_APP_NAME}.token`]) {
      return {
        redirect: {
          destination: '/purchases',
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
}

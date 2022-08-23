import Login from 'templates/Login'
import { withSSRGuest } from 'utils/withSSRGuest'

export default function LoginPage() {
  return <Login />
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {}
  }
})

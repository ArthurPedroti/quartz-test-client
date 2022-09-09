import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from 'services/api'

type User = {
  username: string
  name: string
  department: string
}

interface AuthProviderProps {
  children: ReactNode
}

type SignInCredentials = {
  username: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut(broadcast = true) {
  destroyCookie(undefined, `${process.env.NEXT_PUBLIC_APP_NAME}.token`)
  delete api.defaults.headers['Authorization']

  if (broadcast) authChannel.postMessage('signOut')
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const { [`${process.env.NEXT_PUBLIC_APP_NAME}.token`]: token } =
    parseCookies()
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut(false)
          break
        case 'signIn':
          if (token) {
            Router.push('/purchases')
          }
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    if (token) {
      api
        .get('/users/me', {
          params: {
            populate: 'department'
          }
        })
        .then((response) => {
          const { name, username, department } = response.data
          setUser({
            name,
            username,
            department: department?.name
          })
        })
        .catch(() => {
          signOut(false)
        })
    }
  }, [])

  async function signIn({
    username: usernameData,
    password
  }: SignInCredentials) {
    try {
      const response = await api.post('/auth/local', {
        identifier: usernameData,
        password: password
      })

      const { jwt: token } = response.data

      setCookie(undefined, `${process.env.NEXT_PUBLIC_APP_NAME}.token`, token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      const user = await api.get('/users/me', {
        params: {
          populate: 'department'
        }
      })

      const { name, username, department } = user.data

      setUser({
        name,
        username,
        department: department?.name
      })

      authChannel.postMessage('signIn')
      Router.push('purchases')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

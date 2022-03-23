import { User } from 'firebase/auth'

export type AuthContextType = {
  currentUser: User | null
  register: (...props: any) => any
  login: (...props: any) => any
  logout: (...props: any) => any
  resetPassword: (...props: any) => any
}

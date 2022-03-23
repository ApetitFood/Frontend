export enum UserModesEnum {
  RECOMMENDED = 'recommended',
  CUSTOM = 'custom',
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  mode: UserModesEnum
}

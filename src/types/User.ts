export interface User {
  readonly id: string
  tags: UserTag[] | string
  type: AccountType
  login: string
  password: string | null
}

export enum AccountType {
  LOCAL = "LOCAL",
  LDAP = "LDAP",
}

export type UserTag = {
  text: string
}

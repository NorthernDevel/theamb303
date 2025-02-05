export interface Auth {
  code: string
  message: string
  data: AuthData
}

interface AuthData {
  token: string
}

export interface RequestAuth {
  username: string | undefined
  password: string | undefined
}

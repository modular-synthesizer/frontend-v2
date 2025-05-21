export type Session = {
  token: string
  admin: boolean
  created_at: Date
  duration: number
  account: Account
}
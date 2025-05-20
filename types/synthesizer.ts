export type Synthesizer = {
  id: string
  name: string
  voices: number
  members: Membership[]
}

export type MembershipType = 'creator'|'read'|'write'

export type Membership = {
  id: string
  type: MembershipType
  username: string
}
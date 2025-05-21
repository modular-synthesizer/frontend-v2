export type MembershipType = 'creator'|'read'|'write'

export type Membership = {
  id: string
  type: MembershipType
  username: string
}
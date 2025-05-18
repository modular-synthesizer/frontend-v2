export function getMembership(synthesizer: Synthesizer, username: string) {
  return synthesizer.members.find((m: Membership) => m.username === username)
}
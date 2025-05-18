import { expect, test, describe } from 'vitest'
import { getMembership } from "../../utils/functions/synthesizers"

const membership: Membership = {
  id: "membershipId", username: "Player", type: 'read'
}

const synthesizer: Synthesizer = {
  id: "synthesizerId",
  name: "Synthesizer name",
  members: [ membership ],
}

describe('getMembership', () => {
  test('Gets the correct membership in the synthesizer', () => {
    const m: Membership = getMembership(synthesizer, 'Player');
    expect(m.id).toEqual('membershipId')
  })
  test('Gets no membership if the player is not member of the synthesizer', () => {
    const m: Membership|undefined = getMembership(synthesizer, 'OtherPlayer');
    expect(m).toBeUndefined()
  })
})
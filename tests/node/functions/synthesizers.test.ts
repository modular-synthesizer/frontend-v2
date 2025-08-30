import { expect, test, describe } from 'vitest'
import { getMembership } from "../../../core/functions/synthesizers/getMembership"
import { synthesizerFactory } from '../factories/synthesizers'

const membership: Membership = {
  id: "membershipId", username: "Player", type: 'read'
}

describe('getMembership', async () => {

  const synthesizer: Synthesizer = await synthesizerFactory({
    id: "synthesizerId",
    name: "Synthesizer name",
    members: [ membership ],
  })

  test('Gets the correct membership in the synthesizer', () => {
    const m: Membership = getMembership(synthesizer, 'Player');
    expect(m.id).toEqual('membershipId')
  })
  test('Gets no membership if the player is not member of the synthesizer', () => {
    const m: Membership|undefined = getMembership(synthesizer, 'OtherPlayer');
    expect(m).toBeUndefined()
  })
})
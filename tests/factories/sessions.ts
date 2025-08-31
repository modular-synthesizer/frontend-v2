import { factory } from "@factory-js/factory";
import { createObject, type Factory } from "./utils/createObject";
import type { FactoryProps } from "./utils/FactoryProps";

const date = new Date()

export const SessionsFactory = factory.define({
  props: {
    id: () => "session-id",
    admin: () => false,
    token: () => 'fake-token',
    created_at: () => date,
    rights: () => [],
    account: () => ({
      id: "fake-account",
      username: "fakAccount",
      email: "fake@account.com",
    }),
    duration: () => 1000,
  } as FactoryProps<Session>,
  vars: {}
})

export const sessionFactory = createObject<Session>(SessionsFactory as Factory<Session>)
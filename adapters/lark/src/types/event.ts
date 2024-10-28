export interface EventHeader<K extends keyof Events> {
  event_id: string
  event_type: K
  create_time: string
  token: string
  app_id: string
  tenant_key: string
}

export interface Events {}
export type EventName = keyof Events

// In fact, this is the 2.0 version of the event sent by Lark.
// And only the 2.0 version has the `schema` field.
export type EventPayload = {
  [K in keyof Events]: {
    schema: '2.0'
    // special added field for TypeScript
    type: K
    header: EventHeader<K>
    event: Events[K]
  }
}[keyof Events]

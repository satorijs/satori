export interface EventHeader<T extends string> {
  event_id: string
  event_type: T
  create_time: string
  token: string
  app_id: string
  tenant_key: string
}

export interface Events {}
export type EventName = keyof Events

// In fact, this is the 2.0 version of the event sent by Lark.
// And only the 2.0 version has the `schema` field.
export type EventSkeleton<T extends EventName, Event, Header = EventHeader<T>> = {
  schema: '2.0'
  type: T
  header: Header
  event: Event
}

export type AllEvents = Events[EventName]

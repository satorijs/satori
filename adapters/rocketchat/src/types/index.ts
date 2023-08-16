import { Root } from './blocks'

export interface IRocketChatRecord {
  _id: string
  _updatedAt: Date
}
export type RoomID = string
type MentionType = 'user' | 'team'

interface IUser extends IRocketChatRecord{
  _id: string
  username?: string
}

export interface IMessage extends IRocketChatRecord {
  rid: RoomID
  msg: string
  tmid?: string
  tshow?: boolean
  // ts: Date;
  ts: {$date: number}
  mentions?: ({
    type: MentionType
  } & {
    _id: string
    username?: string
    name?: string
  })[]

  groupable?: boolean
  channels?: {
    _id: RoomID
    name?: string
  }[]
  u: Required<{
    _id: string
    username?: string
  }> & {
    name?: string
  }
  // blocks?: MessageSurfaceLayout;
  alias?: string
  md?: Root

  _hidden?: boolean
  imported?: boolean
  replies?: IUser['_id'][]
  location?: {
    type: 'Point'
    coordinates: [number, number]
  }
  starred?: { _id: IUser['_id'] }[]
  pinned?: boolean
  pinnedAt?: Date
  pinnedBy?: Pick<IUser, '_id' | 'username'>
  unread?: boolean
  temp?: boolean
  drid?: RoomID
  tlm?: Date

  dcount?: number
  tcount?: number
  // t?: MessageTypesValues;
  // e2e?: 'pending' | 'done';
  // otrAck?: string;

  // urls?: MessageUrl[];

  // fileUpload?: {
  //   publicFilePath: string;
  //   type?: string;
  //   size?: number;
  // };
  // files?: FileProp[];
  // attachments?: MessageAttachment[];

  reactions?: {
    [key: string]: { names?: (string | undefined)[]; usernames: string[]; federationReactionEventIds?: Record<string, string> }
  }

  private?: boolean
  /* @deprecated */
  bot?: boolean
  sentByEmail?: boolean
  webRtcCallEndTs?: Date
  role?: string

  avatar?: string
  emoji?: string

  // Tokenization fields
  // tokens?: Token[];
  html?: string
  // Messages sent from visitors have this field
  token?: string
  federation?: {
    eventId: string
  }
}

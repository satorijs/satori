import { Lark } from '.'
import { Internal } from './internal'

declare module '.' {
  export namespace Lark {
    export interface User {
      union_id: string
      user_id?: string
      open_id: string
      name?: string
      en_name?: string
      nickname?: string
      email?: string
      mobile?: string
      mobile_visible: boolean
      gender?: Gender
      avatar?: AvatarInfo
      status?: UserStatus
      department_ids?: string[]
      leader_user_id?: string
      city?: string
      country?: string
      work_station?: string
      join_time?: number
      is_tenant_manager?: boolean
      employee_no?: string
      employee_type?: number
      orders?: UserOrder[]
      custom_attrs?: any // TODO
      enterprise_email?: string
      job_title?: string
      geo?: string
      job_level_id?: string
      job_family_id?: string
      assign_info?: any // TODO
      department_path?: DepartmentDetail[]
    }

    export enum Gender {
      SECRET = 0,
      MALE = 1,
      FEMALE = 2,
    }

    export interface AvatarInfo {
      avatar_72: string
      avatar_240: string
      avatar_640: string
      avatar_origin: string
    }

    export interface UserStatus {
      is_frozen: boolean
      is_resigned: boolean
      is_activated: boolean
      is_exited: boolean
      is_unjoin: boolean
    }

    export interface UserOrder {
      department_id: string
      user_order: number
      department_order: number
      is_primary_dept: boolean
    }

    export interface DepartmentDetail {
      dotted_line_leader_user_ids: string[]
    }
  }
}

export interface GuildMember {
  member_id_type: Lark.UserIdType
  member_id: string
  name: string
  tenant_key: string
}

declare module './internal' {
  export interface Internal {
    /** @see https://open.larksuite.com/document/server-docs/contact-v3/user/get */
    getUserInfo(user_id: string, user_id_type?: Lark.UserIdType, department_id_type?: Lark.DepartmentIdType): Promise<BaseResponse & { data: Lark.User }>
  }
}

Internal.define({
  'contact/v3/users/{user_id}': {
    GET: 'getUserInfo',
  },
})

import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/usergroups.create': {
    POST: { 'usergroupsCreate': true },
  },
  '/usergroups.disable': {
    POST: { 'usergroupsDisable': true },
  },
  '/usergroups.enable': {
    POST: { 'usergroupsEnable': true },
  },
  '/usergroups.list': {
    GET: { 'usergroupsList': false },
  },
  '/usergroups.update': {
    POST: { 'usergroupsUpdate': true },
  },
  '/usergroups.users.list': {
    GET: { 'usergroupsUsersList': false },
  },
  '/usergroups.users.update': {
    POST: { 'usergroupsUsersUpdate': true },
  },
})

export namespace Usergroups {
  export namespace Params {
    export interface Create {
      channels?: string
      description?: string
      handle?: string
      include_count?: boolean
      name: string
    }
    export interface Disable {
      include_count?: boolean
      usergroup: string
    }
    export interface Enable {
      include_count?: boolean
      usergroup: string
    }
    export interface List {
      include_users?: boolean
      include_count?: boolean
      include_disabled?: boolean
    }
    export interface Update {
      handle?: string
      description?: string
      channels?: string
      include_count?: boolean
      usergroup: string
      name?: string
    }
    export interface UsersList {
      include_disabled?: boolean
      usergroup: string
    }
    export interface UsersUpdate {
      include_count?: boolean
      usergroup: string
      users: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Create a User Group
     * @see https://api.slack.com/methods/usergroups.create
     */
    usergroupsCreate(token: TokenInput, params: Usergroups.Params.Create): Promise<{
      ok: boolean
      usergroup: Definitions.Subteam
    }>

    /**
     * Disable an existing User Group
     * @see https://api.slack.com/methods/usergroups.disable
     */
    usergroupsDisable(token: TokenInput, params: Usergroups.Params.Disable): Promise<{
      ok: boolean
      usergroup: Definitions.Subteam
    }>

    /**
     * Enable a User Group
     * @see https://api.slack.com/methods/usergroups.enable
     */
    usergroupsEnable(token: TokenInput, params: Usergroups.Params.Enable): Promise<{
      ok: boolean
      usergroup: Definitions.Subteam
    }>

    /**
     * List all User Groups for a team
     * @see https://api.slack.com/methods/usergroups.list
     */
    usergroupsList(token: TokenInput, params: Usergroups.Params.List): Promise<{
      ok: boolean
      usergroups: Definitions.Subteam[]
    }>

    /**
     * Update an existing User Group
     * @see https://api.slack.com/methods/usergroups.update
     */
    usergroupsUpdate(token: TokenInput, params: Usergroups.Params.Update): Promise<{
      ok: boolean
      usergroup: Definitions.Subteam
    }>

    /**
     * List all users in a User Group
     * @see https://api.slack.com/methods/usergroups.users.list
     */
    usergroupsUsersList(token: TokenInput, params: Usergroups.Params.UsersList): Promise<{
      ok: boolean
      users: string[]
    }>

    /**
     * Update the list of users for a User Group
     * @see https://api.slack.com/methods/usergroups.users.update
     */
    usergroupsUsersUpdate(token: TokenInput, params: Usergroups.Params.UsersUpdate): Promise<{
      ok: boolean
      usergroup: Definitions.Subteam
    }>
  }
}

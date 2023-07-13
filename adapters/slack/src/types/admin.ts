import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/admin.apps.approve': {
    POST: { 'adminAppsApprove': true },
  },
  '/admin.apps.approved.list': {
    GET: { 'adminAppsApprovedList': false },
  },
  '/admin.apps.requests.list': {
    GET: { 'adminAppsRequestsList': false },
  },
  '/admin.apps.restrict': {
    POST: { 'adminAppsRestrict': true },
  },
  '/admin.apps.restricted.list': {
    GET: { 'adminAppsRestrictedList': false },
  },
  '/admin.conversations.archive': {
    POST: { 'adminConversationsArchive': true },
  },
  '/admin.conversations.convertToPrivate': {
    POST: { 'adminConversationsConvertToPrivate': true },
  },
  '/admin.conversations.create': {
    POST: { 'adminConversationsCreate': true },
  },
  '/admin.conversations.delete': {
    POST: { 'adminConversationsDelete': true },
  },
  '/admin.conversations.disconnectShared': {
    POST: { 'adminConversationsDisconnectShared': true },
  },
  '/admin.conversations.ekm.listOriginalConnectedChannelInfo': {
    GET: { 'adminConversationsEkmListOriginalConnectedChannelInfo': false },
  },
  '/admin.conversations.getConversationPrefs': {
    GET: { 'adminConversationsGetConversationPrefs': true },
  },
  '/admin.conversations.getTeams': {
    GET: { 'adminConversationsGetTeams': true },
  },
  '/admin.conversations.invite': {
    POST: { 'adminConversationsInvite': true },
  },
  '/admin.conversations.rename': {
    POST: { 'adminConversationsRename': true },
  },
  '/admin.conversations.restrictAccess.addGroup': {
    POST: { 'adminConversationsRestrictAccessAddGroup': false },
  },
  '/admin.conversations.restrictAccess.listGroups': {
    GET: { 'adminConversationsRestrictAccessListGroups': false },
  },
  '/admin.conversations.restrictAccess.removeGroup': {
    POST: { 'adminConversationsRestrictAccessRemoveGroup': false },
  },
  '/admin.conversations.search': {
    GET: { 'adminConversationsSearch': true },
  },
  '/admin.conversations.setConversationPrefs': {
    POST: { 'adminConversationsSetConversationPrefs': true },
  },
  '/admin.conversations.setTeams': {
    POST: { 'adminConversationsSetTeams': true },
  },
  '/admin.conversations.unarchive': {
    POST: { 'adminConversationsUnarchive': true },
  },
  '/admin.emoji.add': {
    POST: { 'adminEmojiAdd': false },
  },
  '/admin.emoji.addAlias': {
    POST: { 'adminEmojiAddAlias': false },
  },
  '/admin.emoji.list': {
    GET: { 'adminEmojiList': false },
  },
  '/admin.emoji.remove': {
    POST: { 'adminEmojiRemove': false },
  },
  '/admin.emoji.rename': {
    POST: { 'adminEmojiRename': false },
  },
  '/admin.inviteRequests.approve': {
    POST: { 'adminInviteRequestsApprove': true },
  },
  '/admin.inviteRequests.approved.list': {
    GET: { 'adminInviteRequestsApprovedList': true },
  },
  '/admin.inviteRequests.denied.list': {
    GET: { 'adminInviteRequestsDeniedList': true },
  },
  '/admin.inviteRequests.deny': {
    POST: { 'adminInviteRequestsDeny': true },
  },
  '/admin.inviteRequests.list': {
    GET: { 'adminInviteRequestsList': true },
  },
  '/admin.teams.admins.list': {
    GET: { 'adminTeamsAdminsList': false },
  },
  '/admin.teams.create': {
    POST: { 'adminTeamsCreate': true },
  },
  '/admin.teams.list': {
    GET: { 'adminTeamsList': true },
  },
  '/admin.teams.owners.list': {
    GET: { 'adminTeamsOwnersList': false },
  },
  '/admin.teams.settings.info': {
    GET: { 'adminTeamsSettingsInfo': true },
  },
  '/admin.teams.settings.setDefaultChannels': {
    POST: { 'adminTeamsSettingsSetDefaultChannels': false },
  },
  '/admin.teams.settings.setDescription': {
    POST: { 'adminTeamsSettingsSetDescription': true },
  },
  '/admin.teams.settings.setDiscoverability': {
    POST: { 'adminTeamsSettingsSetDiscoverability': true },
  },
  '/admin.teams.settings.setIcon': {
    POST: { 'adminTeamsSettingsSetIcon': false },
  },
  '/admin.teams.settings.setName': {
    POST: { 'adminTeamsSettingsSetName': true },
  },
  '/admin.usergroups.addChannels': {
    POST: { 'adminUsergroupsAddChannels': true },
  },
  '/admin.usergroups.addTeams': {
    POST: { 'adminUsergroupsAddTeams': true },
  },
  '/admin.usergroups.listChannels': {
    GET: { 'adminUsergroupsListChannels': true },
  },
  '/admin.usergroups.removeChannels': {
    POST: { 'adminUsergroupsRemoveChannels': true },
  },
  '/admin.users.assign': {
    POST: { 'adminUsersAssign': true },
  },
  '/admin.users.invite': {
    POST: { 'adminUsersInvite': true },
  },
  '/admin.users.list': {
    GET: { 'adminUsersList': true },
  },
  '/admin.users.remove': {
    POST: { 'adminUsersRemove': true },
  },
  '/admin.users.session.invalidate': {
    POST: { 'adminUsersSessionInvalidate': true },
  },
  '/admin.users.session.reset': {
    POST: { 'adminUsersSessionReset': true },
  },
  '/admin.users.setAdmin': {
    POST: { 'adminUsersSetAdmin': true },
  },
  '/admin.users.setExpiration': {
    POST: { 'adminUsersSetExpiration': true },
  },
  '/admin.users.setOwner': {
    POST: { 'adminUsersSetOwner': true },
  },
  '/admin.users.setRegular': {
    POST: { 'adminUsersSetRegular': true },
  },
})

export namespace Admin {
  export namespace Params {
    export interface AppsApprove {
      app_id?: string
      request_id?: string
      team_id?: string
    }
    export interface AppsApprovedList {
      limit?: number
      cursor?: string
      team_id?: string
      enterprise_id?: string
    }
    export interface AppsRequestsList {
      limit?: number
      cursor?: string
      team_id?: string
    }
    export interface AppsRestrict {
      app_id?: string
      request_id?: string
      team_id?: string
    }
    export interface AppsRestrictedList {
      limit?: number
      cursor?: string
      team_id?: string
      enterprise_id?: string
    }
    export interface ConversationsArchive {
      channel_id: string
    }
    export interface ConversationsConvertToPrivate {
      channel_id: string
    }
    export interface ConversationsCreate {
      name: string
      description?: string
      is_private: boolean
      org_wide?: boolean
      team_id?: string
    }
    export interface ConversationsDelete {
      channel_id: string
    }
    export interface ConversationsDisconnectShared {
      channel_id: string
      leaving_team_ids?: string
    }
    export interface ConversationsEkmListOriginalConnectedChannelInfo {
      channel_ids?: string
      team_ids?: string
      limit?: number
      cursor?: string
    }
    export interface ConversationsGetConversationPrefs {
      channel_id: string
    }
    export interface ConversationsGetTeams {
      channel_id: string
      cursor?: string
      limit?: number
    }
    export interface ConversationsInvite {
      user_ids: string
      channel_id: string
    }
    export interface ConversationsRename {
      channel_id: string
      name: string
    }
    export interface ConversationsRestrictAccessAddGroup {
      team_id?: string
      group_id: string
      channel_id: string
    }
    export interface ConversationsRestrictAccessListGroups {
      channel_id: string
      team_id?: string
    }
    export interface ConversationsRestrictAccessRemoveGroup {
      team_id: string
      group_id: string
      channel_id: string
    }
    export interface ConversationsSearch {
      team_ids?: string
      query?: string
      limit?: number
      cursor?: string
      search_channel_types?: string
      sort?: string
      sort_dir?: string
    }
    export interface ConversationsSetConversationPrefs {
      channel_id: string
      prefs: string
    }
    export interface ConversationsSetTeams {
      channel_id: string
      team_id?: string
      target_team_ids?: string
      org_channel?: boolean
    }
    export interface ConversationsUnarchive {
      channel_id: string
    }
    export interface EmojiAdd {
      name: string
      url: string
    }
    export interface EmojiAddAlias {
      name: string
      alias_for: string
    }
    export interface EmojiList {
      cursor?: string
      limit?: number
    }
    export interface EmojiRemove {
      name: string
    }
    export interface EmojiRename {
      name: string
      new_name: string
    }
    export interface InviteRequestsApprove {
      team_id?: string
      invite_request_id: string
    }
    export interface InviteRequestsApprovedList {
      team_id?: string
      cursor?: string
      limit?: number
    }
    export interface InviteRequestsDeniedList {
      team_id?: string
      cursor?: string
      limit?: number
    }
    export interface InviteRequestsDeny {
      team_id?: string
      invite_request_id: string
    }
    export interface InviteRequestsList {
      team_id?: string
      cursor?: string
      limit?: number
    }
    export interface TeamsAdminsList {
      limit?: number
      cursor?: string
      team_id: string
    }
    export interface TeamsCreate {
      team_domain: string
      team_name: string
      team_description?: string
      team_discoverability?: string
    }
    export interface TeamsList {
      limit?: number
      cursor?: string
    }
    export interface TeamsOwnersList {
      team_id: string
      limit?: number
      cursor?: string
    }
    export interface TeamsSettingsInfo {
      team_id: string
    }
    export interface TeamsSettingsSetDefaultChannels {
      team_id: string
      channel_ids: string
    }
    export interface TeamsSettingsSetDescription {
      team_id: string
      description: string
    }
    export interface TeamsSettingsSetDiscoverability {
      team_id: string
      discoverability: string
    }
    export interface TeamsSettingsSetIcon {
      image_url: string
      team_id: string
    }
    export interface TeamsSettingsSetName {
      team_id: string
      name: string
    }
    export interface UsergroupsAddChannels {
      usergroup_id: string
      team_id?: string
      channel_ids: string
    }
    export interface UsergroupsAddTeams {
      usergroup_id: string
      team_ids: string
      auto_provision?: boolean
    }
    export interface UsergroupsListChannels {
      usergroup_id: string
      team_id?: string
      include_num_members?: boolean
    }
    export interface UsergroupsRemoveChannels {
      usergroup_id: string
      channel_ids: string
    }
    export interface UsersAssign {
      team_id: string
      user_id: string
      is_restricted?: boolean
      is_ultra_restricted?: boolean
      channel_ids?: string
    }
    export interface UsersInvite {
      team_id: string
      email: string
      channel_ids: string
      custom_message?: string
      real_name?: string
      resend?: boolean
      is_restricted?: boolean
      is_ultra_restricted?: boolean
      guest_expiration_ts?: string
    }
    export interface UsersList {
      team_id: string
      cursor?: string
      limit?: number
    }
    export interface UsersRemove {
      team_id: string
      user_id: string
    }
    export interface UsersSessionInvalidate {
      team_id: string
      session_id: number
    }
    export interface UsersSessionReset {
      user_id: string
      mobile_only?: boolean
      web_only?: boolean
    }
    export interface UsersSetAdmin {
      team_id: string
      user_id: string
    }
    export interface UsersSetExpiration {
      team_id: string
      user_id: string
      expiration_ts: number
    }
    export interface UsersSetOwner {
      team_id: string
      user_id: string
    }
    export interface UsersSetRegular {
      team_id: string
      user_id: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Approve an app for installation on a workspace.
     * @see https://api.slack.com/methods/admin.apps.approve
     */
    adminAppsApprove(token: TokenInput, params: Admin.Params.AppsApprove): Promise<{
      ok: boolean
    }>

    /**
     * List approved apps for an org or workspace.
     * @see https://api.slack.com/methods/admin.apps.approved.list
     */
    adminAppsApprovedList(token: TokenInput, params: Admin.Params.AppsApprovedList): Promise<{
      ok: boolean
    }>

    /**
     * List app requests for a team/workspace.
     * @see https://api.slack.com/methods/admin.apps.requests.list
     */
    adminAppsRequestsList(token: TokenInput, params: Admin.Params.AppsRequestsList): Promise<{
      ok: boolean
    }>

    /**
     * Restrict an app for installation on a workspace.
     * @see https://api.slack.com/methods/admin.apps.restrict
     */
    adminAppsRestrict(token: TokenInput, params: Admin.Params.AppsRestrict): Promise<{
      ok: boolean
    }>

    /**
     * List restricted apps for an org or workspace.
     * @see https://api.slack.com/methods/admin.apps.restricted.list
     */
    adminAppsRestrictedList(token: TokenInput, params: Admin.Params.AppsRestrictedList): Promise<{
      ok: boolean
    }>

    /**
     * Archive a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.archive
     */
    adminConversationsArchive(token: TokenInput, params: Admin.Params.ConversationsArchive): Promise<{
      ok: boolean
    }>

    /**
     * Convert a public channel to a private channel.
     * @see https://api.slack.com/methods/admin.conversations.convertToPrivate
     */
    adminConversationsConvertToPrivate(token: TokenInput, params: Admin.Params.ConversationsConvertToPrivate): Promise<{
      ok: boolean
    }>

    /**
     * Create a public or private channel-based conversation.
     * @see https://api.slack.com/methods/admin.conversations.create
     */
    adminConversationsCreate(token: TokenInput, params: Admin.Params.ConversationsCreate): Promise<{
      channel_id?: string
      ok: boolean
    }>

    /**
     * Delete a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.delete
     */
    adminConversationsDelete(token: TokenInput, params: Admin.Params.ConversationsDelete): Promise<{
      ok: boolean
    }>

    /**
     * Disconnect a connected channel from one or more workspaces.
     * @see https://api.slack.com/methods/admin.conversations.disconnectShared
     */
    adminConversationsDisconnectShared(token: TokenInput, params: Admin.Params.ConversationsDisconnectShared): Promise<{
      ok: boolean
    }>

    /**
     * List all disconnected channels—i.e., channels that were once connected to other workspaces and then disconnected—and the corresponding original channel IDs for key revocation with EKM.
     * @see https://api.slack.com/methods/admin.conversations.ekm.listOriginalConnectedChannelInfo
     */
    adminConversationsEkmListOriginalConnectedChannelInfo(token: TokenInput, params: Admin.Params.ConversationsEkmListOriginalConnectedChannelInfo): Promise<{
      ok: boolean
    }>

    /**
     * Get conversation preferences for a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.getConversationPrefs
     */
    adminConversationsGetConversationPrefs(token: TokenInput, params: Admin.Params.ConversationsGetConversationPrefs): Promise<{
      ok: boolean
      prefs?: {
        can_thread: {
          type: string[]
          user: string[]
        }
        who_can_post: {
          type: string[]
          user: string[]
        }
      }
    }>

    /**
     * Get all the workspaces a given public or private channel is connected to within this Enterprise org.
     * @see https://api.slack.com/methods/admin.conversations.getTeams
     */
    adminConversationsGetTeams(token: TokenInput, params: Admin.Params.ConversationsGetTeams): Promise<{
      ok: boolean
      response_metadata?: {
        next_cursor: string
      }
      team_ids: string[]
    }>

    /**
     * Invite a user to a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.invite
     */
    adminConversationsInvite(token: TokenInput, params: Admin.Params.ConversationsInvite): Promise<{
      ok: boolean
    }>

    /**
     * Rename a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.rename
     */
    adminConversationsRename(token: TokenInput, params: Admin.Params.ConversationsRename): Promise<{
      ok: boolean
    }>

    /**
     * Add an allowlist of IDP groups for accessing a channel
     * @see https://api.slack.com/methods/admin.conversations.restrictAccess.addGroup
     */
    adminConversationsRestrictAccessAddGroup(token: TokenInput, params: Admin.Params.ConversationsRestrictAccessAddGroup): Promise<{
      ok: boolean
    }>

    /**
     * List all IDP Groups linked to a channel
     * @see https://api.slack.com/methods/admin.conversations.restrictAccess.listGroups
     */
    adminConversationsRestrictAccessListGroups(token: TokenInput, params: Admin.Params.ConversationsRestrictAccessListGroups): Promise<{
      ok: boolean
    }>

    /**
     * Remove a linked IDP group linked from a private channel
     * @see https://api.slack.com/methods/admin.conversations.restrictAccess.removeGroup
     */
    adminConversationsRestrictAccessRemoveGroup(token: TokenInput, params: Admin.Params.ConversationsRestrictAccessRemoveGroup): Promise<{
      ok: boolean
    }>

    /**
     * Search for public or private channels in an Enterprise organization.
     * @see https://api.slack.com/methods/admin.conversations.search
     */
    adminConversationsSearch(token: TokenInput, params: Admin.Params.ConversationsSearch): Promise<{
      channels: Definitions.Channel[]
      next_cursor: string
    }>

    /**
     * Set the posting permissions for a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.setConversationPrefs
     */
    adminConversationsSetConversationPrefs(token: TokenInput, params: Admin.Params.ConversationsSetConversationPrefs): Promise<{
      ok: boolean
    }>

    /**
     * Set the workspaces in an Enterprise grid org that connect to a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.setTeams
     */
    adminConversationsSetTeams(token: TokenInput, params: Admin.Params.ConversationsSetTeams): Promise<{
      ok: boolean
    }>

    /**
     * Unarchive a public or private channel.
     * @see https://api.slack.com/methods/admin.conversations.unarchive
     */
    adminConversationsUnarchive(token: TokenInput, params: Admin.Params.ConversationsUnarchive): Promise<{
      ok: boolean
    }>

    /**
     * Add an emoji.
     * @see https://api.slack.com/methods/admin.emoji.add
     */
    adminEmojiAdd(token: TokenInput, params: Admin.Params.EmojiAdd): Promise<{
      ok: boolean
    }>

    /**
     * Add an emoji alias.
     * @see https://api.slack.com/methods/admin.emoji.addAlias
     */
    adminEmojiAddAlias(token: TokenInput, params: Admin.Params.EmojiAddAlias): Promise<{
      ok: boolean
    }>

    /**
     * List emoji for an Enterprise Grid organization.
     * @see https://api.slack.com/methods/admin.emoji.list
     */
    adminEmojiList(token: TokenInput, params: Admin.Params.EmojiList): Promise<{
      ok: boolean
    }>

    /**
     * Remove an emoji across an Enterprise Grid organization
     * @see https://api.slack.com/methods/admin.emoji.remove
     */
    adminEmojiRemove(token: TokenInput, params: Admin.Params.EmojiRemove): Promise<{
      ok: boolean
    }>

    /**
     * Rename an emoji.
     * @see https://api.slack.com/methods/admin.emoji.rename
     */
    adminEmojiRename(token: TokenInput, params: Admin.Params.EmojiRename): Promise<{
      ok: boolean
    }>

    /**
     * Approve a workspace invite request.
     * @see https://api.slack.com/methods/admin.inviteRequests.approve
     */
    adminInviteRequestsApprove(token: TokenInput, params: Admin.Params.InviteRequestsApprove): Promise<{
      ok: boolean
    }>

    /**
     * List all approved workspace invite requests.
     * @see https://api.slack.com/methods/admin.inviteRequests.approved.list
     */
    adminInviteRequestsApprovedList(token: TokenInput, params: Admin.Params.InviteRequestsApprovedList): Promise<{
      ok: boolean
    }>

    /**
     * List all denied workspace invite requests.
     * @see https://api.slack.com/methods/admin.inviteRequests.denied.list
     */
    adminInviteRequestsDeniedList(token: TokenInput, params: Admin.Params.InviteRequestsDeniedList): Promise<{
      ok: boolean
    }>

    /**
     * Deny a workspace invite request.
     * @see https://api.slack.com/methods/admin.inviteRequests.deny
     */
    adminInviteRequestsDeny(token: TokenInput, params: Admin.Params.InviteRequestsDeny): Promise<{
      ok: boolean
    }>

    /**
     * List all pending workspace invite requests.
     * @see https://api.slack.com/methods/admin.inviteRequests.list
     */
    adminInviteRequestsList(token: TokenInput, params: Admin.Params.InviteRequestsList): Promise<{
      ok: boolean
    }>

    /**
     * List all of the admins on a given workspace.
     * @see https://api.slack.com/methods/admin.teams.admins.list
     */
    adminTeamsAdminsList(token: TokenInput, params: Admin.Params.TeamsAdminsList): Promise<{
      ok: boolean
    }>

    /**
     * Create an Enterprise team.
     * @see https://api.slack.com/methods/admin.teams.create
     */
    adminTeamsCreate(token: TokenInput, params: Admin.Params.TeamsCreate): Promise<{
      ok: boolean
    }>

    /**
     * List all teams on an Enterprise organization
     * @see https://api.slack.com/methods/admin.teams.list
     */
    adminTeamsList(token: TokenInput, params: Admin.Params.TeamsList): Promise<{
      ok: boolean
    }>

    /**
     * List all of the owners on a given workspace.
     * @see https://api.slack.com/methods/admin.teams.owners.list
     */
    adminTeamsOwnersList(token: TokenInput, params: Admin.Params.TeamsOwnersList): Promise<{
      ok: boolean
    }>

    /**
     * Fetch information about settings in a workspace
     * @see https://api.slack.com/methods/admin.teams.settings.info
     */
    adminTeamsSettingsInfo(token: TokenInput, params: Admin.Params.TeamsSettingsInfo): Promise<{
      ok: boolean
    }>

    /**
     * Set the default channels of a workspace.
     * @see https://api.slack.com/methods/admin.teams.settings.setDefaultChannels
     */
    adminTeamsSettingsSetDefaultChannels(token: TokenInput, params: Admin.Params.TeamsSettingsSetDefaultChannels): Promise<{
      ok: boolean
    }>

    /**
     * Set the description of a given workspace.
     * @see https://api.slack.com/methods/admin.teams.settings.setDescription
     */
    adminTeamsSettingsSetDescription(token: TokenInput, params: Admin.Params.TeamsSettingsSetDescription): Promise<{
      ok: boolean
    }>

    /**
     * An API method that allows admins to set the discoverability of a given workspace
     * @see https://api.slack.com/methods/admin.teams.settings.setDiscoverability
     */
    adminTeamsSettingsSetDiscoverability(token: TokenInput, params: Admin.Params.TeamsSettingsSetDiscoverability): Promise<{
      ok: boolean
    }>

    /**
     * Sets the icon of a workspace.
     * @see https://api.slack.com/methods/admin.teams.settings.setIcon
     */
    adminTeamsSettingsSetIcon(token: TokenInput, params: Admin.Params.TeamsSettingsSetIcon): Promise<{
      ok: boolean
    }>

    /**
     * Set the name of a given workspace.
     * @see https://api.slack.com/methods/admin.teams.settings.setName
     */
    adminTeamsSettingsSetName(token: TokenInput, params: Admin.Params.TeamsSettingsSetName): Promise<{
      ok: boolean
    }>

    /**
     * Add one or more default channels to an IDP group.
     * @see https://api.slack.com/methods/admin.usergroups.addChannels
     */
    adminUsergroupsAddChannels(token: TokenInput, params: Admin.Params.UsergroupsAddChannels): Promise<{
      ok: boolean
    }>

    /**
     * Associate one or more default workspaces with an organization-wide IDP group.
     * @see https://api.slack.com/methods/admin.usergroups.addTeams
     */
    adminUsergroupsAddTeams(token: TokenInput, params: Admin.Params.UsergroupsAddTeams): Promise<{
      ok: boolean
    }>

    /**
     * List the channels linked to an org-level IDP group (user group).
     * @see https://api.slack.com/methods/admin.usergroups.listChannels
     */
    adminUsergroupsListChannels(token: TokenInput, params: Admin.Params.UsergroupsListChannels): Promise<{
      ok: boolean
    }>

    /**
     * Remove one or more default channels from an org-level IDP group (user group).
     * @see https://api.slack.com/methods/admin.usergroups.removeChannels
     */
    adminUsergroupsRemoveChannels(token: TokenInput, params: Admin.Params.UsergroupsRemoveChannels): Promise<{
      ok: boolean
    }>

    /**
     * Add an Enterprise user to a workspace.
     * @see https://api.slack.com/methods/admin.users.assign
     */
    adminUsersAssign(token: TokenInput, params: Admin.Params.UsersAssign): Promise<{
      ok: boolean
    }>

    /**
     * Invite a user to a workspace.
     * @see https://api.slack.com/methods/admin.users.invite
     */
    adminUsersInvite(token: TokenInput, params: Admin.Params.UsersInvite): Promise<{
      ok: boolean
    }>

    /**
     * List users on a workspace
     * @see https://api.slack.com/methods/admin.users.list
     */
    adminUsersList(token: TokenInput, params: Admin.Params.UsersList): Promise<{
      ok: boolean
    }>

    /**
     * Remove a user from a workspace.
     * @see https://api.slack.com/methods/admin.users.remove
     */
    adminUsersRemove(token: TokenInput, params: Admin.Params.UsersRemove): Promise<{
      ok: boolean
    }>

    /**
     * Invalidate a single session for a user by session_id
     * @see https://api.slack.com/methods/admin.users.session.invalidate
     */
    adminUsersSessionInvalidate(token: TokenInput, params: Admin.Params.UsersSessionInvalidate): Promise<{
      ok: boolean
    }>

    /**
     * Wipes all valid sessions on all devices for a given user
     * @see https://api.slack.com/methods/admin.users.session.reset
     */
    adminUsersSessionReset(token: TokenInput, params: Admin.Params.UsersSessionReset): Promise<{
      ok: boolean
    }>

    /**
     * Set an existing guest, regular user, or owner to be an admin user.
     * @see https://api.slack.com/methods/admin.users.setAdmin
     */
    adminUsersSetAdmin(token: TokenInput, params: Admin.Params.UsersSetAdmin): Promise<{
      ok: boolean
    }>

    /**
     * Set an expiration for a guest user
     * @see https://api.slack.com/methods/admin.users.setExpiration
     */
    adminUsersSetExpiration(token: TokenInput, params: Admin.Params.UsersSetExpiration): Promise<{
      ok: boolean
    }>

    /**
     * Set an existing guest, regular user, or admin user to be a workspace owner.
     * @see https://api.slack.com/methods/admin.users.setOwner
     */
    adminUsersSetOwner(token: TokenInput, params: Admin.Params.UsersSetOwner): Promise<{
      ok: boolean
    }>

    /**
     * Set an existing guest user, admin user, or owner to be a regular user.
     * @see https://api.slack.com/methods/admin.users.setRegular
     */
    adminUsersSetRegular(token: TokenInput, params: Admin.Params.UsersSetRegular): Promise<{
      ok: boolean
    }>

  }
}

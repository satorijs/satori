import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/files.comments.delete': {
    POST: { 'filesCommentsDelete': true },
  },
  '/files.delete': {
    POST: { 'filesDelete': true },
  },
  '/files.info': {
    GET: { 'filesInfo': false },
  },
  '/files.list': {
    GET: { 'filesList': false },
  },
  '/files.remote.add': {
    POST: { 'filesRemoteAdd': false },
  },
  '/files.remote.info': {
    GET: { 'filesRemoteInfo': false },
  },
  '/files.remote.list': {
    GET: { 'filesRemoteList': false },
  },
  '/files.remote.remove': {
    POST: { 'filesRemoteRemove': false },
  },
  '/files.remote.share': {
    GET: { 'filesRemoteShare': false },
  },
  '/files.remote.update': {
    POST: { 'filesRemoteUpdate': false },
  },
  '/files.revokePublicURL': {
    POST: { 'filesRevokePublicURL': true },
  },
  '/files.sharedPublicURL': {
    POST: { 'filesSharedPublicURL': true },
  },
  '/files.upload': {
    POST: { 'filesUpload': false },
  },
})

export namespace Files {
  export namespace Params {
    export interface CommentsDelete {
      file?: string
      id?: string
    }
    export interface Delete {
      file?: string
    }
    export interface Info {
      file?: string
      count?: string
      page?: string
      limit?: number
      cursor?: string
    }
    export interface List {
      user?: string
      channel?: string
      ts_from?: number
      ts_to?: number
      types?: string
      count?: string
      page?: string
      show_files_hidden_by_limit?: boolean
    }
    export interface RemoteAdd {
      external_id?: string
      title?: string
      filetype?: string
      external_url?: string
      preview_image?: string
      indexable_file_contents?: string
    }
    export interface RemoteInfo {
      file?: string
      external_id?: string
    }
    export interface RemoteList {
      channel?: string
      ts_from?: number
      ts_to?: number
      limit?: number
      cursor?: string
    }
    export interface RemoteRemove {
      file?: string
      external_id?: string
    }
    export interface RemoteShare {
      file?: string
      external_id?: string
      channels?: string
    }
    export interface RemoteUpdate {
      file?: string
      external_id?: string
      title?: string
      filetype?: string
      external_url?: string
      preview_image?: string
      indexable_file_contents?: string
    }
    export interface RevokePublicURL {
      file?: string
    }
    export interface SharedPublicURL {
      file?: string
    }
    export interface Upload {
      file?: string
      content?: string
      filetype?: string
      filename?: string
      title?: string
      initial_comment?: string
      channels?: string
      thread_ts?: number
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Deletes an existing comment on a file.
     * @see https://api.slack.com/methods/files.comments.delete
     */
    filesCommentsDelete(token: TokenInput, params: Files.Params.CommentsDelete): Promise<{
      ok: boolean
    }>

    /**
     * Deletes a file.
     * @see https://api.slack.com/methods/files.delete
     */
    filesDelete(token: TokenInput, params: Files.Params.Delete): Promise<{
      ok: boolean
    }>

    /**
     * Gets information about a file.
     * @see https://api.slack.com/methods/files.info
     */
    filesInfo(token: TokenInput, params: Files.Params.Info): Promise<{
      comments: Definitions.Comments
      content_html?: unknown
      editor?: string
      file: Definitions.File
      ok: boolean
      paging?: Definitions.Paging
      response_metadata?: Definitions.ResponseMetadata
    }>

    /**
     * List for a team, in a channel, or from a user with applied filters.
     * @see https://api.slack.com/methods/files.list
     */
    filesList(token: TokenInput, params: Files.Params.List): Promise<{
      files: Definitions.File[]
      ok: boolean
      paging: Definitions.Paging
    }>

    /**
     * Adds a file from a remote service
     * @see https://api.slack.com/methods/files.remote.add
     */
    filesRemoteAdd(token: TokenInput, params: Files.Params.RemoteAdd): Promise<{
      ok: boolean
    }>

    /**
     * Retrieve information about a remote file added to Slack
     * @see https://api.slack.com/methods/files.remote.info
     */
    filesRemoteInfo(token: TokenInput, params: Files.Params.RemoteInfo): Promise<{
      ok: boolean
    }>

    /**
     * Retrieve information about a remote file added to Slack
     * @see https://api.slack.com/methods/files.remote.list
     */
    filesRemoteList(token: TokenInput, params: Files.Params.RemoteList): Promise<{
      ok: boolean
    }>

    /**
     * Remove a remote file.
     * @see https://api.slack.com/methods/files.remote.remove
     */
    filesRemoteRemove(token: TokenInput, params: Files.Params.RemoteRemove): Promise<{
      ok: boolean
    }>

    /**
     * Share a remote file into a channel.
     * @see https://api.slack.com/methods/files.remote.share
     */
    filesRemoteShare(token: TokenInput, params: Files.Params.RemoteShare): Promise<{
      ok: boolean
    }>

    /**
     * Updates an existing remote file.
     * @see https://api.slack.com/methods/files.remote.update
     */
    filesRemoteUpdate(token: TokenInput, params: Files.Params.RemoteUpdate): Promise<{
      ok: boolean
    }>

    /**
     * Revokes public/external sharing access for a file
     * @see https://api.slack.com/methods/files.revokePublicURL
     */
    filesRevokePublicURL(token: TokenInput, params: Files.Params.RevokePublicURL): Promise<{
      file: Definitions.File
      ok: boolean
    }>

    /**
     * Enables a file for public/external sharing.
     * @see https://api.slack.com/methods/files.sharedPublicURL
     */
    filesSharedPublicURL(token: TokenInput, params: Files.Params.SharedPublicURL): Promise<{
      file: Definitions.File
      ok: boolean
    }>

    /**
     * Uploads or creates a file.
     * @see https://api.slack.com/methods/files.upload
     */
    filesUpload(token: TokenInput, params: Files.Params.Upload): Promise<{
      file: Definitions.File
      ok: boolean
    }>
  }
}

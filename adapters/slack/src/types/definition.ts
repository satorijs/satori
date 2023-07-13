export namespace Definitions {
  export type BotProfile = {
    app_id: string
    deleted: boolean
    icons: {
      image_36: string
      image_48: string
      image_72: string
    }
    id: string
    name: string
    team_id: string
    updated: number
  }

  export type Channel = {
    accepted_user: string
    created: number
    creator: string
    id: string
    is_archived: boolean
    is_channel: boolean
    is_frozen: boolean
    is_general: boolean
    is_member: boolean
    is_moved: number
    is_mpim: boolean
    is_non_threadable: boolean
    is_org_shared: boolean
    is_pending_ext_shared: boolean
    is_private: boolean
    is_read_only: boolean
    is_shared: boolean
    is_thread_only: boolean
    last_read: string
    latest: Definitions.Message
    members: string[]
    name: string
    name_normalized: string
    num_members: number
    pending_shared: string[]
    previous_names: string[]
    priority: unknown
    purpose: {
      creator: string
      last_set: number
      value: string
    }
    topic: {
      creator: string
      last_set: number
      value: string
    }
    unlinked: number
    unread_count: number
    unread_count_display: number
  }

  export type Comment = {
    comment: string
    created: number
    id: string
    is_intro: boolean
    is_starred: boolean
    num_stars: number
    pinned_info: {
    }
    pinned_to: string[]
    reactions: Definitions.Reaction[]
    timestamp: number
    user: string
  }

  export type Comments = unknown[]

  export type Conversation = {
    accepted_user: string
    connected_team_ids: string[]
    conversation_host_id: string
    created: number
    creator: string
    display_counts: {
      display_counts: number
      guest_counts: number
    }
    enterprise_id: string
    has_pins: boolean
    id: string
    internal_team_ids: string[]
    is_archived: boolean
    is_channel: boolean
    is_ext_shared: boolean
    is_frozen: boolean
    is_general: boolean
    is_global_shared: boolean
    is_group: boolean
    is_im: boolean
    is_member: boolean
    is_moved: number
    is_mpim: boolean
    is_non_threadable: boolean
    is_open: boolean
    is_org_default: boolean
    is_org_mandatory: boolean
    is_org_shared: boolean
    is_pending_ext_shared: boolean
    is_private: boolean
    is_read_only: boolean
    is_shared: boolean
    is_starred: boolean
    is_thread_only: boolean
    last_read: string
    latest: Definitions.Message
    members: string[]
    name: string
    name_normalized: string
    num_members: number
    parent_conversation: string
    pending_connected_team_ids: string[]
    pending_shared: string[]
    pin_count: number
    previous_names: string[]
    priority: unknown
    purpose: {
      creator: string
      last_set: number
      value: string
    }
    shared_team_ids: string[]
    shares: {
      accepted_user: string
      is_active: boolean
      team: Definitions.Team
      user: string
    }[]
    timezone_count: number
    topic: {
      creator: string
      last_set: number
      value: string
    }
    unlinked: number
    unread_count: number
    unread_count_display: number
    use_case: string
    user: string
    version: number
  }

  export type EnterpriseUser = {
    enterprise_id: string
    enterprise_name: string
    id: string
    is_admin: boolean
    is_owner: boolean
    teams: string[]
  }

  export type ExternalOrgMigrations = {
    current: {
      date_started: number
      team_id: string
    }[]
    date_updated: number
  }

  export type File = {
    channels: string[]
    comments_count: number
    created: number
    date_delete: number
    display_as_bot: boolean
    editable: boolean
    editor: string
    external_id: string
    external_type: string
    external_url: string
    filetype: string
    groups: string[]
    has_rich_preview: boolean
    id: string
    image_exif_rotation: number
    ims: string[]
    is_external: boolean
    is_public: boolean
    is_starred: boolean
    is_tombstoned: boolean
    last_editor: string
    mimetype: string
    mode: string
    name: string
    non_owner_editable: boolean
    num_stars: number
    original_h: number
    original_w: number
    permalink: string
    permalink_public: string
    pinned_info: {
    }
    pinned_to: string[]
    pretty_type: string
    preview: string
    public_url_shared: boolean
    reactions: Definitions.Reaction[]
    shares: {
      private: unknown
      public: unknown
    }
    size: number
    source_team: string
    state: string
    thumb_1024: string
    thumb_1024_h: number
    thumb_1024_w: number
    thumb_160: string
    thumb_360: string
    thumb_360_h: number
    thumb_360_w: number
    thumb_480: string
    thumb_480_h: number
    thumb_480_w: number
    thumb_64: string
    thumb_720: string
    thumb_720_h: number
    thumb_720_w: number
    thumb_80: string
    thumb_800: string
    thumb_800_h: number
    thumb_800_w: number
    thumb_960: string
    thumb_960_h: number
    thumb_960_w: number
    thumb_tiny: string
    timestamp: number
    title: string
    updated: number
    url_private: string
    url_private_download: string
    user: string
    user_team: string
    username: string
  }

  export type Icon = {
    image_102: string
    image_132: string
    image_230: string
    image_34: string
    image_44: string
    image_68: string
    image_88: string
    image_default: boolean
  }

  export type Message = {
    attachments: {
      fallback: string
      id: number
      image_bytes: number
      image_height: number
      image_url: string
      image_width: number
    }[]
    blocks: {
      type: string
    }[]
    bot_id: string
    bot_profile: Definitions.BotProfile
    client_msg_id: string
    comment: Definitions.Comment
    display_as_bot: boolean
    file: Definitions.File
    files: Definitions.File[]
    icons: {
      emoji: string
      image_64: string
    }
    inviter: string
    is_delayed_message: boolean
    is_intro: boolean
    is_starred: boolean
    last_read: string
    latest_reply: string
    name: string
    old_name: string
    parent_user_id: string
    permalink: string
    pinned_to: string[]
    purpose: string
    reactions: Definitions.Reaction[]
    reply_count: number
    reply_users: string[]
    reply_users_count: number
    source_team: string
    subscribed: boolean
    subtype: string
    team: string
    text: string
    thread_ts: string
    topic: string
    ts: string
    type: string
    unread_count: number
    upload: boolean
    user: string
    user_profile: Definitions.UserProfileShort
    user_team: string
    username: string
  }

  export type Paging = {
    count: number
    page: number
    pages: number
    per_page: number
    spill: number
    total: number
  }

  export type PrimaryOwner = {
    email: string
    id: string
  }

  export type Reaction = {
    count: number
    name: string
    users: string[]
  }

  export type Reminder = {
    complete_ts: number
    creator: string
    id: string
    recurring: boolean
    text: string
    time: number
    user: string
  }

  export type Resources = {
    excluded_ids: string[]
    ids: string[]
    wildcard: boolean
  }

  export type ResponseMetadata = {
    next_cursor: string
  }

  export type Scopes = string[]

  export type Subteam = {
    auto_provision: boolean
    auto_type: unknown
    channel_count: number
    created_by: string
    date_create: number
    date_delete: number
    date_update: number
    deleted_by: unknown
    description: string
    enterprise_subteam_id: string
    handle: string
    id: string
    is_external: boolean
    is_subteam: boolean
    is_usergroup: boolean
    name: string
    prefs: {
      channels: string[]
      groups: string[]
    }
    team_id: string
    updated_by: string
    user_count: number
    users: string[]
  }

  export type Team = {
    archived: boolean
    avatar_base_url: string
    created: number
    date_create: number
    deleted: boolean
    description: unknown
    discoverable: unknown
    domain: string
    email_domain: string
    enterprise_id: string
    enterprise_name: string
    external_org_migrations: Definitions.ExternalOrgMigrations
    has_compliance_export: boolean
    icon: Definitions.Icon
    id: string
    is_assigned: boolean
    is_enterprise: number
    is_over_storage_limit: boolean
    limit_ts: number
    locale: string
    messages_count: number
    msg_edit_window_mins: number
    name: string
    over_integrations_limit: boolean
    over_storage_limit: boolean
    pay_prod_cur: string
    plan: string
    primary_owner: Definitions.PrimaryOwner
    sso_provider: {
      label: string
      name: string
      type: string
    }
  }

  export type TeamProfileField = {
    field_name: unknown
    hint: string
    id: string
    is_hidden: boolean
    label: string
    options: unknown
    ordering: unknown
    possible_values: unknown
    type: string
  }

  export type TeamProfileFieldOption = {
    is_custom: unknown
    is_multiple_entry: unknown
    is_protected: unknown
    is_scim: unknown
  }

  export type User = {
    color: string
    deleted: boolean
    enterprise_user: Definitions.EnterpriseUser
    has_2fa: boolean
    id: string
    is_admin: boolean
    is_app_user: boolean
    is_bot: boolean
    is_external: boolean
    is_forgotten: boolean
    is_invited_user: boolean
    is_owner: boolean
    is_primary_owner: boolean
    is_restricted: boolean
    is_stranger: boolean
    is_ultra_restricted: boolean
    locale: string
    name: string
    presence: string
    profile: Definitions.UserProfile
    real_name: string
    team: string
    team_id: string
    team_profile: {
      fields: Definitions.TeamProfileField[]
    }
    two_factor_type: string
    tz: unknown
    tz_label: string
    tz_offset: unknown
    updated: unknown
  }

  export type UserProfile = {
    always_active: boolean
    api_app_id: string
    avatar_hash: string
    bot_id: string
    display_name: string
    display_name_normalized: string
    email: unknown
    fields: unknown
    first_name: unknown
    guest_expiration_ts: unknown
    guest_invited_by: unknown
    image_1024: unknown
    image_192: unknown
    image_24: unknown
    image_32: unknown
    image_48: unknown
    image_512: unknown
    image_72: unknown
    image_original: unknown
    is_app_user: boolean
    is_custom_image: boolean
    is_restricted: unknown
    is_ultra_restricted: unknown
    last_avatar_image_hash: string
    last_name: unknown
    memberships_count: number
    name: unknown
    phone: string
    pronouns: string
    real_name: string
    real_name_normalized: string
    skype: string
    status_default_emoji: string
    status_default_text: string
    status_default_text_canonical: unknown
    status_emoji: string
    status_expiration: number
    status_text: string
    status_text_canonical: unknown
    team: string
    title: string
    updated: number
    user_id: string
    username: unknown
  }

  export type UserProfileShort = {
    avatar_hash: string
    display_name: string
    display_name_normalized: string
    first_name: unknown
    image_72: string
    is_restricted: boolean
    is_ultra_restricted: boolean
    name: string
    real_name: string
    real_name_normalized: string
    team: string
  }

}

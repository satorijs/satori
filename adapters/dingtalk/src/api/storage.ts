import { Internal } from '../internal'
// GENERATED CONTENT

export interface SearchWorkspacesParams {
  /** 搜索关键词。 */
  keyword: string
  /** 可选参数。 */
  option?: unknown
}

export interface SearchWorkspacesQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface SearchWorkspacesResponse {
  items?: {
    workspaceId?: string
    name?: string
    url?: string
  }[]
  nextToken?: string
}

export interface SetPermissionInheritanceParams {
  /** 权限继承模式，枚举值: */
  inheritance: string
}

export interface SetPermissionInheritanceQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface SetPermissionInheritanceResponse {
  success?: unknown
}

export interface GetPermissionInheritanceQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface GetPermissionInheritanceResponse {
  inheritance?: string
}

export interface StorageUpdatePermissionParams {
  /** 角色id，枚举值: */
  roleId: string
  /** 权限成员。 */
  members: object[]
  /** 可选参数。 */
  option?: unknown
}

export interface StorageUpdatePermissionQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface StorageUpdatePermissionResponse {
  success?: unknown
}

export interface StorageDeletePermissionParams {
  /** 角色id，枚举值: */
  roleId: string
  /** 权限成员。 */
  members: object[]
}

export interface StorageDeletePermissionQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface StorageDeletePermissionResponse {
  success?: unknown
}

export interface StorageAddPermissionParams {
  /** 角色id，枚举值: */
  roleId: string
  /** 权限成员。 */
  members: object[]
  /** 可选参数。 */
  option?: unknown
}

export interface StorageAddPermissionQuery {
  /** 用户id */
  unionId: string
}

export interface StorageAddPermissionResponse {
  success?: unknown
}

export interface ListPermissionsOrgParams {
  /** 可选参数。 */
  option?: unknown
}

export interface ListPermissionsOrgQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface ListPermissionsOrgResponse {
  permissions?: {
    dentryUuid?: string
    member?: number
    role?: number
    duration?: number
  }[]
  nextToken?: string
}

export interface SearchDentriesParams {
  /** 搜索关键词。 */
  keyword: string
  /** 可选参数。 */
  option?: unknown
}

export interface SearchDentriesQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface SearchDentriesResponse {
  items?: {
    dentryUuid?: string
    name?: string
    creator?: number
    modifier?: number
  }[]
  nextToken?: string
}

export interface StorageCommitFileParams {
  /** 添加文件唯一标识，可通过DentryService.getUploadInfo来生成。 */
  uploadKey: string
  /** 名称(文件名+后缀), 规则： */
  name: string
  /** 可选参数 */
  option?: unknown
}

export interface StorageCommitFileQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface StorageCommitFileResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
    thumbnail?: number
    category?: string
  }
}

export interface StorageGetFileUploadInfoParams {
  /** 通过指定上传协议返回不同协议上传所需要的信息 */
  protocol: string
  /** 可选参数 */
  option?: unknown
}

export interface StorageGetFileUploadInfoQuery {
  /** 用户id */
  unionId: string
}

export interface StorageGetFileUploadInfoResponse {
  uploadKey?: string
  storageDriver?: string
  protocol?: string
  headerSignatureInfo?: {
    resourceUrls?: number
    headers?: number
    expirationSeconds?: number
    region?: string
    internalResourceUrls?: number
  }
}

export interface UnsubscribeEventParams {
  /** 订阅范围对应的id */
  scopeId: string
  /** 订阅范围 */
  scope: string
}

export interface UnsubscribeEventQuery {
  /** 用户id */
  unionId: string
}

export interface UnsubscribeEventResponse {
  success?: unknown
}

export interface ListAllDentriesParams {
  /** 可选参数。 */
  option?: unknown
}

export interface ListAllDentriesQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface ListAllDentriesResponse {
  dentries?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
    thumbnail?: number
  }[]
  nextToken?: string
}

export interface GetDentriesParams {
  /** 文件或文件夹的ID列表，最大值30。 */
  dentryIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface GetDentriesQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface GetDentriesResponse {
  resultItems?: {
    spaceId?: string
    dentryId?: string
    success?: number
    errorCode?: string
    dentry?: number
  }[]
}

export interface GetDentryThumbnailsParams {
  /** 文件ID，最大值30。 */
  dentryIds: string[]
}

export interface GetDentryThumbnailsQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface GetDentryThumbnailsResponse {
  resultItems?: {
    spaceId?: string
    dentryId?: string
    success?: number
    errorCode?: string
    thumbnail?: number
  }[]
}

export interface MoveDentriesParams {
  /** 目标空间ID。 */
  targetSpaceId: string
  /** 目标文件夹id, 根目录id值为0。 */
  targetFolderId: string
  /** 源文件或文件夹的ID列表，最大值30。 */
  dentryIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface MoveDentriesQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface MoveDentriesResponse {
  resultItems?: {
    spaceId?: string
    dentryId?: string
    async?: number
    success?: number
    errorCode?: string
    taskId?: string
    targetSpaceId?: string
    targetDentryId?: string
  }[]
}

export interface CopyDentriesParams {
  /** 目标文件或文件夹所在的空间ID。 */
  targetSpaceId: string
  /** 目标文件夹ID， 根目录ID值为0。 */
  targetFolderId: string
  /** 源文件或文件夹的ID列表，最大值30。 */
  dentryIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface CopyDentriesQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface CopyDentriesResponse {
  resultItems?: {
    spaceId?: string
    dentryId?: string
    async?: number
    success?: number
    errorCode?: string
    taskId?: string
    targetSpaceId?: string
    targetDentryId?: string
  }[]
}

export interface DeleteDentriesParams {
  /** 文件或文件夹ID列表，最大值50。 */
  dentryIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface DeleteDentriesQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface DeleteDentriesResponse {
  resultItems?: {
    spaceId?: string
    dentryId?: string
    async?: number
    success?: number
    errorCode?: string
    taskId?: string
  }[]
}

export interface GetTaskQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface GetTaskResponse {
  task?: {
    id?: string
    status?: string
    totalCount?: number
    successCount?: number
    failCount?: number
    failMessage?: string
    beginTime?: string
    endTime?: string
  }
}

export interface InitMultipartFileUploadParams {
  /** 可选参数。 */
  option?: unknown
}

export interface InitMultipartFileUploadQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface InitMultipartFileUploadResponse {
  uploadKey?: string
  storageDriver?: string
}

export interface GetMultipartFileUploadInfosParams {
  /** 上传唯一标识。 */
  uploadKey: string
  /** 每片文件的Id，文件的分片数量最大值10000，每片文件大小限制范围是100KB~5GB，最多传30。 */
  partNumbers: number[]
  /** 可选参数。 */
  option?: unknown
}

export interface GetMultipartFileUploadInfosQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface GetMultipartFileUploadInfosResponse {
  multipartHeaderSignatureInfos?: {
    partNumber?: number
    headerSignatureInfo?: number
  }[]
}

export interface GetOrgQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface GetOrgResponse {
  org?: {
    corpId?: string
    partitions?: number
  }
}

export interface RestoreRecycleItemParams {
  /** 可选参数。 */
  option?: unknown
}

export interface RestoreRecycleItemQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface RestoreRecycleItemResponse {
  async?: unknown
  taskId?: string
  spaceId?: string
  dentryId?: string
}

export interface GetRecycleBinQuery {
  /** 回收站范围类型。 */
  recycleBinScope: string
  /** 回收站范围Id。 */
  scopeId: string
  /** 操作者unionId。 */
  unionId: string
}

export interface GetRecycleBinResponse {
  recycleBin?: {
    id?: string
    scope?: string
    scopeId?: string
  }
}

export interface GetRecycleItemQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface GetRecycleItemResponse {
  item?: {
    id?: string
    spaceId?: string
    dentryId?: string
    size?: number
    type?: string
    originalName?: string
    originalPath?: string
    operatorId?: string
    operatorTime?: string
  }
}

export interface DeleteRecycleItemQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface DeleteRecycleItemResponse {
  success?: unknown
}

export interface ClearRecycleBinQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface ClearRecycleBinResponse {
  success?: unknown
}

export interface DeleteRecycleItemsParams {
  /** 回收项Id列表，最大值50。 */
  recycleItemIds: string[]
}

export interface DeleteRecycleItemsQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface DeleteRecycleItemsResponse {
  success?: unknown
}

export interface RestoreRecycleItemsParams {
  /** 回收项ID列表，最大值30。 */
  recycleItemIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface RestoreRecycleItemsQuery {
  /** 操作人的unionId。 */
  unionId: string
}

export interface RestoreRecycleItemsResponse {
  resultItems?: {
    recycleBinId?: string
    recycleItemId?: string
    async?: number
    success?: number
    errorCode?: string
    taskId?: string
    spaceId?: string
    dentryId?: string
  }[]
}

export interface ListDentryVersionsQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页条目数，默认100，最大100。 */
  maxResults?: number
  /** 操作者unionId。 */
  unionId: string
}

export interface ListDentryVersionsResponse {
  dentries?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
  }[]
  nextToken?: string
}

export interface GetDentryOpenInfoParams {
  /** 可选参数。 */
  option?: unknown
}

export interface GetDentryOpenInfoQuery {
  /** 操作用户unionId。 */
  unionId: string
}

export interface GetDentryOpenInfoResponse {
  url?: string
  hasWaterMark?: unknown
}

export interface MoveDentryParams {
  /** 需要存放的目标空间Id。 */
  targetSpaceId: string
  /** 需要存放的位置父目录Id。根目录时，该参数是0。 */
  targetFolderId: string
  /** 可选参数。 */
  option?: unknown
}

export interface MoveDentryQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface MoveDentryResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
  }
  async?: unknown
  taskId?: string
}

export interface ListPermissionsIsvParams {
  /** 可选参数。 */
  option?: unknown
}

export interface ListPermissionsIsvQuery {
  /** 操作者的unionId。 */
  unionId: string
}

export interface ListPermissionsIsvResponse {
  permissions?: {
    spaceId?: string
    dentryId?: string
    member?: number
    role?: number
    duration?: number
    createTime?: string
    modifiedTime?: string
    operatorId?: string
  }[]
  nextToken?: string
}

export interface GetFileDownloadInfoParams {
  /** 可选参数。 */
  option?: unknown
}

export interface GetFileDownloadInfoQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface GetFileDownloadInfoResponse {
  protocol?: string
  headerSignatureInfo?: {
    resourceUrls?: number
    headers?: number
    expirationSeconds?: number
    region?: string
    internalResourceUrls?: number
  }
}

export interface ListRecycleItemsQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页最大条目数，默认值50，最大值50。 */
  maxResults?: number
  /** 操作者unionId。 */
  unionId: string
}

export interface ListRecycleItemsResponse {
  recycleItems?: {
    id?: string
    spaceId?: string
    dentryId?: string
    size?: number
    type?: string
    originalName?: string
    originalPath?: string
    operatorId?: string
    operatorTime?: string
  }[]
  nextToken?: string
}

export interface DeleteDentryQuery {
  /** 删除后，是否备份到回收站。 */
  toRecycleBin?: unknown
  /** 操作者unionId。 */
  unionId: string
}

export interface DeleteDentryResponse {
  async?: unknown
  taskId?: string
}

export interface RenameDentryParams {
  /** 文件或文件夹的新名称，命名规则如下： */
  newName: string
}

export interface RenameDentryQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface RenameDentryResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
  }
}

export interface ListDentriesQuery {
  /** 父目录Id。根目录时，该参数是0。 */
  parentId: string
  /** 分页游标。 */
  nextToken?: string
  /** 每页条目数，最大值50。 */
  maxResults?: number
  /** 排序字段。 */
  orderBy?: string
  /** 排序规则。 */
  order?: string
  /** 是否获取文件缩略图临时链接。按需获取，会影响接口耗时。 */
  withThumbnail?: unknown
  /** 操作者的unionId。 */
  unionId: string
}

export interface ListDentriesResponse {
  dentries?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
    thumbnail?: number
  }[]
  nextToken?: string
}

export interface RevertDentryVersionQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface RevertDentryVersionResponse {
  success?: unknown
}

export interface CopyDentryParams {
  /** 需要存放的目标空间Id。 */
  targetSpaceId: string
  /** 需要存放的位置父目录Id。 */
  targetFolderId: string
  /** 可选参数。 */
  option?: unknown
}

export interface CopyDentryQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface CopyDentryResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
  }
  async?: unknown
  taskId?: string
}

export interface GetCurrentAppQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface GetCurrentAppResponse {
  app?: {
    corpId?: string
    appId?: string
    name?: string
    createTime?: string
    modifiedTime?: string
    partitions?: number
  }
}

export interface StorageGetSpaceQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface StorageGetSpaceResponse {
  space?: {
    id?: string
    corpId?: string
    creatorId?: string
    ownerType?: string
    ownerId?: string
    modifierId?: string
    usedQuota?: number
    quota?: number
    status?: string
    createTime?: string
    modifiedTime?: string
    appId?: string
    scene?: string
    sceneId?: string
    capabilities?: number
    name?: string
    partitions?: number
  }
}

export interface AddFolderParams {
  /** 文件夹的名称，命名有以下要求： */
  name: string
  /** 可选参数。 */
  option?: unknown
}

export interface AddFolderQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface AddFolderResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
  }
}

export interface GetDentryParams {
  /** 可选参数。 */
  option?: unknown
}

export interface GetDentryQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface GetDentryResponse {
  dentry?: {
    id?: string
    spaceId?: string
    parentId?: string
    type?: string
    name?: string
    size?: number
    path?: string
    version?: number
    status?: string
    extension?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    properties?: number
    appProperties?: number
    uuid?: string
    partitionType?: string
    storageDriver?: string
    thumbnail?: number
  }
}

export interface DeleteDentryAppPropertiesParams {
  /** 文件或文件夹的应用属性名称列表，最大值3。 */
  propertyNames: string[]
}

export interface DeleteDentryAppPropertiesQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface DeleteDentryAppPropertiesResponse {
  success?: unknown
}

export interface UpdateDentryAppPropertiesParams {
  /** 应用属性列表，最大值3。 */
  appProperties: object[]
}

export interface UpdateDentryAppPropertiesQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface UpdateDentryAppPropertiesResponse {
  success?: unknown
}

export interface StorageCommitFileParams {
  /** 添加文件唯一标识。 */
  uploadKey: string
  /** 文件的名称，带后缀。命名有以下要求： */
  name: string
  /** 父目录Id。根目录时，该参数是0。 */
  parentId: string
  /** 可选参数。 */
  option?: unknown
}

export interface StorageCommitFileQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface StorageGetFileUploadInfoParams {
  /** 通过指定上传协议返回不同协议上传所需要的信息。 */
  protocol: string
  /** 是否需要分片上传。 */
  multipart: unknown
  /** 可选参数。 */
  option?: unknown
}

export interface StorageGetFileUploadInfoQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface StorageGetFileUploadInfoResponse {
  uploadKey?: string
  storageDriver?: string
  protocol?: string
  headerSignatureInfo?: {
    resourceUrls?: number
    headers?: number
    expirationSeconds?: number
    region?: string
    internalResourceUrls?: number
  }
}

export interface StorageUpdatePermissionParams {
  /** 权限角色Id。 */
  roleId: string
  /** 权限成员信息。 */
  members: object[]
  /** 可选参数。 */
  option?: unknown
}

export interface StorageUpdatePermissionQuery {
  /** 操作用户的unionId。 */
  unionId: string
}

export interface StorageUpdatePermissionResponse {
  success?: unknown
}

export interface StorageDeletePermissionParams {
  /** 权限角色Id。 */
  roleId: string
  /** 权限成员信息。 */
  members: object[]
}

export interface StorageDeletePermissionQuery {
  /** 操作者的unionId。 */
  unionId: string
}

export interface StorageDeletePermissionResponse {
  success?: unknown
}

export interface StorageAddPermissionParams {
  /** 权限角色Id。 */
  roleId: string
  /** 权限成员信息。 */
  members: object[]
  /** 可选参数。 */
  option?: unknown
}

export interface StorageAddPermissionQuery {
  /** 操作用户的unionId。 */
  unionId: string
}

export interface StorageAddPermissionResponse {
  success?: unknown
}

export interface StorageAddSpaceParams {
  /** 可选参数。 */
  option?: unknown
}

export interface StorageAddSpaceQuery {
  /** 操作者unionId。 */
  unionId: string
}

export interface StorageAddSpaceResponse {
  space?: {
    id?: string
    corpId?: string
    creatorId?: string
    ownerType?: string
    ownerId?: string
    modifierId?: string
    usedQuota?: number
    quota?: number
    status?: string
    createTime?: string
    modifiedTime?: string
    appId?: string
    scene?: string
    sceneId?: string
    capabilities?: number
    name?: string
    partitions?: number
  }
}

// funcName: isOldApi
Internal.define({
  '/storage/workspaces/search': { POST: { searchWorkspaces: false } },
  '/storage/spaces/dentries/{dentryUuid}/permissions/inheritances': {
    PUT: { setPermissionInheritance: false },
    GET: { getPermissionInheritance: false },
  },
  '/storage/spaces/dentries/{dentryUuid}/permissions': {
    PUT: { storageUpdatePermission: false },
    POST: { storageAddPermission: false },
  },
  '/storage/spaces/dentries/{dentryUuid}/permissions/remove': {
    POST: { storageDeletePermission: false },
  },
  '/storage/spaces/dentries/{dentryUuid}/permissions/query': {
    POST: { listPermissionsOrg: false },
  },
  '/storage/dentries/search': { POST: { searchDentries: false } },
  '/storage/spaces/files/{parentDentryUuid}/commit': {
    POST: { storageCommitFile: false },
  },
  '/storage/spaces/files/{parentDentryUuid}/uploadInfos/query': {
    POST: { storageGetFileUploadInfo: false },
  },
  '/storage/events/unsubscribe': { POST: { unsubscribeEvent: false } },
  '/storage/spaces/{spaceId}/dentries/listAll': {
    POST: { listAllDentries: false },
  },
  '/storage/spaces/{spaceId}/dentries/query': { POST: { getDentries: false } },
  '/storage/spaces/{spaceId}/thumbnails/query': {
    POST: { getDentryThumbnails: false },
  },
  '/storage/spaces/{spaceId}/dentries/batchMove': {
    POST: { moveDentries: false },
  },
  '/storage/spaces/{spaceId}/dentries/batchCopy': {
    POST: { copyDentries: false },
  },
  '/storage/spaces/{spaceId}/dentries/batchRemove': {
    POST: { deleteDentries: false },
  },
  '/storage/tasks/{taskId}': { GET: { getTask: false } },
  '/storage/spaces/{spaceId}/files/multiPartUploadInfos/init': {
    POST: { initMultipartFileUpload: false },
  },
  '/storage/spaces/files/multiPartUploadInfos/query': {
    POST: { getMultipartFileUploadInfos: false },
  },
  '/storage/orgs/{corpId}': { GET: { getOrg: false } },
  '/storage/recycleBins/{recycleBinId}/recycleItems/{recycleItemId}/restore': {
    POST: { restoreRecycleItem: false },
  },
  '/storage/recycleBins': { GET: { getRecycleBin: false } },
  '/storage/recycleBins/{recycleBinId}/recycleItems/{recycleItemId}': {
    GET: { getRecycleItem: false },
    DELETE: { deleteRecycleItem: false },
  },
  '/storage/recycleBins/{recycleBinId}/clear': {
    POST: { clearRecycleBin: false },
  },
  '/storage/recycleBins/{recycleBinId}/recycleItems/batchRemove': {
    POST: { deleteRecycleItems: false },
  },
  '/storage/recycleBins/{recycleBinId}/recycleItems/batchRestore': {
    POST: { restoreRecycleItems: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/versions': {
    GET: { listDentryVersions: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/openInfos/query': {
    POST: { getDentryOpenInfo: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/move': {
    POST: { moveDentry: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/permissions/query': {
    POST: { listPermissionsIsv: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/downloadInfos/query': {
    POST: { getFileDownloadInfo: false },
  },
  '/storage/recycleBins/{recycleBinId}/recycleItems': {
    GET: { listRecycleItems: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}': {
    DELETE: { deleteDentry: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/rename': {
    POST: { renameDentry: false },
  },
  '/storage/spaces/{spaceId}/dentries': { GET: { listDentries: false } },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/versions/{version}/revert': {
    POST: { revertDentryVersion: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/copy': {
    POST: { copyDentry: false },
  },
  '/storage/currentApps/query': { POST: { getCurrentApp: false } },
  '/storage/spaces/{spaceId}': { GET: { storageGetSpace: false } },
  '/storage/spaces/{spaceId}/dentries/{parentId}/folders': {
    POST: { addFolder: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/query': {
    POST: { getDentry: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/appProperties/remove': {
    POST: { deleteDentryAppProperties: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/appProperties': {
    PUT: { updateDentryAppProperties: false },
  },
  '/storage/spaces/{spaceId}/files/commit': {
    POST: { storageCommitFile: false },
  },
  '/storage/spaces/{spaceId}/files/uploadInfos/query': {
    POST: { storageGetFileUploadInfo: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/permissions': {
    PUT: { storageUpdatePermission: false },
    POST: { storageAddPermission: false },
  },
  '/storage/spaces/{spaceId}/dentries/{dentryId}/permissions/remove': {
    POST: { storageDeletePermission: false },
  },
  '/storage/spaces': { POST: { storageAddSpace: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 搜索知识库
     * @see https://developers.dingtalk.com/document/orgapp/search-knowledge-base
     */
    searchWorkspaces(
      query: SearchWorkspacesQuery,
      params: SearchWorkspacesParams,
    ): Promise<SearchWorkspacesResponse>
    /**
     * 设置权限继承模式
     * @see https://developers.dingtalk.com/document/orgapp/set-permission-inheritance-mode
     */
    setPermissionInheritance(
      dentryUuid: string,
      query: SetPermissionInheritanceQuery,
      params: SetPermissionInheritanceParams,
    ): Promise<SetPermissionInheritanceResponse>
    /**
     * 获取权限继承模式
     * @see https://developers.dingtalk.com/document/orgapp/get-permission-inheritance-mode
     */
    getPermissionInheritance(
      dentryUuid: string,
      query: GetPermissionInheritanceQuery,
    ): Promise<GetPermissionInheritanceResponse>
    /**
     * 修改权限
     * @see https://developers.dingtalk.com/document/orgapp/modify-permissions-file
     */
    storageUpdatePermission(
      dentryUuid: string,
      query: StorageUpdatePermissionQuery,
      params: StorageUpdatePermissionParams,
    ): Promise<StorageUpdatePermissionResponse>
    /**
     * 删除权限
     * @see https://developers.dingtalk.com/document/orgapp/delete-permissions-file
     */
    storageDeletePermission(
      dentryUuid: string,
      query: StorageDeletePermissionQuery,
      params: StorageDeletePermissionParams,
    ): Promise<StorageDeletePermissionResponse>
    /**
     * 添加权限
     * @see https://developers.dingtalk.com/document/orgapp/add-permissions-file
     */
    storageAddPermission(
      dentryUuid: string,
      query: StorageAddPermissionQuery,
      params: StorageAddPermissionParams,
    ): Promise<StorageAddPermissionResponse>
    /**
     * 获取权限列表
     * @see https://developers.dingtalk.com/document/orgapp/get-permission-list
     */
    listPermissionsOrg(
      dentryUuid: string,
      query: ListPermissionsOrgQuery,
      params: ListPermissionsOrgParams,
    ): Promise<ListPermissionsOrgResponse>
    /**
     * 搜索文件
     * @see https://developers.dingtalk.com/document/orgapp/search-for-files
     */
    searchDentries(
      query: SearchDentriesQuery,
      params: SearchDentriesParams,
    ): Promise<SearchDentriesResponse>
    /**
     * 提交文件
     * @see https://developers.dingtalk.com/document/app/submittal-file
     */
    storageCommitFile(
      parentDentryUuid: string,
      query: StorageCommitFileQuery,
      params: StorageCommitFileParams,
    ): Promise<StorageCommitFileResponse>
    /**
     * 获取文件上传信息
     * @see https://developers.dingtalk.com/document/app/obtain-file-upload-informations
     */
    storageGetFileUploadInfo(
      parentDentryUuid: string,
      query: StorageGetFileUploadInfoQuery,
      params: StorageGetFileUploadInfoParams,
    ): Promise<StorageGetFileUploadInfoResponse>
    /**
     * 取消订阅文件变更事件
     * @see https://developers.dingtalk.com/document/isvapp/unsubscribe-from-file-change-event
     */
    unsubscribeEvent(
      query: UnsubscribeEventQuery,
      params: UnsubscribeEventParams,
    ): Promise<UnsubscribeEventResponse>
    /**
     * 获取文件列表
     * @see https://developers.dingtalk.com/document/isvapp/get-the-list-of-files-or-folders-under-a-space
     */
    listAllDentries(
      spaceId: string,
      query: ListAllDentriesQuery,
      params: ListAllDentriesParams,
    ): Promise<ListAllDentriesResponse>
    /**
     * 批量获取文件(夹)信息
     * @see https://developers.dingtalk.com/document/isvapp/get-file-or-folder-information-in-bulk
     */
    getDentries(
      spaceId: string,
      query: GetDentriesQuery,
      params: GetDentriesParams,
    ): Promise<GetDentriesResponse>
    /**
     * 批量获取文件缩略图
     * @see undefined
     */
    getDentryThumbnails(
      spaceId: string,
      query: GetDentryThumbnailsQuery,
      params: GetDentryThumbnailsParams,
    ): Promise<GetDentryThumbnailsResponse>
    /**
     * 批量移动文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/bulk-move-files-or-folders
     */
    moveDentries(
      spaceId: string,
      query: MoveDentriesQuery,
      params: MoveDentriesParams,
    ): Promise<MoveDentriesResponse>
    /**
     * 批量拷贝文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/copy-files-or-folders-in-bulk
     */
    copyDentries(
      spaceId: string,
      query: CopyDentriesQuery,
      params: CopyDentriesParams,
    ): Promise<CopyDentriesResponse>
    /**
     * 批量删除文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/delete-files-or-folders-in-bulk
     */
    deleteDentries(
      spaceId: string,
      query: DeleteDentriesQuery,
      params: DeleteDentriesParams,
    ): Promise<DeleteDentriesResponse>
    /**
     * 获取异步任务信息
     * @see https://developers.dingtalk.com/document/isvapp/get-the-asynchronous-task-information-in-storage
     */
    getTask(taskId: string, query: GetTaskQuery): Promise<GetTaskResponse>
    /**
     * 初始化文件分片上传
     * @see https://developers.dingtalk.com/document/isvapp/initialize-a-multipart-upload-object
     */
    initMultipartFileUpload(
      spaceId: string,
      query: InitMultipartFileUploadQuery,
      params: InitMultipartFileUploadParams,
    ): Promise<InitMultipartFileUploadResponse>
    /**
     * 获取文件上传信息(分片上传)
     * @see https://developers.dingtalk.com/document/isvapp/obtains-the-information-about-multipart-uploads-of-an-object
     */
    getMultipartFileUploadInfos(
      query: GetMultipartFileUploadInfosQuery,
      params: GetMultipartFileUploadInfosParams,
    ): Promise<GetMultipartFileUploadInfosResponse>
    /**
     * 获取企业存储中企业维度的信息
     * @see https://developers.dingtalk.com/document/isvapp/obtain-enterprise-information-1
     */
    getOrg(corpId: string, query: GetOrgQuery): Promise<GetOrgResponse>
    /**
     * 还原回收站中的回收项
     * @see https://developers.dingtalk.com/document/isvapp/restore-recycle-items
     */
    restoreRecycleItem(
      recycleBinId: string,
      recycleItemId: string,
      query: RestoreRecycleItemQuery,
      params: RestoreRecycleItemParams,
    ): Promise<RestoreRecycleItemResponse>
    /**
     * 获取回收站信息
     * @see https://developers.dingtalk.com/document/isvapp/obtain-information-about-the-recycle-bin
     */
    getRecycleBin(query: GetRecycleBinQuery): Promise<GetRecycleBinResponse>
    /**
     * 获取回收项详情
     * @see https://developers.dingtalk.com/document/isvapp/obtain-recycling-item-information
     */
    getRecycleItem(
      recycleBinId: string,
      recycleItemId: string,
      query: GetRecycleItemQuery,
    ): Promise<GetRecycleItemResponse>
    /**
     * 删除回收项, 删除之后该记录从回收站删除, 后续文件就无法恢复了
     * @see https://developers.dingtalk.com/document/isvapp/delete-recycle-item
     */
    deleteRecycleItem(
      recycleBinId: string,
      recycleItemId: string,
      query: DeleteRecycleItemQuery,
    ): Promise<DeleteRecycleItemResponse>
    /**
     * 清空回收站
     * @see https://developers.dingtalk.com/document/isvapp/empty-the-recycle-bin
     */
    clearRecycleBin(
      recycleBinId: string,
      query: ClearRecycleBinQuery,
    ): Promise<ClearRecycleBinResponse>
    /**
     * 批量删除回收项, 删除之后该记录从回收站删除, 后续文件就无法恢复了
     * @see https://developers.dingtalk.com/document/isvapp/batch-delete-recycle-items
     */
    deleteRecycleItems(
      recycleBinId: string,
      query: DeleteRecycleItemsQuery,
      params: DeleteRecycleItemsParams,
    ): Promise<DeleteRecycleItemsResponse>
    /**
     * 批量还原回收站中的回收项
     * @see https://developers.dingtalk.com/document/isvapp/batch-restore-recycled-items
     */
    restoreRecycleItems(
      recycleBinId: string,
      query: RestoreRecycleItemsQuery,
      params: RestoreRecycleItemsParams,
    ): Promise<RestoreRecycleItemsResponse>
    /**
     * 获取文件历史版本
     * @see https://developers.dingtalk.com/document/isvapp/obtains-a-list-of-file-versions
     */
    listDentryVersions(
      spaceId: string,
      dentryId: string,
      query: ListDentryVersionsQuery,
    ): Promise<ListDentryVersionsResponse>
    /**
     * 获取文件打开链接
     * @see https://developers.dingtalk.com/document/isvapp/obtains-the-object-preview-or-editing-information
     */
    getDentryOpenInfo(
      spaceId: string,
      dentryId: string,
      query: GetDentryOpenInfoQuery,
      params: GetDentryOpenInfoParams,
    ): Promise<GetDentryOpenInfoResponse>
    /**
     * 移动文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/move-a-file-or-folder
     */
    moveDentry(
      spaceId: string,
      dentryId: string,
      query: MoveDentryQuery,
      params: MoveDentryParams,
    ): Promise<MoveDentryResponse>
    /**
     * 获取权限列表
     * @see https://developers.dingtalk.com/document/isvapp/obtain-a-permission-list-storage
     */
    listPermissionsIsv(
      spaceId: string,
      dentryId: string,
      query: ListPermissionsIsvQuery,
      params: ListPermissionsIsvParams,
    ): Promise<ListPermissionsIsvResponse>
    /**
     * 获取文件下载信息
     * @see https://developers.dingtalk.com/document/orgapp/obtains-the-download-information-about-a-file
     */
    getFileDownloadInfo(
      spaceId: string,
      dentryId: string,
      query: GetFileDownloadInfoQuery,
      params: GetFileDownloadInfoParams,
    ): Promise<GetFileDownloadInfoResponse>
    /**
     * 获取回收项列表
     * @see https://developers.dingtalk.com/document/isvapp/gets-the-list-of-recycle-items
     */
    listRecycleItems(
      recycleBinId: string,
      query: ListRecycleItemsQuery,
    ): Promise<ListRecycleItemsResponse>
    /**
     * 删除文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/delete-a-file-or-folder
     */
    deleteDentry(
      spaceId: string,
      dentryId: string,
      query: DeleteDentryQuery,
    ): Promise<DeleteDentryResponse>
    /**
     * 重命名文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/rename-a-file-or-folder
     */
    renameDentry(
      spaceId: string,
      dentryId: string,
      query: RenameDentryQuery,
      params: RenameDentryParams,
    ): Promise<RenameDentryResponse>
    /**
     * 获取文件列表
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-file-list-storage
     */
    listDentries(
      spaceId: string,
      query: ListDentriesQuery,
    ): Promise<ListDentriesResponse>
    /**
     * 恢复文件历史版本
     * @see https://developers.dingtalk.com/document/isvapp/restore-previous-versions-of-files
     */
    revertDentryVersion(
      spaceId: string,
      dentryId: string,
      version: number,
      query: RevertDentryVersionQuery,
    ): Promise<RevertDentryVersionResponse>
    /**
     * 拷贝文件或文件夹
     * @see https://developers.dingtalk.com/document/isvapp/copy-an-object
     */
    copyDentry(
      spaceId: string,
      dentryId: string,
      query: CopyDentryQuery,
      params: CopyDentryParams,
    ): Promise<CopyDentryResponse>
    /**
     * 获取开放平台应用在企业存储中的相关应用信息
     * @see https://developers.dingtalk.com/document/isvapp/queries-application-information-1
     */
    getCurrentApp(query: GetCurrentAppQuery): Promise<GetCurrentAppResponse>
    /**
     * 获取空间信息
     * @see https://developers.dingtalk.com/document/isvapp/get-space-information
     */
    storageGetSpace(
      spaceId: string,
      query: StorageGetSpaceQuery,
    ): Promise<StorageGetSpaceResponse>
    /**
     * 添加文件夹
     * @see https://developers.dingtalk.com/document/isvapp/add-folder
     */
    addFolder(
      spaceId: string,
      parentId: string,
      query: AddFolderQuery,
      params: AddFolderParams,
    ): Promise<AddFolderResponse>
    /**
     * 获取文件(夹)信息
     * @see https://developers.dingtalk.com/document/isvapp/obtain-file-or-folder-information
     */
    getDentry(
      spaceId: string,
      dentryId: string,
      query: GetDentryQuery,
      params: GetDentryParams,
    ): Promise<GetDentryResponse>
    /**
     * 删除文件上的App属性值
     * @see https://developers.dingtalk.com/document/isvapp/delete-file-app-attribute
     */
    deleteDentryAppProperties(
      spaceId: number,
      dentryId: number,
      query: DeleteDentryAppPropertiesQuery,
      params: DeleteDentryAppPropertiesParams,
    ): Promise<DeleteDentryAppPropertiesResponse>
    /**
     * 修改文件上的App属性值
     * @see https://developers.dingtalk.com/document/isvapp/update-the-application-properties-of-a-file-or-folder
     */
    updateDentryAppProperties(
      spaceId: number,
      dentryId: number,
      query: UpdateDentryAppPropertiesQuery,
      params: UpdateDentryAppPropertiesParams,
    ): Promise<UpdateDentryAppPropertiesResponse>
    /**
     * 提交文件
     * @see https://developers.dingtalk.com/document/orgapp/submit-documents
     */
    storageCommitFile(
      spaceId: string,
      query: StorageCommitFileQuery,
      params: StorageCommitFileParams,
    ): Promise<StorageCommitFileResponse>
    /**
     * 获取文件上传信息
     * @see https://developers.dingtalk.com/document/orgapp/obtain-storage-upload-information
     */
    storageGetFileUploadInfo(
      spaceId: string,
      query: StorageGetFileUploadInfoQuery,
      params: StorageGetFileUploadInfoParams,
    ): Promise<StorageGetFileUploadInfoResponse>
    /**
     * 修改权限
     * @see https://developers.dingtalk.com/document/isvapp/modify-storage-permissions
     */
    storageUpdatePermission(
      spaceId: string,
      dentryId: string,
      query: StorageUpdatePermissionQuery,
      params: StorageUpdatePermissionParams,
    ): Promise<StorageUpdatePermissionResponse>
    /**
     * 删除权限
     * @see https://developers.dingtalk.com/document/isvapp/delete-storage-permissions
     */
    storageDeletePermission(
      spaceId: string,
      dentryId: string,
      query: StorageDeletePermissionQuery,
      params: StorageDeletePermissionParams,
    ): Promise<StorageDeletePermissionResponse>
    /**
     * 添加权限
     * @see https://developers.dingtalk.com/document/isvapp/add-permissions-storage
     */
    storageAddPermission(
      spaceId: string,
      dentryId: string,
      query: StorageAddPermissionQuery,
      params: StorageAddPermissionParams,
    ): Promise<StorageAddPermissionResponse>
    /**
     * 添加空间
     * @see https://developers.dingtalk.com/document/isvapp/add-space
     */
    storageAddSpace(
      query: StorageAddSpaceQuery,
      params: StorageAddSpaceParams,
    ): Promise<StorageAddSpaceResponse>
  }
}

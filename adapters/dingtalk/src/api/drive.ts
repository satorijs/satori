import { Internal } from "../internal";
// GENERATED CONTENT

export interface AddCustomSpaceParams {
  /** 自定义空间标识。任意小于10位的字符串即可。 */
  identifier: string;
  /** 业务类型。任意小于8位的字符串即可。 */
  bizType: string;
  /** 授权模式，取值： */
  permissionMode: string;
  /** 用户unionId，可通过以下两种方式获取： */
  unionId: string;
}

export interface AddCustomSpaceResponse {
  spaceId: string;
  spaceName?: string;
  spaceType: string;
  quota?: number;
  usedQuota: number;
  permissionMode?: string;
  createTime?: string;
  modifyTime?: string;
}

export interface DeleteSpaceQuery {
  /** 用户unionId，可通过以下两种方式获取： */
  unionId: string;
}

export interface DriveAddSpaceParams {
  /** 空间名称（不能为空）。 */
  name: string;
  /** 用户unionId，可通过以下两种方式获取： */
  unionId: string;
}

export interface DriveAddSpaceResponse {
  spaceId: string;
  spaceName?: string;
  spaceType: string;
  quota?: number;
  usedQuota: number;
  permissionMode?: string;
  createTime?: string;
  modifyTime?: string;
}

export interface ListSpacesQuery {
  /** 用户unionId，可通过以下两种方式获取： */
  unionId: string;
  /** 空间类型。 */
  spaceType: string;
  /** 分页游标。 */
  nextToken?: string;
  /** 分页大小。 */
  maxResults: number;
}

export interface ListSpacesResponse {
  spaces: {
    spaceId: string;
    spaceName?: string;
    spaceType: string;
    quota?: number;
    usedQuota: number;
    permissionMode?: string;
    createTime?: string;
    modifyTime?: string;
  }[];
  nextToken?: string;
}

// funcName: isOldApi
Internal.define({
  "/drive/spaces/customSpaces": { POST: { addCustomSpace: false } },
  "/drive/spaces/{spaceId}": { DELETE: { deleteSpace: false } },
  "/drive/spaces": {
    POST: { driveAddSpace: false },
    GET: { listSpaces: false },
  },
});
declare module "../internal" {
  interface Internal {
    /**
     * 新建自定义空间
     * @see https://developers.dingtalk.com/document/isvapp/new-custom-space
     */
    addCustomSpace(
      params: AddCustomSpaceParams,
    ): Promise<AddCustomSpaceResponse>;
    /**
     * 删除空间
     * @see https://developers.dingtalk.com/document/isvapp/delete-a-space
     */
    deleteSpace(spaceId: string, query: DeleteSpaceQuery): Promise<void>;
    /**
     * 新建空间
     * @see https://developers.dingtalk.com/document/isvapp/new-space
     */
    driveAddSpace(params: DriveAddSpaceParams): Promise<DriveAddSpaceResponse>;
    /**
     * 获取空间列表
     * @see https://developers.dingtalk.com/document/isvapp/queries-a-space-list
     */
    listSpaces(query: ListSpacesQuery): Promise<ListSpacesResponse>;
  }
}

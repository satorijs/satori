import { Internal } from "../internal";
// GENERATED CONTENT

export interface DeleteLiveQuery {
  /** 直播ID。 */
  liveId: string;
  /** 用户unionId。 */
  unionId: string;
}

export interface DeleteLiveResponse {
  result?: {
    success?: number;
  };
}

export interface QueryLiveWatchUserListQuery {
  /** 直播ID。 */
  liveId: string;
  /** 用户unionId。 */
  unionId: string;
  /** 分页起始位置，从0开始。 */
  pageNumber?: number;
  /** 分页大小。 */
  pageSize: number;
}

export interface QueryLiveWatchUserListResponse {
  result?: {
    orgUsesList?: number;
    outOrgUserList?: number;
  };
}

export interface QueryLiveWatchDetailQuery {
  /** 直播ID。 */
  liveId: string;
  /** 用户unionId。 */
  unionId: string;
}

export interface QueryLiveWatchDetailResponse {
  result?: {
    pv?: number;
    uv?: number;
    liveUv?: number;
    playbackUv?: number;
    totalWatchTime?: number;
    avgWatchTime?: number;
    praiseCount?: number;
    msgCount?: number;
  };
}

export interface UpdateLiveParams {
  /** 直播ID。 */
  liveId: string;
  /** 主播的unionId。 */
  unionId: string;
  /** 直播标题。 */
  title?: string;
  /** 直播简介。 */
  introduction?: string;
  /** 直播的封面地址。 */
  coverUrl?: string;
  /** 直播的预计开播时间戳，单位毫秒。 */
  preStartTime?: number;
  /** 直播的预计结束时间戳，单位毫秒。 */
  preEndTime?: number;
}

export interface UpdateLiveResponse {
  result?: {
    success?: number;
  };
}

export interface CreateLiveParams {
  /** 发起直播的主播unionId。 */
  unionId: string;
  /** 直播标题。 */
  title: string;
  /** 直播简介。 */
  introduction?: string;
  /** 预计开播时间戳，单位毫秒。 */
  preStartTime: number;
  /** 直播的封面地址。 */
  coverUrl?: string;
  /** 预计结束时间戳，单位毫秒。 */
  preEndTime: number;
  publicType?: number;
}

export interface CreateLiveResponse {
  result?: {
    liveId?: string;
  };
}

export interface QueryLiveInfoQuery {
  /** 直播ID。 */
  liveId: string;
  /** 操作者的unionId。 */
  unionId: string;
}

export interface QueryLiveInfoResponse {
  result?: {
    liveInfo?: number;
  };
}

// funcName: isOldApi
Internal.define({
  "/live/lives": {
    DELETE: { deleteLive: false },
    PUT: { updateLive: false },
    POST: { createLive: false },
    GET: { queryLiveInfo: false },
  },
  "/live/lives/watchUsers": { GET: { queryLiveWatchUserList: false } },
  "/live/lives/watchDetails": { GET: { queryLiveWatchDetail: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 删除直播
     * @see https://developers.dingtalk.com/document/isvapp/delete-live-streaming
     */
    deleteLive(query: DeleteLiveQuery): Promise<DeleteLiveResponse>;
    /**
     * 查询直播观看人员信息
     * @see https://developers.dingtalk.com/document/isvapp/queries-the-viewing-information-of-viewers
     */
    queryLiveWatchUserList(
      query: QueryLiveWatchUserListQuery,
    ): Promise<QueryLiveWatchUserListResponse>;
    /**
     * 获取直播的观看数据
     * @see https://developers.dingtalk.com/document/orgapp/queries-the-playback-data-of-a-live-stream
     */
    queryLiveWatchDetail(
      query: QueryLiveWatchDetailQuery,
    ): Promise<QueryLiveWatchDetailResponse>;
    /**
     * 修改直播属性信息
     * @see https://developers.dingtalk.com/document/isvapp/modify-live-streaming
     */
    updateLive(params: UpdateLiveParams): Promise<UpdateLiveResponse>;
    /**
     * 创建直播
     * @see https://developers.dingtalk.com/document/isvapp/create-live-streaming
     */
    createLive(params: CreateLiveParams): Promise<CreateLiveResponse>;
    /**
     * 查询直播详情
     * @see https://developers.dingtalk.com/document/isvapp/queries-the-live-streaming-information
     */
    queryLiveInfo(query: QueryLiveInfoQuery): Promise<QueryLiveInfoResponse>;
  }
}

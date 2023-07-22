import { Internal } from "../internal";
// GENERATED CONTENT

export interface QueryDevicePropertiesParams {
  /** 设备属性名称列表，最大值10。 */
  propertyNames?: string[];
}

export interface QueryDevicePropertiesQuery {
  /** 操作查询的人员unionId，可调用[查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取。 */
  operatorUnionId: string;
  /** 需要查询的设备ID，该参数可从订阅[设备绑定会议室变更](https://open.dingtalk.com/document/orgapp/device-binding-meeting-room-change-event)事件中获取。 */
  deviceId?: string;
  /** 需要查询的设备unionId，该参数可从订阅[设备绑定会议室变更](https://open.dingtalk.com/document/orgapp/device-binding-meeting-room-change-event)事件中获取。 */
  deviceUnionId?: string;
}

export interface QueryDevicePropertiesResponse {
  result?: {
    propertyName?: string;
    propertyValue?: string;
  }[];
}

export interface QueryMeetingRoomDeviceQuery {
  /** 操作查询的人员unionId，可调用[查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取。 */
  operatorUnionId: string;
  /** 需要查询的设备ID，该参数从订阅[设备绑定会议室变更](https://open.dingtalk.com/document/orgapp/device-binding-meeting-room-change-event)事件中获取。 */
  deviceId?: string;
  /** 需要查询的设备unionId，该参数从订阅[设备绑定会议室变更](https://open.dingtalk.com/document/orgapp/device-binding-meeting-room-change-event)事件中获取。 */
  deviceUnionId?: string;
}

export interface QueryMeetingRoomDeviceResponse {
  result?: {
    deviceId?: string;
    deviceUnionId?: string;
    openRoomId?: string;
    corpId?: string;
    deviceName?: string;
    shareCode?: string;
    deviceSn?: string;
    deviceMac?: string;
    deviceType?: string;
    deviceServiceId?: number;
    deviceModel?: string;
    deviceStatus?: string;
    controllers?: number;
  };
}

export interface DeleteMeetingRoomGroupQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface DeleteMeetingRoomGroupResponse {
  result?: unknown;
}

export interface UpdateMeetingRoomGroupParams {
  /** 操作人的unionId。 */
  unionId: string;
  /** 修改后的分组名称。 */
  groupName?: string;
  /** 分组ID。 */
  groupId: number;
}

export interface UpdateMeetingRoomGroupResponse {
  result?: unknown;
}

export interface QueryMeetingRoomGroupListQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface QueryMeetingRoomGroupListResponse {
  result?: {
    groupId?: number;
    groupName?: string;
    parentId?: number;
  }[];
}

export interface QueryMeetingRoomGroupQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface QueryMeetingRoomGroupResponse {
  groupId?: number;
  groupName?: string;
  parentId?: number;
}

export interface CreateMeetingRoomGroupParams {
  /** 操作人的unionId。 */
  unionId: string;
  /** 分组名称。 */
  groupName?: string;
  /** 父分组ID，传0表示根分组。 */
  parentGroupId: number;
}

export interface CreateMeetingRoomGroupResponse {
  result?: number;
}

export interface DeleteMeetingRoomQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface DeleteMeetingRoomResponse {
  result?: unknown;
}

export interface QueryMeetingRoomListQuery {
  /** 分页游标。 */
  nextToken?: number;
  /** 请求分页大小，默认值20，目前未限制最大值。 */
  maxResults?: number;
  /** 操作人的unionId。 */
  unionId: string;
}

export interface QueryMeetingRoomListResponse {
  hasMore?: unknown;
  nextToken?: number;
  result?: {
    roomId?: string;
    roomStaffId?: string;
    corpId?: string;
    roomName?: string;
    roomStatus?: number;
    roomLabels?: number;
    roomCapacity?: number;
    roomLocation?: number;
    roomPicture?: string;
    isvRoomId?: string;
    roomGroup?: number;
  }[];
}

export interface UpdateMeetingRoomParams {
  /** 操作人的unionId。 */
  unionId: string;
  /** 会议室ID。 */
  roomId: string;
  /** 会议室名称。 */
  roomName?: string;
  /** 会议室可容纳人数。 */
  roomCapacity?: number;
  /** 会议室图片。 */
  roomPicture?: string;
  /** 会议室状态。 */
  roomStatus?: number;
  /** 会议室位置信息。 */
  roomLocation?: unknown;
  /** 标签ID。 */
  roomLabelIds?: long[];
  /** 调用方外部会议室ID，调用方可传入自有系统内的会议室ID。 */
  isvRoomId?: string;
  /** 会议室所属分组ID。 */
  groupId?: number;
}

export interface UpdateMeetingRoomResponse {
  result?: unknown;
}

export interface QueryMeetingRoomQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface QueryMeetingRoomResponse {
  result?: {
    roomId?: string;
    roomStaffId?: string;
    corpId?: string;
    roomName?: string;
    roomStatus?: number;
    roomLabels?: number;
    roomCapacity?: number;
    roomLocation?: number;
    roomPicture?: string;
    isvRoomId?: string;
    roomGroup?: number;
  };
}

export interface CreateMeetingRoomParams {
  /** 操作人的unionId。 */
  unionId: string;
  /** 会议室名称。 */
  roomName: string;
  /** 会议室可容纳人数，目前无最大值限制。 */
  roomCapacity?: number;
  /** 会议室图片。 */
  roomPicture?: string;
  /** 会议室状态。 */
  roomStatus: number;
  /** 会议室位置信息。 */
  roomLocation?: unknown;
  /** 标签ID。 */
  roomLabelIds?: long[];
  /** 调用方外部会议室ID，调用方可传入自有系统内的会议室ID。 */
  isvRoomId: string;
  /** 分组ID。 */
  groupId?: number;
}

export interface CreateMeetingRoomResponse {
  result?: string;
}

// funcName: isOldApi
Internal.define({
  "/rooms/devices/properties/query": { POST: { queryDeviceProperties: false } },
  "/rooms/devices": { GET: { queryMeetingRoomDevice: false } },
  "/rooms/groups/{groupId}": {
    DELETE: { deleteMeetingRoomGroup: false },
    GET: { queryMeetingRoomGroup: false },
  },
  "/rooms/groups": {
    PUT: { updateMeetingRoomGroup: false },
    POST: { createMeetingRoomGroup: false },
  },
  "/rooms/groupLists": { GET: { queryMeetingRoomGroupList: false } },
  "/rooms/meetingRooms/{roomId}": {
    DELETE: { deleteMeetingRoom: false },
    GET: { queryMeetingRoom: false },
  },
  "/rooms/meetingRoomLists": { GET: { queryMeetingRoomList: false } },
  "/rooms/meetingRooms": { PUT: { updateMeetingRoom: false } },
  "/rooms/meetingrooms": { POST: { createMeetingRoom: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 查询设备属性
     * @see https://developers.dingtalk.com/document/app/querying-video-conference-device-attribute-information
     */
    queryDeviceProperties(
      query: QueryDevicePropertiesQuery,
      params: QueryDevicePropertiesParams,
    ): Promise<QueryDevicePropertiesResponse>;
    /**
     * 查询设备信息
     * @see https://developers.dingtalk.com/document/app/querying-video-conference-device-information
     */
    queryMeetingRoomDevice(
      query: QueryMeetingRoomDeviceQuery,
    ): Promise<QueryMeetingRoomDeviceResponse>;
    /**
     * 删除会议室分组
     * @see https://developers.dingtalk.com/document/isvapp/delete-a-conference-room-group
     */
    deleteMeetingRoomGroup(
      groupId: number,
      query: DeleteMeetingRoomGroupQuery,
    ): Promise<DeleteMeetingRoomGroupResponse>;
    /**
     * 更新会议室分组信息
     * @see https://developers.dingtalk.com/document/isvapp/update-meeting-room-group-information
     */
    updateMeetingRoomGroup(
      params: UpdateMeetingRoomGroupParams,
    ): Promise<UpdateMeetingRoomGroupResponse>;
    /**
     * 查询会议室分组列表
     * @see https://developers.dingtalk.com/document/isvapp/query-meeting-room-groups
     */
    queryMeetingRoomGroupList(
      query: QueryMeetingRoomGroupListQuery,
    ): Promise<QueryMeetingRoomGroupListResponse>;
    /**
     * 查询会议室分组信息
     * @see https://developers.dingtalk.com/document/isvapp/query-meeting-room-group-information
     */
    queryMeetingRoomGroup(
      groupId: number,
      query: QueryMeetingRoomGroupQuery,
    ): Promise<QueryMeetingRoomGroupResponse>;
    /**
     * 创建会议室分组
     * @see https://developers.dingtalk.com/document/isvapp/create-a-meeting-room-group
     */
    createMeetingRoomGroup(
      params: CreateMeetingRoomGroupParams,
    ): Promise<CreateMeetingRoomGroupResponse>;
    /**
     * 删除会议室
     * @see https://developers.dingtalk.com/document/isvapp/delete-a-meeting-room
     */
    deleteMeetingRoom(
      roomId: string,
      query: DeleteMeetingRoomQuery,
    ): Promise<DeleteMeetingRoomResponse>;
    /**
     * 查询会议室列表
     * @see https://developers.dingtalk.com/document/isvapp/check-the-meeting-room-list
     */
    queryMeetingRoomList(
      query: QueryMeetingRoomListQuery,
    ): Promise<QueryMeetingRoomListResponse>;
    /**
     * 更新会议室信息
     * @see https://developers.dingtalk.com/document/isvapp/update-meeting-room-information
     */
    updateMeetingRoom(
      params: UpdateMeetingRoomParams,
    ): Promise<UpdateMeetingRoomResponse>;
    /**
     * 查询会议室详情
     * @see https://developers.dingtalk.com/document/isvapp/check-meeting-room-details
     */
    queryMeetingRoom(
      roomId: string,
      query: QueryMeetingRoomQuery,
    ): Promise<QueryMeetingRoomResponse>;
    /**
     * 创建智能会议室
     * @see https://developers.dingtalk.com/document/isvapp/create-a-meeting-room
     */
    createMeetingRoom(
      params: CreateMeetingRoomParams,
    ): Promise<CreateMeetingRoomResponse>;
  }
}

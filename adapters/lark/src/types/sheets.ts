import { Condition, Dimension, FilterView, FilterViewCondition, FindCondition, FindReplaceResult, FloatImage, GetSpreadsheet, Sheet, SheetFilterInfo, Spreadsheet } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建电子表格
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create
     */
    createSheetsSpreadsheet(body: CreateSheetsSpreadsheetRequest): Promise<CreateSheetsSpreadsheetResponse>
    /**
     * 修改电子表格属性
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/patch
     */
    patchSheetsSpreadsheet(spreadsheet_token: string, body: PatchSheetsSpreadsheetRequest): Promise<void>
    /**
     * 获取电子表格信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/get
     */
    getSheetsSpreadsheet(spreadsheet_token: string, query?: GetSheetsSpreadsheetQuery): Promise<GetSheetsSpreadsheetResponse>
    /**
     * 获取工作表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/query
     */
    querySheetsSpreadsheetSheet(spreadsheet_token: string): Promise<QuerySheetsSpreadsheetSheetResponse>
    /**
     * 查询工作表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/get
     */
    getSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string): Promise<GetSheetsSpreadsheetSheetResponse>
    /**
     * 移动行列
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension
     */
    moveDimensionSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, body: MoveDimensionSheetsSpreadsheetSheetRequest): Promise<void>
    /**
     * 查找单元格
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find
     */
    findSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, body: FindSheetsSpreadsheetSheetRequest): Promise<FindSheetsSpreadsheetSheetResponse>
    /**
     * 替换单元格
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace
     */
    replaceSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, body: ReplaceSheetsSpreadsheetSheetRequest): Promise<ReplaceSheetsSpreadsheetSheetResponse>
    /**
     * 创建筛选
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create
     */
    createSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string, body: CreateSheetsSpreadsheetSheetFilterRequest): Promise<void>
    /**
     * 更新筛选
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update
     */
    updateSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string, body: UpdateSheetsSpreadsheetSheetFilterRequest): Promise<void>
    /**
     * 获取筛选
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get
     */
    getSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string): Promise<GetSheetsSpreadsheetSheetFilterResponse>
    /**
     * 删除筛选
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete
     */
    deleteSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string): Promise<void>
    /**
     * 创建筛选视图
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create
     */
    createSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, body: CreateSheetsSpreadsheetSheetFilterViewRequest): Promise<CreateSheetsSpreadsheetSheetFilterViewResponse>
    /**
     * 更新筛选视图
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch
     */
    patchSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string, body: PatchSheetsSpreadsheetSheetFilterViewRequest): Promise<PatchSheetsSpreadsheetSheetFilterViewResponse>
    /**
     * 查询筛选视图
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query
     */
    querySheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string): Promise<QuerySheetsSpreadsheetSheetFilterViewResponse>
    /**
     * 获取筛选视图
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get
     */
    getSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<GetSheetsSpreadsheetSheetFilterViewResponse>
    /**
     * 删除筛选视图
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete
     */
    deleteSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<void>
    /**
     * 创建筛选条件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create
     */
    createSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, body: CreateSheetsSpreadsheetSheetFilterViewConditionRequest): Promise<CreateSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
     * 更新筛选条件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update
     */
    updateSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string, body: UpdateSheetsSpreadsheetSheetFilterViewConditionRequest): Promise<UpdateSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
     * 查询筛选条件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query
     */
    querySheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<QuerySheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
     * 获取筛选条件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get
     */
    getSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string): Promise<GetSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
     * 删除筛选条件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete
     */
    deleteSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string): Promise<void>
    /**
     * 创建浮动图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create
     */
    createSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, body: CreateSheetsSpreadsheetSheetFloatImageRequest): Promise<CreateSheetsSpreadsheetSheetFloatImageResponse>
    /**
     * 更新浮动图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch
     */
    patchSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string, body: PatchSheetsSpreadsheetSheetFloatImageRequest): Promise<PatchSheetsSpreadsheetSheetFloatImageResponse>
    /**
     * 获取浮动图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get
     */
    getSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string): Promise<GetSheetsSpreadsheetSheetFloatImageResponse>
    /**
     * 查询浮动图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query
     */
    querySheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string): Promise<QuerySheetsSpreadsheetSheetFloatImageResponse>
    /**
     * 删除浮动图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete
     */
    deleteSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string): Promise<void>
  }
}

export interface CreateSheetsSpreadsheetRequest {
  /** 表格标题 */
  title?: string
  /** 文件夹token */
  folder_token?: string
}

export interface PatchSheetsSpreadsheetRequest {
  /** 表格标题 */
  title?: string
}

export interface GetSheetsSpreadsheetQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MoveDimensionSheetsSpreadsheetSheetRequest {
  /** 移动源位置参数 */
  source?: Dimension
  /** 移动的目标位置行或者列号 */
  destination_index?: number
}

export interface FindSheetsSpreadsheetSheetRequest {
  /** 查找条件 */
  find_condition: FindCondition
  /** 查找的字符串 */
  find: string
}

export interface ReplaceSheetsSpreadsheetSheetRequest {
  /** 查找条件 */
  find_condition: FindCondition
  /** 查找的字符串 */
  find: string
  /** 替换的字符串 */
  replacement: string
}

export interface CreateSheetsSpreadsheetSheetFilterRequest {
  /** 筛选应用范围 */
  range: string
  /** 设置筛选条件的列 */
  col: string
  /** 筛选的条件 */
  condition: Condition
}

export interface UpdateSheetsSpreadsheetSheetFilterRequest {
  /** 更新筛选条件的列 */
  col: string
  /** 筛选条件 */
  condition: Condition
}

export interface CreateSheetsSpreadsheetSheetFilterViewRequest {
  /** 筛选视图 id */
  filter_view_id?: string
  /** 筛选视图名字 */
  filter_view_name?: string
  /** 筛选视图的筛选范围 */
  range?: string
}

export interface PatchSheetsSpreadsheetSheetFilterViewRequest {
  /** 筛选视图名字 */
  filter_view_name?: string
  /** 筛选视图的筛选范围 */
  range?: string
}

export interface CreateSheetsSpreadsheetSheetFilterViewConditionRequest {
  /** 设置筛选条件的列，使用字母号 */
  condition_id?: string
  /** 筛选类型 */
  filter_type?: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected?: string[]
}

export interface UpdateSheetsSpreadsheetSheetFilterViewConditionRequest {
  /** 筛选类型 */
  filter_type?: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected?: string[]
}

export interface CreateSheetsSpreadsheetSheetFloatImageRequest {
  /** 浮动图片 id */
  float_image_id?: string
  /** 浮动图片 token，需要先上传图片到表格获得此 token 之后再进行浮动图片的操作 */
  float_image_token?: string
  /** 浮动图片的左上角单元格定位，只支持一个单元格 */
  range?: string
  /** 浮动图片的宽度，大于等于 20px */
  width?: number
  /** 浮动图片的高度，大于等于 20px */
  height?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移，大于等于0且小于所在单元格的宽度 */
  offset_x?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移，大于等于0且小于所在单元格的高度 */
  offset_y?: number
}

export interface PatchSheetsSpreadsheetSheetFloatImageRequest {
  /** 浮动图片 token，需要先上传图片到表格获得此 token 之后再进行浮动图片的操作 */
  float_image_token?: string
  /** 浮动图片的左上角单元格定位，只支持一个单元格 */
  range?: string
  /** 浮动图片的宽度，大于等于 20px */
  width?: number
  /** 浮动图片的高度，大于等于 20px */
  height?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移，大于等于0且小于所在单元格的宽度 */
  offset_x?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移，大于等于0且小于所在单元格的高度 */
  offset_y?: number
}

export interface CreateSheetsSpreadsheetResponse {
  /** 表格信息 */
  spreadsheet?: Spreadsheet
}

export interface GetSheetsSpreadsheetResponse {
  /** 表格 */
  spreadsheet?: GetSpreadsheet
}

export interface QuerySheetsSpreadsheetSheetResponse {
  /** 工作表信息 */
  sheets?: Sheet[]
}

export interface GetSheetsSpreadsheetSheetResponse {
  /** 工作表 */
  sheet?: Sheet
}

export interface FindSheetsSpreadsheetSheetResponse {
  /** 查找返回符合条件的信息 */
  find_result?: FindReplaceResult
}

export interface ReplaceSheetsSpreadsheetSheetResponse {
  /** 符合查找条件并替换的单元格信息 */
  replace_result?: FindReplaceResult
}

export interface GetSheetsSpreadsheetSheetFilterResponse {
  /** 筛选信息 */
  sheet_filter_info?: SheetFilterInfo
}

export interface CreateSheetsSpreadsheetSheetFilterViewResponse {
  /** 创建的筛选视图的 id 、name、range */
  filter_view?: FilterView
}

export interface PatchSheetsSpreadsheetSheetFilterViewResponse {
  /** 更新后的筛选视图的 id 、name、range */
  filter_view?: FilterView
}

export interface QuerySheetsSpreadsheetSheetFilterViewResponse {
  /** 子表的所有筛选视图信息，id、name、range */
  items?: FilterView[]
}

export interface GetSheetsSpreadsheetSheetFilterViewResponse {
  /** 筛选视图信息，包括 id、name、range */
  filter_view?: FilterView
}

export interface CreateSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 创建的筛选条件 */
  condition?: FilterViewCondition
}

export interface UpdateSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 更新后的筛选条件 */
  condition?: FilterViewCondition
}

export interface QuerySheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 筛选视图设置的所有筛选条件 */
  items?: FilterViewCondition[]
}

export interface GetSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 筛选的条件 */
  condition?: FilterViewCondition
}

export interface CreateSheetsSpreadsheetSheetFloatImageResponse {
  /** 浮动图片 */
  float_image?: FloatImage
}

export interface PatchSheetsSpreadsheetSheetFloatImageResponse {
  /** 浮动图片 */
  float_image?: FloatImage
}

export interface GetSheetsSpreadsheetSheetFloatImageResponse {
  /** 浮动图片 */
  float_image?: FloatImage
}

export interface QuerySheetsSpreadsheetSheetFloatImageResponse {
  /** 子表的所有浮动图片信息 */
  items?: FloatImage[]
}

Internal.define({
  '/sheets/v3/spreadsheets': {
    POST: 'createSheetsSpreadsheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}': {
    PATCH: 'patchSheetsSpreadsheet',
    GET: 'getSheetsSpreadsheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/query': {
    GET: 'querySheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}': {
    GET: 'getSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/move_dimension': {
    POST: 'moveDimensionSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/find': {
    POST: 'findSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/replace': {
    POST: 'replaceSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter': {
    POST: 'createSheetsSpreadsheetSheetFilter',
    PUT: 'updateSheetsSpreadsheetSheetFilter',
    GET: 'getSheetsSpreadsheetSheetFilter',
    DELETE: 'deleteSheetsSpreadsheetSheetFilter',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views': {
    POST: 'createSheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}': {
    PATCH: 'patchSheetsSpreadsheetSheetFilterView',
    GET: 'getSheetsSpreadsheetSheetFilterView',
    DELETE: 'deleteSheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/query': {
    GET: 'querySheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions': {
    POST: 'createSheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions/{condition_id}': {
    PUT: 'updateSheetsSpreadsheetSheetFilterViewCondition',
    GET: 'getSheetsSpreadsheetSheetFilterViewCondition',
    DELETE: 'deleteSheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions/query': {
    GET: 'querySheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images': {
    POST: 'createSheetsSpreadsheetSheetFloatImage',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images/{float_image_id}': {
    PATCH: 'patchSheetsSpreadsheetSheetFloatImage',
    GET: 'getSheetsSpreadsheetSheetFloatImage',
    DELETE: 'deleteSheetsSpreadsheetSheetFloatImage',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images/query': {
    GET: 'querySheetsSpreadsheetSheetFloatImage',
  },
})

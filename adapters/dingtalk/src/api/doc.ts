import { Internal } from '../internal'
// GENERATED CONTENT

export interface SetRowsVisibilityParams {
  /** 可见性。 */
  visibility: string
  /** 要显示或者隐藏的第一行的游标，从0开始。 */
  row: number
  /** 要显示或隐藏的行的数量。 */
  rowCount: number
}

export interface SetRowsVisibilityQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface SetRowsVisibilityResponse {
  id?: string
}

export interface SetColumnsVisibilityParams {
  /** 要显示或隐藏的第一列的游标，从0开始。 */
  column: number
  /** 要显示或隐藏的列的数量。 */
  columnCount: number
  /** 可见性。 */
  visibility: string
}

export interface SetColumnsVisibilityQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface SetColumnsVisibilityResponse {
  id?: string
}

export interface DeleteRowsParams {
  /** 要删除的第一行的游标，从0开始。 */
  row: number
  /** 要删除的行的数量。 */
  rowCount: number
}

export interface DeleteRowsQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface DeleteRowsResponse {
  id?: string
}

export interface DeleteColumnsParams {
  /** 要删除的第一列的游标，从0开始。 */
  column: number
  /** 要删除的列的数量。 */
  columnCount: number
}

export interface DeleteColumnsQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface DeleteColumnsResponse {
  id?: string
}

export interface InsertRowsBeforeParams {
  /** 指定行的游标，从0开始。 */
  row: number
  /** 插入行的数量。 */
  rowCount: number
}

export interface InsertRowsBeforeQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface InsertRowsBeforeResponse {
  id?: string
}

export interface InsertColumnsBeforeParams {
  /** 指定列的游标，从0开始。 */
  column: number
  /** 插入列的数量。 */
  columnCount: number
}

export interface InsertColumnsBeforeQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface InsertColumnsBeforeResponse {
  id?: string
}

export interface ClearQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface ClearResponse {
  a1Notation?: string
}

export interface ClearDataQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface ClearDataResponse {
  a1Notation?: string
}

// funcName: isOldApi
Internal.define({
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/setRowsVisibility': {
    POST: { setRowsVisibility: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/setColumnsVisibility': {
    POST: { setColumnsVisibility: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/deleteRows': {
    POST: { deleteRows: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/deleteColumns': {
    POST: { deleteColumns: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/insertRowsBefore': {
    POST: { insertRowsBefore: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/insertColumnsBefore': {
    POST: { insertColumnsBefore: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/ranges/{rangeAddress}/clear': {
    POST: { clear: false },
  },
  '/doc/workbooks/{workbookId}/sheets/{sheetId}/ranges/{rangeAddress}/clearData':
    { POST: { clearData: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 设置行隐藏或显示
     * @see https://developers.dingtalk.com/document/app/set-row-visibility
     */
    setRowsVisibility(
      workbookId: string,
      sheetId: string,
      query: SetRowsVisibilityQuery,
      params: SetRowsVisibilityParams,
    ): Promise<SetRowsVisibilityResponse>
    /**
     * 设置列隐藏或显示
     * @see https://developers.dingtalk.com/document/app/set-column-visibility
     */
    setColumnsVisibility(
      workbookId: string,
      sheetId: string,
      query: SetColumnsVisibilityQuery,
      params: SetColumnsVisibilityParams,
    ): Promise<SetColumnsVisibilityResponse>
    /**
     * 删除行
     * @see https://developers.dingtalk.com/document/app/delete-row
     */
    deleteRows(
      workbookId: string,
      sheetId: string,
      query: DeleteRowsQuery,
      params: DeleteRowsParams,
    ): Promise<DeleteRowsResponse>
    /**
     * 删除列
     * @see https://developers.dingtalk.com/document/app/delete-column
     */
    deleteColumns(
      workbookId: string,
      sheetId: string,
      query: DeleteColumnsQuery,
      params: DeleteColumnsParams,
    ): Promise<DeleteColumnsResponse>
    /**
     * 指定行上方插入若干行
     * @see https://developers.dingtalk.com/document/app/insert-rows-before-rows
     */
    insertRowsBefore(
      workbookId: string,
      sheetId: string,
      query: InsertRowsBeforeQuery,
      params: InsertRowsBeforeParams,
    ): Promise<InsertRowsBeforeResponse>
    /**
     * 指定列左侧插入若干列
     * @see https://developers.dingtalk.com/document/app/insert-column-before-column
     */
    insertColumnsBefore(
      workbookId: string,
      sheetId: string,
      query: InsertColumnsBeforeQuery,
      params: InsertColumnsBeforeParams,
    ): Promise<InsertColumnsBeforeResponse>
    /**
     * 清除单元格区域内所有内容
     * @see https://developers.dingtalk.com/document/app/clear-all
     */
    clear(
      workbookId: string,
      sheetId: string,
      rangeAddress: string,
      query: ClearQuery,
    ): Promise<ClearResponse>
    /**
     * 清除单元格区域内数据
     * @see https://developers.dingtalk.com/document/app/clear-cell-data
     */
    clearData(
      workbookId: string,
      sheetId: string,
      rangeAddress: string,
      query: ClearDataQuery,
    ): Promise<ClearDataResponse>
  }
}

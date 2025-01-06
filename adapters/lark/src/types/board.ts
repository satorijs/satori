import { Internal } from '../internal'
import { WhiteboardNode } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 获取所有节点
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list
     */
    listBoardWhiteboardNode(whiteboard_id: string): Promise<ListBoardWhiteboardNodeResponse>
    /**
     * 获取画板缩略图片
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/download_as_image
     */
    downloadAsImageBoardWhiteboard(whiteboard_id: string): Promise<ArrayBuffer>
  }
}

export interface ListBoardWhiteboardNodeResponse {
  /** 查询结果 */
  nodes?: WhiteboardNode[]
}

Internal.define({
  '/open-apis/board/v1/whiteboards/{whiteboard_id}/nodes': {
    GET: 'listBoardWhiteboardNode',
  },
  '/open-apis/board/v1/whiteboards/{whiteboard_id}/download_as_image': {
    GET: { name: 'downloadAsImageBoardWhiteboard', type: 'binary' },
  },
})

import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    board: Board.Methods
  }
}

export namespace Board {
  export interface Methods {
    whiteboard: Whiteboard.Methods
  }

  export namespace Whiteboard {
    export interface Methods {
      node: Node.Methods
      /**
       * 获取画板缩略图片
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/download_as_image
       */
      downloadAsImage(whiteboard_id: string): Promise<ArrayBuffer>
    }

    export namespace Node {
      export interface Methods {
        /**
         * 获取所有节点
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list
         */
        list(whiteboard_id: string): Promise<ListResponse>
      }

      export interface ListResponse {
        /** 查询结果 */
        nodes?: Lark.WhiteboardNode[]
      }
    }
  }
}

Internal.define({
  '/board/v1/whiteboards/{whiteboard_id}/nodes': {
    GET: 'board.whiteboard.node.list',
  },
  '/board/v1/whiteboards/{whiteboard_id}/download_as_image': {
    GET: { name: 'board.whiteboard.downloadAsImage', type: 'binary' },
  },
})

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
       * 获取画板主题
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/theme
       */
      theme(whiteboard_id: string): Promise<ThemeResponse>
      /**
       * 更新画板主题
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/update_theme
       */
      updateTheme(whiteboard_id: string, body: UpdateThemeRequest): Promise<void>
      /**
       * 获取画板缩略图片
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard/download_as_image
       */
      downloadAsImage(whiteboard_id: string): Promise<ArrayBuffer>
    }

    export interface ThemeResponse {
      /** 主题 */
      theme: 'classic' | 'minimalist_gray' | 'retro' | 'vibrant_color' | 'minimalist_blue' | 'default'
    }

    export interface UpdateThemeRequest {
      /** 主题名称 */
      theme?: string
    }

    export namespace Node {
      export interface Methods {
        /**
         * 创建节点
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/create
         */
        create(whiteboard_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 获取所有节点
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list
         */
        list(whiteboard_id: string): Promise<ListResponse>
      }

      export interface CreateRequest {
        /** 子节点数据 */
        nodes?: Lark.WhiteboardNode[]
      }

      export interface CreateQuery {
        /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作 */
        client_token?: string
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface CreateResponse {
        /** 所创建的节点 id 列表 */
        ids: string[]
        /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
        client_token?: string
      }

      export interface ListResponse {
        /** 查询结果 */
        nodes?: Lark.WhiteboardNode[]
      }
    }
  }
}

Internal.define({
  '/board/v1/whiteboards/{whiteboard_id}/theme': {
    GET: 'board.whiteboard.theme',
  },
  '/board/v1/whiteboards/{whiteboard_id}/update_theme': {
    POST: 'board.whiteboard.updateTheme',
  },
  '/board/v1/whiteboards/{whiteboard_id}/download_as_image': {
    GET: { name: 'board.whiteboard.downloadAsImage', type: 'binary' },
  },
  '/board/v1/whiteboards/{whiteboard_id}/nodes': {
    POST: 'board.whiteboard.node.create',
    GET: 'board.whiteboard.node.list',
  },
})

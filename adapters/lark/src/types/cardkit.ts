import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    cardkit: Cardkit.Methods
  }
}

export namespace Cardkit {
  export interface Methods {
    card: Card.Methods
  }

  export namespace Card {
    export interface Methods {
      element: Element.Methods
      /**
       * 创建卡片实体
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新卡片配置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/settings
       */
      settings(card_id: string, body: SettingsRequest): Promise<void>
      /**
       * 批量更新卡片实体
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/batch_update
       */
      batchUpdate(card_id: string, body: BatchUpdateRequest): Promise<void>
      /**
       * 全量更新卡片实体
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/update
       */
      update(card_id: string, body: UpdateRequest): Promise<void>
      /**
       * 转换 ID
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/id_convert
       */
      idConvert(body: IdConvertRequest): Promise<IdConvertResponse>
    }

    export interface CreateRequest {
      /** 卡片数据的类型 */
      type: string
      /** 卡片数据内容，与卡片数据的类型相对应 */
      data: string
    }

    export interface CreateResponse {
      /** 卡片ID */
      card_id: string
    }

    export interface SettingsRequest {
      /** 卡片设置 */
      settings: string
      /** UUID */
      uuid?: string
      /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
      sequence: number
    }

    export interface BatchUpdateRequest {
      /** 幂等 id，最大长度为 64。可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
      uuid?: string
      /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
      sequence: number
      /** 操作列表，可选值有： partial_update_setting：更新卡片设置，此时 parmas 结构参考更新卡片设置接口请求体的 settings 字段 ；add_elements，此时 parmas 结构参考添加组件接口请求体的 type、target_element_id、elements 字段 ； delete_elements，此时 parmas 结构内仅支持 element_ids 参数，参数值为组件 ID 数组 ； partial_update_element，此时 parmas 结构包括参考局部更新组件接口的路径参数 element_id 和请求体 partial_element 字段 ; update_element，此时 parmas 结构参考全量更新组件接口的路径参数 element_id 和请求体 element 字段 */
      actions: string
    }

    export interface UpdateRequest {
      /** 卡片内容 */
      card: Lark.Card
      /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
      uuid?: string
      /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
      sequence: number
    }

    export interface IdConvertRequest {
      /** 消息ID */
      message_id: string
    }

    export interface IdConvertResponse {
      /** 消息 ID 对应的卡片 ID */
      card_id?: string
    }

    export namespace Element {
      export interface Methods {
        /**
         * 新增组件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/create
         */
        create(card_id: string, body: CreateRequest): Promise<void>
        /**
         * 更新组件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/update
         */
        update(card_id: string, element_id: string, body: UpdateRequest): Promise<void>
        /**
         * 更新组件属性
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/patch
         */
        patch(card_id: string, element_id: string, body: PatchRequest): Promise<void>
        /**
         * 流式更新文本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/content
         */
        content(card_id: string, element_id: string, body: ContentRequest): Promise<void>
        /**
         * 删除组件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card-element/delete
         */
        delete(card_id: string, element_id: string, body: DeleteRequest): Promise<void>
      }

      export interface CreateRequest {
        /** 添加组件的方式 */
        type: 'insert_before' | 'insert_after' | 'append'
        /** 目标组件的 ID。 当 type 为 insert_before、insert_after 时，为用于定位的目标组件。 当 type 为 append 时，该字段仅支持容器类组件，为用于指定末尾添加的目标组件，未填写默认为在卡片 body 末尾添加。 */
        target_element_id?: string
        /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
        uuid?: string
        /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
        sequence: number
        /** 组件列表 */
        elements: string
      }

      export interface UpdateRequest {
        /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
        uuid?: string
        /** 新的组件 */
        element: string
        /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
        sequence: number
      }

      export interface PatchRequest {
        /** 要更改的组件部分配置内容，传入 id 参数后将对原有组件的 id 进行更新，不支持修改 tag 参数。 */
        partial_element: string
        /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
        uuid?: string
        /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
        sequence: number
      }

      export interface ContentRequest {
        /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
        uuid?: string
        /** 更新后的文本内容 */
        content: string
        /** 顺序序号，用于保证更新文本内容的时序性。在卡片的单次 streaming 模式周期中（steaming 状态从开始到停止），该值需为递增的正整数，否则将报错。 */
        sequence: number
      }

      export interface DeleteRequest {
        /** 幂等 id，可通过传入唯一的 uuid 以保证相同批次的操作只进行一次。 */
        uuid?: string
        /** 卡片处于流式更新模式时，进行卡片操作的顺序序号，用于保证多次更新的时序性。值为正整数，一次流式状态的多次更新操作（streaming_mode 一次从 true 到 false 期间）需要保证 sequence 递增，否则将报错。推荐使用时间戳。 */
        sequence: number
      }
    }
  }
}

Internal.define({
  '/cardkit/v1/cards': {
    POST: 'cardkit.card.create',
  },
  '/cardkit/v1/cards/{card_id}/settings': {
    PATCH: 'cardkit.card.settings',
  },
  '/cardkit/v1/cards/{card_id}/batch_update': {
    POST: 'cardkit.card.batchUpdate',
  },
  '/cardkit/v1/cards/{card_id}': {
    PUT: 'cardkit.card.update',
  },
  '/cardkit/v1/cards/{card_id}/elements': {
    POST: 'cardkit.card.element.create',
  },
  '/cardkit/v1/cards/{card_id}/elements/{element_id}': {
    PUT: 'cardkit.card.element.update',
    PATCH: 'cardkit.card.element.patch',
    DELETE: 'cardkit.card.element.delete',
  },
  '/cardkit/v1/cards/{card_id}/elements/{element_id}/content': {
    PUT: 'cardkit.card.element.content',
  },
  '/cardkit/v1/cards/id_convert': {
    POST: 'cardkit.card.idConvert',
  },
})

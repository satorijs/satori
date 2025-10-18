import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    moments: Moments.Methods
  }
}

export namespace Moments {
  export interface Methods {
    post: Post.Methods
  }

  export namespace Post {
    export interface Methods {
      /**
       * 查询帖子信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/moments-v1/post/get
       */
      get(post_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      /** 帖子实体 */
      post?: Lark.Post
    }
  }
}

Internal.define({
  '/moments/v1/posts/{post_id}': {
    GET: 'moments.post.get',
  },
})

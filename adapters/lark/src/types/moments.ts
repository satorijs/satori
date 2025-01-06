import { Internal } from '../internal'
import { Post } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 查询帖子信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/moments-v1/post/get
     */
    getMomentsPost(post_id: string, query?: GetMomentsPostQuery): Promise<GetMomentsPostResponse>
  }
}

export interface GetMomentsPostQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMomentsPostResponse {
  /** 帖子实体 */
  post?: Post
}

Internal.define({
  '/open-apis/moments/v1/posts/{post_id}': {
    GET: 'getMomentsPost',
  },
})

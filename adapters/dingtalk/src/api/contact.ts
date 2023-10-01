import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetOrgAuthInfoQuery {
  /** 需要获取的企业认证信息的企业corpId。详情参见[基础概念-CorpId](https://open.dingtalk.com/document/org/basic-concepts)。 */
  targetCorpId?: string
}

export interface GetOrgAuthInfoResponse {
  orgName: string
  licenseOrgName: string
  registrationNum?: string
  unifiedSocialCredit?: string
  organizationCode?: string
  legalPerson?: string
  licenseUrl?: string
  authLevel: number
}

export interface BatchApproveUnionApplyParams {
  /** 申请的合作伙伴组织 CorpId，参考[基础概念-CorpId](https://open.dingtalk.com/document/org/basic-concepts)。 */
  branchCorpId?: string
  /** 合作伙伴组织在上下游组织内的名称。 */
  unionRootName?: string
  /** 合作伙伴组织在上下游组织内的位置。 */
  linkDeptId?: number
}

export interface BatchApproveUnionApplyResponse {
  result?: unknown
}

// funcName: isOldApi
Internal.define({
  '/contact/organizations/authInfos': { GET: { getOrgAuthInfo: false } },
  '/contact/cooperateCorps/unionApplications/approve': {
    POST: { batchApproveUnionApply: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 查询企业认证信息
     * @see https://open.dingtalk.com/document/isvapp/obtain-enterprise-authentication-information
     */
    getOrgAuthInfo(query: GetOrgAuthInfoQuery): Promise<GetOrgAuthInfoResponse>
    /**
     * 批量通过分支组织的关联申请
     * @see https://open.dingtalk.com/document/isvapp/apply-for-association-with-multiple-branches-in-batch-batch-through-the-application-of-partner-organizations-to-join-contact
     */
    batchApproveUnionApply(
      params: BatchApproveUnionApplyParams,
    ): Promise<BatchApproveUnionApplyResponse>
  }
}

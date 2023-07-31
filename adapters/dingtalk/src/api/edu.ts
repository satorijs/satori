import { Internal } from "../internal";
// GENERATED CONTENT

export interface MoveStudentParams {
  /** 操作者的userid，可调用[通过免登码获取用户信息](https://developers.dingtalk.com/document/app/obtain-the-userid-of-a-user-by-using-the-log-free)接口获取。 */
  operator: string;
  /** 学生的userid，可调用[获取人员列表](https://developers.dingtalk.com/document/app/obtains-a-list-of-home-school-user-identities)接口获取。 */
  userId: string;
  /** 原班级ID，可调用[获取部门列表](https://developers.dingtalk.com/document/app/obtains-the-department-node-list)接口获取。 */
  originClassId: number;
  /** 目标班级ID，可调用[获取部门列表](https://developers.dingtalk.com/document/app/obtains-the-department-node-list)接口获取。 */
  targetClassId: number;
}

export interface MoveStudentResponse {
  success?: unknown;
}

// funcName: isOldApi
Internal.define({ "/edu/students/move": { POST: { moveStudent: false } } });
declare module "../internal" {
  interface Internal {
    /**
     * 学生调班
     * @see https://developers.dingtalk.com/document/isvapp/shift-students
     */
    moveStudent(params: MoveStudentParams): Promise<MoveStudentResponse>;
  }
}

import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/workflows.stepCompleted': {
    GET: { 'workflowsStepCompleted': true },
  },
  '/workflows.stepFailed': {
    GET: { 'workflowsStepFailed': true },
  },
  '/workflows.updateStep': {
    GET: { 'workflowsUpdateStep': true },
  },
})

export namespace Workflows {
  export namespace Params {
    export interface StepCompleted {
      workflow_step_execute_id: string
      outputs?: string
    }
    export interface StepFailed {
      workflow_step_execute_id: string
      error: string
    }
    export interface UpdateStep {
      workflow_step_edit_id: string
      inputs?: string
      outputs?: string
      step_name?: string
      step_image_url?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Indicate that an app's step in a workflow completed execution.
     * @see https://api.slack.com/methods/workflows.stepCompleted
     */
    workflowsStepCompleted(token: TokenInput, params: Workflows.Params.StepCompleted): Promise<{
      ok: boolean
    }>

    /**
     * Indicate that an app's step in a workflow failed to execute.
     * @see https://api.slack.com/methods/workflows.stepFailed
     */
    workflowsStepFailed(token: TokenInput, params: Workflows.Params.StepFailed): Promise<{
      ok: boolean
    }>

    /**
     * Update the configuration for a workflow extension step.
     * @see https://api.slack.com/methods/workflows.updateStep
     */
    workflowsUpdateStep(token: TokenInput, params: Workflows.Params.UpdateStep): Promise<{
      ok: boolean
    }>

  }
}

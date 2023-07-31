import { Internal } from "../internal";
// GENERATED CONTENT

export interface UpgradeDeviceResponse {
  requestId?: string;
}

// funcName: isOldApi
Internal.define({ "/diot/upgrade/device": { POST: { upgradeDevice: false } } });
declare module "../internal" {
  interface Internal {
    /**
     * 升级设备
     * @see https://developers.dingtalk.com/document/app/upgrade-equipment
     */
    upgradeDevice(): Promise<UpgradeDeviceResponse>;
  }
}

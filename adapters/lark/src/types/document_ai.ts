import { BankCard, BankInfo, BodyInfo, BusinessLicense, ChinesePassport, DrvingLicense, ExtractCopy, ExtractCurrency, ExtractPrice, ExtractTime, FoodManageLicense, FoodProduceLicense, HealthCertificate, HkmMainlandTravelPermit, IdCard, RecognizedEntities, Resume, TaxiInvoice, TrainInvoice, TwMainlandTravelPermit, VatInvoice, VehicleInvoice, VehicleLicense } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 识别文件中的简历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/resume/parse
     */
    parseDocumentAiResume(form: ParseDocumentAiResumeForm): Promise<ParseDocumentAiResumeResponse>
    /**
     * 识别文件中的机动车发票
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vehicle_invoice/recognize
     */
    recognizeDocumentAiVehicleInvoice(form: RecognizeDocumentAiVehicleInvoiceForm): Promise<RecognizeDocumentAiVehicleInvoiceResponse>
    /**
     * 识别文件中的健康证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/health_certificate/recognize
     */
    recognizeDocumentAiHealthCertificate(form: RecognizeDocumentAiHealthCertificateForm): Promise<RecognizeDocumentAiHealthCertificateResponse>
    /**
     * 识别文件中的港澳居民来往内地通行证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/hkm_mainland_travel_permit/recognize
     */
    recognizeDocumentAiHkmMainlandTravelPermit(form: RecognizeDocumentAiHkmMainlandTravelPermitForm): Promise<RecognizeDocumentAiHkmMainlandTravelPermitResponse>
    /**
     * 识别文件中的台湾居民来往大陆通行证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/tw_mainland_travel_permit/recognize
     */
    recognizeDocumentAiTwMainlandTravelPermit(form: RecognizeDocumentAiTwMainlandTravelPermitForm): Promise<RecognizeDocumentAiTwMainlandTravelPermitResponse>
    /**
     * 识别文件中的中国护照
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/chinese_passport/recognize
     */
    recognizeDocumentAiChinesePassport(form: RecognizeDocumentAiChinesePassportForm): Promise<RecognizeDocumentAiChinesePassportResponse>
    /**
     * 识别文件中的银行卡
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/bank_card/recognize
     */
    recognizeDocumentAiBankCard(form: RecognizeDocumentAiBankCardForm): Promise<RecognizeDocumentAiBankCardResponse>
    /**
     * 识别文件中的行驶证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vehicle_license/recognize
     */
    recognizeDocumentAiVehicleLicense(form: RecognizeDocumentAiVehicleLicenseForm): Promise<RecognizeDocumentAiVehicleLicenseResponse>
    /**
     * 识别文件中的火车票
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/train_invoice/recognize
     */
    recognizeDocumentAiTrainInvoice(form: RecognizeDocumentAiTrainInvoiceForm): Promise<RecognizeDocumentAiTrainInvoiceResponse>
    /**
     * 识别文件中的出租车发票
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/taxi_invoice/recognize
     */
    recognizeDocumentAiTaxiInvoice(form: RecognizeDocumentAiTaxiInvoiceForm): Promise<RecognizeDocumentAiTaxiInvoiceResponse>
    /**
     * 识别文件中的身份证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/id_card/recognize
     */
    recognizeDocumentAiIdCard(form: RecognizeDocumentAiIdCardForm): Promise<RecognizeDocumentAiIdCardResponse>
    /**
     * 识别文件中的食品生产许可证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/food_produce_license/recognize
     */
    recognizeDocumentAiFoodProduceLicense(form: RecognizeDocumentAiFoodProduceLicenseForm): Promise<RecognizeDocumentAiFoodProduceLicenseResponse>
    /**
     * 识别文件中的食品经营许可证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/food_manage_license/recognize
     */
    recognizeDocumentAiFoodManageLicense(form: RecognizeDocumentAiFoodManageLicenseForm): Promise<RecognizeDocumentAiFoodManageLicenseResponse>
    /**
     * 识别文件中的驾驶证
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/driving_license/recognize
     */
    recognizeDocumentAiDrivingLicense(form: RecognizeDocumentAiDrivingLicenseForm): Promise<RecognizeDocumentAiDrivingLicenseResponse>
    /**
     * 识别文件中的增值税发票
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vat_invoice/recognize
     */
    recognizeDocumentAiVatInvoice(form: RecognizeDocumentAiVatInvoiceForm): Promise<RecognizeDocumentAiVatInvoiceResponse>
    /**
     * 识别文件中的营业执照
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/business_license/recognize
     */
    recognizeDocumentAiBusinessLicense(form: RecognizeDocumentAiBusinessLicenseForm): Promise<RecognizeDocumentAiBusinessLicenseResponse>
    /**
     * 提取文件中的合同字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/contract/field_extraction
     */
    fieldExtractionDocumentAiContract(form: FieldExtractionDocumentAiContractForm): Promise<FieldExtractionDocumentAiContractResponse>
    /**
     * 识别文件中的名片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/business_card/recognize
     */
    recognizeDocumentAiBusinessCard(form: RecognizeDocumentAiBusinessCardForm): Promise<RecognizeDocumentAiBusinessCardResponse>
  }
}

export interface ParseDocumentAiResumeForm {
  /** 简历文件，支持 PDF / DOCX / PNG / JPG */
  file: Blob
}

export interface ParseDocumentAiResumeResponse {
  /** 简历信息 */
  resumes?: Resume[]
}

export interface RecognizeDocumentAiVehicleInvoiceForm {
  /** 识别的机动车发票源文件 */
  file: Blob
}

export interface RecognizeDocumentAiVehicleInvoiceResponse {
  /** 机动车发票信息 */
  vehicle_invoice?: VehicleInvoice
}

export interface RecognizeDocumentAiHealthCertificateForm {
  /** 识别的健康证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiHealthCertificateResponse {
  /** 健康证信息 */
  health_certificate?: HealthCertificate
}

export interface RecognizeDocumentAiHkmMainlandTravelPermitForm {
  /** 识别的港澳居民来往内地通行证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiHkmMainlandTravelPermitResponse {
  /** 港澳居民来往内地通行证信息 */
  hkm_mainland_travel_permit?: HkmMainlandTravelPermit
}

export interface RecognizeDocumentAiTwMainlandTravelPermitForm {
  /** 识别的台湾居民来往大陆通行证源文件 */
  file?: Blob
}

export interface RecognizeDocumentAiTwMainlandTravelPermitResponse {
  /** 台湾居民来往大陆通行证信息 */
  tw_mainland_travel_permit?: TwMainlandTravelPermit
}

export interface RecognizeDocumentAiChinesePassportForm {
  /** 识别的中国护照源文件 */
  file: Blob
}

export interface RecognizeDocumentAiChinesePassportResponse {
  /** 中国护照信息 */
  chinese_passport?: ChinesePassport
}

export interface RecognizeDocumentAiBankCardForm {
  /** 识别的银行卡源文件 */
  file: Blob
}

export interface RecognizeDocumentAiBankCardResponse {
  /** 银行卡信息 */
  bank_card?: BankCard
}

export interface RecognizeDocumentAiVehicleLicenseForm {
  /** 识别的行驶证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiVehicleLicenseResponse {
  /** 行驶证信息 */
  vehicle_license?: VehicleLicense
}

export interface RecognizeDocumentAiTrainInvoiceForm {
  /** 识别的火车票源文件 */
  file: Blob
}

export interface RecognizeDocumentAiTrainInvoiceResponse {
  /** 火车票信息 */
  train_invoices?: TrainInvoice[]
}

export interface RecognizeDocumentAiTaxiInvoiceForm {
  /** 识别的出租车票源文件 */
  file: Blob
}

export interface RecognizeDocumentAiTaxiInvoiceResponse {
  /** 出租车票信息 */
  taxi_invoices?: TaxiInvoice[]
}

export interface RecognizeDocumentAiIdCardForm {
  /** 识别身份证的源文件 */
  file: Blob
}

export interface RecognizeDocumentAiIdCardResponse {
  /** 身份证信息 */
  id_card?: IdCard
}

export interface RecognizeDocumentAiFoodProduceLicenseForm {
  /** 识别的食品生产许可证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiFoodProduceLicenseResponse {
  /** 食品生产许可证信息 */
  food_produce_license?: FoodProduceLicense
}

export interface RecognizeDocumentAiFoodManageLicenseForm {
  /** 识别的食品经营许可证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiFoodManageLicenseResponse {
  /** 食品经营许可证信息 */
  food_manage_license?: FoodManageLicense
}

export interface RecognizeDocumentAiDrivingLicenseForm {
  /** 识别的驾驶证源文件 */
  file: Blob
}

export interface RecognizeDocumentAiDrivingLicenseResponse {
  /** 驾驶证信息 */
  driving_license?: DrvingLicense
}

export interface RecognizeDocumentAiVatInvoiceForm {
  /** 识别的增值税发票文件 */
  file: Blob
}

export interface RecognizeDocumentAiVatInvoiceResponse {
  /** 增值税发票信息 */
  vat_invoices?: VatInvoice[]
}

export interface RecognizeDocumentAiBusinessLicenseForm {
  /** 识别的营业执照源文件 */
  file: Blob
}

export interface RecognizeDocumentAiBusinessLicenseResponse {
  /** 营业执照信息 */
  business_license?: BusinessLicense
}

export interface FieldExtractionDocumentAiContractForm {
  /** 合同字段解析的源文件，当前只支持pdf, doc, docx三种类型的文件 */
  file: Blob
  /** pdf页数限制，太长会导致latency增加，最大允许100页 */
  pdf_page_limit: number
  /** ocr 参数，当前支持force, pdf, unused三种格式 */
  ocr_mode: 'force' | 'auto' | 'unused'
}

export interface FieldExtractionDocumentAiContractResponse {
  /** 文件的唯一id */
  file_id?: string
  /** 总交易金额 */
  price?: ExtractPrice
  /** 期限相关信息，包括开始日期、结束日期、有效时长 */
  time?: ExtractTime
  /** 盖章份数 */
  copy?: ExtractCopy
  /** 币种 */
  currency?: ExtractCurrency
  /** 合同标题 */
  header?: string
  /** 主体信息 */
  body_info?: BodyInfo[]
  /** 银行信息 */
  bank_info?: BankInfo[]
}

export interface RecognizeDocumentAiBusinessCardForm {
  /** 识别名片的源文件（支持 JPG / PNG / PDF） */
  file: Blob
}

export interface RecognizeDocumentAiBusinessCardResponse {
  /** 名片信息 */
  business_cards?: RecognizedEntities[]
}

Internal.define({
  '/document_ai/v1/resume/parse': {
    POST: { name: 'parseDocumentAiResume', multipart: true },
  },
  '/document_ai/v1/vehicle_invoice/recognize': {
    POST: { name: 'recognizeDocumentAiVehicleInvoice', multipart: true },
  },
  '/document_ai/v1/health_certificate/recognize': {
    POST: { name: 'recognizeDocumentAiHealthCertificate', multipart: true },
  },
  '/document_ai/v1/hkm_mainland_travel_permit/recognize': {
    POST: { name: 'recognizeDocumentAiHkmMainlandTravelPermit', multipart: true },
  },
  '/document_ai/v1/tw_mainland_travel_permit/recognize': {
    POST: { name: 'recognizeDocumentAiTwMainlandTravelPermit', multipart: true },
  },
  '/document_ai/v1/chinese_passport/recognize': {
    POST: { name: 'recognizeDocumentAiChinesePassport', multipart: true },
  },
  '/document_ai/v1/bank_card/recognize': {
    POST: { name: 'recognizeDocumentAiBankCard', multipart: true },
  },
  '/document_ai/v1/vehicle_license/recognize': {
    POST: { name: 'recognizeDocumentAiVehicleLicense', multipart: true },
  },
  '/document_ai/v1/train_invoice/recognize': {
    POST: { name: 'recognizeDocumentAiTrainInvoice', multipart: true },
  },
  '/document_ai/v1/taxi_invoice/recognize': {
    POST: { name: 'recognizeDocumentAiTaxiInvoice', multipart: true },
  },
  '/document_ai/v1/id_card/recognize': {
    POST: { name: 'recognizeDocumentAiIdCard', multipart: true },
  },
  '/document_ai/v1/food_produce_license/recognize': {
    POST: { name: 'recognizeDocumentAiFoodProduceLicense', multipart: true },
  },
  '/document_ai/v1/food_manage_license/recognize': {
    POST: { name: 'recognizeDocumentAiFoodManageLicense', multipart: true },
  },
  '/document_ai/v1/driving_license/recognize': {
    POST: { name: 'recognizeDocumentAiDrivingLicense', multipart: true },
  },
  '/document_ai/v1/vat_invoice/recognize': {
    POST: { name: 'recognizeDocumentAiVatInvoice', multipart: true },
  },
  '/document_ai/v1/business_license/recognize': {
    POST: { name: 'recognizeDocumentAiBusinessLicense', multipart: true },
  },
  '/document_ai/v1/contract/field_extraction': {
    POST: { name: 'fieldExtractionDocumentAiContract', multipart: true },
  },
  '/document_ai/v1/business_card/recognize': {
    POST: { name: 'recognizeDocumentAiBusinessCard', multipart: true },
  },
})

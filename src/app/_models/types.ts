export interface Identification {
  documentType?: string;
  idType?: string;
  frontIdBase64?: string;
  frontIdFile?: any;
  frontIdOcrText?: string;
  ocrKey?: string;
  frontSaved?: boolean;
  backIdBase64?: string;
  backIdFile?: any;
  backSaved?: boolean;
  passportBase64?: string;
  passportFile?: File;
  passportSaved?: boolean;
  signatureBase64?: string;
  signatureFile?: any;
  signatureSaved?: boolean;
  nationalId?: string;
}

export interface Selfie {
  selfieBase64?: string;
  selfieFile?: any;
}

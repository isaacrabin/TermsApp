import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = false;
  termsAccepted = false;



  // Identification
  scanningPassport = false;
  savingPassport = false;
  savedPassport = false;
  savingSignature = false;
  savedSignature = false;

  // ID Scan
  scanningFront = false;
  savingFront = false;
  scanningBack = false;
  savingBack = false;
  savedBack = false;
  savedFront = false;
  scannedFront = false;
  frontCaptured = false;
  backCaptured = false;
  capturedFront = false;

  // Selfie
  detectingFace = false;
  savingSelfie = false;
  savedSelfie = false;

  // Child
  savedCert = false;
  scanningCert = false;
  savingCert = false;
  creatingAccount = false;
  constructor() {}
}

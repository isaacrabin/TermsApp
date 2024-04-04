import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { DataStoreService } from 'src/app/_services/datastore.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements OnInit {


  @Input() side: string  = '';
   // toggle webcam on/off
   public showWebcam = true;
   public allowCameraSwitch = false;
   public multipleWebcamsAvailable = false;
   public deviceId: string = '';
   base64File: string = '';

   public errors: WebcamInitError[] = [];

   // latest snapshot
   public webcamImage: WebcamImage | undefined;

   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


   constructor(
    private dataStore: DataStoreService,
    private modalCtrl: ModalController
   ){}

   public ngOnInit(): void {
       WebcamUtil.getAvailableVideoInputs()
       .then((mediaDevices: MediaDeviceInfo[]) => {
         this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
       });
   }

   public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {
    };
    if (this.side === 'selfie') {
        result.facingMode = { ideal: 'user' };
    }
    else{
      result.facingMode = { ideal: "environment" ? "environment" :"user"};
    }
    return result;
}

   public triggerSnapshot(): void {
     this.trigger.next();
   }

   public toggleWebcam(): void {
     this.showWebcam = !this.showWebcam;
   }

   public handleInitError(error: WebcamInitError): void {
     this.errors.push(error);
   }

   public showNextWebcam(directionOrDeviceId: boolean|string): void {
     // true => move forward through devices
     // false => move backwards through devices
     // string => move to device with given deviceId
     this.nextWebcam.next(directionOrDeviceId);
   }

   public async handleImage(webcamImage: WebcamImage): Promise<void> {
     this.webcamImage = webcamImage;
      this.base64File = webcamImage.imageAsDataUrl.split('base64,')[1];
      switch (this.side) {
        case 'id_front':
          this.dataStore.identification.frontIdBase64 = this.base64File;
          this.dataStore.identification.frontIdFile = await this.dataUrlToFile(
            this.dataStore.identification.frontIdBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'id_back':
          this.dataStore.identification.backIdBase64 = this.base64File
          this.dataStore.identification.backIdFile = await this.dataUrlToFile(
            this.dataStore.identification.backIdBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;

        case 'passport':
          this.dataStore.identification.passportBase64 = this.base64File
          this.dataStore.identification.passportFile = await this.dataUrlToFile(
            this.dataStore.identification.passportBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'signature':
          this.dataStore.identification.signatureBase64 = this.base64File;
          this.dataStore.identification.signatureFile = await this.dataUrlToFile(
            this.dataStore.identification.signatureBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.identification,
          });
          break;
        case 'selfie':
          this.dataStore.selfie.selfieBase64 = this.base64File
          this.dataStore.selfie.selfieFile = await this.dataUrlToFile(
            this.dataStore.selfie.selfieBase64
          );
          this.modalCtrl.dismiss({
            cancelled: false,
            data: this.dataStore.selfie,
          });
          break;

        default:
          break;
      }
   }

   public cameraWasSwitched(deviceId: string): void {
     this.deviceId = deviceId;
   }

   public get triggerObservable(): Observable<void> {
     return this.trigger.asObservable();
   }

   public get nextWebcamObservable(): Observable<boolean|string> {
     return this.nextWebcam.asObservable();
   }

   async dataUrlToFile(base64: string) {
    const res: Response = await fetch(`data:image/jpeg;base64,${base64}`);
    const blob: Blob = await res.blob();
    return new File([blob], 'filename.jpeg', { type: 'image/jpeg' });
  }

}

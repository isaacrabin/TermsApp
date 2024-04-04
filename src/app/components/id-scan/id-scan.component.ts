/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Identification } from 'src/app/_models/types';
import { ApiService } from 'src/app/_services/api.service';
import { DataStoreService } from 'src/app/_services/datastore.service';
import { CameraComponent } from '../camera/camera.component';
import { LoadingService } from 'src/app/_services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-id-scan',
  templateUrl: './id-scan.component.html',
  styleUrls: ['./id-scan.component.scss'],
})
export class IdScanComponent  implements OnInit {
  currentModal = null;
  identification: Identification = {};
  side: any;
  accountToOpen: any;
  loading:boolean = false;
  ocrUrl: string = "https://onboarding.stanbicbank.co.ke/ocr";

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private toastr: ToastrService,
    private dataStore: DataStoreService,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    public loader: LoadingService,
    private http: HttpClient

  ) {
    this.accountToOpen = localStorage.getItem('account-to-open');
  }

  ngOnInit() {}



  // Open Camera Modal
  async openCamera(side: string) {
    this.side = side;
    const modal = await this.modalCtrl.create({
      component: CameraComponent,
      cssClass: "my-custom-class",
      componentProps: { side },
    });

    modal.onWillDismiss().then(async (data: any) => {
      if (data.data.cancelled) {
      } else {
        this.identification = await data.data.data;
        if(this.side === 'id_front'){
          this.loader.frontCaptured = true;
        }
        else{
          if(this.side === 'id_back' && this.loader.frontCaptured){

          this.loader.backCaptured = true;
          this.scanBackId();
          }
          else{
            this.toastr.error('Capture front ID first');
          }
      }

      }
    });
    return await modal.present();
    // this.router.navigate(['/onboarding/camera'], { queryParams: { side } });
  }

  async scanningSolutions() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      cssClass: "my-custom-class",
      header: "SCANNING FAILED",
      message: `<h6>Take note of the following concerns as your make another scanning attempt
                </h6> \n \n
                <ol>
                  <li>Ensure you are scanning the correct side of the ID.</li>
                  <li>Ensure your ID fits into the box guideline of the camera.</li>
                  <li>Ensure you are scanning in a well lit room. i.e Avoid dark areas.</li>
                </ol>
                `,
      buttons: [
        {
          text: "OK",
          handler: () => {
            // Save the front id
          },
        },
      ],
    });
    await alert.present();
  }

    // Save image
  async saveFrontImage(payload: any) {
    this.loader.savingFront = true;
    this.loader.scannedFront = false;

    try {
      this.apiService.saveFrontIDImage(payload).subscribe(
        {next: (res) => {
          if (res.successful) {
            this.loader.savingFront = false;
            this.loader.savedFront = true;
            this.dataStore.identification.frontSaved = true;
            this.router.navigate(["/docs-upload"], {
              replaceUrl: true,
            });
          } else {
            this.toastr.error(res.message);
            this.loader.savingFront = false;
            this.loader.savedFront = false;

            this.loader.savingBack = false;
            this.loader.savedBack = false;
          }
        },
        error: (error) => {
          this.toastr.error("Error saving image try again");
          this.loader.savingFront = false;
          this.loader.savedFront = false;

          this.loader.savingBack = false;
          this.loader.savedBack = false;
        }}
      ); // end api call
    } catch (error) {
      this.toastr.error("Error saving image try again");
      this.loader.savingFront = false;
      this.loader.savedFront = false;

      this.loader.savingBack = false;
      this.loader.savedBack = false;
    }
  }
  async saveBackImage(payload: any) {
    this.loader.savingBack = true;

    try {
      this.apiService.saveBackIDImage(payload).subscribe(
        {
          next: (res) => {
            if (res.successful) {
              this.loader.savingBack = false;
              this.loader.savedBack = true;
              this.dataStore.identification.backSaved = true;
              var form: FormData = new FormData();
              form.append("file", this.dataStore.identification.frontIdFile);
              this.saveFrontImage(form);
            } else {
              this.loader.savingBack = false;
              this.loader.savedBack = false;
              this.toastr.error(res.message);
            }
          },
          error:(error) => {
            this.loader.savingBack = false;
            this.loader.savedBack = false;
            this.toastr.error("Unable to save your document again");
          }
        }
      ); // end api call
    } catch (error) {
      this.loader.savingBack = false;
      this.loader.savedBack = false;
      this.toastr.error("Unable to save your document again");
    }
  }

  scanBackId(){
    const payload = {
      national_id: this.identification.backIdBase64,
      document_type: "ID",
    }
    this.loader.scanningBack = true;
    this.http.post(this.ocrUrl, payload).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.loader.scanningBack = false;
          const id = response.id.split(" ").join("");
          // this.identification.nationalId = parseInt(id).toString(); //TODO looks like its truncating leading zero
          this.identification.nationalId = id;
          this.identification.ocrKey = response.key;
          // Verify ID
          this.verifyID(this.identification.nationalId);

        } else {
          this.loader.scanningBack = false;
          this.scanningSolutions();
        }
      },
      error: (error) => {

      }
    })
  }

    // Verify that the ID scanned is for the user onboarding
    async verifyID(nationalId: any) {
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        cssClass: "my-custom-class",
        header: "CONFIRM",
        message: `<h5>Please confirm that this is your National ID Number?
                   \n \n
                  <h1>${nationalId}<h1>
                  `,
        buttons: [
          {
            text: "NO",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              this.loader.scanningBack = false;
            },
          },
          {
            text: "YES",
            handler: () => {
              const form: FormData = new FormData();
              form.append('file',this.dataStore.identification.backIdFile)
              form.append("documentId", nationalId);
              form.append("idType", "NATIONAL.ID");
              this.saveBackImage(form);

              // this.saveBackImage({
              //   file: this.identification.backIdFile,
              //   idType: "NATIONAL_ID",
              //   imageType: "ID_BACK",
              //   match: "",
              //   nationalId: this.identification.nationalId,
              //   key: this.identification.ocrKey,
              // });
            },
          },
        ],
      });
      await alert.present();
    }
}

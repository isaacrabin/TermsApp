/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { DataStoreService } from './../_services/datastore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CameraComponent } from '../components/camera/camera.component';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../_services/loader.service';
import { ApiService } from '../_services/api.service';
import { Identification } from '../_models/types';




@Component({
  selector: 'app-docs',
  templateUrl: './docs.page.html',
  styleUrls: ['./docs.page.scss'],
})
export class DocsPage implements OnInit {

  identification: Identification = {};

  constructor(
    private router: Router,
    private dataStore: DataStoreService,
    private modalCtrl: ModalController,
    private toastr: ToastrService,
    public loader: LoadingService,
    private alertCtrl: AlertController,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  selectDocType(type: string) {
    switch (type) {
      case "OTP":
        this.inputOtp();
        break;
      case "SELFIE":
        this.presentModal("selfie");
        break;
      default:
        break;
    }
  }

  async presentModal(side: string) {
    const modal = await this.modalCtrl.create({
      component: CameraComponent,
      cssClass: "my-custom-class",
      componentProps: { side },
    });

    modal.onWillDismiss().then((data: any) => {
      if (data.data.cancelled) {
      } else {
        if (side === "selfie") {
          const formData = new FormData();
          formData.append('file',this.dataStore.selfie.selfieFile);
          this.saveImage('selfie', formData);
        } else if (side === "signature") {
          this.identification = data.data.data;
          const formData = new FormData();
          formData.append('file', this.identification.signatureFile);
          this.saveImage("signature", formData);
        } else {
        }
      }
    });
    return await modal.present();
  }





    // Save image
    async saveImage(side: string, payload:any) {
      switch (side) {
        case "id_front":
          this.loader.savingSignature = true;

          try {
            this.apiService.saveFrontIDImage(payload).subscribe(
             {
              next: (res) => {
                if (res.successful) {
                  this.loader.savingSignature = false;
                  this.loader.savedSignature = true;
                  this.dataStore.identification.backSaved = true;
                } else {
                  this.loader.savingSignature = false;
                  this.toastr.error(res.message);
                }
              },
              error: (error) => {
                this.loader.savingSignature = false;
                this.toastr.error("Error saving signature try again.");
              }
             }
            ); // end api call
          } catch (error) {
            this.loader.savingSignature = false;
            this.toastr.error("Error saving signature try again.");
          }
          break;

          case "id_back":
          this.loader.savingSignature = true;

          try {
            this.apiService.saveBackIDImage(payload).subscribe(
             {
              next: (res) => {
                if (res.successful) {
                  this.loader.savingSignature = false;
                  this.loader.savedSignature = true;
                  this.dataStore.identification.backSaved = true;
                } else {
                  this.loader.savingSignature = false;
                  this.toastr.error(res.message);
                }
              },
              error: (error) => {
                this.loader.savingSignature = false;
                this.toastr.error("Error saving signature try again.");
              }
             }
            ); // end api call
          } catch (error) {
            this.loader.savingSignature = false;
            this.toastr.error("Error saving signature try again.");
          }
          break;
        case "signature":
          this.loader.savingSignature = true;
          try {
            this.apiService.saveSignatureImage(payload).subscribe(
             {
              next: (res) => {
                if (res.successful) {
                  this.loader.savingSignature = false;
                  this.loader.savedSignature = true;
                } else {
                  this.loader.savingSignature = false;
                  this.toastr.error(res.message);
                }
              },
              error: (error) => {
                this.loader.savingSignature = false;
                this.toastr.error("Error saving signature try again.");
              }
             }
            ); // end api call
          } catch (error) {
            this.loader.savingSignature = false;
            this.toastr.error("Error saving signature try again.");
          }
          break;
          case "selfie":
            this.loader.savingSelfie = true;

            setTimeout(() => {
              this.loader.savingSelfie = false;
              this.loader.savedSelfie = true;
              this.toastr.success("Selfie saved successfully");
            },  2000);
            try {
            //   this.apiService.saveSelfieImage(payload).subscribe(
            //     {
            //     next: (res) => {
            //       if (res.successful) {
            //         this.loader.savingSelfie = false;
            //         this.loader.savedSelfie = true;
            //       } else {
            //         this.loader.savingSelfie = false;
            //         this.toastr.error(res.message);
            //       }
            //     },
            //     error: (error) => {
            //       this.loader.savingSignature = false;
            //       this.toastr.error("Error saving signature try again.");
            //     }
            //     }
            //   );
            } catch (error) {
              this.loader.savingSignature = false;
              this.toastr.error("Error saving signature try again.");
            }
            break;
        default:
          break;
      }
    }

  complete(){
    this.router.navigate(['complete']);
  }

  async inputOtp() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      cssClass: "my-custom-class",
      header: "Confirm OTP",
      mode: 'md',
      message: `<h6>Enter the OTP sent to your phone <em>07****6560</em> to confirm your consent.
                </h6>
                `,
      buttons: [
        {
          text: "OK",
          handler: (data: any) => {
            // Save the front id
            this.loader.loading = true;
            setTimeout(() => {
              this.loader.loading = false;
              this.loader.termsAccepted = true;
              this.toastr.success("Your consent has been sent");
              // this.router.navigate(['welcome']);
            }, 2000);
          },
        },
      ],
      inputs: [
        {
          placeholder: 'OTP',
          name: 'otp',
          attributes: {
            maxlength: 6,
          },
        },
      ]

    });
    await alert.present();
  }

}

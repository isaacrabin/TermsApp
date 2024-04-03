/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { DataStoreService } from './../_services/datastore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CameraComponent } from '../components/camera/camera.component';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../_services/loader.service';
import { ApiService } from '../_services/api.service';



@Component({
  selector: 'app-docs',
  templateUrl: './docs.page.html',
  styleUrls: ['./docs.page.scss'],
})
export class DocsPage implements OnInit {

  identification: any = {};

  constructor(
    private router: Router,
    private dataStore: DataStoreService,
    private modalCtrl: ModalController,
    private toastr: ToastrService,
    public loader: LoadingService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  selectDocType(type: string) {
    switch (type) {
      case "ID":
        this.router.navigate(["docs-upload/id-scan"]);
        break;
      case "PASSPORT":
        this.presentModal("passport");
        break;
      case "SIGNATURE":
        this.presentModal("signature");
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
        if (side === "passport") {
          this.scanPassport();
        } else if (side === "signature") {
          this.identification = data.data.data;
          if (this.dataStore.identification.nationalId) {
            this.saveImage("signature", {
              file: this.identification.signatureFile,
              idType: "",
              imageType: "SIGNATURE",
              match: "",
              nationalId: "",
            });
          } else {
            this.toastr.info("Scan ID First");
          }
        } else {
        }
      }
    });
    return await modal.present();
  }

  scanPassport(){}

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
        default:
          break;
      }
    }


  proceedToPreferences(){}

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable, map } from 'rxjs';
import { LoadingService } from '../_services/loader.service';
import { TermsComponent } from '../docs/terms/terms.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  termsAccepted: boolean = false;
  userId: string = '';

  slides: Array<{ title: string, subtitle: string, icon?: string,logo?: string }> = [
    {
      title: 'Welcome to SBG Securities',
      subtitle: "Online Account Opening",
      logo:'logo'
    },
    {
      title: 'CDSC Services',
      subtitle: "SBG Securities is an appointed Central Depository Agent (CDA) and offers services such as: Account opening, Settlement of shares bought and sold, Settlement of shares bought and sold, Pledge of shares in favour of banks and financial institutions",
      icon: 'link'
    },
  ]


  constructor(
    private modalController: ModalController,
    private router: Router,
    private modalCtrl: ModalController,
    private loader: LoadingService,
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe(params => {
        this.userId = params['id']; // Access the 'id' parameter from the URL
        sessionStorage.setItem('userId', this.userId);
      });
    }


  async openTerms() {
    this.viewTerms('terms');
    // this.router.navigate(['docs-upload']);
    // const modal = await this.modalController.create({
    //   // component: TermsComponent,
    //   // cssClass: 'terms-modal',
    // });

    // modal.onWillDismiss().then((data: any) => {
    //   if(data.data === true){
    //     this.router.navigate(['/onboarding/docs-required']);
    //     return;
    //   }
    // })

    // return await modal.present();
  }


  checkboxChanged(){

  }

  async viewTerms(side: string){
    const modal = await this.modalCtrl.create({
      component: TermsComponent,
      cssClass: "my-custom-class",
      componentProps: { side },
    });

    modal.onWillDismiss().then((data: any) => {
      if (data.data.cancelled) {
      } else {
        this.router.navigate(['docs-upload']);
        this.loader.loading = false;
        this.loader.termsAccepted = true;

      }
    });
    return await modal.present();
  }
}

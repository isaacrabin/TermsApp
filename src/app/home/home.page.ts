import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  termsAccepted: boolean = false;

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
    // {
    //   title: 'Equity trading',
    //   subtitle: 'We provide guidance on the optimal way in which to work orders in the market which relate to large transactions and illiquid counters.',
    //   icon: 'engineering'
    // }
  ]


  constructor(
    private modalController: ModalController,
    private router: Router
    ) {}

  async openTerms() {
    this.router.navigate(['docs-upload']);
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
}

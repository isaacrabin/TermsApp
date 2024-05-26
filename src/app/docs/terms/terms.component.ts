/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent  implements OnInit {

  termsAccepted: boolean = false;

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss(this.termsAccepted);
  }

  checkboxChanged() {
    // Enable checkbox only when the user scrolls to the end and agrees
    this.modalController.dismiss(this.termsAccepted);

    // if(this.termsAccepted){
    //   setTimeout(() => {

    //   }, 200);
    // }

  }

}

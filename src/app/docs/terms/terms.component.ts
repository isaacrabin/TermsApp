/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [IonicModule, FormsModule,ReactiveFormsModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent  implements OnInit {

  termsAccepted: boolean = false;

  constructor(
    private modalController: ModalController,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss(this.termsAccepted);
  }

  checkboxChanged() {
    // Enable checkbox only when the user scrolls to the end and agrees
    this.modalController.dismiss(this.termsAccepted);
    this.toastr.success("Proceed to confirm OTP and take selfie");

    // if(this.termsAccepted){
    //   setTimeout(() => {

    //   }, 200);
    // }

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfiePageRoutingModule } from './selfie-routing.module';

import { SelfiePage } from './selfie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfiePageRoutingModule
  ],
  declarations: [SelfiePage]
})
export class SelfiePageModule {}

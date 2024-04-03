import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfiePage } from './selfie.page';

const routes: Routes = [
  {
    path: '',
    component: SelfiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfiePageRoutingModule {}

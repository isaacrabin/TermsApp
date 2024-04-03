import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsPage } from './docs.page';
import { IdScanComponent } from '../components/id-scan/id-scan.component';

const routes: Routes = [
  {
    path: '',
    component: DocsPage
  },
  {
    path: 'id-scan',
    component: IdScanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsPageRoutingModule {}

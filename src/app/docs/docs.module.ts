import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Config, IonicModule } from '@ionic/angular';

import { DocsPageRoutingModule } from './docs-routing.module';

import { DocsPage } from './docs.page';
import { IdScanComponent } from '../components/id-scan/id-scan.component';
import { ApiService } from '../_services/api.service';
import { DataStoreService } from '../_services/datastore.service';
import { LoadingService } from '../_services/loader.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
    DocsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [DocsPage, IdScanComponent],
  providers:[ApiService,DataStoreService,LoadingService,ToastrService,HttpClient]
})
export class DocsPageModule {}

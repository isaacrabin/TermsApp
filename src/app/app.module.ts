import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebcamModule } from 'ngx-webcam';
import { CameraComponent } from './components/camera/camera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import { QRCodeModule } from 'angularx-qrcode';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent,CameraComponent],
  imports: [BrowserModule, BrowserAnimationsModule, QRCodeModule, FormsModule,ToastrModule.forRoot(), ReactiveFormsModule,IonicModule.forRoot({innerHTMLTemplatesEnabled: true}), AppRoutingModule,  WebcamModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    ToastrService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

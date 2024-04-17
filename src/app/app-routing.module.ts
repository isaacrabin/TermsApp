import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'selfie',
    loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
  },
  {
    path: 'qr-scan',
    loadChildren: () => import('./qr-scan/qr-scan.module').then( m => m.QrScanPageModule)
  },
  {
    path: 'docs-upload',
    loadChildren: () => import('./docs/docs.module').then( m => m.DocsPageModule)
  },
  {
    path: 'complete',
    loadChildren: () => import('./complete/complete.module').then( m => m.CompletePageModule)
  },
  {
    path: '',
    redirectTo: 'home/:id',
    pathMatch: 'full'
  },
  {
    path: 'complete',
    loadChildren: () => import('./complete/complete.module').then( m => m.CompletePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

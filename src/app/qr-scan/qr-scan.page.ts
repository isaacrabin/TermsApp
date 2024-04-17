import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {

  userId: string | null = '';
  url: string = '';

  constructor(
    private router: Router
  ) {
    this.userId = sessionStorage.getItem('userId');
    this.url = `https://onboarding-pwa.vercel.app/home/${this.userId}`;
  }

  ngOnInit() {

  }

  onClick(){
    this.router.navigate(['welcome']);
  }

}

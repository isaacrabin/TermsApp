/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  options: AnimationOptions = {
    path: 'assets/lottie/check-okey-done.json'
 };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  done(){
    this.router.navigate(['/home'])
  }

}

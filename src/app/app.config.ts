import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLottieOptions({
      player: () => player,
    }),
  ],
};

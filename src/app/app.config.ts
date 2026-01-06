import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

// Importação Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6B27nSfEfkHtiD8xBkL2USV_V0ciXHvY",
  authDomain: "rici-58c7a.firebaseapp.com",
  projectId: "rici-58c7a",
  storageBucket: "rici-58c7a.firebasestorage.app",
  messagingSenderId: "185476035666",
  appId: "1:185476035666:web:69a91e3e903ee12d08db8b"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(), 
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
      ])
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
    }),
    provideNgxMask(),    
    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()), provideAnimationsAsync()
  ]
};

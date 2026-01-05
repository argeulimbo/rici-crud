import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importação Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
    provideRouter(routes),
    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};

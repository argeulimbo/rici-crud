import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private platformId = inject(PLATFORM_ID);
    
    constructor(private http: HttpClient) {  }

    
}
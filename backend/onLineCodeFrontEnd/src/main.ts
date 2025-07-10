// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';   // Angular 17+
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(FormsModule),   // ✅ makes ngModel available app‑wide
    provideHttpClient(),                // HTTP client for your POST call
  ],
}).catch(err => console.error(err));

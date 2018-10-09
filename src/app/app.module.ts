import { BrowserModule } from '@angular/platform-browser';
import { OnsenModule, NgModule, CUSTOM_ELEMENTS_SCHEMA , LOCALE_ID } from 'ngx-onsenui';
import 'hammerjs';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { Tab01Component } from './tabs/tab01.component';
import { Tab02Component } from './tabs/tab02.component';
import { Tab03Component } from './tabs/tab03.component';
import { Tab04Component } from './tabs/tab04.component';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

import {  MatButtonModule,
          MatCardModule,
          MatExpansionModule } from '@angular/material';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    Tab01Component,
    Tab02Component,
    Tab03Component,
    Tab04Component
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    OnsenModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ja-JP" }
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [
  Tab01Component,
  Tab02Component,
  Tab03Component,
  Tab04Component],
  bootstrap: [AppComponent]
})
export class AppModule { }

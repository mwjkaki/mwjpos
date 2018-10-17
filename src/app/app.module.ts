import { BrowserModule } from '@angular/platform-browser';
import { OnsenModule, NgModule, CUSTOM_ELEMENTS_SCHEMA , LOCALE_ID } from 'ngx-onsenui';
import 'hammerjs';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NumberInputDirective } from './directives/number-input.directive';
import { PercentInputDirective } from './directives/percent-input.directive';
import { NumberInputPipe } from './pipes/number-input.pipe';
import { PercentInputPipe} from './pipes/percent-input.pipe';
import { TankaKbnPipe } from './pipes/tanka-kbn.pipe';
import { ZeiKbnPipe } from './pipes/zei-kbn.pipe';
import { Tab01Component } from './tabs/tab01.component';
import { Tab02Component } from './tabs/tab02.component';
import { Tab03Component } from './tabs/tab03.component';
import { Tab04Component } from './tabs/tab04.component';

import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

import {  MatButtonModule,
          MatCardModule,
          MatExpansionModule,
          MatIconModule,
          MatInputModule,
          MatSelectModule,
          MatTableModule   } from '@angular/material';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    NumberInputDirective,
    PercentInputDirective,
    NumberInputPipe,
    PercentInputPipe,
    TankaKbnPipe,ZeiKbnPipe,
    Tab01Component,
    Tab02Component,
    Tab03Component,
    Tab04Component
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    OnsenModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ja-JP" },
    NumberInputPipe,PercentInputPipe
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

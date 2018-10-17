import { Component } from '@angular/core';
import { Tab01Component } from './tabs/tab01.component';
import { Tab02Component } from './tabs/tab02.component';
import { Tab03Component } from './tabs/tab03.component';
import { Tab04Component } from './tabs/tab04.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'mwjpos';
  tab01 = Tab01Component;
  tab02 = Tab02Component;
  tab03 = Tab03Component;
  tab04 = Tab04Component;
  constructor(){}
}

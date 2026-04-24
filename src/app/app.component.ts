import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  template: '<app-card />',
})
export class AppComponent {}

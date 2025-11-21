import { Component } from '@angular/core';
import { ContadorCardComponent } from './components/contador-card/contador-card.component';

@Component({
  selector: 'app-root',
  imports: [ContadorCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '04-testing-de-componentes-angular';
}

import { Component, Input } from '@angular/core';
import { ContadorComponent } from '../contador/contador.component';

@Component({
  selector: 'app-contador-card',
  imports: [ContadorComponent],
  templateUrl: './contador-card.component.html',
  styleUrl: './contador-card.component.css'
})
export class ContadorCardComponent {
  @Input() titulo: string = 'Contador';
  @Input() cuentaInicial: number = 0;

  cuenta: number = this.cuentaInicial;

  ngOnInit() {
    this.cuenta = this.cuentaInicial;
  }

  incrementar() {
    this.cuenta++;
  }

  decrementar() {
    if (this.cuenta - 1 >= 0) {
      this.cuenta--;
    }
  }

}

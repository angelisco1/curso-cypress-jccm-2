import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {

  @Input() cuenta: number = 0;
  @Output() onIncrementar = new EventEmitter<void>();
  @Output() onDecrementar = new EventEmitter<void>();

  incrementar() {
    this.onIncrementar.emit()
  }

  decrementar() {
    this.onDecrementar.emit()
  }
}

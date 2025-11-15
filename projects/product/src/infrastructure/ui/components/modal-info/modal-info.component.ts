import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-modal-info',
  imports: [],
  standalone: true,
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css'
})
export class ModalInfoComponent {

  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() translations: { [key: string]: string } = {};
  @Output() closed = new EventEmitter<void>();


  closeModal(): void {
    this.closed.emit();
  }

}

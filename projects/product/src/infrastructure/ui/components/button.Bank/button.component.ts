import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [],
  templateUrl: './buttonBank.component.html',
  styleUrl: './buttonBank.component.css',
})
export class ButtonBankComponent {
  @Input() label: string = '';
  @Input() styleClass: string = 'btn btn-primary';
  @Input() icon: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
  
}

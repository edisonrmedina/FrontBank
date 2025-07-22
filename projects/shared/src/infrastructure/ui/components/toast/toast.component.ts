import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  @ViewChild('toastContainer') toastContainer!: ElementRef;
  
}

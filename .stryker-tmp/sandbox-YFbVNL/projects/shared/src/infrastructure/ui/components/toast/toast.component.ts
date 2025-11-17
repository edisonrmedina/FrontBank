// @ts-nocheck
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'lib-toast',
    imports: [],
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  @ViewChild('toastContainer') toastContainer!: ElementRef;
}

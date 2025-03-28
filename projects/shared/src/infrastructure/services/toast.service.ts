import { computed, Injectable, signal } from '@angular/core';
import { Toast } from '../ui/interfaces/IToast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSignal = signal<Toast | null>(null);

  currentToast = computed(() => {
    const toast = this.toastSignal();
    return toast || { 
      title: 'Error del Sistema', 
      message: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente o contacte con soporte.', 
      type: 'error' 
    };
  });

  isToastVisible = computed(() => this.toastSignal() !== null);

  showToast(title: string, message: string, type: 'success' | 'error' | 'warning' = 'error', duration: number = 5000) {
    this.toastSignal.set({ 
      title, 
      message,
      type 
    });

    setTimeout(() => {
      this.dismissToast();
    }, duration);
  }

  dismissToast() {
    this.toastSignal.set(null);
  }
}

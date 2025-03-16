import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = () => {
  
  const router = inject(Router);

  // Verificar el estado de la Signal directamente
  if (1) {
    true
    return false;
  }

  return true;
};
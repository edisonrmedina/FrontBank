import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  const isAuthenticated = false; 

  if (!isAuthenticated) {
    router.navigate(['/404']); 
    return false; 
  }

  return true;
};